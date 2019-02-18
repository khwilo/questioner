const createMeetupForm = document.getElementById('create-meetup');
const clickBtn = document.getElementById('click-me');

const createMeetup = (e) => {
    e.preventDefault();

    const meetup = [];

    const meetupTitle       = document.getElementById('meetup-title').value;
    const meetupDescription = document.getElementById('meetup-description').value;
    const meetupLocation    = document.getElementById('meetup-location').value;
    const meetupDate        = document.getElementById('meetup-date').value;
    const meetupTime        = document.getElementById('meetup-time').value;

    const date = moment(meetupDate).format('MMM D YYYY');
    const time = moment(`${meetupTime}`, 'HH:mm').format('LT');

    meetup.push(meetupTitle);
    meetup.push(meetupDescription);
    meetup.push(meetupLocation);
    meetup.push(`${date}, ${time}`);

    console.log(meetup);
};

createMeetupForm.addEventListener('submit', createMeetup);
