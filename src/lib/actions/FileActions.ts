import axios from "axios";

export const UploadFileToCloud = async (dataSent: {
	file: File[];
	setProgress?: (p: number) => void;
}) => {
	try {
		const res: any[] = [];
		const { file, setProgress } = dataSent;

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
