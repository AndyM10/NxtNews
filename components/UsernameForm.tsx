import { Button, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, useModalContext } from '@chakra-ui/react'
import { UserContext } from '@lib/context'
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik'
import React, { FormEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';

export default function UsernameForm(): JSX.Element {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user, username } = useContext(UserContext);
  const { onClose } = useModalContext()

  const onValidate = (name: string) => {
    let error
    const val = name.toLowerCase()
  
    if (!val) {
      return 'Name is required'
    }

    setFormValue(name)
    if (!isValid) {
      error ='Name is taken'
    }
    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      error = 'Name is too short'
      }
    return error
  
  }
  
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
  
    debounce(async (username:string) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), 'usernames', username);
        const snap = await getDoc(ref);
        console.log('Firestore read executed!', snap.exists());
        setIsValid(!snap.exists());
      }
    }, 500),
    []
  );

  const onSubmit = async (val: string) => {

    // Create refs for both documents
    const userDoc = doc(getFirestore(), 'users', user.uid);
    const usernameDoc = doc(getFirestore(), 'usernames', formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };
  return (
    <Formik
      initialValues={{ name: 'test'}}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
        onSubmit(values.name)
        onClose()
      }}
    >
      {(props) => (
        <Form>
          <Field name='name' validate={onValidate}>
            {({ field, form }: {field: any, form:any}) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Set Username</FormLabel>
                <Input {...field} placeholder='test' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button mt={4} type="submit" width="full" isLoading={props.isSubmitting}>
          Submit
        </Button>
      </Form>
      )}
    </Formik>
  )
}


