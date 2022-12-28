import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext';
import axios from 'axios'
import likeImg from '../../icons/like.svg';
import fullLikeImg from '../../icons/liked.svg';
import defaultAvatar from '../../icons/default_avatar.jpg';
import menuImg from "../../images/menu.svg";
import comment from '../../icons/chat-bubble.png'
import heart from '../../icons/heart.png'
import send from '../../icons/send.png'
import emoji from '../../icons/emoji.svg'


const Post = (props) => {
  const { post } = props;
  const { userInfo, setAlert, setHome } = useContext(MainContext);
  const [ likesCount, setLikesCount ] = useState('');
  const [ isLiked, setIsLiked ] = useState(false);
  const [posts, setPosts] = useState([])

  const navigate = useNavigate()
    useEffect(() => {
        axios.get(`/api/likes/${post.id}`)
        .then(resp => {
            resp.data.rows.map((like) => {
                if (like.userId === userInfo.id) {
                    return setIsLiked(true);
                }
            });
            setLikesCount(resp.data.count);
            })
        .catch(error => {
          setAlert({ message: error.response.data, status: 'danger' })
          if (error.response.status === 401) {
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
        })
      }, [])



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
                  {post.user && post.user.user_name}
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
                       <img src={comment}></img>
                    </div>
                    <div className='post-heads'>
                       <img src={send}></img>
                    </div>
                </div>
                <div className='caption'>
                <div className='caption-user'>{post.user && post.user.user_name}</div>
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

)
}

export default Home