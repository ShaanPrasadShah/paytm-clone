

export const InputBox=({label,placeholder,onChange})=>{
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} className="w-full border rounded border-slate-300 px-2 py-1" placeholder={placeholder}/>
    </div>
}