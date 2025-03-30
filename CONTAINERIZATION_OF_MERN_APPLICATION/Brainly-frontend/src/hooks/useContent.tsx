import axios from "axios";
import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";

export function useContent()
{
    const [content, setContent] = useState([]);
    const BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", BACKEND_URL2);
    function refresh()
    {
        axios.get(`${BACKEND_URL2}/api/v1/content`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((response)=>{
            setContent(response.data.content);
        })
    }
    useEffect(()=>{
        
        refresh();
        let interval=setInterval(()=>{
            refresh()
        },10*1000)

        return ()=>{
            clearInterval(interval);
        }
    },[])

    return {content,refresh};
}