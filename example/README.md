# electron-oauth-twitter example

## Prerequisite

You need to replace `****` with your **Consuer Key** and **Consumer Secret**
after you [register your app]((https://apps.twitter.com/)).

```javascript
// LICENSE : MIT
const { dialog } = require('electron');

const OauthTwitter = require('../lib/OauthTwitter');

const twitter = new OauthTwitter({
  key: '****',
  secret: '****',
});

twitter.startRequest().then((result) => {
  const accessToken = result.oauth_access_token;
  const accessTokenSecret = result.oauth_access_token_secret;
  dialog.showErrorBox('Status', `Token: ${accessToken} \nSecret: ${accessTokenSecret}`);
}).catch((error) => {
  console.error(error, error.stack);
});

```

## Usage

  $ npm install
  $ npm start
