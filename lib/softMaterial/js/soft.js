$(document).ready(function() {

    $(".ms__parallax-background-content").each(function() {
        if($(this).data("img"))
            $(this).css("background", "url('" + $(this).data("img") + "') center / cover");
    })

    var msGetVisible = function() {   
        
        $('.ms__parallax-background').each(function(_, el) {
            var $el = $(el),
                scrollTop = $(window).scrollTop(),
                scrollBot = scrollTop + $(window).height(),
                elTop = $el.offset().top,
                elBottom = elTop + $el.outerHeight(),
                visibleTop = elTop < scrollTop ? scrollTop : elTop,
                visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
            var visible = visibleBottom - visibleTop > 0? visibleBottom - visibleTop: 0;
            
            var eCenter = (elTop + $el.height() / 2.0) - $(window).scrollTop() - $(window).height() / 2.0;

            $(this).find(".ms__parallax-background-content").height(visible);

            if(eCenter >= 0) {
                $(this).attr("data-stellar-ratio", 1.0);
                $(this).find(".ms__parallax-background-content").css({"top": "0", "bottom": "auto"});
            } else {
                var eCenter = eCenter * -1;
                var offset = 240;
                eCenter = eCenter > offset? offset: eCenter;
                var ratio = 0.3 * (eCenter / offset)
                if(_ == 1) console.log(ratio);
                $(this).attr("data-stellar-ratio", 1.0 - ratio);
                $(this).find(".ms__parallax-background-content").css({"top": "auto", "bottom": "0"});
            }

            var scrollTop = $(window).scrollTop() - $(this).position().top;
            $(this).css("top", 
                (1 - $(this).attr("data-stellar-ratio")) * scrollTop);

        });
    }

    function msUpdateNavbar() {
        if( $(window).scrollTop() + 240 >= parseInt($(".ms__main-content").position().top))
            $("nav.parallax-nav").removeClass("transparent z-depth-0");
        else
            $("nav.parallax-nav").addClass("transparent z-depth-0");
    }

    $(window).on('scroll resize', function() {
        msGetVisible();
        msUpdateNavbar();    
    });
    
    //disableScroll();
    setTimeout(function() {
        $(".ms__foreground").fadeOut();
        return;
        $(window).scrollTop(0);
        $("body,html").animate({
            scrollTop: ($("body").height()*.55 - $("body").height() * 0.3)
        }, 700, "swing", function() {
            enableScroll();
        });  

    }, 100);

})

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}