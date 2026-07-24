function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder
}) {

  return (
    <div className="form-group">

      <label>{label}</label>

      <textarea
        rows="4"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

    </div>
  );
}

export default FormTextarea;