import axios from 'axios'
import { savedUser } from '@/utils/getSavedUser'
export default () => {
  let currentUser = savedUser()

  return axios.create({
    baseURL: '/api',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: currentUser && currentUser.token
    }
  })
}
