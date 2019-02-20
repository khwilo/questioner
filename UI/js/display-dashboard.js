const dashboardDisplay = document.getElementById('dashboard-display');

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

fetch('http://127.0.0.1:5000/api/v2/meetups/upcoming/', {
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
                <div id=${meetup.id} class="meetup-info">
                    <div class="meetup-topic">
                        <p>${meetup.topic.toUpperCase()}</p>
                    </div>
                    <div class="meetup-location">
                        <p>${meetup.location}</p>
                    </div>
                    <div class="meetup-date-time">
                        <p>${moment(meetup.happeningOn).format('dddd do MMMM YYYY, h:mm A')}</p>
                    </div>
                    <div class="meetup-id-display">${meetup.id}</div>
                    <button class="meetup-delete-btn" onclick="getElementById(${meetup.id}).style.display='none'">DELETE</button>
                </div>
            `;
        });
        dashboardDisplay.innerHTML += meetupData;
    } else {
        return data ? toggleModal(data.msg): toggleModal(data.message.error);
    }
})
.catch(err => toggleModal(err.message + ". Email khwilowatai@gmail.com for further assistance."));

closeDisplay.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
