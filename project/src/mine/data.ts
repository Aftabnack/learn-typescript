import { Payload, ProjectType } from "./types.js";
import { renderProjects } from "./renderer.js";

export const projects: Payload[] = [];

export function addProject(payload: Payload) {
  projects.push(payload);
  renderProjects();
}

export function updateStatus(id: number, status: ProjectType) {
  projects.find((item) => item.id === id)!.status = status;
  renderProjects();
}
