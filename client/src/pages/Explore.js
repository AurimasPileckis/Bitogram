import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext';
import axios from 'axios'
import chat from './icons/chat-bubble.png'
import heart from './icons/heart.png'
import send from './icons/send.png'
import emoji from './icons/emoji.svg'


const Home = () => {

    const { id } = useParams()
    const [comment, setComment] = useState('')
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('/api/posts/')
        .then(resp => {
          
          setPosts(resp.data)
            })
       
          
        .catch(error => {
          setAlert({
            message: error.response.data,
            status: 'danger'
          })
        })
      }, [])

      const handleForm = (e) => {
        e.preventDefault()
        
        axios.post('/api/comments/', { comment, postId: id })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setComment('')

            setRefresh(!refresh)

            setTimeout(() => setAlert({
                message: '',
                status: ''
            }), 2000)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
      
            if(error.response.status === 401)
                setTimeout(() => navigate('/login'), 2000)
        })
    }



return (
      <div className="posts">
          {posts.map(post => {
            return (
              <div key={post.id} className="card">
                <div className='profile'>
                  <div className='sss'>
                    <img 
                         src={post.user && post.user.photo} 
                         style={{ width: '50px', height: '50px'}}>
                    </img>
                  </div>
                <div className='nickname'>
                  {post.user && post.user.first_name + ' ' + post.user.last_name}
                </div>
                </div>
                <div className="image">
                    <img 
                       src={post.post_photo} 
                       alt="photo" className='post-photo' />
                </div>
                <div className='post-head'>
                    <div className='post-heads'>
                       <img src={heart}></img>
                    </div>
                    <div className='post-heads'>
                       <img src={chat}></img>
                    </div>
                    <div className='post-heads'>
                       <img src={send}></img>
                    </div>
                </div>
                <div className='caption'>
                <div className='caption-user'>{post.user && post.user.first_name + ' ' + post.user.last_name}</div>
                <div>{post.post_caption}</div>
                </div>
                <form onSubmit={ (e) => handleForm(e) }>
                  <div className='bottom'>
                  <div className='emoji'><img src={emoji}></img></div>
                <textarea 
                   className='comment'
                   onChange={ (e) => setComment(e.target.value) }
                   placeholder='Add a comment...'>
                </textarea>
                <button className="post-button">Post</button>
                </div>
                </form>
                </div>
            )
          })}
        </div>
    </div>
)
}

export default Home