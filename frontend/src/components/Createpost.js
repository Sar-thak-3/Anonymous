import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Static/Createpost.css";
import {Img} from "react-image"

const Createpost = (props) => {
    let history = useHistory();
    const [newpost,setNewpost] = useState({title: "",post: ""});
    const [alltags,setAlltags] = useState([]);
    // const [file,setFile] = useState();
    const [previewSrc,setpreviewSrc] = useState({imagePreview: null})
    const [imagename,setImagename] = useState(null);
    let inputRef = useRef(null)

    const handleCancel = ()=>{
        props.cancel(false);
    }

    const handleAddtag = (e)=>{
        e.preventDefault();
        if(!alltags.includes(e.target.previousElementSibling.value)){
            setAlltags([...alltags,e.target.previousElementSibling.value])
        }
        e.target.previousElementSibling.value = "";
    }

    const onChange = (e)=>{
        setNewpost({...newpost,[e.target.name]: e.target.value})
    }

    const handleAddfile = (e)=>{
      if(e.target.files[0]){
        let reader = new FileReader();
        let fil = e.target.files[0];
        setImagename(fil.name)
        reader.onloadend = () => {
          setpreviewSrc({...previewSrc,imagePreview: reader.result,file: fil})
        };
        reader.readAsDataURL(fil);
      }
      // console.log(e.target.files);
      // setFile(e.target.files[0]);
      // if(inputRef.current.value!==""){
      //   setImagename(inputRef.current.files[0].name);
      // }
      // console.log(file);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`https://anonymous-4g42.vercel.app/api/posts/createpost`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem("token"),
            },
            body: JSON.stringify({title: newpost.title,content: newpost.post,tags: alltags,img: file})
        })
        // const response = await fetch(`http://127.0.0.1:5000/api/posts/createpost`,{
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authtoken': localStorage.getItem("token"),
        //     },
        //     body: JSON.stringify({title: newpost.title,content: newpost.post,tags: alltags,img: previewSrc.imagePreview})
        // })
        const json = await response.json();
        if(json.success){
            history.push("/user");
            props.cancel(false);
        }
    }

  return (
    <div className="create-post">
      <div className="widget-post" aria-labelledby="post-header-title">
        <div className="widget-post__header">
            <div className="creator">
          <h2 className="widget-post__title" id="post-header-title">
            <i className="fa fa-pencil" aria-hidden="true"></i>
            Creator name
          </h2>
          </div>
          <div className="cancel">
          <button onClick={handleCancel} className="cancel-button"><i className="fa-solid fa-xmark fa-xl"></i></button>
          </div>
        </div>
        <form onSubmit={handleSubmit}
          id="widget-form"
          className="widget-post__form"
          name="form"
          aria-label="post widget"
        >
            <div className="widget-post__content">
            <label htmlFor="post-content" className="sr-only">
              Share
            </label>
            <textarea
              name="title"
              id="title"
              className="widget-post__titlearea scroller"
              placeholder="Title Here" onChange={onChange} value={newpost.title}
            ></textarea>
          </div>
          <div className="widget-post__content">
            <label htmlFor="post-content" className="sr-only">
              Share
            </label>
            <textarea
              name="post"
              id="post-content"
              className="widget-post__textarea scroller"
              placeholder="Write something here!" onChange={onChange} value={newpost.post}
            ></textarea>
          </div>
          <div className="widget-post__options is--hidden" id="stock-options"></div>
          <div className="widget-post__actions post--actions">
            <div className="post-actions__attachments">
                <div className="tags-area">
                    <i className="fa-solid fa-tag"></i>
                    <h2 className="widget-post__title" id="post-header-title">Tags</h2>
                    {/* <form> */}
                        <input type="text" className="tag-text"/>
                        <button onClick={handleAddtag} className="btn post-actions__tags">Add</button>
                    {/* </form> */}
                </div>
                {alltags && alltags.map((tag)=>{
                    return <button key={tag} type="button" className="btn post-actions__stock attachments--btn" aria-controls="stock-options" aria-haspopup="true">
                    {tag}
                  </button>
                })}
                <br /><br />
              <button
                type="button"
                className="btn post-actions__upload attachments--btn"
              >
                <label htmlFor="upload-image" className="post-actions__label">
                  <i className="fa fa-upload" aria-hidden="true"></i>
                  upload image
                </label>
              </button>
              <input type="file" name="file" ref={inputRef} id="upload-image" accept="image/*" multiple onChange={handleAddfile} />
              <p>{imagename}</p>
            </div>
            <div className="post-actions__widget">
              <button type="submit" className="btn post-actions__publish">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createpost;
