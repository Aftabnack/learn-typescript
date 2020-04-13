import { Validatable } from "./types.js";

export function doValidate(obj: Validatable) {
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
