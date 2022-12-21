import { Link } from 'react-router-dom'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import './Header.css'
import logo from './instagram.svg'
import home from './home.svg'
import more from './more.png'

const Header = () => {
    const { loggedIn, userInfo } = useContext(MainContext)
   
    return (
        <header className="p-3 text-bg-light">
             
        <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/explore" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <h1 className="fs-4 text-dark">
                    <img src={logo} alt="Bitogram" 
                         style={{ width: "50px", marginRight: "8px"} }>
                    </img>Bitogram
                </h1>
            </Link>
            <ul className="nav nav-pills">
         
            </ul>
            <div className='text-end'>
            <ul className="nav nav-pills">
                {loggedIn ? (
                <>
                <li className="nav-item">
                <Link to="/explore" 
                      className="nav-link text-dark" 
                      aria-current="page">
                        <img src={home} alt="" 
                             style={{ width: "30px"} }>
                        </img>
                </Link>
                </li>
                 <li className="nav-item">
                <Link to="/new-post" className="nav-link text-dark" 
                      aria-current="page">
                        <img src={more} alt="" 
                             style={{ width: "30px"} }>
                        </img>
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/profile" className="nav-link text-dark" 
                      aria-current="page">
                       
                         {loggedIn && userInfo.role === 0 &&
                        <em style={{ fontSize: '.8rem', marginRight: '1rem' }}>
                            {userInfo.first_name + ' ' + userInfo.last_name}
                        </em>
                    }
                </Link>
                </li>
                <li className="nav-item">
                     <Link to="/logout" className="nav-link text-dark" aria-current="page">Log Out</Link>
                 </li>
                 </>
                ) : (
                    <>
                <li className="nav-item">
                    <Link to="/register" className="nav-link text-dark" aria-current="page">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link text-dark" aria-current="page">Log In</Link>
                </li>
                </>
                )}
            </ul>
            </div>
            </div>
            </div>
              
            
            
            </header>
    
    )
}

export default Header