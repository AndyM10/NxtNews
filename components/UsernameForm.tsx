import React, { useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import { z } from 'zod'
import { Form, useForm } from './form/form'
import { Input, Select, TextArea } from './form/inputs'

interface formValue {
  username: string,
  language: string
  region: string
  interests: string
}

const signUpFormSchema = z.object({
  username: z.string().min(3).max(20),
  region: z.string(),
  interests: z.string()
})

export default function UsernameForm(): JSX.Element {

  const form = useForm({ schema: signUpFormSchema })

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
      region: regionFormValue,
      interests: input.interests
    })

    await batch.commit()
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all ">
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-start w-100">
                <div className="mt-3 text-center sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-black" id="modal-title">Create account</h3>
                  <div className="mt-2">
                    <Form form={form} onSubmit={() => { }}>
                      <div className="mb-4">
                        <Input label='Username' type='text' {...form.register('username')} />
                        <Select label='Region' {...form.register('region')}>
                          <option>China</option>
                          <option>Mexico</option>
                          <option>United Kingdom</option>
                        </Select>
                        <TextArea label='Interests' {...form.register('interests')} />
                      </div>
                      <div className="bg-gray-1100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Submit</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >

  )
}


