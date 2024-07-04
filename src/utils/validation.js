let emailFormat = () => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  return (value) => (value && regex.test(value)) || 'Must be a valid email'
}

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
  emailFormat,
  maxLength,
  minLength,
  required
}
