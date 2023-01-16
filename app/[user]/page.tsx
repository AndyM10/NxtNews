import { cookies } from 'next/headers'

const getUser = async () => {
  const cookiez = cookies()
  console.log('Cookies on the server: ', cookiez)

}
export default async function Page() {
  getUser()
  return (
    <div>
      User page
    </div>
  )
}
