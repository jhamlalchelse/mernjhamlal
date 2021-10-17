import React,{useState, useEffect} from 'react'
import './home.css'



const Home = () => {
    const [userName, setUserName] = useState({name:''})

const userHomePage = async () => {
    try {
        const res = await fetch('/home', {
            method:"GET",
            headers:{
                Accept:"application/json",
                'Content-Type':"application/json"
            },
            credentials:'include'
        })    
        const data = await res.json()
        setUserName({...userName , name:data.name})
    } catch (e) {
        console.log(e);
    }
}

useEffect(() => {
    userHomePage()
}, [])

    return (
        <>
            <div className="home-div">
            <div className="home-inner-div">
            <p>Welcome</p>
            <h3 style={{color:'blue'}}>{userName.name}</h3>
            <h3>{ (userName.name) ? 'happy to see you back':'we are the mern developre'}</h3>
            </div>
            </div>
        </>
    )
}

export default Home
