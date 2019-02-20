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
                    <p>${meetup.happeningOn}</p>
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
