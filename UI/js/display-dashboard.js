const dashboardDisplay = document.getElementById("dashboard-display");

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

fetch('https://q-questioner-api.herokuapp.com/api/v2/meetups/upcoming/', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})
.then(res => res.json())
.then(data => {
    if (data.status == 200) {
        let meetups    = data.data;
        let meetupData = '';
        meetups.forEach(meetup => {
            meetupData += `
                <div id="meetup-${meetup.id}" class="meetup-info">
                    <div class="meetup-title">
                        <p>${meetup.topic.toUpperCase()}</p>
                    </div>
                    <div class="meetup-location">
                        <p>${meetup.location}</p>
                    </div>
                    <div class="meetup-date-time">
                        <p>${moment(meetup.happeningOn).format('dddd do MMMM YYYY, h:mm A')}</p>
                    </div>
                    <div class="meetup-id-display">${meetup.id}</div>
                    <button id="meetup-delete-${meetup.id}" class="meetup-delete-btn">DELETE</button>
                </div>
            `;
        });
        dashboardDisplay.innerHTML += meetupData;
        meetups.forEach(meetup => {
            document.getElementById(`meetup-delete-${meetup.id}`).addEventListener('click', () => {
                deleteMeetup(meetup.id);
                document.getElementById(`meetup-${meetup.id}`).style.display = "none";
            });
        });
    } else {
        return data.hasOwnProperty("msg") ? toggleModal(data.msg): data.hasOwnProperty(data.message) ? toggleModal("Your session has expired. Try to log in again."): toggleModal(data.message.error);
    }
})
.catch(err => toggleModal(err.message + ". Email khwilowatai@gmail.com for further assistance."));

const deleteMeetup = (meetupId) => {
    fetch(`https://q-questioner-api.herokuapp.com/api/v2/meetups/${meetupId}`, {
        method : 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200) {
            toggleModal("Meetup has been succesfully deleted.");
        } else {
            return data.hasOwnProperty("msg") ? toggleModal(data.msg): data.hasOwnProperty(data.message) ? toggleModal("Your session has expired. Try to log in again."): toggleModal(data.message.error);
        }
    })
    .then(err => toggleModal(err.message + ". Email khwilowatai@gmail.com for further assistance."));
};

closeDisplay.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
