// response
let mql = window.matchMedia("(min-width:300px) and (max-width: 1024px)");
let mql2 = window.matchMedia("(max-width: 480px)");
// ㄴmatchMedia 반응형부분 들어갈 때 수정하는거, ture false 인지 확인해주는 역할
let breakPoint = true;
mql.addListener((e)=>{
    breakPoint = e.matches;
})





//roomlist
const elRoom_img = document.querySelectorAll('.room_img li');

elRoom_img.forEach(function(li){
    li.onclick = (e)=>{
        if(!li.classList.contains('active')){
            elRoom_img.forEach(function(removeLi){
                removeLi.classList.remove('active');
            })
        }
        li.classList.toggle('active');
        // if(mql2.matches){
        //     e.stopPropagation();
        // }
    }
})


//special
function init(){
    const elWrap = document.querySelector('.wrap');
    const elSpecial = document.querySelector('.special');
    const elSpecialCon_img = document.querySelectorAll('.con_img');
    const elSpecialCon_txt = document.querySelectorAll('.con1_text');
    const elTour = document.querySelector('.tour');
    const elReserv = document.querySelector('.reserve_popupbar');
    let start, end, isScrolled = false, intervalId;
    let n1=0,opacityNum=0,incriNum=0, decreNum=1,
        pos = {y1:0,y2:0,state:true};

        document.body.style.height = (elWrap.offsetHeight) + 'px';

    function reserv(){
        if(elTour.offsetTop >= window.scrollY){
            elReserv.style.display = 'flex';
            if(mql2.matches){
                elReserv.style = 'flex-direction: column;'
;
            }
        }else{
            elReserv.style.display = 'none';
        }

        // if(mql2.matches && window.scroolY==0){
        //     elReserv.style.display = 'block';
        // }
        // if(mql2.matches){
        //     // const resAll = document.querySelector('.reserv');
        //     const resBtn = document.querySelector('.mb_reserv');
        //     resBtn.onclick=()=>{
        //         resBtn.classList.toggle('active');
        //         elReserv.classList.toggle('active');
        //     }
        //     // elReserv.style.display = 'none';
        // }
    }
    
    function updown(){
        pos.y1 = window.scrollY;
        pos.state = pos.y1>pos.y2 ? true : false;
        pos.y2 = pos.y1;
    }
    
    function specialAni(){
        window.onscroll = updown;
        
        let y = window.scrollY, t = elSpecial.offsetTop, c = elSpecial.offsetHeight;
        
        if(y > t+(c*0) && y < t+(c*1)){ 
            n1 = 0;  
            opacityNum = (window.scrollY - (t+(c*0))) * 0.0030;
        }
        else if(y > t+(c*1) && y < t+(c*2)){ 
            n1 = 1; 
            opacityNum = (window.scrollY - (t+(c*1))) * 0.0030;
        }
        else if(y > t+(c*2) && y < t+(c*3)){ 
            n1 = 2; 
            opacityNum= (window.scrollY - (t+(c*2))) * 0.0030;;
        }
        
        incriNum = opacityNum;
        incriNum = Math.max(0, Math.min(1, incriNum));

        decreNum = 1 - opacityNum;
        decreNum = Math.max(0, Math.min(1, decreNum));
        
        elSpecialCon_txt[n1].style = `opacity:${incriNum}; transition:0.8s;`; 
        if(n1 != 0) {
            elSpecialCon_img[n1-1].style = `opacity:${decreNum};`;
            elSpecialCon_txt[n1-1].style = `opacity:${decreNum};`;
        }       
    }    

    function specialFix(){
        clearInterval(intervalId);
        intervalId = setInterval(()=>{
            start = window.scrollY > elSpecial.offsetTop;
            end = (elTour.offsetTop - window.innerHeight) > window.scrollY;
            
            if(!breakPoint || !mql.matches){
                if(start && end){
                    elSpecial.style = `transform:translateY(${window.scrollY - elSpecial.offsetTop}px)`;
                    specialAni();
                }else{
                    if(!start) elSpecial.style = `transform:translateY(0px)`;
                    if(window.scrollY < elSpecial.offsetTop){
                        elSpecialCon_img.forEach((o,i)=>{
                            elSpecialCon_img[i].style = `opacity:1;`;
                            elSpecialCon_txt[i].style = `opacity:0;`;
                        })
                    }
                }
            }

            elWrap.style = `transform:translateY(-${window.scrollY}px)`;            
            reserv();
        });
        
    }

    
    window.onscroll = ()=>{
        specialFix();
        
    }
    
}

window.onload = init;


//reserv-btn
if(mql2.matches){
    const resAll = document.querySelector('.reserve_popupbar');
    const resBtn = document.querySelector('.mb_reserv');
    resBtn.onclick=()=>{
        resBtn.classList.toggle('active');
        resAll.classList.toggle('active');
    }
}


//메인슬라이드
var swiper = new Swiper(".mySwiper", {
    sildesPerview: 4,
    loop: true,
    autoplay:true
});

function swiperTxt(){
    const textElement01 = document.querySelectorAll(".swiper-slide-active span");

    textElement01.forEach((char, i) => {
        let random = Math.random()*0.12;
        char.style.animationDelay = i * random +'s';
    });
}

swiper.on('slideChangeTransitionStart', function (e) {
    swiperTxt();
});
swiperTxt();


//tour
var swiper2 = new Swiper(".tour-mySwiper", {
    slidesPerView: 1,
    loop: true,
    autoplay:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
});

swiper2.on('slideChangeTransitionEnd', function (e) {
    let num = e.realIndex;
    // 0 1 2 3
    const elTourcon=document.querySelectorAll('.tour_content')
    elTourcon.forEach(function(con, i){
        if(num==i){
            con.style='opacity:1; transform:translateY(0%);'
        }else{
            con.style='opacity:0; transform:translateY(100%);'
            
        }
    });
});