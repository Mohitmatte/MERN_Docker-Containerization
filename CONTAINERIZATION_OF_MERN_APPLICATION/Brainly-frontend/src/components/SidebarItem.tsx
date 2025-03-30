import { ReactElement } from "react";


export function SidebarItem({ icon, text }:
    {
        icon: ReactElement,
        text: string
    }
) {
    return (
        <div className="flex text-gray-600 py-2 cursor-pointer hover:bg-slate-300 rounded pl-4 transition-all duration-200">
            <div className="pr-2">
                {icon}
            </div>
            <div className="">
                {text}
            </div>

        </div>
    )
}