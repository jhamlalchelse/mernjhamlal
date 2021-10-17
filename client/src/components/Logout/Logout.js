import React,{useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App'

const Logout = () => {

const {state , dispatch} = useContext(UserContext)

const history = useHistory();
    useEffect(() => {
        fetch('/logout',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            history.push('/login',{replace:true})
            if(res.status!==200){
                throw Error('res is not getting find')
            }
        }).catch((e)=>{
            console.log(e);
        })
    }, [])
    return (
        <>
        </>
    )
}

export default Logout
