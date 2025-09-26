import { createSignal, For, Match, Switch } from "solid-js";

import "@/App.css";
import ThumbnailForm from "@/components/thumbnail-form";
import ChangeFormatForm from "@/components/change-format-form";
import SelectSourceFile from "@/components/select-source-file";
import { SourceFileProvider } from "@/components/source-file-context";

const routes = ["thumbnail", "format"];

export default function App() {
	const [selectedRoute, setSelectedRoute] = createSignal("thumbnail");

	return (
		<SourceFileProvider>
			<main class="container max-w-4xl grid gap-2 px-4 py-8">
				<header class="mb-8 text-center">
					<h1 class="text-pretty text-3xl font-semibold tracking-tight">
						Thumbs
					</h1>
					<p class="mt-2 text-muted-foreground">
						Select a video, choose where to save, generate thumbnails, and
						preview them here.
					</p>
				</header>
				<SelectSourceFile />
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
		</SourceFileProvider>
	);
}
