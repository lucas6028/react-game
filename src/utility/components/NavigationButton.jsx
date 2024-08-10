import { useNavigate } from "react-router-dom";

const NavigationButton = ({ to, children, className }) => {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(to)} className={className}>
      {children}
    </button>
  );
};

export default NavigationButton;
