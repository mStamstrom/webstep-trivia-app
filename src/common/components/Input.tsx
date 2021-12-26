interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = (props: Props) => {
  return (
    <div>
      <label>
        {props.label}
        <input {...props} />
      </label>
    </div>
  );
};
