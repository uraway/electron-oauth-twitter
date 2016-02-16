# electron-oauth-twitter example
## prerequisite
You need to replace `****` with your Consuer Key and Consumer Secret from [here](https://apps.twitter.com/).

```javascript
// LICENSE : MIT
var dialog = require('electron').dialog;

var OauthTwitter = require('../lib/OauthTwitter');

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

## Usage
```
$ npm install
$ npm start
```
