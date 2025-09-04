import { Account, Databases, ID, OAuthProvider } from "appwrite";
import client from "../appwrite.config";

const account = new Account(client);

const databases = new Databases(client);

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
		// get the current session if any
		const user = await account.get();
		console.log(456);
		console.log(user);
		if (user && user.$id) {
			localStorage.setItem("isAuthenticated", "true");
		}
		return user;
	} catch (error) {
		console.log(error);
	}
};

// fucntion to create a user account using email and password
export const AppwritecreateUser = async (userdata: any) => {
	try {
		console.log(userdata);
		// create a session using the email ans password
		const res = await account.create({
			userId: ID.unique(),
			email: userdata.email,
			password: userdata.password,
		});
		if (!res.$id) return { msg: "Wrong User credentials" };
		// if the session is created then
		// get the user's documents
		//const userDoc = await databases.getDocument(DBID, STUDENTID, res.userId);
		return { msg: "User Authenticated", data: res };
	} catch (error) {
		return { msg: "Wrong User credentials" };
	}
};
