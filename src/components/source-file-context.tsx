import { createStore } from "solid-js/store";
import { createContext, useContext, type ParentProps } from "solid-js";

const initialFilePath = { source: "" };

interface StoreState {
	path: { source: string };
	updatePath(path: string): void;
}
const Context = createContext<StoreState>();

export function useSourceFile() {
	const context = useContext(Context);

	if (!context) {
		throw new Error("useCounterContext: cannot find a CounterContext");
	}

	return context;
}

export function SourceFileProvider(props: ParentProps) {
	const [value, setValue] = createStore(initialFilePath);

	const path = {
		path: value,
		updatePath: (path: string) => {
			setValue("source", path);
		},
	};

	return <Context.Provider value={path}>{props.children}</Context.Provider>;
}
