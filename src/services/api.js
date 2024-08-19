import axios from 'axios'
import { getSavedUser } from '@/utils/getSavedUser'
export default () => {
  let currentUser = getSavedUser()

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
