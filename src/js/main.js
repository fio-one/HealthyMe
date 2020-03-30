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
	username: '',
	page: '',
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

window.addEventListener('load', function () {
	$('#year').text(new Date().getFullYear());
   var vue = new Vue({
		el: '#vue',
		data: data,
		mounted: function() {
			axios.get('https://alpha.fio.one/healthyme/', {}).then(function (result) {
			    console.log(result);

			    vue.setCookie(result);
			    data.page = 'dashboard';
			}).catch(function (error) {
				console.log(error);
			  	data.page = 'login';
			});

		 	// var c = this.$cookies.get('fio_health');
		  //   if(c !== null) {
		  //   	this.page = 'dashboard';
		  //   }
		},
		methods: {
			goPage: function(page) {
		    	this.page = page;
		    },
			toPercent: function(num, total){
				if(num === 0) {
					return '-';
				} else {
					var n = (num * 100) / total;
					return Math.round(n) + '%';
				}
	        },
	        setCookie: function(data) {
	        	this.$cookies.set('fio_health', {
					// 'login': data.username,
					'token': 1
				}, '1d');
	        },
		    resetErrorMessage: function(id) {
		        $(id).removeClass('is-invalid is-valid')
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
				        vue.setErrorMessage('#form-group-email', "Pleaes confirm your email address.");
				    }
				}
				if(this.apply.email_confirmation === "") {
				    validate = false;
				    vue.setErrorMessage('#form-group-email-confirmation', "Please enter Email.");
				} else {
				    if (!validateEmail(this.apply.email_confirmation)) {
				        validate = false;
				        vue.setErrorMessage('#form-group-email-confirmation', "Pleaes confirm your email address.");
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

					//todo: clear form
					alert('register success.');
					// vue.goPage('login');
				    // api('/register', data, function(result) {
				    // }, function(result){
				    //     vue.setErrorMessage('#form-group-username', result.data.message);
				    // });
				}
		    },
		    login: function() {
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
				        vue.setErrorMessage('#form-group-username', "Pleaes confirm your email address.");
				    }
				}

				if(validate) {
					axios.post('https://alpha.fio.one/healthyme/login', {'username': this.username}).then(function (result) {
						if (result.data.code == 0) {
							alert('We send an email include a magic link for logging.\nPlease check your email.');
						} else {
							alert(result.data.message);
						}
					}).catch(function (error) {
						console.log(error);
					});
				}
		    },
		    validate: function () {
		    	console.log('token');
		    },
		    logout: function() {
			    axios.get('https://alpha.fio.one/healthyme/logout', {}).then(function (result) {
				    vue.$cookies.remove('fio_health');
				    data.username = '';
			    	vue.goPage('login');
				}).catch(function (error) {
					console.log(error);
				});
		    },
		    showLog: function() {
		    	vue.goPage('log');
		    	//todo: api
		    }
		}
	});
})