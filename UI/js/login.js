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

    fetch('http://127.0.0.1:5000/api/v2/auth/login', {
        method : 'POST',
        body   : JSON.stringify(userSignInDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200) {
            window.location.href = "explore.html";
        } else {
            toggleModal(data.message.error);
        }
    })
    .catch(_err => {
        toggleModal("There's a problem connecting to the server. Email khwilowatai@gmail.com for further assistance.");
    });
};

userSignInForm.addEventListener('submit', logInUser);
closeDisplay.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
