$(document).ready(function () {

    if($(window).width()>750){

        $('.ImgItemBox').addClass('aaa');

        var wrapIndex = 0;
        var contentLength = $('.PageBox').length;
        var canMove = true;
        $('.wrap').on('mousewheel', function(event) {
            if(!canMove) return;
            var index = wrapIndex;
            if(event.deltaY < 0) { // 往下
                index += 1;
            }
            if(event.deltaY > 0) { // 往上
                index -= 1;
            }
            // 畫面移動不得超出上下限
            if(index < 0 || index > contentLength - 1) return;
            wrapIndex = index;
            $('.ContentBox').css({
                transform: `translate3d(0,${wrapIndex * -100}%,0)`
            });

            $('.PageBox').removeClass('animation');
            $('.PageBox').eq(index).addClass('animation');

            // Wrap every letter in a span - PBi-02 h2
            $('.ml2, .ml3, .ml4, .ml6').each(function(){
                $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
            });

            anime.timeline({loop: false})
            .add({
                targets: '.ml2 .letter',
                scale: [4,1],
                opacity: [0,1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: function(el, i) {
                return 100*i;
                }
            });

            anime.timeline({loop: false})
            .add({
                targets: '.ml3 .letter',
                scale: [4,1],
                opacity: [0,1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: function(el, i) {
                return 100*i;
                }
            });

            anime.timeline({loop: false})
            .add({
                targets: '.ml4 .letter',
                scale: [4,1],
                opacity: [0,1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: function(el, i) {
                return 100*i;
                }
            });

            anime.timeline({loop: false})
            .add({
                targets: '.ml6 .letter',
                scale: [4,1],
                opacity: [0,1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 950,
                delay: function(el, i) {
                return 100*i;
                }
            });
            

            canMove = false;

            // 每次捲動畫面都要一定間隔
            setTimeout(function() {
                canMove = true;
            }, 500);
        });

        

    }

    else {
        $('.PageBox').addClass('animation');
    }

});
