import {addDoc, collection, doc, getDocs, updateDoc, onSnapshot, query, where, orderBy} from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {db} from "../firebase/firebase"
import storage from "./localStorage/storage";
import {showPersonChattingWithDetails, showMsgToUI, addMsgToUI} from "./ui/ui";

class Chats {
    getPersonChattingWith(){
        const get = storage.get('chatRequest')
        showPersonChattingWithDetails(get);
    }

    sendMsg(id){
        const msg = document.querySelector("#messageInput").value;
        if(msg.length < 1) return;
        const get = storage.get('chatRequest');
        const chatsRef = collection(db, `chatHistory/${id}/${get.id}`);
        const usersRef = collection(db, `chatHistory/${get.id}/${id}`);
        const message = {
            msg: msg,
            typedFrom: id,
            time: new Date()
        }
        addMsgToUI(message);
        setTimeout(() => {
            addDoc(chatsRef, message);
            addDoc(usersRef, message);
        }, 200);
        
        // chats.getMsgs(id);
    }


    getMsgs(id){
        const get = storage.get('chatRequest');
        const colRef = collection(db, `chatHistory/${get.id}/${id}`);
        const q = query(colRef, orderBy('time', 'asc'));
        onSnapshot(q, snap => {
            const books = [];
            snap.docs.forEach(item => {
                books.push(item.data());
            });
            console.log(books);
            showMsgToUI(books, id);
            window.location = "#amber"
        })
        
    }
}

const chats = new Chats();
const getPersonChattingWith = chats.getPersonChattingWith;
const sendMsg = chats.sendMsg;
const getMsgs = chats.getMsgs;

export default chats;
export {getPersonChattingWith, sendMsg, getMsgs};