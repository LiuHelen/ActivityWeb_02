'use strict';

$(window).on('load', function () {
    if ($(window).width() > 750) {

        $('.ImgItemBox').addClass('aaa');
        var WebPageBoxPosition = [];
        var WebwindowHeight = $(window).height();
        $('.PageBox').each(function (i, ele) {
            var position = $(ele).offset().top - WebwindowHeight * 0.5;
            if (position > 0) {
                WebPageBoxPosition.push(position);
            } else {
                WebPageBoxPosition.push(0);
            }
        });
        $('.ml2, .ml3, .ml4, .ml6').each(function () {
            $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
        });

        var arr = [true, true, true, true];

        $('.wrap').on('scroll', function (event) {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > WebPageBoxPosition[0]) {
                $('.PageBox').eq(0).addClass('animation');
            }
            if (scrollTop > WebPageBoxPosition[1]) {
                $('.PageBox').eq(1).addClass('animation');
                if (arr[1]) {
                    anime.timeline({ loop: false }).add({
                        targets: '.ml2 .letter',
                        scale: [4, 1],
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: "easeOutExpo",
                        duration: 950,
                        delay: function delay(el, i) {
                            return 100 * i;
                        }
                    });
                }
                arr[1] = false;
            }
            if (scrollTop > WebPageBoxPosition[2]) {
                $('.PageBox').eq(2).addClass('animation');
                if (arr[2]) {
                    anime.timeline({ loop: false }).add({
                        targets: '.ml3 .letter',
                        scale: [4, 1],
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: "easeOutExpo",
                        duration: 950,
                        delay: function delay(el, i) {
                            return 100 * i;
                        }
                    });
                }
                arr[2] = false;
            }
            if (scrollTop > WebPageBoxPosition[3]) {
                $('.PageBox').eq(3).addClass('animation');
                if (arr[3]) {
                    anime.timeline({ loop: false }).add({
                        targets: '.ml4 .letter',
                        scale: [4, 1],
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: "easeOutExpo",
                        duration: 950,
                        delay: function delay(el, i) {
                            return 100 * i;
                        }
                    });
                }
                arr[3] = false;
            }
            if (scrollTop > WebPageBoxPosition[4]) {
                $('.PageBox').eq(4).addClass('animation');
                if (arr[4]) {
                    anime.timeline({ loop: false }).add({
                        targets: '.ml6 .letter',
                        scale: [4, 1],
                        opacity: [0, 1],
                        translateZ: 0,
                        easing: "easeOutExpo",
                        duration: 950,
                        delay: function delay(el, i) {
                            return 100 * i;
                        }
                    });
                }
                arr[4] = false;
            }
            if (scrollTop > WebPageBoxPosition[5]) {
                $('.PageBox').eq(5).addClass('animation');
            }
        });
    } else {
        var PageBoxPosition = [];
        var windowHeight = $(window).height();
        $('.PageBox').each(function (i, ele) {
            var position = $(ele).offset().top - windowHeight / 2;
            if (position > 0) {
                PageBoxPosition.push(position);
            } else {
                PageBoxPosition.push(0);
            }
        });
        $(window).on('scroll', function (event) {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > PageBoxPosition[2]) {
                $('.PageBox').eq(2).addClass('animation');
            }
            if (scrollTop > PageBoxPosition[3]) {
                $('.PageBox').eq(3).addClass('animation');
            }
            if (scrollTop > PageBoxPosition[4]) {
                $('.PageBox').eq(4).addClass('animation');
            }
            if (scrollTop > PageBoxPosition[5]) {
                $('.PageBox').eq(5).addClass('animation');
            }
        });
    }
});