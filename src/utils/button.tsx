import type { ReactNode } from "react";

export const Button = ({
	children,
	props,
}: {
	props: any;
	children: ReactNode;
}) => {
	return (
		<button
			disabled={props.disabled}
			className="p-4 font-inter font-semibold text-white text-xs"
		>
			{children}
		</button>
	);
};
