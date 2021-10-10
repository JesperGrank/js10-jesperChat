let username = '' // Add a generic username here
let url = `https://mock-data-api.firebaseio.com/webb21-chats/${username}/messages.json`

const allChattersUrl = "https://mock-data-api.firebaseio.com/webb21-chats.json"

const messageListContainer = document.getElementById("messageList")
const chatterContainer = document.getElementById("availableChatters")

function handleOnClick() {
    const authorInput = document.getElementById("author")
    const messageInput = document.getElementById("message")

    const author = authorInput.value
    const message = messageInput.value 

    sendMessage(author, message)
}

function sendMessage(author, message) {
   
    let payload = {
        author: author,
        message: message
    }

    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    .then(response => {
        getMessageList()
    })
}

function renderMessageItem(messageItem) {
   const li = document.createElement("li")
   li.innerHTML = `${messageItem.author} said: ${messageItem.message}`
   messageListContainer.appendChild(li)
}

function renderMessageList(data) {
    messageListContainer.innerHTML = ""
    Object.entries(data).forEach(function(element){
        const messageItem = element[1]
        //console.log(messageItem)
        renderMessageItem(messageItem)
    })
}

function getMessageList() {
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        renderMessageList(data)
    })
}

/* Allting nedanför gällande byte av chattrum */

function updateChannelChat(channelChosen){
    /* Kallar på getMessageList med nya värden baserat på vilken användare vi valt */
    username = channelChosen
    url = `https://mock-data-api.firebaseio.com/webb21-chats/${username}/messages.json`
    getMessageList()
   
}

function handleOnSwitch(){
    /* Hämtar ut den specifika chattern, utgår från dropdownlisten och skickar vidare
    till updateChannelChat 
    */
    const channelChosen = availableChatters.value
    updateChannelChat(channelChosen)
}


function renderChannel(channel){
    /* Fyller listan med varje unik användare / chatter */
    const option = document.createElement("option")
    option.innerHTML = channel // 
    chatterContainer.appendChild(option)
}

function renderChatterList(data){
    Object.entries(data).forEach(function(element){ // Konverterar objectet med object inuti, till en array med object
        const channel = element[0] // element[0]: Den unika "chattern"
        renderChannel(channel)
    })
}

function getChattersList(){
    fetch(allChattersUrl) // Hämtar "https://mock-data-api.firebaseio.com/webb21-chats.json"
    .then( response => response.json()) // Gör om datan till json
    .then( data => { 
    renderChatterList(data) // anropar renderChatterList med data som parameter     
    })
}

getMessageList()

getChattersList()

