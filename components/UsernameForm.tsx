'use client'
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore'
import { z } from 'zod'
import { Form, useForm } from './form/form'
import { Input, Select, TextArea } from './form/inputs'
import { SubmitHandler } from 'react-hook-form'
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
    <div className='modal modal-open'>
      <div className='modal-box'>
        <h3 className="text-base font-semibold text-white" id="modal-title">Create account</h3>
        <div className="mt-2">
          <Form form={form} onSubmit={onSubmit}>
            <div className="mb-4">
              <Input label='Username' type='text' {...form.register('username')} />
              <Select label='Region' {...form.register('region')}>
                <option disabled selected>Choose a region for your news</option>
                <option value="cn">China</option>
                <option value="mx">Mexico</option>
                <option value="gb">United Kingdom</option>
              </Select>
              <TextArea label='Interests' {...form.register('interests')} />
            </div>
            <button type="submit" className="btn">Submit</button>
          </Form>
        </div>
      </div>
    </div >
  )
}


