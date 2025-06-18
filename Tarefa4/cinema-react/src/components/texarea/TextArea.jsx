export function TextArea({
    id,
    placeholder,
    variant,
    numRow,
    label,
    onChange,
    valor // <- aqui!
  }) {
    return (
      <>
        <div className="form-group mb-4">
          <label className="text-white h4" htmlFor={id}>{label}</label>
          <textarea
            className={variant}
            id={id}
            placeholder={placeholder}
            rows={numRow} // <- era `row`, o certo é `rows`
            onChange={onChange}
            value={valor} // <- aqui!
          />
        </div>
      </>
    );
  }
  