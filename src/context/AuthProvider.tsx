"use client"
import { SessionProvider } from "next-auth/react"

// Create SessionContext
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
};