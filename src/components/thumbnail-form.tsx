import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { open as fileOpen } from "@tauri-apps/plugin-dialog";

import Button from "@/components/button";
import Input from "@/components/input";
import { generateThumbnail } from "@/libs/ffmpeg";
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
      await generateThumbnail(paths.source, paths.destination);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form class="space-y-2 grid gap-4 grid-cols-2">
        <div class="space-y-2">
          <Input value={paths.source} placeholder="select file path" />
          <Button onClick={selectFile}>select file</Button>
        </div>
        <div class="space-y-2">
          <Input value={paths.destination} placeholder="choose file save" />
          <Button onClick={selectSave}>select file</Button>
        </div>
      </form>
      <Button onClick={onClickGenThumb}>
        {isLoading() ? "Generating..." : "Generate Thumbnails"}
      </Button>
    </Card>
  );
}
