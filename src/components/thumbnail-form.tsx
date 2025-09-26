import { createSignal } from "solid-js";
import { open as fileOpen } from "@tauri-apps/plugin-dialog";

import Button from "@/components/button";
import Input from "@/components/input";
import { generateThumbnail } from "@/libs/ffmpeg";
import { useSourceFile } from "@/components/source-file-context";

export default function ThumbnailForm() {
	const { path } = useSourceFile();
	const [destination, setDestination] = createSignal("");
	const [isLoading, setIsLoading] = createSignal(false);

	const selectSave = async () => {
		const blob = await fileOpen({
			directory: true,
			multiple: false,
			title: "Select folder to save files in",
		});

		if (!blob) {
			throw new Error("select path where to save");
		}

		setDestination(blob);
	};

	const onClickGenThumb = async () => {
		setIsLoading(true);

		try {
			await generateThumbnail(path.source, destination());
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form class="space-y-2 flex flex-col gap-1">
			<div class="flex gap-2">
				<Input value={destination()} placeholder="choose file save" />
				<Button onClick={selectSave}>select file</Button>
			</div>
			<Button onClick={onClickGenThumb}>
				{isLoading() ? "Generating..." : "Generate Thumbnails"}
			</Button>
		</form>
	);
}
