import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppwritecreateUser } from "./AuthActions";
import { AppwriteCreateUserProfile } from "./StudentAction";

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

// // custom hook for creating the user profile
// export const userCreateUserProfile = () => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: (userData: any) => AppwriteCreateUserProfile(userData),
// 		onSuccess: async (data) => {
// 			return data;
// 		},
// 		onError: async (data) => {
// 			return data;
// 		},
// 	});
// };
