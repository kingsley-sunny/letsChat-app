class UI {
    renderPeopleToUI(selector, users, mainUser){
        const container = selector;
        let posts = ''
        users.forEach(user => {
            const res = user

            if(res.id !== mainUser.uid){
                posts += `
                <div id="person-${res.id}" class="flex lg:flex-col w-full justify-between items-center rounded-sm py-3">
                    <!-- The image and the name container -->
                    <div class="flex lg:flex-col  gap-x-2 items-center w-full h-full justify-start lg:justify-center">
                        <!-- The image -->
                        <div id class="flex justify-center items-center w-16 h-16 lg:w-32 lg:h-32 rounded-full overflow-hidden">
                            <img id="img-${res.id}" src="${res.photoURL}" alt="user" class="w-full h-full object-cover object-center">
                        </div>
        
                        <!-- The Description -->
                        <div class="space-y-2 overflow-hidden flex flex-col lg:justify-center lg:items-center">
                            <h2 id="username-${res.id}" class="lg:text-2xl text-xl text-ellipsis overflow-hidden max-w-[200px] font-bold">${res.username}</h2>
                            <p id="fullname-${user.id}" class="lg:text-sm text-sm text-ellipsis overflow-hidden max-w-[200px]">${user.fullname}</p>
                        </div>
                    </div>
        
                    <!-- The chat and the add friend container -->
                    <div class="flex gap-x-2 lg:mt-4 px-2">
                        <a href="chat-person.html" id="chat-btn" name="${res.username}" uid="${res.id}" photo="${res.photoURL}" class="px-2 py-2 lg:px-4 lg:py-2 text-xs uppercase font-bold rounded-lg bg-green-500">
                            <p id="chat-btn" name="${res.username}" uid="${res.id}" photo="${res.photoURL}" class="hidden lg:inline">chat</p>
                            <svg id="chat-btn" name="${res.username}" uid="${res.id}" photo="${res.photoURL}" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                         </a>
                        <button id="add-friend-${user.id}" class="px-2 py-2 lg:px-4 lg:py-2  text-xs uppercase font-bold rounded-lg bg-orange-500"> 
                            <p class="hidden lg:block">add friend</p>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:hidden" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                        </button>
                    </div>
                </div>
                `;  
            }
        });

        container.innerHTML = posts;
    }

    showUserLoggedIn(user) {
        const name = document.querySelector("#person-name");
        const imageContainer = document.querySelector("#person-image");

        name.textContent = user.displayName;
        imageContainer.src = user.photoURL;
    }

    showPersonChattingWithDetails(data) {
        console.log(data)
        const username = document.querySelector('#chat-username');
        username.textContent = data.username;
        const image = document.querySelector("#chat-image");
        image.src = data.image;
    }

    addMsgToUI(msg){
        const container = document.querySelector('#chat-container');
        let style;
        style = `
            <div class=" flex justify-end items-center px-4 mt-6">
                <div class="bg-green-500 py-3 px-4 max-w-[80%] rounded-2xl rounded-br-none">
                    <p class="">${msg.msg}</p>
                    <div class="flex mt-8 flex-col justify-end items-end">
                        <span class="">sending.....</span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += style;
    }

    showMsgToUI(msgs, id){
        const container = document.querySelector('#chat-container');
        let style;
        container.innerHTML = '';
        const post = [];
        msgs.forEach(msg => {
            post.push(msg)
            if(msg.typedFrom === id){
                style = `
            <div class=" flex justify-end items-center px-4 mt-6">
                <div class="bg-green-500 py-3 px-4 max-w-[80%] rounded-2xl rounded-br-none">
                    <p class="">${msg.msg}</p>
                    <div class="flex mt-8 flex-col justify-end items-end">
                        <span class="text-xs">${new Date(msg.time.toDate()).toUTCString()}</span>
                        <span class="msgStatus">${msg.status || 'sending.....'}</span>
                    </div>
                </div>
            </div>
            `;
            container.innerHTML += style;
            } else {
                style = `
            <div class=" flex justify-start items-center mt-6">
                <div class="bg-gray-500 py-3 px-4 max-w-[80%] rounded-2xl rounded-bl-none">
                    <p class="">${msg.msg}</p>
                    <div class="flex mt-8 flex-col justify-end items-end">
                        <span class="text-xs">${new Date(msg.time.toDate()).toUTCString()}</span>
                    </div>
    
                </div>
            </div>
            `;
            container.innerHTML += style; 
            }
    
            
        })
        console.log(post)
    }
}

const ui = new UI();
const renderPeopleToUI = ui.renderPeopleToUI;
const showUserLoggedIn = ui.showUserLoggedIn;
const showPersonChattingWithDetails = ui.showPersonChattingWithDetails;
const showMsgToUI = ui.showMsgToUI;
const addMsgToUI = ui.addMsgToUI;

export {renderPeopleToUI, showUserLoggedIn, showPersonChattingWithDetails, showMsgToUI, addMsgToUI}
