'use client'
import { AuthProvider } from "@lib/context";

export function Providers({ children }: any) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
