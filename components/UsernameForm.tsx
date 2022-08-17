import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { UserContext } from "@lib/context"
import { useContext, useState } from "react"

export default function UsernameForm (): JSX.Element {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  return (
    !username && (
      <FormControl>
        <FormLabel>Set Username</FormLabel>
        <Input/>
      </FormControl>
    )

  )
}
