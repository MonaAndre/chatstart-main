
const email = document.getElementById('email')
const password = document.getElementById('password')
const error = document.getElementById('error')

const registerBtn = document.getElementById("register-btn");
registerBtn.addEventListener("click",async (ev)=>{
    ev.preventDefault()
    const rawResponse = await fetch('http://127.0.0.1:3000/createAccount',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({email: email.value, password: password.value})                
    })
    if(rawResponse.status == 200){
        const content = await rawResponse.json();
        window.location.replace('secretpage.html');
    }else{
        error.style.display = "block";
    }

})