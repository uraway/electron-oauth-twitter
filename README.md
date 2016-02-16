# electron-oauth-twitter
This is [Electron](http://electron.atom.io/) module that easily OAuth authenticates your Electron app with twitter.

### Install
```
npm install electron-oauth-twitter
```

### Diving into OAuth
1. You need **Consumer Key (API Key)** and **Consumer Secret (API Secret)**.

2. Set **Callback URL** at settings of you app.

  ![](http://i.imgur.com/MKLABt3.png)

3.  See [example](https://github.com/uraway/electron-oauth-twitter/tree/master/example). Dive into OAuth!


```javascript
var dialog = require('electron').dialog;

var OauthTwitter = require('electron-oauth-twitter');

var twitter = new OauthTwitter({
  key: '****',
  secret: '****',
});

twitter.startRequest().then(function(result) {
  var accessToken = result.oauth_access_token;
  var accessTokenSecret = result.oauth_access_token_secret;
  dialog.showErrorBox('Status', 'Token: ' + accessToken + '\nSecret: ' + accessTokenSecret);
}).catch(function(error) {
  console.error(error, error.stack);
});
```

---
MIT licensed
