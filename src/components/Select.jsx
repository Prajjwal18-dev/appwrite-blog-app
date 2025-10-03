import React, {useId} from 'react'

const Select = React.forwardRef( function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='inline-block mb-2 text-sm font-medium text-white/80'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2.5 rounded-lg bg-black/20 text-white/80 outline-none
                            transition-all duration-200 border border-white/20 w-full 
                            focus:border-white focus:ring-2 focus:ring-white/30
                            ${className}`}
            >
                {options?.map((option) => (
                    // Add dark background to options for better cross-browser consistency
                    <option key={option} value={option} className="bg-gray-900 text-white">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select
