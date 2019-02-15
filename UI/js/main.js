const userRegistrationForm = document.getElementById('user-sign-up');

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

const addUser = (e) => {
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

    fetch('https://q-questioner-api.herokuapp.com/api/v2/auth/signup', {
        method : 'POST',
        body   : JSON.stringify(userDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 201) {
            toggleModal(data.data[0].message);
        } else {
            toggleModal(data.message.error);
        }
    })
    .catch(_err => {
        toggleModal(_err.message + ". Email khwilowatai@gmail.com for further assistance.");
    });
};

userRegistrationForm.addEventListener('submit', addUser);
closeDisplay.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
