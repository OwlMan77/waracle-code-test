import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import HeaderIconDark from './../../assets/header-icon-black.svg'
import HeaderIconLight from './../../assets/header-icon-white.svg'
import UploadSvG from './../../assets/upload.svg'
import './index.css'

const Nav = () => {

    const [scroll, setScroll] = useState(false);
    
    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 1);
      });
    }, []);


    const location = useLocation();

    const { pathname } = location;
  
    const path = pathname.split("/")[1];
    
    const backgroundClass = scroll ? 'bg-black': 'bg-transparent'
   
    return (
      <nav className={`Nav ${backgroundClass}`}>
        <div className="container">
          <NavLink to="/" className="brand">
            { scroll ?  <img src={HeaderIconLight} className="logo" /> : <img src={HeaderIconDark} className="logo" /> }
          </NavLink>

          <div className="right">
            <NavLink className={`Browse link ${path === '' ? 'hidden' : ''}`} to="/">Browse</NavLink>
            <NavLink className={`Upload link ${path === 'upload' ? 'hidden' : ''}`} to="/upload"> <img className="upload-symbol"src={UploadSvG}></img><span className="button-text">Upload</span></NavLink>
          </div>
        </div>
      </nav>

    )
  }

  export default Nav