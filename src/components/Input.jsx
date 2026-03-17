import React, {useId} from "react";

const Input = React.forwardRef(function Input({
    label,
    type='text',
    className='',
    ...props
},ref){
   const id = useId();
   return(
    <div>
     {label && <label
     className="inline-block mb-1 pl-1"
        htmlFor={id}>
        {label}
        </label>}
        <input 
        type={type}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all ${className}`}
        ref={ref}
        {...props}/>
    </div>
   )
})

export default Input