import type { ParentProps } from "solid-js";

export default function Card(props: ParentProps) {
  return (
    <div class="m-2 p-2 rounded-sm drop-shadow-md border border-black">
      {props.children}
    </div>
  );
}
