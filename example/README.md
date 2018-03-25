# electron-oauth-twitter example

## Prerequisite

You need to replace `****` with your **Consuer Key** and **Consumer Secret**
after you [register your app](<(https://apps.twitter.com/)>).

```javascript
const { app, dialog } = require('electron');

app.once('ready', () => {
  const OauthTwitter = require('../lib/OauthTwitter'); // eslint-disable-line global-require
  const twitter = new OauthTwitter({
    key: '****',
    secret: '****',
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
```

## Usage

```
$ npm install
$ npm start
```
