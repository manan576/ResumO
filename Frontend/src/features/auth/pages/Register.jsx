import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"
import SiteHeader from '../../../components/SiteHeader'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { loading, error, clearError, handleRegister } = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        clearError()
        const user = await handleRegister({ username, email, password })

        if (user) {
            navigate("/dashboard")
        }
    }

    return (
        <div className='auth-page'>
            <SiteHeader />
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <p className='form-copy'>Create an account to generate and revisit role-specific interview preparation plans.</p>
                    {error ? <p className='form-error'>{error}</p> : null}

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter username' autoComplete='username' required />
                        </div>
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
                                type="password" id="password" name='password' placeholder='Enter password' autoComplete='new-password' required />
                        </div>

                        <button className='button primary-button' disabled={loading}>Register</button>

                    </form>

                    <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
                </div>
            </main>
        </div>
    )
}

export default Register
