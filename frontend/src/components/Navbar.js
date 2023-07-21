import React from "react";
import "./Static/Navbarcss.css";
import "./Static/Navbarjs.js";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState({ searchText: "" });
  const [searchtags, setSearchtags] = useState([]);
  const [alltags,setAlltags] = useState(JSON.parse(localStorage.getItem('prevtags')))
  const communities = JSON.parse(localStorage.getItem("communities"));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchtags([...searchtags, e.target[0].value]);
    setSearch({ searchText: "" });
    // localStorage.removeItem('prevtags')
    let prevTags = JSON.parse(localStorage.getItem('prevtags'));
    if(!prevTags){
      prevTags = []
      prevTags.push(e.target[0].value)
    }
    else{
      if(prevTags.length<5){
        prevTags.push(e.target[0].value)
      }
      else{
        prevTags = prevTags.slice(1)
        prevTags.push(e.target[0].value)
      }
    }
    prevTags = [...prevTags].reverse()
    localStorage.setItem('prevtags',JSON.stringify(prevTags))
    setAlltags(JSON.parse(localStorage.getItem('prevtags')))
  };

  const handleCancel = (e) => {
    // console.log(e.target.innerText);
    setSearchtags(searchtags.filter((item) => item !== e.target.innerText));
  };

  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const handleLogout = ()=>{
    localStorage.removeItem("token");
  }

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              src={require("./Static/logo.png")}
              width="112"
              height="28"
              alt="logo"
            />
          </Link>

          <Link to='/#'
            role="button"
            className="navbar-burger"
            data-target="navMenu"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                className="navbar-link"
              >
                Feeds
              </button>

              <div className="navbar-dropdown" style={{ width: "275px" }}>
                <div className="recentCommunities">
                  <div className="heading">RECENT COMMUNITIES</div>
                  <div className="content">
                    {communities && communities.map((community)=>{
                      return <Link key={community} to={`/account?community=${community}`} className="navbar-item">
                      {community}
                    </Link>
                    })}
                  </div>
                </div>
                <hr className="navbar-divider" />
                <div className="recentCommunities">
                  <div className="heading">TAGS</div>
                  <div className="content">
                    {alltags && alltags.map((tag)=>{
                      return <Link to="/" key={tag} className="navbar-item">
                      {tag}
                    </Link>
                    })}
                  </div>
                </div>
                <hr className="navbar-divider" />
                <Link to="/" className="navbar-item">
                  Report an issue
                </Link>
              </div>
            </div>
          </div>
          <div>
            <form
              className="d-flex my-2"
              style={{ width: "430px" }}
              onSubmit={handleSearch}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  id="searchText"
                  placeholder="Search"
                  style={{ borderRadius: "7px" }}
                  onChange={onChange}
                  value={search.searchText}
                ></input>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ borderRadius: "7px" }}
                >
                  <i className="bi-search"></i>
                </button>
              </div>
            </form>
            <div className="search-tags">
              {searchtags && searchtags.map((item) => (
                <button
                  onClick={handleCancel}
                  key={item}
                  style={{
                    paddingBottom: "30px",
                    textAlign: "center",
                    backgroundColor: "#9ECAFF",
                    height: "20px",
                    width: "90px",
                    borderRadius: "20px",
                    color: "black",
                  }}
                >
                  {item}
                  <i className="fa-solid fa-xmark"></i>
                </button>
              ))}
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
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
                <div className="dropdown" >
                  <button style={{border: "none"}}><i className="fa-regular fa-user"></i></button>
                  <div className="dropdown-content">
                    <Link to="/user">Profile</Link>
                    <Link onClick={handleLogout} to="/login">Log Out</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
