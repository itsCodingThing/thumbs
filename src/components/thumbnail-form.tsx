import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { open as fileOpen } from "@tauri-apps/plugin-dialog";

import Button from "@/components/button";
import Input from "@/components/input";
import generateThumbnails from "@/libs/ffmpeg";
import Card from "@/components/card";

export default function ThumbnailForm() {
  const [isLoading, setIsLoading] = createSignal(false);
  const [paths, setPaths] = createStore({ source: "", destination: "" });

  const selectFile = async () => {
    const blob = await fileOpen({
      multiple: false,
      directory: false,
    });

    if (blob) {
      setPaths("source", blob);
    }
  };

  const selectSave = async () => {
    const blob = await fileOpen({
      directory: true,
      multiple: false,
      title: "Select folder to save files in",
    });

    if (!blob) {
      throw new Error("select path where to save");
    }

    setPaths("destination", blob);
  };

  const onClickGenThumb = async () => {
    setIsLoading(true);

    try {
      await generateThumbnails(paths.source, paths.destination);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form class="grid gap-4 grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium">Select video file</label>
          <input
            type="file"
            accept="video/*"
            class="block w-full cursor-pointer rounded-md border border-input bg-card px-3 py-2 text-sm"
          />
          <Button onClick={selectFile}>select file</Button>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Choose destination folder</label>
          <input
            type="file"
            accept="video/*"
            class="block w-full cursor-pointer rounded-md border border-input bg-card px-3 py-2 text-sm"
          />
          <Button onClick={selectFile}>select file</Button>
        </div>
      </form>
    </Card>
  );
}
