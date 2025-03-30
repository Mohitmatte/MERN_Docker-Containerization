"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const JWT_SECRET2 = process.env.JWT_SECRET;
app.use(express_1.default.json());
// app.use(cors({
//     origin: ['https://brainly-73hz.vercel.app'],
//     methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], 
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.post("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "Hello, Brainly!"
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: "Invalid input. Ensure username and password are strings.",
        });
        return;
    }
    const { username, password } = req.body;
    const user = yield db_1.userModel.findOne({
        username
    });
    if (!(user === null || user === void 0 ? void 0 : user.password)) {
        console.log("user password not found");
        return;
    }
    if (!user) {
        console.log("whole user not found");
        res.status(403).json({
            message: "User not found"
        });
        return;
    }
    const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (passwordMatch) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id.toString(),
        }, JWT_SECRET2);
        console.log("Token created");
        //do cookie logic
        res.json({
            token
        });
        return;
    }
    else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
        return;
    }
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string().min(5).max(15),
        password: zod_1.z.string().min(5).max(15),
    });
    const parsedDatawithSuccess = requiredBody.safeParse(req.body);
    console.log(parsedDatawithSuccess);
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 4);
        yield db_1.userModel.create({
            username: username,
            password: hashedPassword,
        });
        //check if user alredy exits i.e username
        res.json({
            status: 200,
            message: "User Created Successfully",
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 400,
            message: "Error Occured",
        });
    }
}));
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
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("conetnt called");
    console.log("POST /api/v1/content was hit");
    const link = req.body.link;
    const type = req.body.type;
    console.log("Adding content", link, "and", type);
    yield db_1.ContentModel.create({
        link: link,
        type: type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content Added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET /api/v1/conent was hit");
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({ userId: userId }).populate("userId", "username"); //only show username
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const userId = req.userId;
    yield db_1.ContentModel.deleteOne({
        _id: contentId,
        userId: userId
    });
    res.json({
        message: "Content Deleted"
    });
}));
app.get("/api/v1/getcontentid", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch content for the authenticated user
        const userId = req.userId;
        const contents = yield db_1.ContentModel.find({ userId }, "_id"); // Only fetch the content IDs
        // Extract content IDs into an array
        const contentIds = contents.map(content => content._id);
        res.json({
            contentIds,
        });
    }
    catch (error) {
        console.error("Error fetching content IDs:", error);
        res.status(500).json({
            message: "An error occurred while fetching content IDs.",
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash,
        });
        res.json({
            message: "/share/" + hash
        });
        return;
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Link deleted"
        });
        return;
    }
}));
//anyone can see
app.get("/api/v1/brain/share/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(403).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(403).json({
            message: "User not found , should not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
app.options('*', (req, res) => {
    console.log('Preflight request received');
    res.sendStatus(200);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
