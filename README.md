# electron-oauth-twitter

This is [Electron](http://electron.atom.io/) module that easily OAuth authenticates your Electron app with twitter.

### Install

```
npm install electron-oauth-twitter
```

### Diving into OAuth

1.  [Register your app](https://apps.twitter.com/).

2.  You need **Consumer Key (API Key)** and **Consumer Secret (API Secret)**.

3.  Set **Callback URL** at settings of you app. If you do not set Callback URL, it will evoke [PIN Based OAuth](https://dev.twitter.com/oauth/pin-based).

![](http://i.imgur.com/MKLABt3.png)

4.  Edit your Electron main file. See [example](https://github.com/uraway/electron-oauth-twitter/tree/master/example). Dive into OAuth!

```javascript
const { app, dialog } = require('electron');

app.once('ready', () => {
  const OauthTwitter = require('electron-oauth-twitter'); // eslint-disable-line global-require
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

---

MIT licensed
