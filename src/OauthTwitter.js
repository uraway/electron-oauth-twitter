'use strict';

import assert from 'assert';
import { BrowserWindow } from 'electron';
import { OAuth } from 'oauth';

export default class AuthWindow {
  constructor({ key, secret }) {
    assert(key, 'OAuth Consumer Key is needed!');
    assert(secret, 'OAuth Consumer secret is needed!');
    this.consumerKey = key;
    this.consumerSecret = secret;
    this.window = null;
    this.resolve = null;
    this.reject = null;
  }

  startRequest(options={}) {
    const force_login = options["force_login"] || false
    let authUrl = `https://api.twitter.com/oauth/authenticate?force_login=${force_login.toString()};oauth_token=`;
    let oauth = new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      this.consumerKey,
      this.consumerSecret,
      '1.0A',
      null,
      'HMAC-SHA1'
    );

    let deferredPromise = new Promise((resolve, reject) => {
      let isResolved = false;
      this.resolve = (value) => {
        if (isResolved) {
          return;
        }

        isResolved = true;
        resolve(value);
      };

      this.reject = (error)=> {
        if (isResolved) {
          return;
        }

        isResolved = true;
        reject(error);
      };
    });

    oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
      if (error) {
        this.reject(error);
        return;
      }

      let url = authUrl + oauth_token;
      this.getAccessToken(oauth, oauth_token, oauth_token_secret, url);
    });
    return deferredPromise;
  }

  getAccessToken(oauth, oauth_token, oauth_token_secret, authUrl) {
    this.window = new BrowserWindow({ width: 800, height: 600 });
    this.window.loadURL(authUrl);
    this.window.on('close', () => {
      this.reject(new Error('the window is closed before complete the authentication.'));
    });
    const resolveAccessToken = (url) => {
      let matched;
      if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, matched[2], (error, oauth_access_token, oauth_access_token_secret) => {
          if (error) {
            this.reject(error);
            return;
          }

          this.resolve({
            oauth_access_token: oauth_access_token,
            oauth_access_token_secret: oauth_access_token_secret,
          });
          this.window.close();
        });
      }
    }
    this.window.webContents.on('will-navigate', (event, url) => {
      /**
       * If 2fa is set, the url includes challenge_id, challenge_type
       */
      if (url.indexOf('challenge_type') >= 0 && url.indexOf('challenge_id') >= 0) {
        this.window.loadURL(url);
        this.window.webContents.on('will-navigate', (event, url) => {
          resolveAccessToken(url);
        });
      } else {
        resolveAccessToken(url);
      }
    });
  }
}
