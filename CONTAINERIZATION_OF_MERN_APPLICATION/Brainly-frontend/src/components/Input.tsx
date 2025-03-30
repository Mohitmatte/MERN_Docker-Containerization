import React, { forwardRef } from "react";

interface InputProps {
    reference?: React.Ref<HTMLInputElement>; 
    placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ reference, placeholder }, ref) => {
    return (
        <div>
            <input
                type="text"
                ref={reference || ref} 
                className="w-full px-4 py-3 text-lg border rounded-lg m-2"
                placeholder={placeholder}
            />
        </div>
    );
});
