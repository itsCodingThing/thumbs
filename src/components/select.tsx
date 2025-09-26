import type { ComponentProps } from "solid-js";

interface SelectProps extends ComponentProps<"select"> {
	label?: string;
}

export default function Select(props: SelectProps) {
	return (
		<div class="flex flex-col gap-1 w-full">
			{props.label && (
				<label for={props.id} class="text-sm font-medium text-gray-700">
					{props.label}
				</label>
			)}
			<select
				{...props}
				class={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm
                 placeholder:text-muted-foreground
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                 disabled:cursor-not-allowed disabled:opacity-50
                 ${props.class ?? ""}`}
			>
				{props.children}
			</select>
		</div>
	);
}
