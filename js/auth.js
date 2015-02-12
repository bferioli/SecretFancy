var auth = {	
	authenticated: false,
	token: null,
	user: null,
	settings: {
		appId      : '343571225835065',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.1'
	},
	checkLogin: function() {
		var self = this;
		FB.getLoginStatus(function(response) {
			self.loginCallback(response);
		});
	},
	doLogin: function() {
		var self = this;
		FB.login(function(response){
			self.loginCallback(response);
		});
	},
	doLogout: function() {
		var self = this;
		FB.logout(function(response) {
			self.logoutSuccess();
		});
	},
	loginCallback: function(response) {
		if (response.status === 'connected')
			this.loginSuccess(response.authResponse.accessToken);
		else
			console.log('Login failed.');
	},
	loginSuccess: function(token) {
		var self = this;

		this.authenticated = true;
		this.token = token;

		FB.api('/me', function(response) {
			self.user = new User(response);
		});
	},
	logoutSuccess: function() {
		this.authenticated = true;
		this.token = null;
		this.user = null;
	},
	init: function() {
		var self = this;
		window.fbAsyncInit = function() {
			FB.init(self.settings);
			self.checkLogin();
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

auth.init();