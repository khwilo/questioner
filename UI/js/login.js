const userSignInForm = document.getElementById('user-sign-in');

const modal        = document.querySelector(".modal");
const closeDisplay = document.querySelector(".close-display");
const modalDisplay = document.querySelector(".modal-display");

const toggleModal = (data) => {
    modalDisplay.innerHTML = `${data}`;
    modal.classList.toggle("show-modal");
};

const windowOnClick = (event) => {
    if (event.target === modal) {
        toggleModal();
    }
};

const logInUser = (e) => {
    e.preventDefault();

    const userSignInDetails = {
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value
    };

    fetch('https://q-questioner-api.herokuapp.com/api/v2/auth/login', {
        method : 'POST',
        body   : JSON.stringify(userSignInDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200) {
            localStorage.setItem('accessToken', data.data[0].token);
            if (data.data[0].user.isAdmin) {
                location.href = "dashboard.html";
            } else {
                location.href = "explore.html";
            }
        } else {
            return data.hasOwnProperty("msg") ? toggleModal(data.msg): data.hasOwnProperty(data.message) ? toggleModal("Your session has expired. Try to log in again."): toggleModal(data.message.error);
        }
    })
    .catch(err => {
        toggleModal(err.message + ". Email khwilowatai@gmail.com for further assistance.");
    });
};

userSignInForm.addEventListener('submit', logInUser);
closeDisplay.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
