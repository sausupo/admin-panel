import { Link } from "react-router";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";
import { ROUTES } from "@/shared/model/routes";

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      description="Enter your email below to login to your account"
      form={<LoginForm />}
      footerText={
        <>
          Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
