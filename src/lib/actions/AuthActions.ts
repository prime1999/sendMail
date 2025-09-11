import { Account, ID, OAuthProvider, TablesDB } from "appwrite";
import client from "../appwrite.config";
import { AppwriteCreateUserProfile } from "./StudentAction";
import { DBID, USERID } from "@/contants/env.file";

const account = new Account(client);

const tablesRow = new TablesDB(client);

// function to login/reegister the user with gmail
export const GoogleAuth = async (currentUrl: string) => {
	try {
		// register/sign in the user using oauth
		account.createOAuth2Session({
			provider: OAuthProvider.Google,
			success: "http://localhost:5173/dashboard",
			failure: `http://localhost:5173/${currentUrl}`,
		});
	} catch (error) {
		console.log(error);
	}
};

// function to check for the current session in the database
export const checkCurrentSession = async () => {
	try {
		// Get current logged-in user
		const user = await account.get();
		if (!user?.$id) return null;

		const userData = {
			userId: user.$id,
			name: user.name,
			email: user.email,
		};

		// Check if profile exists
		const existingProfile = await tablesRow
			.getRow({
				databaseId: DBID,
				tableId: USERID,
				rowId: user.$id,
			})
			// If not found, returns null
			.catch(() => null);

		// Create profile if not found
		if (!existingProfile) {
			const newProfile = await AppwriteCreateUserProfile(userData);
			return newProfile || user;
		}

		return existingProfile;
	} catch (error) {
		console.error("Session check failed:", error);
		return null;
	}
};

// fucntion to create a user account using email and password
export const AppwritecreateUser = async (userData: any) => {
	try {
		// create a user auth on Appwrite
		const user = await account.create({
			userId: ID.unique(),
			email: userData.email,
			password: userData.password,
		});

		if (user && user.$id) {
			// create a user session with the user info
			const session = await AppwriteCreateUserSession(userData);
			if (session && session.$id) {
				return session;
			}
		}
	} catch (error: any) {
		// check if the error is a user already exist error
		if (error && error.code === 409) {
			return { error: "User already exists" };
		}
		// else if any other error
		return { error: "An error occurred when creating user, please try again" };
	}
};
// function to log a user in
export const AppwriteCreateUserSession = async (userData: any) => {
	try {
		// call the funtion to log the user in
		const res = await account.createEmailPasswordSession({
			email: userData.email,
			password: userData.password,
		});
		if (res && res.$id) {
			return res;
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};

// function to log a user out
export const AppwriteLogUserOut = async () => {
	try {
		// get the current session
		const res = await checkCurrentSession();
		console.log(res);
		if (res && res.$id) {
			await account.deleteSession({ sessionId: "current" });
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};

// function to send link for the user's password recovery
export const AppwriteForotpassword = async (email: string) => {
	try {
		// call the forgot password function
		const token = await account.createRecovery({
			email: email,
			url: "http://localhost:5173/forgotpassword",
		});
		console.log(token);
		return token;
	} catch (error) {
		console.log(error);
	}
};

// funciton to confirm the password recovery link
export const AppwriteConfirmPasswordRecovery = async (data: any) => {
	try {
		// call the function
		const token = await account.updateRecovery({
			userId: data.userId,
			secret: data.secret,
			password: data.password,
		});
		console.log(token);
		return token;
	} catch (error) {
		console.log(error);
	}
};
