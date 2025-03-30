import { DeleteIcon } from "../icons/DeleteIcon"
import { DocumentIcon } from "../icons/DocumentIcon"
import { ShareIcon } from "../icons/ShareIcon"


interface CardProps{
    title: string,
    link:string,
    type:"twitter" | "youtube",
    onDelete: (id: string,userId:string) => void;
    contentId: string;
    userId:string;
}
export const Card = ({title,link,type,onDelete,contentId,userId}:CardProps) => {

    return (
        <div className="bg-white p-4 rounded-md shadow-md max-w-72 outline-slate-200 border-slate-100 min-h-48 min-w-72 max-h-96 hover:scale-105 transform transition duration-300">

            <div className="flex items-center justify-between">
                <div className="flex items-center font-semibold">
                    <div className="pr-2 text-gray-500">
                        <DocumentIcon/>
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className=" pr-2 text-gray-500 cursor-pointer">
                        <a href={link} target="_blank"/>
                        <ShareIcon size='md' />
                    </div>

                    <div className=" text-gray-500 cursor-pointer" onClick={() => onDelete(contentId,userId)}>
                        <DeleteIcon/>
                    </div>

                </div>
            </div>

            <div className="pt-4">
                {type=== "youtube" &&<iframe className="w-full" src={link.replace("watch", "embed").replace("?v=","/")}
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                
                {type==="twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com","twitter.com")}></a>
                </blockquote>}
                
            </div>

        </div>
    )
}