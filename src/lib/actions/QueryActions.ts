import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppwritecreateUser, AppwriteCreateUserSession } from "./AuthActions";
import { AppwriteCreateUserProfile } from "./StudentAction";
import { UploadFileToCloud } from "./FileActions";

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

// Custom hook for creating a user
export const useLogInUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			AppwriteCreateUserSession({ email, password }),

		onSuccess: async (data) => {
			return data;
			//await queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: async (data) => {
			return data;
		},
	});
};

// Custom hook for sending for sending a file to cloudinary
export const useUploadFileToCloud = () => {
	return useMutation({
		mutationFn: (data: any) => UploadFileToCloud(data),
		onSuccess: async (data) => {
			return data;
		},
		onError: async (data) => {},
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
