let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4001';
        break;
    case 'jjw-squish-tracker.heroku.com':
        APIURL = 'https://jjw-squish-tracker.herokuapp.com'
}

export default APIURL;