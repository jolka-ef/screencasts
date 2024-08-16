export const savedUser = () => {
  let savedUser = window.localStorage.currentUser
  let user = savedUser ? JSON.parse(savedUser) : ''
  return user
}
