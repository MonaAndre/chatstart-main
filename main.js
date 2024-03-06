const createMessageBtn = document.getElementById("create-message-btn");
const messageTextArea= document.getElementById("message-text");
const messageContainer = document.querySelector('.chat-messages');

createMessageBtn.addEventListener("click",async (ev)=>{
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
    } else{
        console.log('response from database');
        // error.style.display = "block";
    } 

})

async function getAllMessages() {
    const response = await fetch('http://localhost:3000/allMessages')
    console.log(response);
    const data = await response.json();
    console.log(data);
    // return data;
    //const name = data.userName;
    const chatText = data[1].text;
    console.log(chatText);
   // drawMessages();

   for(let i = 0; i<data.length; i++) {
    const messageHolder = document.createElement('div');
    messageHolder.classList = "message-box-holder";
    messageContainer.appendChild(messageHolder);

    const messageSender = document.createElement('div');
    messageSender.innerHTML = data[i].userName;
    messageSender.classList = "message-sender";
    messageHolder.appendChild(messageSender);
    
    const messageBox = document.createElement('div');
    messageBox.innerHTML = data[i].text;
    messageBox.classList = "message-box";
    messageHolder.appendChild(messageBox);

   }
}

window.addEventListener('load', getAllMessages())