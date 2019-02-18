const createMeetupForm = document.getElementById('create-meetup');
const clickBtn = document.getElementById('click-me');

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

    fetch('http://127.0.0.1:5000/api/v2/meetups', {
        method : 'POST',
        body   : JSON.stringify(meetupDetails),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

createMeetupForm.addEventListener('submit', createMeetup);
