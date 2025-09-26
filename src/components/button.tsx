import { twMerge } from "tailwind-merge";
import type { ComponentProps, ParentProps } from "solid-js";

export default function Button(props: ParentProps<ComponentProps<"button">>) {
	return (
		<button
			type="button"
			{...props}
			class={twMerge(
				"w-full h-10 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
				props.class,
			)}
		>
			{props.children}
		</button>
	);
}
