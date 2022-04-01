import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {message} from "./message";

// Make a login Class 
// Make a validate login method
// Import an http class
// Get all the users and check if they are in the database
// If the users is in the database change the location link to the chat-home-page
// Else display an error

class Login {
    async validateDetails (){
        const details = {
            email: document.querySelector('#login-email').value,
            password: document.querySelector('#login-password').value
        };

        // Lets check the details (email and password)
        if(details.email === '' || details.password == ''){
            const uu = document.querySelector('#register-header');
            console.log(uu)
            return (
                message.showError(
                    "#login-header",
                    "#login-section",
                    `Fill in your email and password correctly`,
                    "bg-red-500",
                    "white"
                )
            )
        } else {
            const auth = getAuth();
            // console.log(Auth)
            
            signInWithEmailAndPassword(auth, details.email, details.password).then((res, err) => {
                window.location = "chat-home-page.html"
            }).catch(err => {
                message.showError(
                    "#login-header",
                    "#login-section",
                    `${err.message}`,
                    "bg-red-500",
                );
                
            })
        }



        

        
    }

}

const login = new Login();
export default login;