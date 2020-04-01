!function(e){var r={};function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,r,t){o.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,r){if(1&r&&(e=o(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)o.d(t,n,function(r){return e[r]}.bind(null,n));return t},o.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(r,"a",r),r},o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},o.p="",o(o.s=0)}([function(e,r,o){"use strict";o.r(r);o(1),o(2);function t(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)&&/^[0-9-a-zA-Z_\-\.@]+$/.test(e)}var n={user:void 0,username:"",page:"login",apply:{name:"",email:"",email_confirmation:"",zip_code:"",type:"personal",ein:"",title:""},overview:{total:30,health:27,fever:0,warning:2,danger:1},log:[{name:"George Chu",email:"george@fio.one",date:"\t2020-03-20 19:00:00",num:1},{name:"Cober Lu",email:"cober@fio.one",date:"\t2020-03-20 19:00:00",num:3},{name:"Denny Wang",email:"denny@fio.one",date:"\t2020-03-20 19:00:00",num:1},{name:"Kaede Tai",email:"kaede@fio.one",date:"\t2020-03-20 19:00:00",num:1}]},a={jsonp:function({url:e,params:r={},hookSuccess:o,hookFail:t,showFailAlert:a=!0,hookCatchError:i,logTitle:s="Debug"}){return console.log({params:r}),axios.jsonp(e,{params:r}).then((function(e){return console.log(`[${s}] FiO API response`,e),void 0===e.code?(n.page="login",alert("HealthyMe API Error!")):0!==e.code?(t&&t(e),void(a&&alert(`${e.message} (code = ${e.code})`))):(console.log("response.code === 0"),void(o&&o(e.data)))})).catch((function(e){console.log(`[${s}] catch error`,e),i&&i(e),alert("Something wrong, please check your network connection and try again.")}))}};window.addEventListener("load",(function(){$("#year").text((new Date).getFullYear());var e=new Vue({el:"#vue",data:n,mounted:function(){this.init()},methods:{init:function(){let e=new URLSearchParams(window.location.search),r=this.$data,o=Object.fromEntries(e.entries());if(console.log("[Init]",r,o),o.code)return 1==o.code||2==o.code?alert("The magic link is broken! Please get the email magic link again!"):3==o.code?alert("Sign-in link expired! Magic sign-in links expire after 24 hours, and can only be used once."):alert(`Error! (code = ${o.code}) Please get the email magic link again!`),void(n.page="login");a.jsonp({url:"https://alpha.fio.one/healthyme",logTitle:"Init",hookSuccess:function(e){if(void 0===e.username)return n.page="login";r.user={username:e.username},n.page="dashboard"},hookFail:function(e){n.page="login"},hookCatchError:function(e){n.page="login"}})},goPage:function(e){this.page=e},toPercent:function(e,r){if(0===e)return"-";var o=100*e/r;return Math.round(o)+"%"},resetErrorMessage:function(e){$(e).find(".form-group").removeClass("is-invalid is-valid").find(".invalid-feedback").text("")},setErrorMessage:function(e,r){$(e).addClass("is-invalid").find(".invalid-feedback").text(r)},getStatus:function(e){switch(e){case"total":if(this.overview.danger>0)return"status-danger";if(this.overview.warning>0||this.overview.fever>0)return"status-warning";if(this.overview.total===this.overview.health)return"status-success";break;case"fever":return 0===this.overview.fever?"status-success":this.overview.fever>1?"status-danger":"status-warning";case"warning":return this.overview.total===this.overview.health?"status-success":this.overview.warning>1?"status-danger":"status-warning";case"danger":return this.overview.danger>0?"status-danger":"status-success"}},register:function(){e.resetErrorMessage(".register-form");var r=!0;""===this.apply.name&&(r=!1,e.setErrorMessage("#form-group-name","Please enter Name.")),""===this.apply.email?(r=!1,e.setErrorMessage("#form-group-email","Please enter Email.")):t(this.apply.email)||(r=!1,e.setErrorMessage("#form-group-email","Pleaes confirm your email address.")),""===this.apply.email_confirmation?(r=!1,e.setErrorMessage("#form-group-email-confirmation","Please enter Email.")):t(this.apply.email_confirmation)||(r=!1,e.setErrorMessage("#form-group-email-confirmation","Pleaes confirm your email address.")),""===this.apply.zip_code&&(r=!1,e.setErrorMessage("#form-group-zip-code","Please enter ZIP Code.")),"business"===this.apply.type&&(""===this.apply.ein&&(r=!1,e.setErrorMessage("#form-group-ein","Please enter EIN Number.")),""===this.apply.title&&(r=!1,e.setErrorMessage("#form-group-title","Please enter Applicant Title / Name."))),r&&(console.log(200),e.goPage("login"))},login:function(){let r=this.$data;console.log("login",r),e.resetErrorMessage(".auth-form");var o=!0;""===this.username?(o=!1,e.setErrorMessage("#form-group-username","Please enter Email.")):t(this.username)||(o=!1,e.setErrorMessage("#form-group-username","Pleaes confirm your email address.")),o&&a.jsonp({url:"https://alpha.fio.one/healthyme/login",params:{username:r.username},logTitle:"Login",hookSuccess:function(e){alert("We send an email include a magic link for logging.\nPlease check your email.")}})},validate:function(){console.log("token")},logout:function(){let r=this.$data;a.jsonp({url:"https://alpha.fio.one/healthyme/logout",logTitle:"Logout",hookSuccess:function(o){r.username="",e.goPage("login"),alert("Logout successful.")}})},showLog:function(){e.goPage("log")}}})}))},function(e,r,o){},function(e,r,o){}]);
//# sourceMappingURL=bundle.js.map?v=1585735579