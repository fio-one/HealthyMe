!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=0)}([function(e,n,o){"use strict";o.r(n);o(1),o(2);$(document).ready((function(){$("#year").text((new Date).getFullYear()),$("#memberModal").on("show.bs.modal",(function(e){var n=$(e.relatedTarget).data("name");$(this).find(".member-modal-profile").hide().end().find('.member-modal-profile[data-id="'+n+'"]').show()})),$(".carousel").carousel({interval:5e3,cycle:!0}),$(".nav-menu a").on("click",(function(){var e=$(this).attr("href");$("html, body").animate({scrollTop:$(e).offset().top},800),$(".mobile-menu-block").hasClass("open")&&$(".mobile-menu-close-btn").click()})),$(".mobile-menu-btn").on("click",(function(){$(this).addClass("active"),$(".mobile-menu-block").addClass("open")})),$(".mobile-menu-close-btn").on("click",(function(){$(".mobile-menu-btn").removeClass("active"),$(".mobile-menu-block").removeClass("open")}));var e=$(window).height();$(window).scroll((function(){$(this).scrollTop()>=e?$(".toolbar").addClass("fixed"):$(".toolbar").removeClass("fixed")}))}))},function(e,n,o){},function(e,n,o){}]);
//# sourceMappingURL=bundle.js.map