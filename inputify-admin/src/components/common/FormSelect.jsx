function FormSelect({
  label,
  value,
  options,
  onChange
}) {

  return (

    <div className="form-group">

      <label>{label}</label>

      <select
        value={value}
        onChange={onChange}
      >

        <option>
          Select
        </option>

        {options.map((item)=>(
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}

      </select>

    </div>
  );
}

export default FormSelect;