import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { save as fileSave } from "@tauri-apps/plugin-dialog";

import Button from "@/components/button";
import {
	changeFormat,
	isSupportedVideoFormat,
	SupportedVideoFormats,
	type VideoFormat,
} from "@/libs/ffmpeg";
import Select from "./select";
import Input from "./input";

interface FormatFormStore {
	source: string;
	destination: string;
	format: VideoFormat;
	reencode: boolean;
}

export default function ChangeFormatForm() {
	const [isLoading, setIsLoading] = createSignal(false);
	const [state, setState] = createStore<FormatFormStore>({
		source: "",
		destination: "",
		format: "avi",
		reencode: false,
	});

	const selectSave = async () => {
		const blob = await fileSave({
			filters: [
				{
					name: "Save File",
					extensions: SupportedVideoFormats.slice(),
				},
			],
		});

		if (!blob) {
			throw new Error("select path where to save");
		}

		setState("destination", blob);
	};

	const onClickChangeFormat = async () => {
		setIsLoading(true);

		try {
			await changeFormat({
				source: state.source,
				destination: state.destination,
				format: state.format,
				reencode: true,
			});
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	};

	return (
		<form class="space-y-2 flex flex-col gap-2">
			<div class="flex gap-2">
				<Input value={state.destination} placeholder="select save file" />
				<Button
					onClick={async () => {
						await selectSave();
					}}
				>
					select save
				</Button>
				<Select
					onChange={(e) => {
						if (isSupportedVideoFormat(e.currentTarget.value)) {
							setState("format", e.currentTarget.value);
						}
					}}
				>
					<For each={SupportedVideoFormats}>
						{(format) => {
							return <option value={format}>{format}</option>;
						}}
					</For>
				</Select>
			</div>
			<Button onClick={onClickChangeFormat}>
				{isLoading() ? "please wait..." : "change format"}
			</Button>
		</form>
	);
}
