const userSignInForm = document.getElementById('user-sign-in');

const logInUser = (e) => {
    e.preventDefault();

    const userSignInDetails = {
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value
    };

    fetch('http://127.0.0.1:5000/api/v2/auth/login', {
        method : 'POST',
        body   : JSON.stringify(userSignInDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

userSignInForm.addEventListener('submit', logInUser);
