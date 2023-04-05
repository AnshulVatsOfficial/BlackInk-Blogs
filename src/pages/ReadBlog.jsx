import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import {useEffect, useState } from "react"
import { database } from '../firebase-config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from '@chakra-ui/react';

const ReadBlog = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({});
    const [userId, setUserId] = useState("");
    let navigate = useNavigate();

    const toast = useToast();

    const auth = getAuth();//getting user uid on even after refresh
    onAuthStateChanged(auth, (user) => {
        if(user){
            const uid = user.uid;
            setUserId(uid);
        }
        else{
            console.log("Error gettting UID");
        }
    });

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

    //a function to delete the blog you've written
    const deleteYourBlog = async (id) => {
        if(window.confirm("Do you really want to delete your blog?")){
            const userBlogPost =  doc(database, "Blogs", id);
            await deleteDoc(userBlogPost)
            .then((resolve)=>{
                toast({
                    title: 'Post Deleted Successfully !',
                    description: "",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
                // alert("Post Deleted Successfully !");
                setTimeout(() => {
                    navigate("/");//getting redirected to home page after successful creation of a blog
                    window.location.reload();
                }, 2500);
            })
            .catch((error)=>{
                console.log("Error Deleting Post !");
                toast({
                    title: 'Error Deleting Post !',
                    description: "",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            });
        }
        else{
            toast({
                title: 'Deletion revoked successfully !',
                description: "",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
        }
    }

    return (
        <section id="read-blog-section">
            <div className="read-blog-div">
                <div className="container">
                    <div className="row">
                        <div className="display-blog-poster col-lg-7 col-12 mt-4">
                            <img src={blogData.posterUrl} className="img-fluid rounded-4 shadow" />
                        </div>

                        <div className="display-blog-title col-lg-5 col-12 mt-4">
                            <h1 className="">{blogData.title}</h1>
                            <h5 className="mt-3 mb-2">Author - {blogData.author}</h5>
                            <h6 className="mt-3 mb-4">Blog Posted - {blogData.postingTime}</h6>
                            {
                                blogData.authorId == userId
                                ?
                                <div className="write-your-own-btn col-12 pt-3">
                                    {
                                        localStorage.getItem("isAuth") === "true"
                                        ?
                                        <Link to="/createblog"><button className="signin-common-btn mb-lg-0 mb-md-0 mb-sm-0 mb-3">Write your own</button></Link>
                                        :
                                        <Link><button onClick={()=>{alert("Please sign in to write a Blog !");}} className="signin-common-btn mb-lg-0 mb-md-0 mb-sm-0 mb-3">Write your own</button></Link>
                                    }
                                    <button className="signin-common-btn mb-lg-0 mb-md-0 mb-sm-0 mb-3" id="delete-blog" onClick={()=>{deleteYourBlog(id)}}>Delete Blog</button>
                                </div>
                                :
                                <div className="write-your-own-btn col-12 pt-3">
                                    <Link><button onClick={()=>{alert("Please sign in to write a Blog !");}} className="signin-common-btn" style={{width:"100%"}}>Write your own</button></Link>
                                </div>
                            }
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
