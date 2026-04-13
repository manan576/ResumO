import { Link, useNavigate } from "react-router"
import { useAuth } from "../features/auth/hooks/useAuth"

const SiteHeader = () => {
    const navigate = useNavigate()
    const { user, handleLogout, loading, clearError } = useAuth()

    const handleLogoutClick = async () => {
        clearError()
        await handleLogout()
        navigate("/")
    }

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link to="/" className="site-header__brand">ResumeO</Link>

                <nav className="site-header__actions">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="button ghost-button">Dashboard</Link>
                            <button
                                type="button"
                                className="button primary-button"
                                onClick={handleLogoutClick}
                                disabled={loading}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="button ghost-button">Sign In</Link>
                            <Link to="/register" className="button primary-button">Get Started</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default SiteHeader
