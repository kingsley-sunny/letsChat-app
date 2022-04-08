import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {usersRef, db} from "../firebase/firebase"
import { renderPeopleToUI, showUserLoggedIn } from "./ui/ui";
import storage from "./localStorage/storage"

export class People {
    getUser(userName){
        showUserLoggedIn(userName);
        updateDoc(doc(db, 'users', userName.uid), {chatRequest: ""})
    }
    getPeople(exceptUser) {
        
        if(!exceptUser){
            window.location = 'register.html';
        } else {
            const get = storage.get('people');
            if(get){
                renderPeopleToUI(document.querySelector('#people-container'), get, exceptUser);
            }

            (async ()=>{
                const gotten = (await getDocs(usersRef)).docs
                storage.store(gotten, 'people');
                const data = storage.get('people');
                renderPeopleToUI(document.querySelector('#people-container'), data, exceptUser);
            })()
        }
    }

    linkToChatUser(e){
        if(e.target.id === 'chat-btn'){
            e.preventDefault();

            console.log('jdj')
            const username = e.target.getAttribute('name');
            const uid = e.target.getAttribute('uid');
            const image = e.target.getAttribute('photo');
            console.log({id: uid, username: username, image: image})
            storage.store({id: uid, username: username, image: image}, 'chatRequest');

            window.location = 'chat-person.html';                        
        }
    }
}

const people = new People();
const getPeople = people.getPeople;
const getUser = people.getUser;
const linkToChatUser = people.linkToChatUser;

export default people;
export {getPeople, getUser, linkToChatUser}

