(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["lasyImage"],{a0c1:function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"out-scroll"},[s("div",{staticClass:"middle-scroll"},[s("div",{staticClass:"place-holder"}),s("img",{ref:"img",staticClass:"lasy-image",attrs:{src:t.src}})])])},n=[],c={data:function(){return{imgSrc:"https://picsum.photos/200/200?t=".concat(Math.random()),src:""}},mounted:function(){var t=this,e=document.createDocumentFragment(),s=document.createElement("div");s.innerHTML="哈哈哈哈哈哈哈哈哈",e.appendChild(s),console.log("fragment>>>",s.offsetHeight),window.addEventListener("scroll",(function(){t.shouldLoad()})),console.log(this.$refs.img.parentNode),this.$refs.img.parentNode.addEventListener("scroll",(function(){t.shouldLoad()}));var o=new IntersectionObserver((function(e){e[0].intersectionRatio<=0&&(t.src="")}));o.observe(document.querySelector(".lasy-image"))},methods:{shouldLoad:function(){var t=this.$refs.img,e=t.parentNode;e.scrollHeight-e.scrollTop<=e.offsetHeight&&(console.log("//进入视野"),this.src=this.imgSrc)}}},i=c,r=(s("d16d"),s("0c7c")),a=Object(r["a"])(i,o,n,!1,null,"5a306725",null);e["default"]=a.exports},a9c9:function(t,e,s){},d16d:function(t,e,s){"use strict";s("a9c9")}}]);
//# sourceMappingURL=lasyImage.34d97363.js.map