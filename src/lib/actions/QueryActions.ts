import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	AppwritecreateUser,
	AppwriteCreateUserSession,
	AppwriteLogUserOut,
} from "./AuthActions";
import { AppwriteCreateUserProfile } from "./StudentAction";
import { AppwriteCreateMail, UploadFileToCloud } from "./FileActions";

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
		onError: async (data) => {
			console.log(data);
		},
	});
};
// Custom hook for sending for sending a file to appwrite DB
export const useSendMailToAppwrite = () => {
	return useMutation({
		mutationFn: (data: any) => AppwriteCreateMail(data),
		onSuccess: async (data) => {
			console.log(data);
			return data;
		},
		onError: async (data) => {},
	});
};

// // custom hook for logging a user out
// export const useLoguserOut = () => {
// 	return useMutation({
// 		mutationFn: () => AppwriteLogUserOut(),
// 		onSuccess: async () => {},
// 		onError: async (data) => {
// 			console.log(data);
// 		},
// 	});
// };

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
