import { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import CreateABlogImage from '../assets/createablogimage.jpg';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

//firebase config file (unique for each firebase project)
const firebaseConfig = {
    apiKey: "AIzaSyAfVyW5Wjbqi0N6uhFAK7UvE3S4gCn-hCk",
    authDomain: "blackink-a1fe6.firebaseapp.com",
    projectId: "blackink-a1fe6",
    storageBucket: "blackink-a1fe6.appspot.com",
    messagingSenderId: "1066688062237",
    appId: "1:1066688062237:web:b719f4e402acf43eaaf7f4"
};

const CreateBlog = () => {
    //maintaining states of blog title, blog body and blog poster URL
    const [blogTitle, setBlogTitle] = useState("");
    const [blogBody, setBlogBody] = useState("");
    const [myBlogPoster, setMyBlogPoster] = useState({});
    const [myBlogPosterUrl, setMyBlogPosterUrl] = useState("");
    const [blogPosterName, setBlogPosterName] = useState("");//setting name of Blog Poster same as Blog Title
    const [blogPostingTime, setBlogPostingTime] = useState("");

    let navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem("isPosterUploaded", false);
    }, []);

    //creating reference to store blog info. in a collection named "Blogs" in Firestore Database
    const blogCollectionRef = collection(database, "Blogs");

    //initializing Firebase Storage
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const blogMetadata = {//metadata for each blog
        title: blogTitle,
        body: blogBody,
        posterUrl: myBlogPosterUrl,
        postingTime: blogPostingTime
    }

    const blogPosterMetaData = {//metadata for blog poster being uploaded to Firebase Storage
        contentType: 'image/*'
    }

    //a function to upload Blog Poster to firebase storage
    const uploadBlogPoster = () => {
        const storageRef = ref(storage, blogPosterName);
        const uploadTask = uploadBytesResumable(storageRef, myBlogPoster, blogPosterMetaData);
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            },
            (error) => {
                switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
                }
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL and use it
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setMyBlogPosterUrl(downloadURL);
                    console.log('File available at', downloadURL);

                    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];//array of weekdays

                    let day = weekDays[new Date().getDay()];//taking timestamp at which user posted the Blog
                    day = day.slice(0, 3);
                    let hours = new Date().getHours();
                    let minutes = new Date().getMinutes();
                    if(hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 60){
                        let AMorPM = 'AM';
                        if(hours > 12){
                            AMorPM = 'PM';
                        }
                        hours = (hours % 12);
                        let blogPostTimestamp = "";
                        if(hours >= 0 && hours < 10 && minutes >= 0 && minutes < 10){
                            blogPostTimestamp = blogPostTimestamp + day + "-" + "0" + hours + ":" + "0" + minutes + " " + AMorPM;
                        }
                        else if(hours >= 0 && hours < 10 && minutes >= 10 && minutes <= 60){
                            blogPostTimestamp = blogPostTimestamp + day + "-" + "0" + hours + ":" + minutes + " " + AMorPM;
                        }
                        else if(hours >= 10 && hours < 24 && minutes >= 0 && minutes < 10){
                            blogPostTimestamp = blogPostTimestamp + day + "-" + hours + ":" + "0" + minutes + " " + AMorPM;
                        }
                        else{
                            blogPostTimestamp = blogPostTimestamp + day + "-" + hours + ":" + minutes + " " + AMorPM;
                        }
                        setBlogPostingTime(blogPostTimestamp);
                        console.log(blogPostTimestamp);
                    }
                });
            }
            );
            localStorage.getItem("isPosterUploaded", true);//if poster uploaded successfully
            alert("Blog Poster Uploaded successfully !");
    }
    
    //a function to submit the blog title and blog body to Firestore Database
    const submitBlogToFirestore = async () => {
        if(blogTitle == ""){//if blog title is empty
            alert("Please enter Blog Title");
        }
        else if(blogTitle.length > 100){//if blog title is more than 100 characters
            alert("Blog Title should be <= 100 characters !");
        }
        else if(blogBody == ""){//if blog body is empty
            alert("Please write something in your Blog !");
        }
        else if(blogBody.length < 500){//if blog body is less than 500 characters
            alert("Blog should be atleast 500 characters long or more !");
        }
        else if(localStorage.getItem("isPosterUploaded") == false){//if blog poster is not uploaded
            alert("Please upload a Blog Poster !");
        }
        else{
            await addDoc(blogCollectionRef, blogMetadata)
            .then((resolve)=>{
                console.log(resolve);
            })
            .catch((error)=>{
                console.log(error);
            });
            alert("Your Blog posted successfully !");
            // navigate("/");//getting redirected to home page after successful creation of a blog
            // window.location.reload();
        }
    }

    return (
        <section id="create-blog-section">
            <div className="create-blog-div">
                <div className="container">
                    <div className="row d-flex justify-content-center my-4">

                        <div className="create-blog-image d-flex justify-content-center align-items-center col-lg-6 col-12 my-2">
                            <img src={CreateABlogImage} className="img-fluid" style={{maxWidth:"88%"}}/>
                        </div>

                        <div className="write-your-blog d-flex flex-column justify-content-center align-items-center col-lg-6 col-12 my-2">
                            {/* <h2 className="mb-3">What's on your mind today</h2> */}
                            <div className="blog-title col-12 mb-3">
                                <input type="text" className="form-control col-12" name="blog-title" id="floatingInput" value={blogTitle} onChange={(event)=>{setBlogTitle(event.target.value)}} placeholder="Your blog title..."/>
                            </div>

                            <div className="blog-body col-12 mb-3">
                                <textarea name="blog-body" className="form-control col-12" id="floatingTextarea" cols="30" rows="10" value={blogBody} onChange={(event)=>{setBlogBody(event.target.value)}} placeholder="Write your blog here..."></textarea>
                            </div>
                        
                            <div className="blog-poster-div col-12 d-flex justify-content-center align-items-center">
                                <input type="file" className="mt-lg-0 mt-2 mb-2" onChange={(event)=>{console.log(event.target.files[0]); setMyBlogPoster(event.target.files[0]); setBlogPosterName(blogTitle)}} accept="image/*" name="blogImageFile" id="blogImageFile" />
                            </div>

                            <div className="blog-buttons col-12 d-flex justify-content-center align-items-center">
                                <div className="poster-upload-btn col-lg-6 col-12 mt-lg-0 mt-2 mb-lg-0 mb-2 d-flex justify-content-center align-items-center">
                                    <button className="signin-common-btn col-10" onClick={uploadBlogPoster}>Upload Poster <i class="fa-solid fa-circle-arrow-up"></i></button>
                                </div>
                                
                                <div className="submit-blog col-lg-6 col-12 mt-lg-0 mt-2 mb-lg-0 mb-2 d-flex justify-content-center align-items-center">
                                    <button onClick={submitBlogToFirestore} className="signin-common-btn col-10">Create Blog <i class="fa-solid fa-pen"></i></button>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateBlog;