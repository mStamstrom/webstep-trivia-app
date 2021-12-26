interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = (props: Props) => {
  return (
    <label className="form-label">
      {props.label}
      <input {...props} />
    </label>
  );
};
