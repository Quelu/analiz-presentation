/*!
* screenfull
* v2.0.0 - 2014-12-22
* (c) Sindre Sorhus; MIT License
*/
!function(){"use strict";var e="undefined"!=typeof module&&module.exports,t="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,n=function(){for(var e,t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],l=0,i=n.length,r={};i>l;l++)if(e=n[l],e&&e[1]in document){for(l=0,t=e.length;t>l;l++)r[n[0][l]]=e[l];return r}return!1}(),l={request:function(e){var l=n.requestFullscreen;e=e||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[l]():e[l](t&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[n.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},raw:n};return n?(Object.defineProperties(l,{isFullscreen:{get:function(){return!!document[n.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[n.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[n.fullscreenEnabled]}}}),void(e?module.exports=l:window.screenfull=l)):void(e?module.exports=!1:window.screenfull=!1)}(),function(e){"use strict";var t=e.querySelector("#app");t.displayInstalledToast=function(){e.querySelector("#caching-complete").show()},t.addEventListener("dom-change",function(){console.log("Our app is ready to rock!"),t.maxDia=e.querySelectorAll("neon-animatable").length-1}),window.addEventListener("WebComponentsReady",function(){}),t.setFullscreen=function(){screenfull.toggle()},t.selected=window.history.state?window.history.state:0,t.onPrevClick=function(){this.entryAnimation="",this.exitAnimation="slide-right-animation",this.selected=0===this.selected?t.maxDia:this.selected-1,window.history.replaceState(this.selected,"","#"+this.selected)},t.onNextClick=function(){var e=t.$.pages.selectedItem;e.dataset.entry=e.dataset.entry?e.dataset.entry:"slide-from-right-animation",e.dataset.exit=e.dataset.exit?e.dataset.exit:"",this.entryAnimation=e.dataset.entry,this.exitAnimation=e.dataset.exit,this.selected=this.selected===t.maxDia?0:this.selected+1,window.history.replaceState(this.selected,"","#"+this.selected),e.querySelector(".content").desactivateDia&&e.querySelector(".content").desactivateDia(),e.nextElementSibling.querySelector(".content").activateDia&&e.nextElementSibling.querySelector(".content").activateDia()},t.changePage=function(e){"end"===e.detail.state&&(e.detail.dx<0?t.onNextClick():t.onPrevClick())},e.addEventListener("keydown",function(e){switch(e.keyCode){case 37:t.onPrevClick();break;case 32:case 39:t.onNextClick()}}),t.setLogoHeight=function(e,t){t=t?t:.4;var n=window.innerHeight*t;e.style.height=n+"px"}}(document);