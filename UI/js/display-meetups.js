const meetUpTimeline = document.getElementById('meetup-timeline-display');

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
            <div class="meetup-feed meetup-post">
                <div class="meetup-title">
                    <p>${meetup.topic.toUpperCase()}</p>
                </div>
                <div class="meetup-date-time">
                    <p>${moment(meetup.happeningOn).format('dddd do MMMM YYYY, h:mm A')}</p>
                </div>
                <div class="meetup-id-display">${meetup.id}</div>
                <button class="meetup-join-btn" onclick="location.href='meetup.html'">JOIN</button>
            </div>
        `;
        });
        meetUpTimeline.innerHTML += meetupData;
    } else {
        console.log(data ? data.msg : data.message.error);
    }
})
.catch(err => console.log(err));

const meetupSearch = (search_term) => {
    search = search_term.value.toLowerCase();
    console.log(search_term.value);
    document.querySelectorAll('.meetup-feed').forEach(function(row) {
        text = row.innerText.toLowerCase();
        if (text.match(search)) {
            row.style.display = "block";
        } else {
            row.style.display = "none";
        }
    });
};
