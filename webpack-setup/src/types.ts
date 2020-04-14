export type Validatable = {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
};

export type ProjectType = "Active" | "Finished";

export type Payload = {
  id: number;
  title: string;
  description: string;
  people: number;
  status: ProjectType;
};
