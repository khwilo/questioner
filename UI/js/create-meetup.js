const createMeetupForm = document.getElementById('create-meetup');

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

const createMeetup = (e) => {
    e.preventDefault();

    const meetupDate = document.getElementById('meetup-date').value;
    const meetupTime = document.getElementById('meetup-time').value;
    const date       = moment(meetupDate).format('MMM D YYYY');
    const time       = moment(`${meetupTime}`, 'HH:mm').format('LT');

    const meetupDetails = {
        'topic'      : document.getElementById('meetup-topic').value,
        'description': document.getElementById('meetup-description').value,
        'location'   : document.getElementById('meetup-location').value,
        'happeningOn': `${date}, ${time}`
    };

    fetch('https://q-questioner-api.herokuapp.com/api/v2/meetups', {
        method : 'POST',
        body   : JSON.stringify(meetupDetails),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 201) {
            toggleModal(data.message);
        } else {
            toggleModal(data.message.error);
        }
    })
    .catch(err => {
        toggleModal(err.message + ". Email khwilowatai@gmail.com for further assistance.");
    });
};

createMeetupForm.addEventListener('submit', createMeetup);
closeDisplay.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
