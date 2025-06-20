"use client"

import { SessionProvider } from "next-auth/react"
import { TRPCProvider } from "./trpc-provider"
import { Toaster } from "sonner"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TRPCProvider>
      <SessionProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton={false}
          toastOptions={{
            className: "bg-background text-foreground",
            style: {
              fontFamily: "var(--font-geist-sans)",
              fontSize: "14px",
            },
          }}
        />
      </SessionProvider>
    </TRPCProvider>
  )
}
