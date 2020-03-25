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
	page: 'login',
	overview: {
		total: 30,
		health: 30,
		fever: 1,
		warning: 1,
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
		    }
		},
		methods: {
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
		    getStatus: function() {
		    	//set status
				if(this.overview.danger > 0) {
					return 'danger';
				}
				if(this.overview.warning > 0 || this.overview.fever > 0) {
					return 'warning';
				}
				if(this.overview.total === this.overview.health) {
					return 'success';
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
					this.page = 'dashboard';

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
		    	this.page = 'login';
		    },
		    goPage: function(page) {
		    	this.page = page;
		    },
		    showLog: function() {
		    	this.page = 'log';
		    	//todo: api
		    }
		}
	});
})