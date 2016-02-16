# electron-oauth-twitter
This is [Electron](http://electron.atom.io/) module that helps to ealsily OAuth authenticate in Electron.

### Install
```
npm install electron-oauth-twitter
```

### Diving into OAuth
See example. You need **Consumer Key (API Key)** and **Consumer Secret (API Secret)**.

Set **Callback URL** at settings of you app.

![](http://i.imgur.com/MKLABt3.png)

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

electron not found
https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md
