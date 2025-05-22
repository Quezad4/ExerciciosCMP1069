export function Select({
    id,
    variant,
    options = [],
    label,
    onChange

}) {
    return (
        <>
            <div className="form-group mb-4">
                <label className="text-dark h4" htmlFor={id}>{label}</label>
                <select className={variant} id={id} onChange={onChange}>
                    {options.map((opcao, i) => {
                       return <option key={i} value={opcao}>{opcao}</option>
                    })}
                </select>
            </div>
        </>
    );
}