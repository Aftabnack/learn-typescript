import { updateStatus } from "./data";

//---------------------------------------------
//Functionality for draggable entity
export function dragStartHandler(id: string, evt: DragEvent) {
  evt.dataTransfer!.setData("text/plain", id);
  evt.dataTransfer!.effectAllowed = "move";
}

//---------------------------------------------
//Functionality for drop target
export function dragOverHandler(evt: DragEvent) {
  if (evt.dataTransfer?.types[0] === "text/plain") {
    evt.preventDefault();
    const el = (evt.currentTarget as HTMLElement).querySelector("ul")!;
    el.classList.add("droppable");
  }
}

export function dragLeaveHandler(evt: DragEvent) {
  const el = (evt.currentTarget as HTMLElement).querySelector("ul")!;
  el.classList.remove("droppable");
}

export function dropHandler(evt: DragEvent) {
  const res = evt.dataTransfer!.getData("text/plain");
  const dropEl = evt.currentTarget as HTMLElement;
  if (/Active/.test(dropEl.id)) {
    updateStatus(+res, "Active");
  } else {
    updateStatus(+res, "Finished");
  }
}
