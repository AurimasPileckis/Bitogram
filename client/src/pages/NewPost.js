import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import MainContext from '../../../context/MainContext'

const NewPost = () => {
    // const { setAlert } = useContext(MainContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        post_photo: '',
        post_caption: ''
    })
    const [alert, setAlert] = useState({
        message: '',
       status: ''
    })

    

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'post_photo' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        for(const key in form) {
            formData.append(key, form[key])
        }

        axios.post('/api/posts/', formData)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/explore')
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

    return (
        <div className='container mw-50'>
            <div className="page-heading">
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
               <h3>Create New Post</h3>
                    <div className="form-group mb-2">
                        <label className="mb-1">Add photo:</label>
                        <input type="file" name="post_photo" className="form-control" onChange={handleForm} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Add caption:</label>
                        <input type="text" name="post_caption" className="form-control" onChange={handleForm} />
                    </div>
                    <button  className='btn btn-primary'>Post</button>
            </form>        

        </div>
    
    )
}

export default NewPost