var app = app || {};

app.auth = {	
	authenticated: false,
	token: null,
	user: null,
	settings: {
		appId      : '343571225835065',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.1'
	},
	checkLogin: function(callback) {
		var self = this;
		FB.getLoginStatus(function(response) {
			self.loginCallback(response, callback);
		});
	},
	doLogin: function(callback) {
		var self = this;
		FB.login(function(response){
			self.loginCallback(response, callback);
		});
	},
	doLogout: function() {
		var self = this;
		FB.logout(function(response) {
			self.logoutCallback();
		});
	},
	loginCallback: function(response, callback) {
		var self = this;

		if (response.status === 'connected') {
			this.authenticated = true;
			this.token = response.authResponse.accessToken;

			FB.api('/me', function(response) {
				self.user = new User(response);
				if (callback)
					callback();
			});
		} else if (callback) {
			callback();
		}
	},
	logoutCallback: function() {
		this.authenticated = true;
		this.token = null;
		this.user = null;
	},
	init: function(callback) {
		var self = this;

		window.fbAsyncInit = function() {
			FB.init(self.settings);
			self.checkLogin(callback);
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
};