// LICENSE : MIT
const { dialog } = require('electron');
const OauthTwitter = require('../lib/OauthTwitter');

const TWITTER_CLIENT_KEY = process.env.TWITTER_CLIENT_KEY;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;

const twitter = new OauthTwitter({
  key: TWITTER_CLIENT_KEY,
  secret: TWITTER_CLIENT_SECRET
});

const options = {
  force_login: true
}

twitter.startRequest(options).then((result) => {
  const accessToken = result.oauth_access_token;
  const accessTokenSecret = result.oauth_access_token_secret;
  dialog.showErrorBox('Status', `Token: ${accessToken} \nSecret: ${accessTokenSecret}`);
}).catch((error) => {
  console.error(error, error.stack);
});
