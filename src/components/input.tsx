import { type ComponentProps, mergeProps } from "solid-js";

export default function Input(props: ComponentProps<"input">) {
	const inputProps = mergeProps(
		{
			class:
				"border rounded-sm border-blue-900 focus:border-blue-900 text-white p-1",
			type: "text",
		},
		props,
	);

	return <input {...inputProps} />;
}
