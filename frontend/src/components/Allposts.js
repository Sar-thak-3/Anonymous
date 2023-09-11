import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Scroll from "react-scroll";
import "./Static/Homecss.css";
import { Img } from "react-image";

var scroll = Scroll.animateScroll;

const Allposts = (props) => {
  const history = useHistory();
  let old = new Date(props.allcontent.date);
  const convertuffer = () => {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(props.allcontent.img.Data.data))
    );
    return base64String;
  };

  const handleSlidedown = () => {
    let pos = Math.floor(window.scrollY / 498);
    scroll.scrollTo(498 * (pos + 1), {
      duration: 200,
      delay: 0,
      smooth: "linear",
    });
  };

  const handleLink = (e) => {
    let communities = JSON.parse(localStorage.getItem("communities"));
    if (!communities) {
      communities = [];
      communities.push(e.target.innerText);
      localStorage.setItem("communities", JSON.stringify(communities));
    } else {
      if (!communities.includes(e.target.innerText)) {
        if (communities.length < 5) {
          communities.push(e.target.innerText);
        } else {
          communities = communities.slice(1);
          communities.push(e.target.innerText);
        }
        communities = [...communities].reverse();
        localStorage.setItem("communities", JSON.stringify(communities));
      }
    }
  };

  const styles = {
    marginLeft: "25px",
    float: props.pos,
    width: "65vw",
    marginTop: "80px",
  };

  return (
    <div className="card" style={props.pos && styles}>
      <div
        style={{ position: "relative", float: "right" }}
        className="community-name"
      >
        <Link
          to={`/account?community=${props.allcontent.username}`}
          onClick={handleLink}
        >
          <h1>
            <u>{props.allcontent.username}</u>
          </h1>
        </Link>
      </div>
      <div className="thumbnail">
        <div className="date">
          <h6>{old.toString("YYYY-MM-dd").slice(0, 15)}</h6>
        </div>
        {props.allcontent.img && (
          <Img
            className="left"
            style={{ width: "350px" }}
            // src="https://media.istockphoto.com/id/589415708/photo/fresh-fruits-and-vegetables.jpg?s=612x612&w=is&k=20&c=0KUXg_vETkKHFrjtTWrY8EbFW-KVkwjrmAnS43ljqHA="
            alt="."
            src={props.allcontent.img}
          />
        )}
      </div>
      <Link to={`/post/${props.allcontent._id}`}>
        <div className="right">
          <h1>{props.allcontent.title}</h1>
          <div className="tags">
            {props.allcontent.tags.map((tag) => {
              return (
                <div key={tag} className="author">
                  <h2>{tag}</h2>
                </div>
              );
            })}
          </div>
          <div className="separator"></div>
          <p>{props.allcontent.content}</p>
        </div>
      </Link>
      <a>
        <div className="fab" onClick={handleSlidedown}>
          <i className="fa fa-arrow-down fa-2x"> </i>
        </div>
      </a>
    </div>
  );
};

export default Allposts;
