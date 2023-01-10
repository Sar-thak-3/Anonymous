import React from "react";
import "./Static/Accounts.css";
import Allposts from './Allposts'
import { useEffect } from "react";
import { useState } from "react";

const Accounts = (props) => {
  const query = new URLSearchParams(window.location.search)
    const [posts,setPosts] = useState(null);

    const getPosts = async()=>{
        const response = await fetch(`http://localhost:5000/api/posts/fetchcommunityposts/?community=${query.get("community")}` , {
            method: "GET",
        })
        const res = await response.json()
        setPosts(res.posts);
    }

    useEffect(()=>{
        getPosts();
    },[]);
    
  return (
    <div className="container">
      <div className="profile">
        <img
          src="https://styles.redditmedia.com/t5_2qh1q/styles/communityIcon_9ggb2zkszbf91.png?width=256&s=395857a1bb50dec0de550b38cecfd322283c58ad" className="Mh_Wl6YioFfBc9O1SQ4Jp" alt=""/>
        <div className="_3I4Wpl_rl6oTm02aWPZayD ">
          <div className="_3TG57N4WQtubLLo8SbAXVF ">
            <h1 className="_2yYPPW47QxD4lFQTKpfpLQ">India: United We Stand</h1>
            <h2 className="_33aRtz9JtW0dIrBNKFAl0y">india</h2>
          </div>
        </div>
      </div>
      {posts && posts.map((post)=>{
        return <Allposts key={post._id} allcontent={post}></Allposts>
      })}
    </div>
  );
};

export default Accounts;
