import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import { open as fileOpen, save as fileSave } from "@tauri-apps/plugin-dialog";

import Button from "@/components/button";
import Card from "@/components/card";
import { changeFormat } from "@/libs/ffmpeg";

const formats = ["avi", "mp4", "mkv"];

export default function ChangeFormatForm() {
  const [isLoading, setIsLoading] = createSignal(false);
  const [state, setState] = createStore({
    source: "",
    destination: "",
    format: "",
    reencode: false,
  });

  const selectFile = async () => {
    const blob = await fileOpen({
      multiple: false,
      directory: false,
    });

    if (blob) {
      setState("source", blob);
    }
  };

  const selectSave = async () => {
    const blob = await fileSave({
      filters: [
        {
          name: "Save File",
          extensions: formats,
        },
      ],
    });

    if (!blob) {
      throw new Error("select path where to save");
    }

    setState("destination", blob);
  };

  const onClickChangeFormat = async () => {
    console.log(state);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form class="space-y-2 flex flex-col gap-2">
        <div class="space-y-2">
          <label class="text-sm font-medium">Re-encode</label>
          <input
            type="checkbox"
            onChange={(e) => {
              setState("reencode", e.currentTarget.checked);
            }}
          />
        </div>
        <div class="space-y-2">
          <Button
            onClick={async () => {
              await selectFile();
            }}
          >
            {state.source.length ? state.source : "select file"}
          </Button>
        </div>
        <div class="space-y-2">
          <Button
            onClick={async () => {
              await selectSave();
            }}
          >
            {state.destination.length ? state.destination : "select save"}
          </Button>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Select Format </label>
          <select
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setState("format", e.currentTarget.value);
            }}
          >
            <For each={formats}>
              {(format) => {
                return <option value={format}>{format}</option>;
              }}
            </For>
          </select>
        </div>
      </form>
      <Button onClick={onClickChangeFormat}>
        {isLoading() ? "please wait..." : "change format"}
      </Button>
    </Card>
  );
}
