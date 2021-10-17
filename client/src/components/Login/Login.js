import React,{useContext, useState} from 'react'
import login from '../../Images/login.jpg'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import './login.css'

const Login = () => {

    const {state,dispatch} = useContext(UserContext)

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const postData = async (e)=> {
        e.preventDefault();
        const res= await fetch('/login',{
            method:"POST",
            headers:{
                'Content-Type':"Application/json"
            },
            body: JSON.stringify({email,password})
        })
        const data = await res.json();
        if(res.status === 400 || !data){
            window.alert('Invalid data')
        } else {
            dispatch({ type:"USER", payload:true })
            window.alert('Successfully login ')
            history.push('/')
        }
    }
    return (
        <>
        <div className="container">
        <h3 className="signup-form">Login Form</h3>
        <div className="login-row">
            <div className="login-colright">
            <figure>
            <img src={login} alt="workImage" className="right-col-login" style={{width:'200px',height:"200px",marginLeft:"50px",marginTop:"-30px"}} />
            </figure>
            <div className="link">
            <Link to="/signup" className="login-link-col" style={{marginLeft:"5rem"}}>Create Account</Link>
            </div>
            </div>
            <div className="left-col">
            <form method="post">
            <span><i className ="fas fa-envelope"></i>  </span>
            <input type="text" className="input-form" name="email" id="email" autoComplete="off" placeholder="Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <hr className="hr-line" />
            <span><i className ="fas fa-lock"></i>  </span>
            <input type="password" className="input-form" name="password" id="password" autoComplete="off" placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <hr className="hr-line" />
            <button type="submit" className="btn btn-outline-primary w-50 mt-3"
            onClick={postData}
            >Login</button>
            </form>
            </div>
        </div>
        </div> 
        </>
    )
}

export default Login
