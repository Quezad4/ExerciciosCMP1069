function Input({
    id,
    type = "form-control",
    variant,
    valor,
    placeholder,
    onChange,
    label
}){
    return (
        <div className="form-group mb-4">
            <label className= "text-dark h4" htmlFor={id}>{label}</label>
            <input 
            id={id}
            type={type} 
            className={variant} 
            value={valor}
            placeholder={placeholder}
            onChange={onChange} />
        </div>
    );
}

export default Input;