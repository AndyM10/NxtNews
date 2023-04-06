'use client'
import React, { useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import { z } from 'zod'
import { Form, useForm } from './form/form'
import { Input, Select, TextArea } from './form/inputs'
import { SubmitHandler } from 'react-hook-form'
import { useAuth } from '@lib/context'
import { User } from 'firebase/auth'

interface formValue {
  username: string,
  region: string
  interests: string
}

interface usernameFormProps {
  user: User
}

const signUpFormSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3).max(20).refine(async (username) => {
    //Checkuser name is available
    console.log('Checking username availability...', username)
    const ref = doc(getFirestore(), 'usernames', username)
    const snap = await getDoc(ref)
    console.log('Firestore read executed!', snap.exists())
    return !snap.exists()
  }, { message: 'Username is already taken', params: undefined }),
  region: z.string({ required_error: 'Region is required' }),
  interests: z.string({ required_error: 'Interests are required' })
})

export default function UsernameForm({ user }: usernameFormProps): JSX.Element {

  const form = useForm({ schema: signUpFormSchema })

  const onSubmit: SubmitHandler<formValue> = async (data) => {

    // Create refs for both documents
    const userDoc = doc(getFirestore(), 'users', user.uid)
    const usernameDoc = doc(getFirestore(), 'usernames', data.username)
    const userPreferncesDoc = doc(getFirestore(), 'preferences', user.uid)

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore())

    batch.set(userDoc, {
      username: data.username,
      photoURL: user.photoURL,
      displayName: user.displayName
    })
    batch.set(usernameDoc, { uid: user.uid })
    batch.set(userPreferncesDoc, {
      region: data.region,
      interests: data.interests
    })

    await batch.commit()
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden w-2/5 rounded-lg bg-black text-left shadow-xl transition-all ">
            <div className="px-4 pb-4 pt-5">
              <div className="flex items-start">
                <div className="mt-3 text-center sm:text-left w-full">
                  <h3 className="text-base font-semibold leading-6 text-white" id="modal-title">Create account</h3>
                  <div className="mt-2">
                    <Form form={form} onSubmit={onSubmit}>
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


