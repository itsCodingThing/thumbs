import { Show, createSignal, For } from "solid-js";
import { open as fileOpen } from "@tauri-apps/plugin-dialog";

import Input from "@/components/input";
import Button from "@/components/button";
import { probeVideo, type FormatDetails } from "@/libs/ffmpeg";
import { useSourceFile } from "@/components/source-file-context";

export default function SelectSourceFile() {
	const [formatDetails, setFormatDetails] = createSignal<FormatDetails>();
	const { path, updatePath } = useSourceFile();

	const selectFile = async () => {
		const blob = await fileOpen({
			multiple: false,
			directory: false,
		});

		if (blob) {
			try {
				const result = await probeVideo(blob);

				updatePath(blob);
				setFormatDetails(result);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div class="space-y-2">
			<Input value={path.source} placeholder="select source file" />
			<Button onClick={selectFile}>select file</Button>
			<Show when={formatDetails()}>
				<For each={formatDetails()?.streams || []}>
					{(item) => {
						return (
							<>
								<div>type: {item.codec_type}</div>
								<div>codec: {item.codec_name}</div>
							</>
						);
					}}
				</For>
			</Show>
		</div>
	);
}
