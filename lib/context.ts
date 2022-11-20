import { User } from 'firebase/auth'
import { createContext } from 'react'

interface UserContextInterface {
  user: User | any,
  username: string | null
}
export const UserContext = createContext<UserContextInterface>({
  user: null,
  username: null
})
