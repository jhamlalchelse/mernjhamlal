import React, { useEffect, useState } from "react";
import "./about.css";
import jhampic from "../../Images/jhampic.jpg";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const aboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
      history.push('/login');
    }
  };

  useEffect(() => {
    aboutPage();
  }, []);

  return (
    <>
      <div className="containers emp-profile">
        <form method="GET">
          <div className="row abcd">
            <div className=" col-md-4 ">
              <img src={jhampic} alt="AboutmeImg" className="jhampic" />
            </div>
            <div className=" col-md-6 ">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  {" "}
                  RANKING: <span>1/10</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="active">
                    <a href="#home" id="home-tab" data-toggle="tab" role="tab">About</a>
                  </li>
                  <li>
                    <a href="#profile" id="profile-tab" data-toggle="tab" role="tab">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" col-md-2 ">
              <input
                type="submit"
                className="profie-edit-btn"
                name="btnAddMore"
                value="Edit Profile "
              />
            </div>
          </div>
          <div className="row abcd">
            {/* left side url */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work Line</p>
                <a href="http:www.youtube.com">Youtube</a> <br />
                <a href="http:www.youtube.com">Whatsapp</a> <br />
                <a href="http:www.youtube.com">Linkedin</a> <br />
                <a href="http:www.youtube.com">Instagram</a> <br />
                <a href="http:www.youtube.com">Facebook</a> <br />
                <a href="http:www.youtube.com">Twitter</a> <br />
                <a href="http:www.youtube.com">indeed</a> <br />
              </div>
            </div>
            {/* right side data toggle */}
            <div className="col-md-8 pe-4 about-info">
              <div className="tab-content profile-tab" id="mytabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row mt-5 abcde">
                    <div className="col-md-6 jham">
                      <label> UserID </label>
                    </div>
                    <div className="col-md-6 chelse">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row mt-0">
                    <div className="col-md-6 jham">
                      <label> Name </label>
                    </div>
                    <div className="col-md-6 chelse">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row mt-0">
                    <div className="col-md-6 jham">
                      <label> Email </label>
                    </div>
                    <div className="col-md-6 chelse">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
