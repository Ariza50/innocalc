import './Button.css';

const Button = ({ value, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  );
}

export default Button
