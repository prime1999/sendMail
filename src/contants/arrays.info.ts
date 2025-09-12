import audio from "../assets/images/audio.png";
import video from "../assets/images/video.png";
import text from "../assets/images/text.png";

export const navLinks = [
	{ id: 1, name: "Mails", value: "signIn" },
	{ id: 2, name: "Give-Feedback", value: "/" },
];

export const heroMessage = [
	{
		id: 1,
		message: "You got a video file from past you",
		image: video,
		time: "now",
	},
	{
		id: 2,
		message: "You got a audio file from past you",
		image: audio,
		time: "now",
	},
	{
		id: 3,
		message: "You got a message from past you",
		image: text,
		time: "now",
	},
];
