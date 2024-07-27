(function(a){"use strict";var d,f,g,c,b,e,i;function k(){a('.preloader').length&&a('.preloader').delay(200).fadeOut(500)}a('.main-header li.dropdown ul').length&&(a('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'),a('.main-header li.dropdown .dropdown-btn').on('click',function(){a(this).prev('ul').slideToggle(500)}),a('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click',function(a){a.preventDefault()}));function h(){var e,b,c,d;a('.main-header').length&&(e=a(window).scrollTop(),b=a('.main-header'),c=a('.scroll-to-top'),d=a('.main-header .sticky-header'),e>100?(b.addClass('fixed-header'),d.addClass("animated slideInDown"),c.fadeIn(300)):(b.removeClass('fixed-header'),d.removeClass("animated slideInDown"),c.fadeOut(300)))}h(),a('.hidden-bar').length&&(d=a('.hidden-bar'),f=a('.nav-toggler'),g=a('.hidden-bar-closer'),a('.hidden-bar-wrapper').mCustomScrollbar(),f.on('click',function(){d.addClass('visible-sidebar')}),g.on('click',function(){d.removeClass('visible-sidebar')}));function j(){var b=a('.hidden-bar .side-menu');b.find('.dropdown').children('a').append(function(){return'<button type="button" class="btn expander"><i class="icon fa fa-angle-right"></i></button>'}),b.find('.dropdown').children('ul').hide(),b.find('.btn.expander').each(function(){a(this).on('click',function(){return a(this).parent().parent().children('ul').slideToggle(),a(this).parent().toggleClass('current'),a(this).find('i').toggleClass('fa-angle-right fa-angle-down'),!1})})}j(),a('.mobile-menu').length&&(a('.mobile-menu .menu-box').mCustomScrollbar(),c=a('.main-header .nav-outer .main-menu').html(),a('.mobile-menu .menu-box .menu-outer').append(c),a('.sticky-header .main-menu').append(c),a('.mobile-menu li.dropdown .dropdown-btn').on('click',function(){a(this).toggleClass('open'),a(this).prev('ul').slideToggle(500)}),a('.mobile-nav-toggler').on('click',function(){a('body').addClass('mobile-menu-visible')}),a('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click',function(){a('body').removeClass('mobile-menu-visible')})),a('.parallax-scene-1').length&&(b=a('.parallax-scene-1').get(0),e=new Parallax(b)),a('.parallax-scene-2').length&&(b=a('.parallax-scene-2').get(0),e=new Parallax(b)),a('.parallax-scene-3').length&&(b=a('.parallax-scene-3').get(0),e=new Parallax(b)),a('.paroller').length&&a('.paroller').paroller({factor:.2,factorLg:.4,type:'foreground',direction:'horizontal'}),a('.custom-select-box').length&&a('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow'),a('.news-carousel').length&&a('.news-carousel').owlCarousel({loop:!0,margin:0,nav:!0,smartSpeed:500,autoplay:6e3,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:1},800:{items:1},1024:{items:1},1200:{items:1},1500:{items:1}}}),a('.three-item-carousel').length&&a('.three-item-carousel').owlCarousel({loop:!0,margin:0,nav:!0,smartSpeed:500,autoplay:6e3,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},600:{items:1},800:{items:2},1024:{items:3},1200:{items:3},1500:{items:3}}}),a('.sponsors-carousel').length&&a('.sponsors-carousel').owlCarousel({loop:!0,margin:30,nav:!0,smartSpeed:500,autoplay:4e3,navText:['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],responsive:{0:{items:1},480:{items:2},600:{items:3},800:{items:4},1024:{items:4}}}),a('.count-box').length&&a('.count-box').appear(function(){var b=a(this),c=b.find(".count-text").attr("data-stop"),d=parseInt(b.find(".count-text").attr("data-speed"),10);b.hasClass("counted")||(b.addClass("counted"),a({countNum:b.find(".count-text").text()}).animate({countNum:c},{duration:d,easing:"linear",step:function(){b.find(".count-text").text(Math.floor(this.countNum))},complete:function(){b.find(".count-text").text(this.countNum)}}))},{accY:0}),a('.tabs-box').length&&a('.tabs-box .tab-buttons .tab-btn').on('click',function(c){c.preventDefault();var b=a(a(this).attr('data-tab'));if(a(b).is(':visible'))return!1;b.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn'),a(this).addClass('active-btn'),b.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0),b.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab'),a(b).fadeIn(300),a(b).addClass('active-tab')}),a('.filter-list').length&&a('.filter-list').mixItUp({}),a('.lightbox-image').length&&a('.lightbox-image').fancybox({openEffect:'fade',closeEffect:'fade',helpers:{media:{}}}),a('#contact-form').length&&a('#contact-form').validate({rules:{username:{required:!0},email:{required:!0,email:!0},phone:{required:!0},message:{required:!0}}}),a('.scroll-to-target').length&&a(".scroll-to-target").on('click',function(){var b=a(this).attr('data-target');a('html, body').animate({scrollTop:a(b).offset().top},1500)}),a('.wow').length&&(i=new WOW({boxClass:'wow',animateClass:'animated',offset:0,mobile:!0,live:!0}),i.init()),a(window).on('scroll',function(){h()}),a(window).on('load',function(){k()})})(window.jQuery)