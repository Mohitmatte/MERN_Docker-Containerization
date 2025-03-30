export interface ButtonProps {
    variant: keyof typeof variantStyles; 
    size: keyof typeof sizeStyles;
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: () => void;
    fullwidth?:boolean;
    loading?:boolean;
}

const variantStyles = {
    primary: "bg-purple-600 text-white font-semibold",  
    secondary: "bg-purple-300 text-purple-600 font-semibold",
};

const defaultStyles = "rounded-md"; // Update as a string

const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
};

export const Button = (props: ButtonProps) => {
    return (
        <button
            className={`${variantStyles[props.variant]} 
                ${defaultStyles} 
                ${sizeStyles[props.size]} ${props.fullwidth ? "w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45":""}`} disabled={props.loading}
            onClick={props.onClick}
        >
            <div className="flex items-center">
            {props.startIcon ? <div className="pr-2">{props.startIcon}</div> :null}
            {props.text}
            {props.endIcon && <span>{props.endIcon}</span>}
            </div>
        </button>
    );
};
