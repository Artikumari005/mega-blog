import React , {useId} from "react";

function Select({
    options,
    label,
    className,
    ...props
}, ref){
    const id= useId()
    return(
      <div className="w-full">
        {label && <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>}
        <select 
          className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all ${className}`}
          ref={ref}
          id={id}
          {...props}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
}
export default React.forwardRef(Select)