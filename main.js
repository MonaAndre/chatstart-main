const createMessageBtn = document.getElementById("create-message-btn");
const messageTextArea= document.getElementById("message-text");
const messageContainer = document.querySelector('.chat-messages');

createMessageBtn.addEventListener("click", async (ev)=>{
    newMessage(ev);
})
messageTextArea.addEventListener("keypress", async (ev)=>{
    if (ev.key === 'Enter'){
    newMessage(ev);
}})   

 const newMessage = async (ev) => {
    ev.preventDefault()
   
    const rawResponse = await fetch('http://localhost:3000/newMessage',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({text:messageTextArea.value})                
    })
    if(rawResponse.status == 204){
        //const content = await rawResponse.json();
        console.log(messageTextArea.value);
        messageTextArea.value="";
    } else{
        console.log('response from database');
        // error.style.display = "block";
        
    } 
    
    getAllMessages();
    
}

async function getAllMessages() {
    const response = await fetch('http://localhost:3000/allMessages',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'GET',
          credentials:'include'              

    })
    if(response.status == 401){
        window.location.replace('login.html')

    } else {
    console.log(response);
    const data = await response.json();
    console.log(data);
   
   for(let i = 0; i<data.length; i++) {
    const messageHolder = document.createElement('div');
    messageHolder.classList = "message-box-holder";
    messageContainer.appendChild(messageHolder);

    if (data[i].isCurrentUser==false){
    const messageSender = document.createElement('div');
    messageSender.innerHTML = data[i].userName;
    messageSender.classList = "message-sender";
    messageHolder.appendChild(messageSender);
    }
    
    const messageBox = document.createElement('div');
    messageBox.innerHTML = data[i].text;
    if (data[i].isCurrentUser) {
        messageBox.classList = "message-box";
    } else {
    messageBox.classList = "message-box message-partner";
    console.log(data[i].isCurrentUser);
}
    messageHolder.appendChild(messageBox);

   }
   
   messageContainer.scrollTop = messageContainer.scrollHeight;
}
}
window.addEventListener('load', getAllMessages())