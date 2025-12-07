// With Firebase Auth using popups/redirects handled in the Auth page,
// this callback route is no longer needed. We keep a simple redirect
// component here to avoid broken routes.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  }, [navigate]);

  return null;
};

export default AuthCallback;

