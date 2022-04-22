import {addDoc, collection, doc, getDocs, updateDoc, collectionGroup, onSnapshot, query, where, orderBy, getDoc,} from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {db} from "../firebase/firebase"
import storage from "./localStorage/storage";
import {showPersonChattingWithDetails, showMsgToUI, addMsgToUI} from "./ui/ui";

class Chats {
    getAllUserChatsHistory(user){
        console.log('loadeed');
        // const historyRef = doc(db, `chatHistory`, user.uid);
        // const colRef = collection(db, `chatHistory/chats/${user.uid}`);
        // const colgref = collectionGroup(db, user.uid);

        // const sfRef = db.collection('chatRequest').doc('SF');
        // const collections = await sfRef.listCollections();
        // collections.forEach(collection => {
        // console.log('Found subcollection with id:', collection.id);
        // });


        // getDocs(colgref).then(res => {
        //     res.docs.forEach(d => console.log(d.data()));
        //     console.log(res.docs);
        // })
        // getDoc(colRef).then(res => {
        //     console.log(res.data())
        // })
    }
    getPersonChattingWith(user){
        const get = storage.get('chatRequest');
        getDoc(doc(db, 'users', user))
        showPersonChattingWithDetails(get);
        updateDoc(doc(db, 'users', user.uid), {chatRequest: get.id})
    }

    sendMsg(id){
        const msg = document.querySelector("#messageInput").value;
        if(msg.length < 1) return;
        const get = storage.get('chatRequest');
        const chatsRef = collection(db, `chatHistory/${get.id}/${id}`);
        const usersRef = collection(db, `chatHistory/${id}/${get.id}`);
        const message = {
            msg: msg,
            typedFrom: id,
            time: new Date(),
            status: 'sent'
        }
        addMsgToUI(message);
        setTimeout(() => {
            getDoc(doc(db, `users`, get.id)).then(res => {
                console.log(res)
                console.log(res.data().chatRequest, id)
                if(res.data().chatRequest === id){
                    message.status = 'seen'
                    addDoc(chatsRef, message);
                    addDoc(usersRef, message)
                } else {
                    addDoc(chatsRef, message);
                    addDoc(usersRef, message);
                    
                }
            })
        }, 200);
        
        
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
            window.location = "#amber";
        })
        
    }
}

const chats = new Chats();
const getPersonChattingWith = chats.getPersonChattingWith;
const sendMsg = chats.sendMsg;
let [getMsgs, getAllUserChatsHistory] = [chats.getMsgs, chats.getAllUserChatsHistory];

export default chats;
export {getPersonChattingWith, sendMsg, getMsgs, getAllUserChatsHistory};