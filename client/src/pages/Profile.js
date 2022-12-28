// import { useState, useContext, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'



// const Profile = () => {


//  const [users, setUsers] = useState([])
//  const [refresh, setRefresh] = useState(false)
//     const [alert, setAlert] = useState({
//         message: '',
//        status: ''
//     })

        
//     useEffect(() => {
//         axios.get('/api/users/')
//         .then(resp => {
          
//           setUsers(resp.data)
//             })
       
          
//         .catch(error => {
//           setAlert({
//             message: error.response.data,
//             status: 'danger'
//           })
//         })
//       }, [refresh])

//     return (
//         <div className="mb-5 container">
//         <div className="single-post">
//         {users.map(user => {
//             return (
//                 <>
//             <h1>{user.first_name}</h1>
//             <div className="image" style={{ backgroundImage: 'url(' + user.photo + ')' }}></div>
//             </>
//             )
//         })}
//         </div>
//     </div>
       
//     )
// }

// export default Profile