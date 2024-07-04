let maxLength = (propertyType, maxLength) => {
  return (value) =>
    (value && value.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`
}

let minLength = (propertyType, minLength) => {
  return (value) =>
    (value && value.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`
}

let required = (propertyType) => {
  return (value) => (value && value.trim().length > 0) || `You must input a ${propertyType}`
}

export default {
  maxLength,
  minLength,
  required
}
