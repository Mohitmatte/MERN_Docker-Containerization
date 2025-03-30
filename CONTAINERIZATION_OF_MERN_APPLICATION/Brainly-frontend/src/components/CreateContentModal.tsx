import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
// import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;

// link:String,
//     type:String,
//     title:String,

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }:any) {

    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)

    const [type, setType] = useState(ContentType.Youtube);

    async function addConent() {
        const title=titleRef.current?.value;
        const link=linkRef.current?.value;
        console.log("link=",link," title=",title);
        
        await axios.post(`${BACKEND_URL2}/api/v1/content`,{
            link,
            type,
            title
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        toast.success("Content Added succefully")
        onClose();
    }
    return (
        <div>
            {open && <div>
                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center z-40">

                </div >
                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center z-50">
                    <div className="flex flex-col justify-center">
                        <span className="bg-white opacity-100 p-4 rounded">
                            <div className="flex justify-end cursor-pointer" onClick={onClose}>
                                <CrossIcon/>

                            </div>
                            <div>
                                <Input placeholder="title" ref={titleRef} />
                                <Input placeholder="link" ref={linkRef} />
                            </div>
                            <div className="flex justify-center gap-3 p-4">
                                <h1>Type</h1>
                                <Button onClick={() => {
                                    setType(ContentType.Youtube)
                                }} size="sm" text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} />

                                <Button onClick={() => {
                                    setType(ContentType.Twitter)
                                }} size="sm" text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} />
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addConent} size="md" variant="primary" text="Submit" />
                            </div>
                        </span>
                    </div>
                </div>
            </div>}
            <ToastContainer/>
        </div>
    )
}

