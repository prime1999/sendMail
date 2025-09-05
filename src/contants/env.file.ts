const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT as string;
const APIKEY = import.meta.env.VITE_APPWRITE_API_KEY as string;
const PROJECTID = import.meta.env.VITE_APPWRITE_PROJECT_ID as string;
const DBID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string;
const USERID = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID as string;

export { ENDPOINT, APIKEY, PROJECTID, DBID, USERID };
