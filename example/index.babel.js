// LICENSE : MIT
const { app, dialog } = require('electron');

const TWITTER_CLIENT_KEY = '9HWNw0Z5eNI7dDjyRrQXfHpJW';
const TWITTER_CLIENT_SECRET =
  't3C4trzIkUy8dEN6msyf5wccQBcBTCxkA4FCaPjb0HpRg3wns6';

app.once('ready', () => {
  const OauthTwitter = require('../lib/OauthTwitter'); // eslint-disable-line global-require
  const twitter = new OauthTwitter({
    key: TWITTER_CLIENT_KEY,
    secret: TWITTER_CLIENT_SECRET,
  });

  const options = {
    force_login: true,
  };

  twitter
    .startRequest(options)
    .then((result) => {
      const accessToken = result.oauth_access_token;
      const accessTokenSecret = result.oauth_access_token_secret;
      dialog.showErrorBox(
        'Status',
        `Token: ${accessToken} \nSecret: ${accessTokenSecret}`,
      );
    })
    .catch((error) => {
      console.error(error, error.stack); // eslint-disable-line no-console
    });
});
