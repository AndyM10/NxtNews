import { Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useModalContext } from '@chakra-ui/react'
import { UserContext } from '@lib/context'
import { Field, Form, Formik } from 'formik'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import MultiSelect from './MultiSelect'
import { languageOpts, regionOpts } from 'types/opts'

export default function UsernameForm(): JSX.Element {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const { user, username } = useContext(UserContext)
  const { onClose } = useModalContext()

  useEffect(() => {
    if (user && username) {
      onClose()
    }
  })

  const onValidate = (name: string) => {
    let error
    const val = name.toLowerCase()

    if (!val) {
      return 'Name is required'
    }

    setFormValue(name)
    if (!isValid) {
      error = 'Name is taken'
    }
    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      error = 'Name is too short'
    }

    return error

  }

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  /*
   * Hit the database for username match after each debounced change
   * useCallback is required for debounce to work
   */
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username)
        const snap = await getDoc(ref)

        console.log('Firestore read executed!', snap.exists())
        setIsValid(!snap.exists())
      }
    }, 500),
    []
  )

  const onSubmit = async () => {

    // Create refs for both documents
    const userDoc = doc(getFirestore(), 'users', user.uid)
    const usernameDoc = doc(getFirestore(), 'usernames', formValue)

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore())

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName
    })
    batch.set(usernameDoc, { uid: user.uid })

    await batch.commit()
  }

  return (
    <Formik
      initialValues={{
        username: '',
        language: '',
        region: '',
        interests: ''
      }}
      onSubmit={() => {
        onSubmit()
        onClose()
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={!!errors.username && touched.username}>
            <FormLabel htmlFor="Username">Username</FormLabel>
            <Field
              as={Input}
              id="username"
              name="username"
              type="username"
              validate={onValidate}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.language}>
            <FormLabel htmlFor='languageOpts'>Select Languages</FormLabel>
            <MultiSelect opts={languageOpts} />
          </FormControl>
          <FormControl isInvalid={!!errors.region}>
            <FormLabel htmlFor='RegionOpts'>Select interested regions</FormLabel>
            <MultiSelect opts={regionOpts} />
          </FormControl>
          <FormControl isInvalid={!!errors.interests && touched.interests}>
            <FormLabel htmlFor='Interests'>Please list your interestes / what information you are looking for...</FormLabel>
            <Textarea />
          </FormControl>
        </form>
      )}
    </Formik >
  )
}


