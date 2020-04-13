type ProjectType = "Active" | "Finished";

type Payload = {
  id: number;
  title: string;
  description: string;
  people: number;
  status: ProjectType;
};

type Validatable = {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
};

//Global constants
const hostEl = document.getElementById("app") as HTMLDivElement;
const projects: Payload[] = [];

function dragStartHandler(id: string, evt: DragEvent) {
  evt.dataTransfer!.setData("text/plain", id);
  evt.dataTransfer!.effectAllowed = "move";
}

function renderProjects() {
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

function addProject(payload: Payload) {
  projects.push(payload);
  renderProjects();
}

function updateStatus(id: number, status: ProjectType) {
  projects.find((item) => item.id === id)!.status = status;
  renderProjects();
}

function doValidate(obj: Validatable) {
  let isValid = true;
  const { value, required, minLength, maxLength, minValue, maxValue } = obj;
  if (typeof value === "string") {
    if (required) {
      isValid = value.trim().length !== 0;
    }
    if (minLength) {
      isValid = value.trim().length >= minLength;
    }
    if (maxLength) {
      isValid = value.trim().length <= maxLength;
    }
  } else {
    if (required) {
      isValid = !Number.isNaN(value) && value > 0;
    }
    if (minValue) {
      isValid = value >= minValue;
    }
    if (maxValue) {
      isValid = value <= maxValue;
    }
  }
  return isValid;
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

function addForm() {
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

function dragOverHandler(evt: DragEvent) {
  if (evt.dataTransfer?.types[0] === "text/plain") {
    evt.preventDefault();
    const el = (evt.currentTarget as HTMLElement).querySelector("ul")!;
    el.classList.add("droppable");
  }
}

function dragLeaveHandler(evt: DragEvent) {
  const el = (evt.currentTarget as HTMLElement).querySelector("ul")!;
  el.classList.remove("droppable");
}

function dropHandler(evt: DragEvent) {
  const res = evt.dataTransfer!.getData("text/plain");
  const dropEl = evt.currentTarget as HTMLElement;
  if (/Active/.test(dropEl.id)) {
    updateStatus(+res, "Active");
  } else {
    updateStatus(+res, "Finished");
  }
}

function cancelEvent(evt: DragEvent) {
  evt.preventDefault();
  return false;
}

function addProjectList(type: ProjectType) {
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

addForm();
addProjectList("Active");
addProjectList("Finished");
