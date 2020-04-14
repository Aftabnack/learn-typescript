import { Payload, ProjectType } from "./types";
import { renderProjects } from "./renderer";

export const projects: Payload[] = [];

export function addProject(payload: Payload) {
  projects.push(payload);
  renderProjects();
}

export function updateStatus(id: number, status: ProjectType) {
  projects.find((item) => item.id === id)!.status = status;
  renderProjects();
}
