import { Link } from "react-router-dom";

export default function ForgotSuccess() {
  return (
    <>
      <div>A e-mail has been sent with a link to reset your password.</div>
      <Link to="/login">Back to the Login page</Link>
    </>
  );
}
