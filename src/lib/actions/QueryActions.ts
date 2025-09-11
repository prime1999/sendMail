import { useMutation } from "@tanstack/react-query";
import {
	AppwriteConfirmPasswordRecovery,
	AppwritecreateUser,
	AppwriteCreateUserSession,
	AppwriteForotpassword,
} from "./AuthActions";

import { AppwriteCreateMail, UploadFileToCloud } from "./FileActions";

// Custom hook for creating a user
export const useCreateUser = () => {
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
		onError: async () => {},
	});
};

// custom hook to call the forgot password fucntion
export const useForgotPassword = () => {
	return useMutation({
		mutationFn: (email: any) => AppwriteForotpassword(email),
		onSuccess: async (data) => {
			console.log(data);
			return data;
		},
		onError: async (data) => {
			return data;
		},
	});
};
// custom hook to call the confirm forgot password fucntion
export const useConfirmPasswordRecovery = () => {
	return useMutation({
		mutationFn: (data: any) => AppwriteConfirmPasswordRecovery(data),
		onSuccess: async (data) => {
			console.log(data);
			return data;
		},
		onError: async (data) => {
			return data;
		},
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
