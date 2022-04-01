import { setDoc, doc, collection } from "firebase/firestore";
import {updateProfile} from "firebase/auth";
import {
  usersRef,
  usernameRef,
  getUsernames,
  getDoc,
  addDoc,
  createUser,
  auth,
  db,
} from "../firebase/firebase";
import { message } from "./message";

class RegisterSlider {
  constructor() {
    this.index = 0;
  }

  counter() {
    if (this.index < 1) {
      this.index++;
      return this.index;
    } else {
      this.index = 0;
      return this.index;
    }
  }

  slideToLogin() {
    const slider = document.querySelector("#register-slider");
    const width = slider.children[0].clientWidth;

    slider.style.transform = `translateX(-${width * this.counter()}px)`;
    slider.style.transition = `0.25s ease-in-out`;
  }

  slideToRegister() {
    const slider = document.querySelector("#register-slider");
    const width = slider.children[0].clientWidth;

    slider.style.transform = `translateX(-${width * this.counter()}px)`;
    slider.style.transition = `0.25s ease-in-out`;
  }
}

class CollectRegistrationDetails {

  validateDetails() {
    const formValues = {
      fullname: document.querySelector("#register-fullname"),
      email: document.querySelector("#register-email"),
      username: document.querySelector("#register-username"),
      password: document.querySelector("#register-password"),
    };

    const formReg = {
      reFullname: /^[A-Za-z]{3,15}\s+[A-Za-z]{3,15}[A-Za-z\s?]{3,15}?$/,
      reEmail: /^([A-Za-z\d+]\.?){3,30}\@([a-z\d+]{2,7})\.([a-z\d+]{2,6})$/,
      reUsername: /^[a-zA-Z][a-zA-Z\-?\.?\_?\d+?]{0,30}[A-Za-z\d+?]{0,30}$/,
      rePassword: /[\w+?\d+?\s?]/,
    };

    const testedFormValues = {
      fullname: formReg.reFullname.test(formValues.fullname.value),
      email: formReg.reEmail.test(formValues.email.value),
      username: formReg.reUsername.test(formValues.username.value),
      password: formReg.rePassword.test(formValues.password.value),
    };

    // console.log(testedFormValues)

    const arrayOfFormValues = [];
    let invalid = "";

    for (const key in testedFormValues) {
      if (testedFormValues[key] === true) {
        const obj = { [key]: formValues[key].value };
        arrayOfFormValues.push(obj);
      } else {
        arrayOfFormValues.push(false);
        invalid += `${key}, `;
      }
    }

    if (arrayOfFormValues.find((item) => item === false) === false) {
      return { status: false, value: invalid.slice(0, -2) };
    } else {
      const formDetailsObject = {};
      arrayOfFormValues.forEach((val, index) => {
        formDetailsObject[Object.keys(val)[0]] = Object.values(val)[0];
      });

      return {
        status: "pending",
        value: arrayOfFormValues,
      };
    }
  }
}

class RegisterAndLoginUser {
  registerUser(data) {
      
    if (data.status === false) {
      message.showError(
        "#register-header",
        "#register-section",
        `Fill in your ${data.value} correctly`,
        "bg-red-500",
        "white"
      );
    } else if (data.status === "pending") {
      const formUsername = data.value[2].username;
      const formEmail = data.value[1].email;
      const formPassword = data.value[3].password;
      const formFullname = data.value[0].fullname;


      const userRef = doc(db, "usernames", formUsername);
      const button = document.querySelector('#registerBtn');
      button.innerHTML = `<img src='./img/loading-buffering.gif' class="w-8 h-8 flex justify-center items-center"/>`;
      button.disabled = true;
      (async () => {
        const result = await getDoc(userRef);
        if(result.data()){
            console.log(result.data())
            if(result.data().username === formUsername){
                button.textContent = 'submit';
                button.disabled = false;
                message.showError(
                "#register-header",
                "#register-section",
                `This username has been taken already`,
                "bg-red-500",
                "white"
            );
            }
        } else {
            try {
                const createdUser = await createUser(auth, formEmail, formPassword).catch(err => {
                    button.textContent = 'submit';
                    button.disabled = false;
                    message.showError(
                    "#register-header",
                    "#register-section",
                    `${err.message}`,
                    "bg-red-500",
                    "white"
                    );
                });
                console.log(createdUser);

                if(createdUser){
                    const updatedUser =  await updateProfile(createdUser.user, {displayName: formUsername});
                    const username = createdUser.user.displayName
                    await setDoc(doc(db, 'usernames', username), {username: username})
                    console.log(updatedUser);
                    const uid = createdUser.user.uid;
                    const userDetails = {
                        chatRequest: '',
                        email: createdUser.user.email,
                        fullname: formFullname,
                        id: uid,
                        password: formPassword,
                        photoURL: '',
                        recentReceivedMsg: {from: '', msg: ''},
                        recentSentMsg: {to: '', msg: ''},
                        username: createdUser.user.displayName,
                    };
                    const userFriends = collection(db, `friends/${uid}/allFriends`);
                    collection(db, `chatHistory/${uid}/allChats`);
                    const usersDetailsRef = doc(db, 'users', uid);
                    const newUserDetails = await setDoc(usersDetailsRef, userDetails);
                    console.log(newUserDetails);
                    window.location = 'chat-home-page.html';
        
                    console.log(userFriends);
                } else{
                    console.log('Error')
                }
            } catch (error) {
                console.log(error)
            }

        }
      })()
      getDoc(userRef)
    }
  }
}

const registerSlider = new RegisterSlider();
const collectRegistrationDetails = new CollectRegistrationDetails();
const registerAndLoginUser = new RegisterAndLoginUser();

export { registerSlider, collectRegistrationDetails, registerAndLoginUser };

// console.log('kd')