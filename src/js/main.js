//style
import '../sass/normalize.scss';
import '../sass/theme.scss';

function validateEmail(email) {
	// http://emailregex.com/
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var re_payment = /^[0-9-a-zA-Z_\-\.@]+$/;
	return re.test(email) && re_payment.test(email);
}

var data = {
	user: undefined,
	username: '',
	page: 'login',
	apply: {
		'name': '',
		'email': '',
		'email_confirmation': '',
		'zip_code': '',
		'type': 'personal',
		'ein': '',
		'title': '',
	},
	overview: {
		total: 30,
		health: 27,
		fever: 0,
		warning: 2,
		danger: 1
	},
	log: [
		{
			name: "George Chu",
			email: "george@fio.one",
			date: "	2020-03-20 19:00:00",
			num: 1
		},
		{
			name: "Cober Lu",
			email: "cober@fio.one",
			date: "	2020-03-20 19:00:00",
			num: 3
		},
		{
			name: "Denny Wang",
			email: "denny@fio.one",
			date: "	2020-03-20 19:00:00",
			num: 1
		},
		{
			name: "Kaede Tai",
			email: "kaede@fio.one",
			date: "	2020-03-20 19:00:00",
			num: 1
		}
	]
};

var api = {};
api.jsonp = function({url, params={}, hookSuccess, hookFail, showFailAlert=true, hookCatchError, logTitle='Debug'}) {
	console.log({params});
	return axios.jsonp(
		url, {params}
	).then(function(response) {
		console.log(`[${logTitle}] FiO API response`, response);
		// Msut have: response.code
		if (typeof response.code === 'undefined') {
			data.page = 'login';
			return alert('HealthyMe API Error!');
		}

		// Fail, send the data to callback: {code, message, error}
		if (response.code !== 0) {
			if (hookFail) hookFail(response);
			if (showFailAlert) alert(`${response.message} (code = ${response.code})`);
			return;
		}

		// Success: send the data to call back: response.data
		console.log('response.code === 0');
		if (hookSuccess) hookSuccess(response.data);
	}).catch(function(error) {
		console.log(`[${logTitle}] catch error`, error);
		if (hookCatchError) hookCatchError(error);
		alert('Something wrong, please check your network connection and try again.');
	});
}

window.addEventListener('load', function () {
	$('#year').text(new Date().getFullYear());
	var vue = new Vue({
		el: '#vue',
		data: data,
		mounted: function() {
			this.init();
		},
		methods: {
			init: function() {
				let searchParams = new URLSearchParams(window.location.search);
				let vue_data = this.$data;
				let params = Object.fromEntries(searchParams.entries());
				console.log('[Init]', vue_data, params);
				if (params.code) {
					if (params.code == 1)
						alert('The magic link is broken! Please get the email magic link again!');
					else if (params.code == 2)
						alert('The magic link is broken! Please get the email magic link again!');
					else if (params.code == 3)
						alert('Sign-in link expired! Magic sign-in links expire after 24 hours, and can only be used once.');
					else
						alert(`Error! (code = ${params.code}) Please get the email magic link again!`);
					data.page = 'login';
					return;
				}
				api.jsonp({
					url: 'https://alpha.fio.one/healthyme',
					logTitle: 'Init',
					hookSuccess: function(aio_data) {
						if (typeof aio_data.username === 'undefined')
							return data.page = 'login';

						// user logined
						vue_data.user = {username: aio_data.username};
						data.page = 'dashboard';
					},
					hookFail: function(response) {
						data.page = 'login';
					},
					hookCatchError: function(error) {
						data.page = 'login';
					},
				});
			},
			goPage: function(page) {
				this.page = page;
			},
			toPercent: function(num, total) {
				if(num === 0) {
					return '-';
				} else {
					var n = (num * 100) / total;
					return Math.round(n) + '%';
				}
			},
			resetErrorMessage: function(id) {
				$(id).find('.form-group').removeClass('is-invalid is-valid')
					.find('.invalid-feedback').text('');
			},
			setErrorMessage: function(id, message) {
				$(id).addClass('is-invalid')
					.find('.invalid-feedback').text(message);
			},
			getStatus: function(type) {
				//set status
				switch(type) {
					case 'total':
						if(this.overview.danger > 0) {
							return 'status-danger';
						}
						if(this.overview.warning > 0 || this.overview.fever > 0) {
							return 'status-warning';
						}
						if(this.overview.total === this.overview.health) {
							return 'status-success';
						}
						break;
					case 'fever':
						if(this.overview.fever === 0 ) {
							return 'status-success';
						} else {
							if(this.overview.fever > 1) {
								return 'status-danger';
							} else {
								return 'status-warning';
							}
						}
						break;
					case 'warning':
						if(this.overview.total === this.overview.health) {
							return 'status-success';
						} else {
							if(this.overview.warning > 1) {
								return 'status-danger';
							} else {
								return 'status-warning';
							}
						}
						break;
					case 'danger' :
						if(this.overview.danger > 0) {
							return 'status-danger';
						} else {
							return 'status-success';
						}
						break;
				}
			},
			register: function() {
				// reset
				vue.resetErrorMessage('.register-form');
				var validate = true;

				//validate
				if(this.apply.name === "") {
					validate = false;
					vue.setErrorMessage('#form-group-name', "Please enter Name.");
				}

				if(this.apply.email === "") {
					validate = false;
					vue.setErrorMessage('#form-group-email', "Please enter Email.");
				} else {
					if (!validateEmail(this.apply.email)) {
						validate = false;
						vue.setErrorMessage('#form-group-email', "Please confirm your email address.");
					}
				}
				if(this.apply.email_confirmation === "") {
					validate = false;
					vue.setErrorMessage('#form-group-email-confirmation', "Please enter Email.");
				} else {
					if (!validateEmail(this.apply.email_confirmation)) {
						validate = false;
						vue.setErrorMessage('#form-group-email-confirmation', "Please confirm your email address.");
					}
				}

				if(this.apply.zip_code === "") {
					validate = false;
					vue.setErrorMessage('#form-group-zip-code', "Please enter ZIP Code.");
				}

				if(this.apply.type === 'business') {
					if(this.apply.ein === "") {
						validate = false;
						vue.setErrorMessage('#form-group-ein', "Please enter EIN Number.");
					}
					if(this.apply.title === "") {
						validate = false;
						vue.setErrorMessage('#form-group-title', "Please enter Applicant Title / Name.");
					}
				}

				if(validate) {
					console.log(200);
					vue.goPage('login');
				}
			},
			login: function() {
				let vue_data = this.$data;
				console.log('login', vue_data);

				// reset
				vue.resetErrorMessage('.auth-form');
				var validate = true;

				//validate
				if(this.username === "") {
					validate = false;
					vue.setErrorMessage('#form-group-username', "Please enter Email.");
				} else {
					if (!validateEmail(this.username)) {
						validate = false;
						vue.setErrorMessage('#form-group-username', "Please confirm your email address.");
					}
				}
				if(!validate) return;

				// do login
				api.jsonp({
					url: 'https://alpha.fio.one/healthyme/login',
					params: {username: vue_data.username},
					logTitle: 'Login',
					hookSuccess: function(aio_data) {
						alert("Thanks! Please check your email account. We've sent you a confirmation link to complete registration and log in.");
					},
				});
			},
			validate: function () {
				console.log('token');
			},
			logout: function() {
				let vue_data = this.$data;
				api.jsonp({
					url: 'https://alpha.fio.one/healthyme/logout',
					logTitle: 'Logout',
					hookSuccess: function(aio_data) {
						vue_data.username = '';
						vue.goPage('login');
						alert('Logout successful.');
					},
				});
			},
			showLog: function() {
				vue.goPage('log');
				//todo: api
			}
		}
	});
})
