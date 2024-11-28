

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ name, type, className, ...rest }: InputProps) => {
  return <input {...rest} name={name} type={type} className={`text-black h-10 rounded-md border border-gray-300 ${className}`} />;
}