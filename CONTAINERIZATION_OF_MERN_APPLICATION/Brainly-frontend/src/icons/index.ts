export interface Iconprops{
    size:keyof typeof iconSizeVariants,
}

export const iconSizeVariants={
    "sm":"size-2",
    "md":"size-5",
    "lg":"size-6",
}