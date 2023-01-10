import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link,useParams } from "react-router-dom";

const Individual = () => {
    const {id} = useParams();
    console.log(id);
    const history = useHistory();
    const [comment,setComment] = useState("");
    const [allowcomment, setAllowcomment] = useState(localStorage.getItem("token"));
    const [allcomments,setAllcomments] = useState(null);
    const [ress,setRess] = useState(null);

  const handleClose = ()=>{
    history.push("/")
  }

  const onChange = (e)=>{
    if(allowcomment!==null){
        setComment(e.target.value);
    }
    else{
        setComment("");
    }
  }

    let postVisibility = "hidden";
    let holder = "";

    if(allowcomment){
        postVisibility =  "visible";
        holder="Write comment here"
    }
    else{
        postVisibility =  "collapse";
        holder = "Login or signup to leave comment";
    }

    const getIndividualPosts = async()=>{
        const response = await fetch(`http://localhost:5000/api/posts/fetchpost` , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'postId': id,
            }
        });
        const json = await response.json();
        setRess(json.post);
    }

    useEffect(()=>{
        getIndividualPosts();
    },[])

  return (
    <div className="back">
      {ress && <div className="container" style={{zIndex: 0}}>
        <div className="card">
          <div
            className="upvote"
            style={{
              display: "flex",
              height: "100px",
              backgroundColor: "#313638",
            }}
          >
            <div
              className="cancel"
              style={{
                float: "right",
                justifyContent: "right",
                paddingLeft: "90%",
              }}
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  paddingTop: "5px",
                  color: "#bcb8b1"
                }} onClick={handleClose}
              >
                <i className="fa-solid fa-xmark fa-xl"></i> Close
              </button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
          <img
            className="card-img-bottom"
            src="https://th.bing.com/th/id/OIP.U0eJqMMa4V_0H3n3A6TZkwHaEV?pid=ImgDet&rs=1"
            alt="Card cap"
          />
          <div>
            <hr style={{ backgroundColor: "black", height: "15px" }} />
          </div>
          <div
            className="your-comment"
            style={{
              paddingTop: "2vh",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "10%",
            }}
          >
            <input
              style={{ width: "100vw", borderRadius: "5px", padding: "1vh" }}
              type="text"
              placeholder={holder} onChange={onChange} value={comment}
            />
            <div className="navbar-item">
              <div
                className="login-buttons" style={allowcomment && {visibility: "collapse"}}
                // style={{ transform: "translate(-110%)" }}
              >
                <Link
                  to="/signup"
                  className="button is-primary"
                  style={{ borderRadius: "7px" }}
                >
                  <strong>Sign up</strong>
                </Link>
                <Link
                  to="/login"
                  className="button is-light mx-2"
                  style={{ borderRadius: "7px" }}
                >
                  Log in
                </Link>
              </div>
              <div className="post-buttons" style={{visibility: postVisibility}}>
              <button
                  to="/login"
                  className="button is-primary"
                  style={{ borderRadius: "7px" }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <hr style={{border: 0,height: "2px",borderTop: "3px solid rgba(0, 0, 0, 0.1)",borderBottom: "1px solid rgba(255, 255, 255, 0.3)"}}/>
          {allcomments && <div className="comments" style={{ paddingTop: "25px" }}>
            <p
              style={{
                paddingBottom: "30px",
                textAlign: "center",
                backgroundColor: "#9ECAFF",
                height: "20px",
                width: "90px",
                borderRadius: "20px",
              }}
            >
              bigomboy
            </p>
            <h4
              style={{
                justifyContent: "left",
                textAlign: "left",
                paddingTop: "7px",
                paddingLeft: "25px",
              }}
            >
              This is comment...
            </h4>
          </div>}
        </div>
      </div>}
    </div >
  );
};

export default Individual;
