(function(a){var b=a.scrollTo=function(b,c,d){a(window).scrollTo(b,c,d)};b.defaults={axis:'xy',duration:parseFloat(a.fn.jquery)>=1.3?0:1,limit:!0},b.window=function(b){return a(window)._scrollable()},a.fn._scrollable=function(){return this.map(function(){var b=this,d=!b.nodeName||a.inArray(b.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1,c;return d?(c=(b.contentWindow||b).document||b.ownerDocument||b,/webkit/i.test(navigator.userAgent)||c.compatMode=='BackCompat'?c.body:c.documentElement):b})},a.fn.scrollTo=function(f,e,d){return typeof e=='object'&&(d=e,e=0),typeof d=='function'&&(d={onAfter:d}),f=='max'&&(f=9e9),d=a.extend({},b.defaults,d),e=e||d.duration,d.queue=d.queue&&d.axis.length>1,d.queue&&(e/=2),d.offset=c(d.offset),d.over=c(d.over),this._scrollable().each(function(){if(!f)return;var i=this,j=a(i),g=f,k,h={},m=j.is('html,body');switch(typeof g){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(g)){g=c(g);break}if(g=a(g,this),!g.length)return;case'object':(g.is||g.style)&&(k=(g=a(g)).offset())}a.each(d.axis.split(''),function(q,n){var f=n=='x'?'Left':'Top',c=f.toLowerCase(),a='scroll'+f,p=i[a],o=b.max(i,n),e;k?(h[a]=k[c]+(m?0:p-j.offset()[c]),d.margin&&(h[a]-=parseInt(g.css('margin'+f))||0,h[a]-=parseInt(g.css('border'+f+'Width'))||0),h[a]+=d.offset[c]||0,d.over[c]&&(h[a]+=g[n=='x'?'width':'height']()*d.over[c])):(e=g[c],h[a]=e.slice&&e.slice(-1)=='%'?parseFloat(e)/100*o:e),d.limit&&/^\d+$/.test(h[a])&&(h[a]=h[a]<=0?0:Math.min(h[a],o)),!q&&d.queue&&(p!=h[a]&&l(d.onAfterFirst),delete h[a])}),l(d.onAfter);function l(a){j.animate(h,e,d.easing,a&&function(){a.call(this,f,d)})}}).end()},b.max=function(b,h){var c=h=='x'?'Width':'Height',d='scroll'+c,e,f,g;return a(b).is('html,body')?(e='client'+c,f=b.ownerDocument.documentElement,g=b.ownerDocument.body,Math.max(f[d],g[d])-Math.min(f[e],g[e])):b[d]-a(b)[c.toLowerCase()]()};function c(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery)