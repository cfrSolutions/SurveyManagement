function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text"
}) {
  return (
    <div className="form-group">

      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

    </div>
  );
}

export default FormInput;