var hanaProdUI = {};

hanaProdUI.setSVGApply = function(id, jsonUrl, isAutoplay, isLoop){
    var wrapper = $('<div class="lottie"></div>').prependTo($(id)).get(0);
    var autoplayflag = false;
    var loopflag = false;
    var isImpLoop = false;
    var loopTimerId;
    var repeatDelayTime = 5000;
    
    if(typeof isLoop !== "undefined") {
        loopflag = isLoop;
    }
    if(typeof isAutoplay !== "undefined") {
        autoplayflag = isAutoplay;
    }
    var animationOpt = {
        wrapper : wrapper,
        path: jsonUrl,
        loop : isImpLoop,
        autoplay : isAutoplay
    }
    var animation = bodymovin.loadAnimation(animationOpt);
    var fileName = jsonUrl.split('/').reverse()[0].split('.')[0];

    switch(fileName){
        case 'mainRecomBann02' : 
            stopFrame = 42;
        break;
    }
    
    function dataReady(){
        $(id).addClass('svg-init');
        if(autoplayflag){
            $(id).addClass('playing');
            _play();
        }
    }
    
    function _reInit() {
        animation.stop();
        animation.goToAndStop(0);
        if(loopflag){
            clearInterval(loopTimerId);
        }
    }

    function _pause() {
        animation.pause();
        if(loopflag){
            clearInterval(loopTimerId);
        }
    }
    
    function _play() {
        _reInit();
        if(stopFrame){
            animation.playSegments([0, stopFrame], true);
        }else{
            animation.play();
        }
        
        loopTimerId = setInterval(function(){
            if(stopFrame){
                animation.playSegments([0, stopFrame], true);
            }else{
                animation.play();
            }
        },repeatDelayTime);
    }

    $(id).data('lottie', animation);
    animation.addEventListener('data_ready',dataReady);
    $(id).unbind('reInit').bind('reInit',_reInit);
    $(id).unbind('pause').bind('pause',_pause);
    $(id).unbind('play').bind('play',_play); 

    function scrollMotion(){
        $(wrapper).each(function(idx,el){
            var _this = $(this).parent();
            var interactionPos = _this.get(0).getBoundingClientRect().top;
            var clientH = $(window).innerHeight();

            if(interactionPos < clientH){
                _this.addClass('motion-init');
                if(_this.data('lottie') && !_this.is('.playing')){
                    _this.addClass('playing');
                    _this.trigger('play');
                }
            }else{
                _this.trigger('reInit');
                _this.removeClass('motion-init');
                _this.removeClass('playing');
            }
        })
    }
    $(window).scroll(scrollMotion);
}
hanaProdUI.ankerArea = function(obj){
    var anker = $(obj).find('.sub-menu li');
    var ankerSection = $(obj);
    var winH = window.innerHeight;
    var motionFlag = false;
    var motionFlagTimerId;

    function indexCtrl(obj){
        $(obj).addClass('on').siblings().removeClass('on');
    }
    anker.find('a').on('click', function(e){
        e.preventDefault();
        motionFlag = true;
        indexCtrl($(this).parent('li'))
        var offset = Math.floor($(this.hash).offset().top);
        $('body,html').stop().animate({scrollTop : offset}, 500, function(){
            clearTimeout(motionFlagTimerId);
            motionFlagTimerId = setTimeout(function(){
                motionFlag = false;
            },50)
        });
    })
    
    $(window).scroll(function(){
        if(!motionFlag){
            $('.recommendation-prod').each(function(idx, el){
                if(Math.floor(el.getBoundingClientRect().top) < 10) {
                    indexCtrl(anker.eq(idx));
                }
                if($('body').get(0).scrollHeight - Math.round($(window).scrollTop()) == winH){
                    indexCtrl(anker.eq(anker.length -1));
                }
            })

        }
        
    })
}

