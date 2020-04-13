import { Payload, ProjectType } from "./types";
import { projects, addProject } from "./data";
import {
  dragOverHandler,
  dragLeaveHandler,
  dropHandler,
  dragStartHandler,
} from "./drag";
import { doValidate } from "./validators";

//Global constants
const hostEl = document.getElementById("app") as HTMLDivElement;

export function renderProjects() {
  const projectTempl = document.getElementById(
    "single-project"
  ) as HTMLTemplateElement;
  const activeListUl = (document.getElementById(
    `Active-projects`
  ) as HTMLElement).querySelector("ul")!;
  activeListUl.innerHTML = "";
  const finishedListUl = (document.getElementById(
    `Finished-projects`
  ) as HTMLElement).querySelector("ul")!;
  finishedListUl.innerHTML = "";
  for (const entry of projects) {
    const projEntryUI = document.importNode(projectTempl.content, true);
    const projEntry = projEntryUI.firstElementChild as HTMLLIElement;
    projEntry.querySelector("h2")!.textContent = entry.title;
    projEntry.querySelector("h3")!.textContent = `${entry.people} People`;
    projEntry.querySelector("p")!.textContent = entry.description;
    projEntry.addEventListener(
      "dragstart",
      dragStartHandler.bind(null, entry.id.toString())
    );
    if (entry.status === "Active") {
      activeListUl.append(projEntry);
    } else {
      finishedListUl.append(projEntry);
    }
  }
}

function getInputs(formEl: HTMLFormElement) {
  const titleInput = formEl.querySelector("#title") as HTMLInputElement;
  const descInput = formEl.querySelector("#description") as HTMLTextAreaElement;
  const pplInput = formEl.querySelector("#people") as HTMLInputElement;
  const payload: Payload = {
    id: Math.random(),
    status: "Active",
    title: titleInput.value,
    description: descInput.value,
    people: +pplInput.value,
  };
  if (
    doValidate({ value: payload.title, required: true }) &&
    doValidate({ value: payload.description, required: true }) &&
    doValidate({ value: payload.people, required: true })
  ) {
    return payload;
  }
  return null;
}

function submitHandler(evt: Event) {
  evt.preventDefault();
  const formEl = evt.target as HTMLFormElement;
  const payload = getInputs(formEl);
  if (payload === null) {
    alert("There is some error in input");
  } else {
    addProject(payload);
  }
}

export function addForm() {
  //Get access to all elements
  const templ = document.getElementById("project-input") as HTMLTemplateElement;
  const formUI = document.importNode(templ.content, true);
  const formEl = formUI.firstElementChild as HTMLFormElement;

  //Setup functionality
  formEl.id = "user-input";
  formEl.addEventListener("submit", submitHandler);

  //Attach on UI
  hostEl.append(formEl);
}

export function addProjectList(type: ProjectType) {
  const templ = document.getElementById("project-list") as HTMLTemplateElement;
  const listUI = document.importNode(templ.content, true);
  const listSection = listUI.firstElementChild as HTMLElement;
  const elId = `${type}-projects`;

  //Setup functionality
  listSection.id = elId;
  const heading = listSection.querySelector("h2")!;
  heading.textContent = `${type} projects`;
  listSection.addEventListener("dragover", dragOverHandler);
  listSection.addEventListener("dragleave", dragLeaveHandler);
  listSection.addEventListener("drop", dropHandler);

  //Attach on UI
  hostEl.append(listSection);
}
