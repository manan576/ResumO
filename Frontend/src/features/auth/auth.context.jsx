import { useEffect, useState } from "react";
import { getMe } from "./services/auth.api";
import { AuthContext } from "./auth.context-instance";


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [initializing, setInitializing] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const bootstrapUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch {
                setUser(null)
            } finally {
                setInitializing(false)
            }
        }

        bootstrapUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, initializing, error, setError }}>
            {children}
        </AuthContext.Provider>
    )
}
