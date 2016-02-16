'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _electron = require('electron');

var _nodeTwitterApi = require('node-twitter-api');

var _nodeTwitterApi2 = _interopRequireDefault(_nodeTwitterApi);

var _oauth = require('oauth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthWindow = function () {
  function AuthWindow(_ref) {
    var key = _ref.key;
    var secret = _ref.secret;

    _classCallCheck(this, AuthWindow);

    (0, _assert2.default)(key, 'OAuth Consumer Key is needed!');
    (0, _assert2.default)(secret, 'OAuth Consumer secret is needed!');
    this.consumerKey = key;
    this.consumerSecret = secret;
    this.window = null;
    this.resolve = null;
    this.reject = null;
  }

  _createClass(AuthWindow, [{
    key: 'startRequest',
    value: function startRequest() {
      var _this = this;

      var authUrl = 'https://api.twitter.com/oauth/authenticate?oauth_token=';
      var oauth = new _oauth.OAuth('https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token', this.consumerKey, this.consumerSecret, '1.0A', null, 'HMAC-SHA1');

      var deferredPromise = new Promise(function (resolve, reject) {
        var isResolved = false;
        _this.resolve = function (value) {
          if (isResolved) {
            return;
          }

          isResolved = true;
          resolve(value);
        };

        _this.reject = function (error) {
          if (isResolved) {
            return;
          }

          isResolved = true;
          reject(error);
        };
      });

      oauth.getOAuthRequestToken(function (error, oauth_token, oauth_token_secret, results) {
        if (error) {
          _this.reject(error);
          return;
        }

        var url = authUrl + oauth_token;
        _this.getAccessToken(oauth, oauth_token, oauth_token_secret, url);
      });
      return deferredPromise;
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken(oauth, oauth_token, oauth_token_secret, url) {
      var _this2 = this;

      this.window = new _electron.BrowserWindow({ width: 800, height: 600 });
      this.window.on('close', function () {
        _this2.reject(new Error('the window is closed before complete the authentication.'));
      });
      this.window.webContents.on('will-navigate', function (event, url) {
        var matched = undefined;
        if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
          oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, matched[2], function (error, oauth_access_token, oauth_access_token_secret) {
            if (error) {
              _this2.reject(error);
              return;
            }

            _this2.resolve({
              oauth_access_token: oauth_access_token,
              oauth_access_token_secret: oauth_access_token_secret
            });
            _this2.window.close();
          });
        }

        event.preventDefault();
      });
      this.window.loadURL(url);
    }
  }]);

  return AuthWindow;
}();

exports.default = AuthWindow;
module.exports = exports['default'];
//# sourceMappingURL=OauthTwitter.js.map