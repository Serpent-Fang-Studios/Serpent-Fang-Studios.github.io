const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginbtn = document.getElementById('loginBtn');
const msgString = document.getElementById('messageString')

loginbtn.addEventListener('click', login);

function login() {
    var username = usernameInput.value
    var password = passwordInput.value

    console.log(username)
    console.log(password)

    fetch("http://localhost:5656/api/auth/login",{
        method:'Post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password, username
        })
    }).then(res => res.json())
    .then(data =>{
        console.log(data)

        if (data.error) {
            msgString.textContent = data.error
            return;
        }

        localStorage.setItem("token", data.token);
        window.location.href = '/account.html'

    }).catch(err=>{
        console.log(err)

        msgString.textContent = 'invalid username and password'
    })
}