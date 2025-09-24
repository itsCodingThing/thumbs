import { LoaderCircle } from "lucide-solid";
import { Portal } from "solid-js/web";

export default function Loader() {
  return (
    <Portal>
      <div class="bg-white/90 backdrop-blur-lg absolute top-0 min-h-svh min-w-svw">
        <div class="min-h-screen grid place-items-center">
          <LoaderCircle class="w-20 h-20 animate-spin" />
        </div>
      </div>
    </Portal>
  );
}
