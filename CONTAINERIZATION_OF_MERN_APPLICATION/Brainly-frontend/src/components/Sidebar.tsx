import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../icons/LogoIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeICon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar()
{

    const navigate = useNavigate();
    return(<div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center cursor-pointer" onClick={()=>{
                navigate('/dashboard');
            }}>
            <div className="pr-3 text-purple-600 cursor-pointer" >
            <LogoIcon/>
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
            <SidebarItem text="Youtube" icon={<YoutubeICon/>}/>
        </div>
    </div>)
}