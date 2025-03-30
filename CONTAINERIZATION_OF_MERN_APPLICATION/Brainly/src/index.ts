import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { ContentModel, LinkModel, userModel } from "./db";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

dotenv.config();
const app = express();



const JWT_SECRET2=process.env.JWT_SECRET!;
app.use(express.json());

// app.use(cors({
//     origin: ['https://brainly-73hz.vercel.app'],
//     methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], 
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.post("/test",async (req,res)=>{
    res.status(200).json({
        message:"Hello, Brainly!"
    })
})

app.post("/api/v1/signin", async (req, res) => {
    const schema = z.object({
        username: z.string(),
        password: z.string(),
    });
    const result = schema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: "Invalid input. Ensure username and password are strings.",
        });
        return;
    }


    const { username, password } = req.body;
    const user = await userModel.findOne({
        username
    })

    if (!user?.password) {
        console.log("user password not found");

        return;
    }


    if (!user) {
        console.log("whole user not found");
        res.status(403).json({
            message: "User not found"
        })
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString(),
        }, JWT_SECRET2);

        console.log("Token created");

        //do cookie logic
        res.json({
            token
        })
        return;
    }
    else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
        return;
    }

})

app.post("/api/v1/signup", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().min(5).max(15),
        password: z.string().min(5).max(15),
    })
    const parsedDatawithSuccess = requiredBody.safeParse(req.body);
    console.log(parsedDatawithSuccess);

    const username = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 4);

        await userModel.create({
            username: username,
            password: hashedPassword,
        })

        //check if user alredy exits i.e username
        res.json({
            status: 200,
            message: "User Created Successfully",
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 400,
            message: "Error Occured",
        })
    }
})

// app.post("api/v1/content",userMiddleware, (req, res) => {
//     //create a content take 4 inputs
//     //create content schema
//     console.log("POST /api/v1/content was hit");
//     const link=req.body.link;
//     const type=req.body.type;
//     console.log("Adding content");

//     ContentModel.create({
//         link,
//         type,
//         title: req.body.title,
//         userId:req.userId,
//         tags:[]
//     })

//     res.json({
//         message:"Content Added"
//     })

// })

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    console.log("conetnt called");

    console.log("POST /api/v1/content was hit");
    const link = req.body.link;
    const type = req.body.type;
    console.log("Adding content",link,"and",type);

    await ContentModel.create({
        link:link,
        type:type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content Added"
    })

})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    console.log("GET /api/v1/conent was hit");
    const userId = req.userId;

    const content = await ContentModel.find({ userId: userId }).populate("userId", "username") //only show username

    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {

    const contentId = req.body.contentId;
    const userId = req.userId;

    await ContentModel.deleteOne({
        _id:contentId,
        userId: userId
    })

    res.json({
        message: "Content Deleted"
    })
})

app.get("/api/v1/getcontentid", userMiddleware, async (req, res) => {
    try {
        // Fetch content for the authenticated user
        const userId = req.userId;
        const contents = await ContentModel.find({ userId }, "_id"); // Only fetch the content IDs

        // Extract content IDs into an array
        const contentIds = contents.map(content => content._id);

        res.json({
            contentIds,
        });
    } catch (error) {
        console.error("Error fetching content IDs:", error);
        res.status(500).json({
            message: "An error occurred while fetching content IDs.",
        });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }


        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash,
        })

        res.json({
            message: "/share/" + hash
        })
        return;
    }
    else {
        await LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Link deleted"
        })
        return;
    }

})


//anyone can see
app.get("/api/v1/brain/share/:shareLink", async (req, res) => {

    const hash = req.params.shareLink; 

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(403).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    })

    if(!user)
    {
        res.status(403).json({
            message:"User not found , should not happen"
        })
        return;
    }
    res.json({
        username: user.username,
        content: content
    })
})

app.options('*', (req, res) => {
    console.log('Preflight request received');
    res.sendStatus(200);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
