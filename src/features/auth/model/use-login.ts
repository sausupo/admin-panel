import { publicRqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();

  const session = useSession();
  const loginMutation = publicRqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const login = (data: { email: string; password: string }) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error.error
    : undefined;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
