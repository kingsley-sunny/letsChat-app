import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {updateProfile} from "firebase/auth";
import { updateDoc, doc, collection } from "firebase/firestore";
import {db} from "../firebase/firebase"
class Profile {

    // The edit profile 
    editProfile(e, user){
        const storage = getStorage();
        const imgRef = ref(storage, `images/${user.uid}`);
        const file = e.target.files[0];
        const userRef = doc(collection(db, 'users'), user.uid)
        if(file.type.includes('image')){
            uploadBytes(imgRef, file).then(res => {
                console.log(res, "uploaded...");


                getDownloadURL(imgRef).then(url => {
                    const img = document.querySelector('#update-profile-img');
                    img.src = url;

                    // Update auth profile picture
                    updateProfile(user, {photoURL: url});

                    // Update the users collection
                    updateDoc(userRef, {photoURL: url});
                });

            })
        } else {
            alert('Please Put an Image ')
        }
        console.log(storage);
        
        console.log(e.target.files[0]);
    }
}

const profileClass = new Profile();
export default profileClass;