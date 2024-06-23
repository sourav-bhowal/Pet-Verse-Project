"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create QueryClient
const queryClient = new QueryClient();

// Create QueryContext
export default function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}