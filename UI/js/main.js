const userRegistrationForm = document.getElementById('user-sign-up');

userRegistrationForm.addEventListener('submit', addUser);

const userDetails = {
    'firstname'  : document.getElementById('firstname').value,
    'lastname'   : document.getElementById('lastname').value,
    'othername'  : document.getElementById('othername').value,
    'username'   : document.getElementById('username').value,
    'email'      : document.getElementById('email').value,
    'phoneNumber': document.getElementById('phoneNumber').value,
    'password'   : document.getElementById('password').value
};

const signup_options = {
    method : 'POST',
    body   : JSON.stringify(userDetails),
    headers: {
        'Content-Type': 'application/json'
    }
};

function addUser(e) {
    e.preventDefault();

    fetch('https://q-questioner-api.herokuapp.com/api/v2/auth/signup', signup_options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
