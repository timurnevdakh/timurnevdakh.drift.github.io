

window.onload = () => {


    document.querySelector('.loading').classList.add('d-none');


// --------------------Logo animate------------------------------

    let rect = document.querySelector('.rectangle');
    let bgRect = document.querySelector('.bg-rect');
    let driftLogo = document.querySelector('.drift');
    console.log(driftLogo.getBoundingClientRect());
    console.log(pageYOffset);

    setTimeout(()=>{
        rect.classList.add('rect-move');
    }, 0);

    setTimeout(()=>{
        driftLogo.classList.remove('opac');
        bgRect.classList.add('opac');
    }, 2000);

// --------------------End Logo animate------------------------------



// ------------------------PrintScroll------------------------

    let headerAnimateWrapper = document.querySelectorAll('.head-wrap');
    let headerAnimateItems = document.querySelectorAll('.header-animate');


    if(pageYOffset == 0) headerScroll();
    else {
        for(let i=0; i<headerAnimateItems.length; i++){
            printText(headerAnimateItems[i], headerAnimateWrapper[i], false);
            headerAnimateItems[i].classList.add('move');
            headerAnimateItems[i].classList.remove('opac');
        }
    }


    function headerScroll(){

        let animateItem = 0;
        
        disable_scroll();

        window.addEventListener('wheel', printHeader);
        window.addEventListener('keydown', printHeader);

        function printHeader(e) {

            let len = headerAnimateItems.length;

            if((animateItem < len && e.type == 'wheel') || keys.some(elem => elem == e.keyCode)) {
                
                if(animateItem == len-1) {
                    enable_scroll();
                }

                printText(headerAnimateItems[animateItem], headerAnimateWrapper[animateItem], 40, false);
                headerAnimateItems[animateItem].classList.remove('opac');
                animateItem++;
            }
            else {
                window.removeEventListener('wheel', printHeader);
                window.removeEventListener('keypress', printHeader);
            }
        }
    }

// ------------------------End PrintScroll------------------------


// ------------------Back to top button---------------------------


    (function() {
        'use strict';
    
        function trackScroll() {
            let scrolled = window.pageYOffset;
            let coords = document.documentElement.clientHeight;
        
            if (scrolled > coords) {
                goTopBtn.classList.add('back_to_top-show');
            }
            if (scrolled < coords) {
                goTopBtn.classList.remove('back_to_top-show');
            }
        }
    
        function backToTop() {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -80);
                setTimeout(backToTop, 0);
            }
        }
    
        let goTopBtn = document.querySelector('.back_to_top');
    
        window.addEventListener('scroll', trackScroll);
        goTopBtn.addEventListener('click', backToTop);
    })();

// ------------------End Back to top button---------------------------


// ---------------------Print Text-----------------------------


    let sponsorsWrapper = document.querySelector(".wrapper-company");
    let sponsorsText = document.querySelector(".text-company");


    if(innerHeight > sponsorsWrapper.getBoundingClientRect().top) {
        printText(sponsorsText, sponsorsWrapper, 75, true);
        window.removeEventListener('scroll', print);
    } else {
        window.addEventListener('scroll', function print() {
            if(innerHeight > sponsorsWrapper.getBoundingClientRect().top) {
                printText(sponsorsText, sponsorsWrapper, 75, true);
                window.removeEventListener('scroll', print);
            }
        });
    }


    function printText(text, wrapper, speed, orWave){
        let textCont = text.textContent;
        text.style.display = "none";

        for (let i = 0; i < textCont.length; i++) {
        (function(i) {
            setTimeout(function() {
            // Created textNode to append
            let texts = document.createTextNode(textCont[i])
            let span = document.createElement('span');
            span.appendChild(texts);

            if(orWave) span.classList.add("wave");
            wrapper.appendChild(span);

            }, speed * i);
        }(i));
        }
    }

// ---------------------End Print Text-----------------------------


// ----------------------Block scroll---------------------------------

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

function keydown(e) {
    for (let i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return true;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}


// ----------------------End Block scroll---------------------------------


}
