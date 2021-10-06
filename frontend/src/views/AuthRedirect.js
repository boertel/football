import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const AuthRedirect = ({ authenticated, ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) {
      navigate("/euro-2021/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, []);
  return null;
};

export default connect((state) => ({ ...state.auth }))(AuthRedirect);
