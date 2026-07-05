const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const displayNameInput = document.getElementById("displaynameInput");
const bioInput = document.getElementById("bioInput");
const messageString = document.getElementById("messageString")

const signUpbtn = document.getElementById("signupBtn");

signUpbtn.addEventListener('click', register)

function register(){
    var username = usernameInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;
    var displayName = displayNameInput.value;
    var bio = bioInput.value;
    var avatar = ''

    fetch("/api/auth/register",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'username':username,
            'email':email,
            'password':password,
            'displayName':displayName,
            'bio':bio,
            'avatar':avatar
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)

        messageString.textContent = data.message;
    })
}

const authChannel = new BroadcastChannel('auth_channel');

authChannel.onmessage = (event) =>{
    if(event.data.type === 'VERIFICATION_SUCCESS'){
        const receivedToken = event.data.token;

        console.log('Login token recived automaticly', receivedToken);

        authChannel.close();

        window.location.href = '/Account/account.html'
    }
}