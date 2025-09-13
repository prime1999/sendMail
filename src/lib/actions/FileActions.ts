import axios from "axios";
import { Account, ID, TablesDB } from "appwrite";
import client from "../appwrite.config";
import { DBID, MAILID } from "@/contants/env.file";

const account = new Account(client);

const tablesDB = new TablesDB(client);

// funciton to handle the file upload to cloudinary
export const UploadFileToCloud = async (dataSent: {
	file: File[];
	setProgress?: (p: number) => void;
}) => {
	try {
		const res: any[] = [];
		const { file, setProgress } = dataSent;
		console.log(dataSent);

		const CLOUD_NAME = "dn9o1vdv7";
		const UPLOAD_PRESET = "sendMail";
		const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

		// Loop through each file
		for (const eachFile of file) {
			const fileData = new FormData(); // recreate for every file
			fileData.append("file", eachFile);
			fileData.append("upload_preset", UPLOAD_PRESET);

			const { data } = await axios.post(url, fileData, {
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: (progressEvent: any) => {
					if (setProgress) {
						const percent = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						setProgress(percent);
					}
				},
			});

			res.push(data);
		}

		return res;
	} catch (error: any) {
		console.error("Cloudinary Upload Error:", error.response?.data || error);
		throw error;
	}
};

// function to create the mail in the Appwrite DB
export const AppwriteCreateMail = async (mailData: any) => {
	try {
		// get the current user's email
		const user = await account.get();
		if (!user || !user.$id) {
			return { msg: "User not authorized" };
		}
		// if the user is logged in, then
		const data = {
			email: user.email,
			message: mailData.message,
			user: user.$id,
			isSent: false,
			fileUrl: mailData.fileUrl,
			sendTime: mailData.sendTime,
		};
		const res = await tablesDB.createRow({
			databaseId: DBID,
			tableId: MAILID,
			rowId: ID.unique(),
			data,
		});
		if (res) {
			return { msg: "Mail scheduled", data };
		}
	} catch (error) {
		console.log(error);
	}
};
