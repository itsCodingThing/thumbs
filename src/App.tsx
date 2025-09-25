import { createSignal, For, Match, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { open as fileOpen } from "@tauri-apps/plugin-dialog";

import "@/App.css";
import Input from "@/components/input";
import ThumbnailForm from "@/components/thumbnail-form";
import ChangeFormatForm from "@/components/change-format-form";
import Button from "@/components/button";
import { probeVideo } from "@/libs/ffmpeg";

const routes = ["thumbnail", "format"];

export default function App() {
  const [selectedRoute, setSelectedRoute] = createSignal("thumbnail");
  const [paths, setPaths] = createStore({ source: "", details: "" });

  const selectFile = async () => {
    const blob = await fileOpen({
      multiple: false,
      directory: false,
    });

    if (blob) {
      try {
        const result = await probeVideo(blob);

        setPaths("source", blob);
        setPaths("details", JSON.stringify(result, null, 2));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main class="container max-w-4xl grid gap-2 px-4 py-8">
      <header class="mb-8 text-center">
        <h1 class="text-pretty text-3xl font-semibold tracking-tight">
          Thumbs
        </h1>
        <p class="mt-2 text-muted-foreground">
          Select a video, choose where to save, generate thumbnails, and preview
          them here.
        </p>
      </header>

      <div class="space-y-2">
        <Input value={paths.source} placeholder="select file path" />
        <Button onClick={selectFile}>select file</Button>

        <div>{paths.details}</div>
      </div>

      <div class="flex gap-3">
        <div class="flex items-center gap-2">
          <For each={routes}>
            {(route, index) => {
              return (
                <>
                  <h1
                    classList={{
                      "text-pretty text-xl tracking-tight cursor-pointer": true,
                      "font-semibold": route === selectedRoute(),
                    }}
                    onClick={() => setSelectedRoute(route)}
                  >
                    {route}
                  </h1>
                  {index() === routes.length - 1 ? "" : "/"}
                </>
              );
            }}
          </For>
        </div>
      </div>

      <Switch>
        <Match when={selectedRoute() === "thumbnail"}>
          <ThumbnailForm />
        </Match>
        <Match when={selectedRoute() === "format"}>
          <ChangeFormatForm />
        </Match>
      </Switch>
    </main>
  );
}
