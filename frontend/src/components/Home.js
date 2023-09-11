import React from 'react'
import './Static/Homecss.css'
import { useEffect } from 'react'
import Allposts from './Allposts'
import { useState } from 'react'

const Home = () => {
    const [ress,setRes] = useState();
    const host = "https://anonymous-4g42.vercel.app"
    // const host = "http://127.0.0.1:5000"
    const getNotes = async()=>{
        const response = await fetch(`${host}/api/posts/fetchallposts`,{
            method: "GET"
        })
        const res = await response.json();
        setRes(res.posts);
    }
    useEffect(()=>{
        getNotes();
    },[])
    return (
        <div className='container'>
            {ress && ress.map((post)=>{
                    return <Allposts key={post._id} allcontent={post}></Allposts>
                })
            }    
        </div>
    )
}

export default Home