import HomeImage from '../assets/homepageimage.jpg';
import BlogPosts from './BlogPosts';
import { getDocs, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { database } from '../firebase-config';
import LatestBlogImage1 from '../assets/latestblogimage1.jpg';
import LatestBlogImage2 from '../assets/latestblogimage2.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    //creating reference to fetch blog info. from a collection named "Blogs"
    const blogFetchingRef = collection(database, "Blogs");

    useEffect(()=>{
        const displayAllBlogs = async () => {
            const blogData = await getDocs(blogFetchingRef);
            setAllBlogs(blogData.docs.map((item) => ({...item.data(), id:item.id})));
        };

        displayAllBlogs();
    }, []);

    

    return (
        <>
        <section id="home-section">
            <div className="home-div">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="home-items d-flex flex-column justify-content-center align-items-center">
                            <div className="top-titles d-flex flex-column justify-content-center align-items-center mt-5">
                                <h2 className="top-title-one">Welcome to</h2>
                                <h1 className="top-title-two">BlackInk</h1>
                                <p className="top-title-three">Read . Create . Post</p>
                                {
                                    localStorage.getItem("isAuth") == "true"
                                    ?
                                    <></>
                                    :
                                    <Link to="/login"><button className="signin-common-btn"><i class="fa-solid fa-face-smile"></i> &nbsp;Sign in to start writing Blog</button></Link>
                                }
                            </div>

                            <div className="home-image d-flex justify-content-center align-items-center">
                                <img src={HomeImage} className="img-fluid mb-lg-3" />
                            </div>
                        </div>
                        
                        {/* <div className="search-bar d-flex justify-content-center align-items-center col-lg-8 col-md-10 col-sm-10 mt-4 mb-4" style={{backgroundColor:"#f4f5f7"}}>
                            <input type="search"className="my-2 mx-1" name="search-blogs" id="search-blogs" placeholder="Search for blogs"/>
                            <button className="search-blog-btn my-2 mx-lg-1 mx-2">Search</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

        <section id="all-blog-posts" className="mt-5">
            <div className="all-blog-posts">
                <div className="container">
                    <div className="row">
                        {
                            allBlogs.map((blog)=>{
                                return(
                                    <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                                        <div className="card shadow blog-card mb-5" style={{width: "36rem"}}>
                                            <img src={blog.posterUrl} className="card-img-top"/>
                                            <div className="card-body d-flex flex-column justify-content-center">
                                                <h5 className="card-title mt-2">{blog.title}</h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{__html:blog.body.slice(0, 90)}}/>
                                                <div className="read-write-buttons">
                                                    <Link to={`/readblog/${blog.id}`} className="signin-common-btn">Read</Link>
                                                    {
                                                        localStorage.getItem("isAuth") == "true" || localStorage.getItem("isSignedIn") == "true"
                                                        ?
                                                        <Link to="/createblog" className="signin-common-btn">Write your own</Link>
                                                        :
                                                        <Link><button className="signin-common-btn" onClick={()=>{alert("Please sign in to write a Blog !");}}>Write your own</button></Link>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Home;
