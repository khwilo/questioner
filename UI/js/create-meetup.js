const createMeetupForm = document.getElementById('create-meetup');
const clickBtn = document.getElementById('click-me');

const createMeetup = (e) => {
    e.preventDefault();

    const meetup = [];

    const meetupTitle       = document.getElementById('meetup-title').value;
    const meetupDescription = document.getElementById('meetup-description').value;
    const meetupDate        = document.getElementById('meetup-date').value;

    const time = moment().format('LT');
    const date = moment(meetupDate).format('MMM D YYYY');

    meetup.push(meetupTitle);
    meetup.push(meetupDescription);
    meetup.push(`${date}, ${time}`);

    console.log(meetup);
};

createMeetupForm.addEventListener('submit', createMeetup);
