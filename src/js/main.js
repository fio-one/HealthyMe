//style
import '../sass/normalize.scss';
import '../sass/theme.scss';

$(document).ready(function() {
	//copyright
	$('#year').text(new Date().getFullYear());
	
	//modal
	$('#memberModal').on('show.bs.modal', function (event) {
		var name = $(event.relatedTarget).data('name');

		$(this).find('.member-modal-profile').hide()
	       .end()
	       .find('.member-modal-profile[data-id="'+name+'"]').show();
	});

	//carousel
	$('.carousel').carousel({
		interval: 5000,
  		cycle: true
	});

	//menu
	$('.nav-menu a').on('click',function(){
		var h = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(h).offset().top
		}, 800);

		if($('.mobile-menu-block').hasClass('open')) {
			$('.mobile-menu-close-btn').click();
		}
	});
	$('.mobile-menu-btn').on('click',function(){
		$(this).addClass('active');
		$('.mobile-menu-block').addClass('open');
	});
	$('.mobile-menu-close-btn').on('click',function(){
		$('.mobile-menu-btn').removeClass('active');
		$('.mobile-menu-block').removeClass('open');
	});

	//toolbar
	var h = $(window).height();
	$(window).scroll(function(){
		var t = $(this).scrollTop();
		if(t >= h) {
			$('.toolbar').addClass('fixed');
		} else {
			$('.toolbar').removeClass('fixed');
		}
	});
});