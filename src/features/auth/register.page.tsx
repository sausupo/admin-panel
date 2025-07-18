import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      description="Enter your email below to register"
      form={<RegisterForm />}
      footerText={
        <>
          Alredy have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
