import { useContext } from "react";
import { AuthContext } from "../auth.context-instance";
import { login, register, logout } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const { user, setUser, loading, setLoading, initializing, error, setError } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError("")

        try {
            const data = await login({ email, password })
            setUser(data.user)
            return data.user
        } catch (error) {
            setUser(null)
            setError(error.response?.data?.message || "Unable to sign in right now.")
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError("")

        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return data.user
        } catch (error) {
            setUser(null)
            setError(error.response?.data?.message || "Unable to create your account right now.")
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError("")

        try {
            await logout()
            setUser(null)
        } catch (error) {
            setError(error.response?.data?.message || "Unable to log out right now.")
        } finally {
            setLoading(false)
        }
    }

    const clearError = () => {
        setError("")
    }

    return { user, loading, initializing, error, clearError, handleRegister, handleLogin, handleLogout }
}
