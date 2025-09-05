import { TablesDB } from "appwrite";
import client from "../appwrite.config";
import { DBID, USERID } from "@/contants/env.file";

const tablesDB = new TablesDB(client);

// Appwrite function to cerate the user profile
export const AppwriteCreateUserProfile = async (userData: any) => {
	try {
		// call the function to create the user profile
		const res = await tablesDB.createRow({
			databaseId: DBID,
			tableId: USERID,
			rowId: userData.userId,
			data: {
				name: userData.name,
				email: userData.email,
			},
		});
		if (res && res.$id) {
			return res;
		}
	} catch (error) {
		console.log(error);
	}
};
