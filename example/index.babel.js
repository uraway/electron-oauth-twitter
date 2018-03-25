// LICENSE : MIT
const { app, BrowserWindow, dialog } = require('electron');

const TWITTER_CLIENT_KEY = 'Q4omCZC0wD1uUsb923lkCQfSa';
const TWITTER_CLIENT_SECRET = 'KJaYcwIIZnS3A7saDJbkMGe96a70D8Xu8roxU1Qo4eS5wUDaBE';

let window = null

// Wait until the app is ready
app.once('ready', () => {
  const OauthTwitter = require('../lib/OauthTwitter');
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
})
