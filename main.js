
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordError = document.getElementById("password-error")
const passwordAgain = document.getElementById("password-again")
const passwordAgainError = document.getElementById("password-again-error")
const emailError = document.getElementById("email-error");



const error = document.getElementById('error')
const userName = document.getElementById('user-name')
const userNameError = document.getElementById('user-name-error')
const registerBtn = document.getElementById("register-btn");



registerBtn.addEventListener("click",async (ev)=> {
    ev.preventDefault()
    const rawResponse = await fetch('http://localhost:3000/createAccount',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'POST',
          credentials:'include',
          body: JSON.stringify({email: email.value, password: password.value, userName:userName.value})                
    })
    if(rawResponse.status == 204){
        //const content = await rawResponse.json();
        window.location.replace('login.html');
    }else{
        error.style.display = "block";
    }

})

userName.addEventListener("input",()=>{
    if(validator.isAlphanumeric(userName.value, 'sv-SE') && validator.isLength(userName.value, {min:2, max:25})){
        userNameError.style.display="none";
    }else{
        userNameError.style.display="block";
    }
    })
    
    
   const comparePasswords = () => { 
    if(passwordAgain.value === password.value) {
        passwordAgainError.style.display="none";
    }
    else if(password.value&&passwordAgain.value) {
        passwordAgainError.style.display="block";
    }
}
password.addEventListener("input",()=>{
    if(validator.isStrongPassword(password.value, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers:1, minSymbols: 1})){
        passwordError.style.display="none";
    }else{
        passwordError.style.display="block";
    }
    comparePasswords();
})
    
passwordAgain.addEventListener("input",()=>{
   comparePasswords();
})

email.addEventListener("input",()=>{
    if(validator.isEmail(email.value)){
        emailError.style.display="none";
    }else{
        emailError.style.display="block";
    }

});