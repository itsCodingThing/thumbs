import type { ComponentProps, ParentProps } from "solid-js";

export default function Button(props: ParentProps<ComponentProps<"button">>) {
	return (
		<button
			{...props}
			type="button"
			class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			{props.children}
		</button>
	);
}
