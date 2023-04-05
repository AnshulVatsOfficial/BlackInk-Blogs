import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import LoginPageImage from '../assets/loginpageimage.jpg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useToast } from '@chakra-ui/react';

const Login = () => {

    let navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    //Allowing user to create a Account if doesn't have one
    const myRealtimeDatabase = getDatabase();

    const toast = useToast();//using Chakra UI Toast

    const createUserAccount = (event) => {
        event.preventDefault();
        if(userName != "" && userEmail != "" && userPassword != ""){
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                localStorage.setItem("isSignedUp", true);
                localStorage.setItem("isAuth", false);
                localStorage.setItem("isSignedIn", false);
                
                const user = userCredential.user;
                console.log(user);
                set(ref(myRealtimeDatabase, 'users/' + user.uid), {
                    name: userName,
                    email: userEmail,
                    password : userPassword
                })
                .then((data) => {
                    console.log(data.userName);
                })
                .catch((error) => {
                    console.log(error);
                });

                toast({
                    title: 'Account created Successfully !',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                })
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            })
            .catch((error) => {
                console.log(error);        
                alert("Error creating account !");
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        }
        else{
            alert("Please enter all details !");
        }
    }

    //allowing user to sign in with his email and password if has alreday a account
    const allowUserSignIn = (event) =>{
        event.preventDefault();
        if(localStorage.getItem("isAuth") === "false"){//If user is not already signed in with Google
            signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("isSignedIn", true);
                toast({
                    title: 'Signin Successful !',
                    description: "You're signed in into BlackInk",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
                console.log(userCredential.user.auth);   
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Invalid Username or Password !");
            });
        }
        else{//If user is already signed in with Google
            toast({
                title: "You're already signed in !",
                description: "You're already signed in into BlackInk",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 3000);
        }
    }
    //allowing user to signin directly with Google
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).
            then((response)=>{
                localStorage.setItem("isAuth", true);
                localStorage.setItem("isSignedIn", true);
                toast({
                    title: 'Signin Successful !',
                    description: "You're signed in into BlackInk",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 3000);
            }).
            catch((error)=>{
                console.log(error);
        });
    }

    //allowing users to sign out
    const signOutOfBlackInk = () => {
        signOut(auth).
        then(()=>{
            localStorage.setItem("isAuth", false);
            localStorage.setItem("isSignedIn", false);
            toast({
                title: 'Signout Successful !',
                description: "You're signed out of BlackInk",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 3000);
        });
    }
    
        return (
        <section id="login-section">
            <div className="login-div">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center my-4">

                        <div className="login-image-div d-flex justify-content-center align-items-center col-lg-6 col-12 my-lg-5 mt-3">
                            <img src={LoginPageImage} alt="" className="img-fluid rounded-3" style={{maxWidth:"105%"}}/>
                        </div>

                        <div className="form-info-div col-lg-6 col-12 my-lg-5 mt-4">
                        <div className="my-form d-flex flex-column justify-content-center align-items-center">
                            <form className="user-form col-12">
                                {
                                    localStorage.getItem("isSignedUp") == "true"
                                    ?
                                    <>
                                    <div class="form-floating my-3">
                                        <input type="email" value={userEmail} onChange={(event)=>{setUserEmail(event.target.value)}} class="form-control" id="floatingInput" placeholder="name@example.com"/>
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div class="form-floating my-3">
                                        <input type="password" value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}} class="form-control" id="floatingPassword" placeholder="Password"/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div class="form-floating my-3 login-buttons">
                                        <button onClick={(event)=>allowUserSignIn(event)} className="create-acc-btn" id="floatingButton">Sign In Now</button>
                                    </div>
                                    </>
                                    :
                                    <>
                                    <div class="input-group my-3">
                                    <div class="form-floating">
                                        <input type="text" value={userName} onChange={(event)=>{setUserName(event.target.value)}} class="form-control" id="floatingInputGroup1" placeholder="Username"/>
                                        <label htmlFor="floatingInputGroup1">Username</label>
                                    </div>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="email" value={userEmail} onChange={(event)=>{setUserEmail(event.target.value)}} class="form-control" id="floatingInput" placeholder="name@example.com"/>
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>

                                    <div class="form-floating my-3">
                                        <input type="password" value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}} class="form-control" id="floatingPassword" placeholder="Password"/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <div class="form-floating my-3 login-buttons">
                                        <button onClick={(event)=>createUserAccount(event)} className="create-acc-btn" id="floatingButton">Create Account</button>
                                    </div>
                                    </>
                                }
                            </form>

                            <h6>- OR -</h6>
                            {
                                localStorage.getItem("isAuth") == "true"
                                ?
                                <div className="google-btn col-12">
                                    <button className="signin-common-btn mb-lg-1 mb-md-2 mb-sm-2 mb-2" onClick={signOutOfBlackInk}><i class="fa-solid fa-face-frown"></i> &nbsp;Click to Sign Out</button>
                                </div>
                                :
                                <div className="google-btn col-12">
                                    <button className="signin-common-btn mb-lg-1 mb-md-2 mb-sm-2 mb-2" onClick={signInWithGoogle}><i className="fa-brands fa-google"></i> &nbsp;Sign in with Google</button>
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
