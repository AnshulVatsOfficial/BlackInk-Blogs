import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BlackInk_Logo  from '../assets/blackinklogo.png';

const Navbar = () => {

    return (
        <section id="navbar-section">
            <div className="navbar-div shadow">
                <div className="container">
                    <div className="row">
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid all-navbar-items">
                            <Link to="/"><img src={BlackInk_Logo} class="navbar-brand blackink-logo" style={{width:"100px"}}/></Link>

                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse navbar-items" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item mx-2">
                                        <Link to="/" class="nav-link" aria-current="page">Home</Link>
                                    </li>
                                {
                                    localStorage.getItem("isAuth") == "true"
                                    ?
                                    <li class="nav-item mx-2">
                                        <Link to="/createblog" class="nav-link">Create Blog</Link>
                                    </li>
                                    :
                                    <></>
                                }
                                    {/* <li class="nav-item mx-2">
                                        <Link to="/contact" class="nav-link">Contact</Link>
                                    </li> */}
                                </ul>
                                {
                                    localStorage.getItem("isAuth") == "true"
                                    ?
                                    <Link to="/login"><button className="signin-common-btn" type="submit">Sign Out&nbsp;<i className="fa-solid fa-user-plus"></i></button></Link>
                                    :
                                    <Link to="/login"><button className="signin-common-btn" type="submit">Sign In&nbsp;<i className="fa-solid fa-user-plus"></i></button></Link>
                                }
                            </div>
                        </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar;
