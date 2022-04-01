import { collection, getDocs } from "firebase/firestore";
import {usersRef} from "../firebase/firebase"
import { renderPeopleToUI, showUserLoggedIn } from "./ui/ui";
import storage from "./localStorage/storage"

export class People {
    getUser(userName){
        showUserLoggedIn(userName)
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
            const username = e.target.parentElement.previousElementSibling.children[1].children[0].textContent;
            const id = e.target.parentElement.parentElement.id.split('-')[1];
            console.log({id: id, username: username})
            storage.store({id: id, username: username}, 'chatRequest');
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

