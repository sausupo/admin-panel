import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useDeletePerson() {
  const queryClient = useQueryClient();

  const deletePersonMutation = rqClient.useMutation(
    "delete",
    "/people/{personId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/people"),
        );
      },
    },
  );

  return {
    deletePerson: (personId: string) => {
      deletePersonMutation.mutate({
        params: { path: { personId } },
      });
    },

    getIsPending: (personId: string) =>
      deletePersonMutation.isPending &&
      deletePersonMutation.variables?.params?.path?.personId === personId,
  };
}
