import { UserContext } from '@lib/context'
import { Field, Form, Formik, } from 'formik'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import MultiSelect, { multiSelectOpts } from './MultiSelect'
import { languageOpts, regionOpts } from 'types/opts'

interface formValue {
  username: string,
  language: string
  region: string
  interests: string
}

export default function UsernameForm(): JSX.Element {
  const [formUsernameValue, setFormUsernameValue] = useState('')
  const [regionFormValue, setRegionFormValue] = useState<multiSelectOpts[]>()
  const [langFormValue, setLangFormValue] = useState<multiSelectOpts[]>()
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

    setFormUsernameValue(name)
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
    checkUsername(formUsernameValue)
  }, [formUsernameValue])

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

  const onRegionSelect = (input: any) => {
    setRegionFormValue(input as multiSelectOpts[])
  }

  const onLangSelect = (input: any) => {
    setLangFormValue(input as multiSelectOpts[])
  }

  const onSubmit = async (input: formValue) => {


    // Create refs for both documents
    const userDoc = doc(getFirestore(), 'users', user.uid)
    const usernameDoc = doc(getFirestore(), 'usernames', formUsernameValue)
    const userPreferncesDoc = doc(getFirestore(), 'preferences', user.uid)

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore())

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName
    })
    batch.set(usernameDoc, { uid: user.uid })
    batch.set(userPreferncesDoc, {
      language: langFormValue,
      region: regionFormValue,
      interests: input.interests
    })

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
      onSubmit={(value) => {
        onSubmit(value)
        onClose()
      }}
    >
      {(props) => <Form>
        <Field name="name" validate={onValidate}>
          {({ field, form }: { field: any, form: any }) =>
            <FormControl isInvalid={form.errors.name && form.touched.name}>
              <FormLabel>Set Username</FormLabel>
              <Input {...field} placeholder='test' />
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          }
        </Field>
        <Button mt={4} type="submit" width="full"
          isLoading={props.isSubmitting}>
          Submit
        </Button>
      </Form>}
    </Formik>
  )
}


