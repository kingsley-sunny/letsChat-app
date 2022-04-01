class UI {
    renderPeopleToUI(selector, users, mainUser){
        const container = selector;
        let posts = ''
        users.forEach(user => {
            const res = user

            if(res.id !== mainUser.uid){
                posts += `
                <div id="person-${res.id}" class="w-full py-4 lg:py-8 lg:max-w-xs grid grid-cols-4 justify-between items-center lg:flex-col lg:shadow-xl">
                <!-- The image and the name container -->
                <div class="flex flex-col gap-x-2 items-center border-2 w-full h-full justify-center">
                    <!-- The image -->
                    <div id class="flex justify-center items-center w-24 h-24 lg:w-32 lg:h-32 rounded-full ring-green-500 ring-2">
                        <img id="img-${res.id}" src="" class="w-full h-full object-fit ">
                    </div>
    
                    <!-- The Description -->
                    <div class="space-y-2">
                        <h2 username-${res.id} class="lg: text-2xl font-bold">${res.username}</h2>
                        <p fullname-${user.id} class="lg: text-sm">${user.fullname}</p>
                    </div>
                </div>
    
                <!-- The chat and the add friend container -->
                <div class="flex gap-x-4 lg:mt-4">
                    <button href="chat-person.html" id="chat-btn" class="px-4 py-2 uppercase rounded-lg bg-green-500">chat </button>
                    <button add-friend-${user.id} class="px-4 py-2 uppercase rounded-lg bg-orange-500">add friend</button>
                </div>
            </div>
                `;  
            }
        });

        container.innerHTML = posts;
    }

    showUserLoggedIn(user) {
        const container = document.querySelector("#person-container");
        const name = document.querySelector("#person-name");
        const imageContainer = document.querySelector("#person-image");

        name.textContent = user.displayName;
    }

    showPersonChattingWithDetails(data) {
        const username = document.querySelector('#chat-username');
        username.textContent = data.username;
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
                        <span class="">sent</span>
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
