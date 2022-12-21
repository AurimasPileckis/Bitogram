import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'

const Login = (props) => {
    const { setLoggedIn } = props

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
 
    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/login', form)
        .then(resp => {
            localStorage.setItem('loggedin', true)
            setLoggedIn(true)
            
            setAlert({
                message: resp.data,
                status: 'success'
            })

            setTimeout(() => {
                navigate('/explore')
            }, 1000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }

    return (
        <div className="container mw-50">
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
                <div className="form-group mb-2">
                    <input type="email" name="email" className="form-control" onChange={handleForm} placeholder="yourmom@gmail.com" />
                </div>
                <div className="form-group mb-3">
                    <input type="password" name="password" className="form-control" onChange={handleForm} placeholder="password" />
                </div>
                <button className="btn btn-primary">Log In</button>
                <div>Don't have an account? 
                    <Link to="/register" style={{ textDecoration: 'none'}}> Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login