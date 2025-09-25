import { type ComponentProps, mergeProps } from "solid-js";

export default function Input(props: ComponentProps<"input">) {
	const inputProps = mergeProps(
		{
			class:
				"block w-full cursor-pointer rounded-md border border-input bg-card px-3 py-2 text-sm",
			type: "text",
		},
		props,
	);

	return <input {...inputProps} />;
}
