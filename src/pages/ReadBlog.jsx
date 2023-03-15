import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import {useEffect, useState } from "react"
import { database } from '../firebase-config';

const ReadBlog = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({});

    //a function to get details from from Firestore Database
    const getBlogDetails = async () => {
        const docRef = doc(database, "Blogs", id);
        const docSnap = await getDoc(docRef)
        .then((doc)=>{
            setBlogData(doc.data());
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    //executing the above function on page render
    useEffect(()=>{
        if(id){
            getBlogDetails();
        }
    }, [id]);

    return (
        <section id="read-blog-section">
            <div className="read-blog-div">
                <div className="container">
                    <div className="row">
                        <div className="display-blog-poster col-lg-7 col-12 mt-4">
                            <img src={blogData.posterUrl} className="img-fluid rounded-4 shadow" />
                        </div>

                        <div className="display-blog-title col-lg-5 col-12 mt-4">
                            <h2 className="">{blogData.title}</h2>
                            {/* <h5 className="mt-3 mb-2">Author - </h5> */}
                            <h6 className="mt-3 mb-4">Blog Posted - {blogData.postingTime}</h6>
                            <div className="write-your-own-btn col-12 pt-3">
                                <Link to="/createblog"><button className="signin-common-btn col-12">Write your own</button></Link>
                            </div>
                        </div>

                        <div className="display-blog-body col-12 mt-4">
                            <p dangerouslySetInnerHTML={{__html:blogData.body}} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReadBlog;
