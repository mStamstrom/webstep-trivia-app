interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}
export const Dropdown = (props: Props) => {
  return (
    <label className="form-label">
      {props.label}
      <select onChange={props.onChange}>
        {props.options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
    </label>
  );
};
