import React, { useState } from "react";
import work from "../../Images/work.jpg";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name:'',email:'',phone:'',work:'',password:'',cpassword:''
        })
        let name,value;
        const handleInput = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value})
        }
    const postData = async(e)=>{
    e.preventDefault();
    const { name,email,phone,work,password,cpassword } = user;
    const res = await fetch('/register',{
    method:"POST",
    headers:{
    'Content-Type':"Application/json"
    },
    body: JSON.stringify({name,email,phone,work,password,cpassword})
    })
    const data = await res.json();
    if(!data || data.status===422){
    window.alert('Invalid Data');
    console.log('Invalid Data');
    } else{
    window.alert('Data Successful');
    console.log('Data successful');
    history.push('/login')
    }
    }
  return (
    <>
      <div className="container">
        <h3 className="signup-form">Signup Form</h3>
        <div className="row">
          <div className="left-col">
            <form method="post">
              <label>
                <i className="fas fa-user"></i>{" "}
              </label>
              <input
                type="text"
                className="input-form"
                name="name"
                id="name"
                placeholder="Your Name"
                autocomplete="off"
                value={user.name}
                onChange={handleInput}
              />
              <hr />
              <label>
                <i className="fas fa-envelope"></i>{" "}
              </label>
              <input
                type="text"
                className="input-form"
                name="email"
                id="email"
                placeholder="Your Email"
                autocomplete="off"
                value={user.email}
                onChange={handleInput}
              />
              <hr />
              <label>
                <i className="fas fa-mobile-alt"></i>{" "}
              </label>
              <input
                type="number"
                className="input-form"
                name="phone"
                id="phone"
                placeholder="Mobile Number"
                autocomplete="off"
                value={user.phone}
                onChange={handleInput}
              />
              <hr />
              <label>
                <i className="fas fa-briefcase"></i>{" "}
              </label>
              <input
                type="text"
                className="input-form"
                name="work"
                id="work"
                placeholder="Your Profession"
                autocomplete="off"
                value={user.work}
                onChange={handleInput}
              />
              <hr />
              <label>
                <i className="fas fa-lock"></i>{" "}
              </label>
              <input
                type="password"
                className="input-form"
                name="password"
                id="password"
                placeholder="Password"
                autocomplete="off"
                value={user.password}
                onChange={handleInput}
              />
              <hr />
              <label>
                <i className="fas fa-lock"></i>{" "}
              </label>
              <input
                type="Password"
                className="input-form"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Password"
                autocomplete="off"
                value={user.cpassword}
                onChange={handleInput}
              />
              <hr />
              <button
                type="submit"
                className="btn btn-outline-primary w-50 mt-3"
                onClick={postData}
              >
                Register
              </button>
            </form>
          </div>
          <div className="right-col">
            <figure>
              <img src={work} alt="workImage" />
            </figure>
            <div className="link">
              <Link to="/login" className="login-link">
                I am already register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
