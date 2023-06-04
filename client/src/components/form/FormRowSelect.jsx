import { nanoid } from 'nanoid'

const FormRowSelect = ({ name, value, handleChange, labelText, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select">
        {list.map(itemValue => {
          return (
            <option key={nanoid()} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default FormRowSelect
