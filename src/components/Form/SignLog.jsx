import './SignLog.css'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/Firebase/firebase.js'

function SignLog() {


    const [userObj, setUserObj] = useState({
        userName: '',
        userEmail: '',
        userPass: '',
    })

    const userValueChanged = (e) => {
        setUserObj(
            {
                ...userObj, [e.target.name]: e.target.value   

            })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();  

        try {                           
            let userData = await createUserWithEmailAndPassword(auth, userObj.userEmail, userObj.userPass, userObj.userName)
            console.log(userData);
            alert('SIGN UP SUCESSFULL NOW LOGIN ✔')

        }
        catch (error) {
            console.error(error.code, error.msg);
            alert(`${error.code} ❌`)
        }
    }



    const [userLogObj , setLogUserOj] = useState({
        userEmail : '',
        userPass : '',
      })
    
      const  userLogValueChanged = (e) => {
        setLogUserOj({...userLogObj, [e.target.name] : e.target.value})
      }
    
      const handleLogIn =  async (e) => {
           
        e.preventDefault(); 
        
        try{                      
          let data = await signInWithEmailAndPassword(auth, userLogObj.userEmail, userLogObj.userPass)
          console.log(data);
          alert('LOGIN SUCESSFULLY ✔')
        }
        catch(error) {
          console.error(error.message, error.code);
           alert(`${error.code} ❌`)
        }
      }

    return (
        <>
            <div className="main">
                <div className="wrapper">
                    <div className="card-switch">
                        <label className="switch">
                            <input type="checkbox" className="toggle" />
                            <span className="slider"></span>
                            <span className="card-side"></span>
                            <div className="flip-card__inner">
                                <div className="flip-card__front">
                                    <div className="title">Log in</div>
                                    <form className="flip-card__form">
                                        <input onChange={userLogValueChanged} className="flip-card__input" name="userEmail" placeholder="Email" type="email" />
                                        <input onChange={userLogValueChanged} className="flip-card__input" name="userPass" placeholder="Password" type="password" />
                                        <button onClick={handleLogIn} className="flip-card__btn">Let`s go!</button>
                                    </form>
                                </div>
                                <div className="flip-card__back">
                                    <div className="title">Sign up</div>
                                    <form className="flip-card__form" action="">
                                        <input onChange={userValueChanged} className="flip-card__input" placeholder="userName" type="name" />
                                        <input onChange={userValueChanged} className="flip-card__input" name="userEmail" placeholder="Email" type="email" />
                                        <input onChange={userValueChanged} className="flip-card__input" name="userPass" placeholder="Password" type="password" />
                                        <button className="flip-card__btn" onClick={handleSignUp}>Confirm!</button>
                                    </form>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignLog