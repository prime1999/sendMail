import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppwritecreateUser } from "./AuthActions";

// Custom hook for creating a user
export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			AppwritecreateUser({ email, password }),

		onSuccess: async (data) => {
			return data;
			//await queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: async (data) => {
			return data;
		},
	});
};
