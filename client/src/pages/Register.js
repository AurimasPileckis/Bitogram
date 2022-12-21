import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        photo: ''
    })

    const [alert, setAlert] = useState({
      message: '',
      status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        for(const key in form) {
            formData.append(key, form[key])
        }

        axios.post('/api/users/register', formData)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setTimeout(() => navigate('/'), 1000)
        })
        .catch (error => {
            setAlert({
            message: error.response.data,
            status: 'danger'
        })

        })
    }
    return (
        <div className='container mw-50'>
             {alert.message && (
      <div className={'alert alert-' + alert.status}>
        {alert.message}
      </div>
    )}
            
            <form className="register-form"  onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
        <div className="form-group mb-2">
            <input className="form-control" type='text' name='first_name' placeholder="First Name" onChange={handleForm} />
        </div>
        <div className="form-group mb-2">
            <input className="form-control" type='text' name='last_name' placeholder="Last Name" onChange={handleForm} />
        </div>
        <div className="form-group mb-2">
            <input className="form-control" type='email' name='email' placeholder="E-mail" onChange={handleForm} />
        </div>
        <div className="form-group mb-2">
            <input className="form-control"  type='password' name='password' placeholder="Password" onChange={handleForm} />
        </div>   
        <div className="form-group mb-2">Add photo:
            <input className="form-control"  type='file' name='photo' onChange={handleForm} />
        </div>
            <button className="btn btn-dark">Register</button>
        </form>
           
        </div>
    )
}
export default Register