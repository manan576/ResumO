import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import SiteHeader from '../../../components/SiteHeader'

const Login = () => {

    const { loading, error, clearError, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        clearError()
        const user = await handleLogin({ email, password })

        if (user) {
            navigate('/dashboard')
        }
    }


    return (
        <div className='auth-page'>
            <SiteHeader />
            <main>
                <div className="form-container">
                    <h1>Login</h1>
                    <p className='form-copy'>Access your saved interview plans, reports, and tailored resumes.</p>
                    {error ? <p className='form-error'>{error}</p> : null}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Enter email address' autoComplete='email' required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Enter password' autoComplete='current-password' required />
                        </div>
                        <button className='button primary-button' disabled={loading}>Login</button>
                    </form>
                    <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
                </div>
            </main>
        </div>
    )
}

export default Login
