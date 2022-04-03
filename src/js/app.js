import {getAuth, onAuthStateChanged} from "firebase/auth"
import {htmlDomElement} from "./lib/funcs";
import nav from "./navCtrl";
import { registerSlider, collectRegistrationDetails, registerAndLoginUser } from "./registerAndlogin";
import login from "./login";
import {getPeople, getUser, linkToChatUser} from './people';
import {getPersonChattingWith, sendMsg, getMsgs} from "./chat.js";
import profileClass from "./profile.js"

class LetsChat {
  // @oKECHUKWU01
  loadApp() {
    window.onload = () => {
      // for the nav bar
      htmlDomElement(document.querySelector("#HomeMenuIcon"), {
        eventName: "click",
        eventHandler: () => {
          nav.toggleNav();
        },
      });

      // For the register slider
      htmlDomElement(document.querySelector("#already-registered-btn"), {
        eventName: "click",
        eventHandler: () => {
          registerSlider.slideToLogin();
        },
      });

      // For the login slider
      htmlDomElement(document.querySelector("#not-yet-register-btn"), {
        eventName: "click",
        eventHandler: () => {
          registerSlider.slideToRegister();
        },
      });

      // For the registration of a user
      htmlDomElement(document.querySelector("#registerBtn"), {
        eventName: "click",
        eventHandler: () => {
          const details = collectRegistrationDetails.validateDetails();
          registerAndLoginUser.registerUser(details);
        },
      });

      // For the login details
      htmlDomElement(document.querySelector("#login-btn"), {
        eventName: "click",
        eventHandler: (e) => {
          e.preventDefault();

          login.validateDetails();
        },
      });





      // TO GET THE MAIN USER
      const auth = getAuth();
      onAuthStateChanged(auth, (mainUser) => {
        console.log(mainUser);

        // To get all the users apart from the main user
        htmlDomElement(document.querySelector("#people-container"), {
          domLoaded: () => {
            if (!mainUser) {
              window.location = "register.html";
              return null;
            }
            getPeople(mainUser);
            getUser(mainUser);
          },
        });

        // Link to the chat page
        htmlDomElement(document.querySelector("#people-container"), {
          eventName: "click",
          eventHandler: (e) => {
            linkToChatUser(e);
          },
        });

        // Get the person chatting with details
        htmlDomElement(document.querySelector("#chat-home"), {
          domLoaded: () => {
            getPersonChattingWith();
          },
        });

        // Send msg
        htmlDomElement(document.querySelector("#sendMsgBtn"), {
          eventName: "click",
          eventHandler: (e) => {
            sendMsg(mainUser.uid);
          },
        });

        // Get all the chats from firestore
        htmlDomElement(document.querySelector("#chat-container"), {
          domLoaded: (e) => {
            getMsgs(mainUser.uid);
          },
        });


        // Edit profile Picture
        // htmlDomElement(document.querySelector("#file-input"), {
        //     eventName: "change",
        //     eventHandler: (e) => {
        //         profileClass.editProfile(e, mainUser)
        //     },
        //   });



        // // Load Profile picture when the edit-profile-picture is being loaded
        // htmlDomElement(document.querySelector("#edit-image-container"), {
        //     domLoaded: (e) => {
        //         const img = document.querySelector('#update-profile-img');
        //         img.src = mainUser.photoURL;
        //     },
        //   });
      });
    };
  }
}

const letschat = new LetsChat();
letschat.loadApp();