const loginBtn = document.getElementById("login-btn")
const userName = document.getElementById('user-name')
const password = document.getElementById('password')

loginBtn.addEventListener("click", async(ev)=>{
    ev.preventDefault()
    const rawResponse = await fetch('http://localhost:3000/api/signIn',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({password: password.value, userName:userName.value})                
    
    })
    if(rawResponse.status == 200){
        // const content = await rawResponse.json();
        window.location.replace('index.html');
    }else{
        // error.style.display = "block";
    }
})