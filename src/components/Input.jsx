import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-2 pl-1 font-medium text-black/80' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`block w-full px-4 py-3 rounded-lg bg-black/5 border border-black/20 text-black
                       placeholder:text-black/40
                       focus:outline-none focus:border-black focus:ring-2 focus:ring-black/30
                       transition-all duration-300
                       ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
