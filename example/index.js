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
