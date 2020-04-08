!function(e){var o={};function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,o,t){r.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,o){if(1&o&&(e=r(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var n in e)r.d(t,n,function(o){return e[o]}.bind(null,n));return t},r.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(o,"a",o),o},r.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},r.p="",r(r.s=0)}([function(e,o,r){"use strict";r.r(o);r(1),r(2);function t(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)&&/^[0-9-a-zA-Z_\-\.@]+$/.test(e)}var n={user:void 0,username:"",page:"login",apply:{name:"",email:"",email_confirmation:"",zip_code:"",type:"personal",ein:"",title:""},overview:{total:30,health:27,fever:0,warning:2,danger:1},log:[{name:"George Chu",email:"george@fio.one",date:"\t2020-03-20 19:00:00",num:1},{name:"Cober Lu",email:"cober@fio.one",date:"\t2020-03-20 19:00:00",num:3},{name:"Denny Wang",email:"denny@fio.one",date:"\t2020-03-20 19:00:00",num:1},{name:"Kaede Tai",email:"kaede@fio.one",date:"\t2020-03-20 19:00:00",num:1}]},a={jsonp:function({url:e,params:o={},hookSuccess:r,hookFail:t,showFailAlert:a=!0,hookCatchError:i,logTitle:s="Debug"}){return console.log({params:o}),axios.jsonp(e,{params:o}).then((function(e){return console.log(`[${s}] FiO API response`,e),void 0===e.code?(n.page="login",alert("HealthyMe API Error!")):0!==e.code?(t&&t(e),void(a&&alert(`${e.message} (code = ${e.code})`))):(console.log("response.code === 0"),void(r&&r(e.data)))})).catch((function(e){console.log(`[${s}] catch error`,e),i&&i(e),alert("Something wrong, please check your network connection and try again.")}))}};window.addEventListener("load",(function(){$("#year").text((new Date).getFullYear());var e=new Vue({el:"#vue",data:n,mounted:function(){this.init()},methods:{init:function(){let e=new URLSearchParams(window.location.search),o=this.$data,r=Object.fromEntries(e.entries());if(console.log("[Init]",o,r),r.code)return 1==r.code||2==r.code?alert("The magic link is broken! Please get the email magic link again!"):3==r.code?alert("Sign-in link expired! Magic sign-in links expire after 24 hours, and can only be used once."):alert(`Error! (code = ${r.code}) Please get the email magic link again!`),void(n.page="login");a.jsonp({url:"https://alpha.fio.one/healthyme",logTitle:"Init",hookSuccess:function(e){if(void 0===e.username)return n.page="login";o.user={username:e.username},n.page="dashboard"},hookFail:function(e){n.page="login"},hookCatchError:function(e){n.page="login"}})},goPage:function(e){this.page=e},toPercent:function(e,o){if(0===e)return"-";var r=100*e/o;return Math.round(r)+"%"},resetErrorMessage:function(e){$(e).find(".form-group").removeClass("is-invalid is-valid").find(".invalid-feedback").text("")},setErrorMessage:function(e,o){$(e).addClass("is-invalid").find(".invalid-feedback").text(o)},getStatus:function(e){switch(e){case"total":if(this.overview.danger>0)return"status-danger";if(this.overview.warning>0||this.overview.fever>0)return"status-warning";if(this.overview.total===this.overview.health)return"status-success";break;case"fever":return 0===this.overview.fever?"status-success":this.overview.fever>1?"status-danger":"status-warning";case"warning":return this.overview.total===this.overview.health?"status-success":this.overview.warning>1?"status-danger":"status-warning";case"danger":return this.overview.danger>0?"status-danger":"status-success"}},register:function(){e.resetErrorMessage(".register-form");var o=!0;""===this.apply.name&&(o=!1,e.setErrorMessage("#form-group-name","Please enter Name.")),""===this.apply.email?(o=!1,e.setErrorMessage("#form-group-email","Please enter Email.")):t(this.apply.email)||(o=!1,e.setErrorMessage("#form-group-email","Pleaes confirm your email address.")),""===this.apply.email_confirmation?(o=!1,e.setErrorMessage("#form-group-email-confirmation","Please enter Email.")):t(this.apply.email_confirmation)||(o=!1,e.setErrorMessage("#form-group-email-confirmation","Pleaes confirm your email address.")),""===this.apply.zip_code&&(o=!1,e.setErrorMessage("#form-group-zip-code","Please enter ZIP Code.")),"business"===this.apply.type&&(""===this.apply.ein&&(o=!1,e.setErrorMessage("#form-group-ein","Please enter EIN Number.")),""===this.apply.title&&(o=!1,e.setErrorMessage("#form-group-title","Please enter Applicant Title / Name."))),o&&(console.log(200),e.goPage("login"))},login:function(){let o=this.$data;console.log("login",o),e.resetErrorMessage(".auth-form");var r=!0;""===this.username?(r=!1,e.setErrorMessage("#form-group-username","Please enter Email.")):t(this.username)||(r=!1,e.setErrorMessage("#form-group-username","Pleaes confirm your email address.")),r&&a.jsonp({url:"https://alpha.fio.one/healthyme/login",params:{username:o.username},logTitle:"Login",hookSuccess:function(e){alert("Thanks! Please check your email account. We've sent you a confirmation link to complete registration and log in.")}})},validate:function(){console.log("token")},logout:function(){let o=this.$data;a.jsonp({url:"https://alpha.fio.one/healthyme/logout",logTitle:"Logout",hookSuccess:function(r){o.username="",e.goPage("login"),alert("Logout successful.")}})},showLog:function(){e.goPage("log")}}})}))},function(e,o,r){},function(e,o,r){}]);
//# sourceMappingURL=bundle.js.map?v=1586333591