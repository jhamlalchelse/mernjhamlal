import React,{useEffect,useState} from 'react'
import './contact.css'


const Contact = () => {
  const [userData, setUserData] = useState({name:'',email:"",phone:'',message:""});
  const userContact = async () => {
    try {
      const res = await fetch('/getdata' , {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setUserData({...userData, name:data.name, email:data.email,phone:data.phone})
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } 
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    userContact()
  },[])

  let name,value;
  const handleInput = async (e)=>{
      name = e.target.name;
      value = e.target.value;
      setUserData({...userData, [name]:value})
  }
  const messageSub = async(e)=>{
    e.preventDefault()
    const {name,email,phone,message} = userData;
    const res = await fetch('/contact',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name,email,phone,message})
    })
    const data = await res.json();
    if(!data){
      console.log('message not found');
    } else{
      alert('message send')
      setUserData({...userData, message:''})
    }
  }

    return (
        <>
        <div className="main-div">
          <div className="rows">
            <div className="col">
            <i className ="fas fa-mobile-alt icon"></i> 
            <div className="info">
              <h6>Phone</h6>
              <p>+918987567654</p>
            </div>
            </div>
            <div className="col">
            <i className ="fas fa-envelope icon"></i> 
            <div className="info">
              <h6>Email</h6>
              <p>jhamlal@gmail.com</p>
            </div>
            </div>
            <div className="col">
            <i className ="fas fa-map-marker-alt icon"></i> 
            <div className="info">
              <h6>Address</h6>
              <p>Kawardha</p>
            </div>
            </div>
          </div>
        </div> 

        <div className="container div-con">
        <h3 className="touch">Get in Touch</h3>
        <form method="post">
        <div className="input-col">
          <input type="text" name="name" id="name" placeholder="Name"  autoComplete="off" value={userData.name} onChange={handleInput} />
          <input type="text" name="email" id="email" placeholder="Email"  autoComplete="off" value={userData.email} onChange={handleInput}/>
          <input type="number" name="phone" id="phone" placeholder="Phone Number"  autoComplete="off" value={userData.phone} onChange={handleInput}/>
        </div>
        <textarea name="message" id="message" rows="5" placeholder="Message"
        value={userData.message}
        onChange={handleInput}
        ></textarea>
        <div>
        <button type="submit" className="btn btn-outline-primary mt-3 mb-4"
        onClick={messageSub}
        >Send Message</button>
        </div>
        </form>
        </div>

        </>
    )
}

export default Contact
