//style
import '../sass/normalize.scss';
import '../sass/theme.scss';

$('#year').text(new Date().getFullYear());

var data = {
	username: '',
	token: '',
	overview: {
		total: 30,
		health: 28,
		fever: 0,
		warning: 1,
		danger: 1,
		status: 'wait'
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
   var vue = new Vue({
		el: '#vue',
		data: data,
		mounted: function() {
			if(this.overview.danger > 0) {
				this.overview.status = 'danger';
				return ;
			}

			if(this.overview.warning > 0 || this.overview.fever > 0) {
				this.overview.status = 'warning';
				return ;
			}

			if(this.overview.total === this.overview.health) {
				this.overview.status = 'success';
				return ;
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
		        $(id).find('.form-control').removeClass('is-invalid is-valid')
		             .end()
		             .find('.invalid-feedback').text('');
		    },
		    setErrorMessage: function(id, message) {
		        $(id).find('.form-control').addClass('is-invalid')
		             .end()
		             .find('.invalid-feedback').text(message);
		    },
		    login: function() {
		    	console.log(2);
		        
		    }
		}
	});

// window.vue = vue;
})



