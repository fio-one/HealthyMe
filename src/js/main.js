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
	token: '',
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
			var c = this.$cookies.get('fio_health');
		    if(c !== null) {
		    	this.page = 'dashboard';
		    } else {
		    	this.page = 'login';
		    }
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
							return 'status-bg-danger';
						}
						if(this.overview.warning > 0 || this.overview.fever > 0) {
							return 'status-bg-warning';
						}
						if(this.overview.total === this.overview.health) {
							return 'status-bg-success';
						}
		    		break;
		    		case 'fever': 
		    			if(this.overview.fever === 0 ) {
		    				return 'status-bg-success';
		    			} else {
		    				//todo
		    			}
		    		break;
		    		case 'warning': 
		    			if(this.overview.total === this.overview.health) {
		    				return 'status-bg-success';
		    			} else {
		    				//todo
		    			}
		    		break;
		    		case 'danger' : 
		    			if(this.overview.danger > 0) {
		    				return 'status-bg-danger';
		    			} else {
		    				return 'status-bg-success';
		    			}
 		    		break;

 		    		// status-bg-success
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
					console.log(200);

					///set cookie
					this.$cookies.set('fio_health', {
						'login': this.username,
						'token': 1
					}, '1d');

					alert('login success.');
					vue.goPage('dashboard');

					//todo: api
				    // api('/login', data, function(result) {
				    // }, function(result){
				    //     vue.setErrorMessage('#form-group-username', result.data.message);
				    // });
				}
		    },
		    logout: function() {
		    	this.$cookies.remove('fio_health');
		    	this.username = '';
		    	this.token = '';
		    	vue.goPage('login');
		    },
		    showLog: function() {
		    	vue.goPage('log');
		    	//todo: api
		    }
		}
	});
})