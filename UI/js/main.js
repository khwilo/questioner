const userRegistrationForm = document.getElementById('user-sign-up');

userRegistrationForm.addEventListener('submit', addUser);

function addUser(e) {
    e.preventDefault();

    const userDetails = {
        'firstname'  : document.getElementById('firstname').value,
        'lastname'   : document.getElementById('lastname').value,
        'othername'  : document.getElementById('othername').value,
        'username'   : document.getElementById('username').value,
        'email'      : document.getElementById('email').value,
        'phoneNumber': document.getElementById('phoneNumber').value,
        'password'   : document.getElementById('password').value
    };

    fetch('http://127.0.0.1:5000/api/v2/auth/signup', {
        method : 'POST',
        body   : JSON.stringify(userDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
