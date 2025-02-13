//메인슬라이드
var swiper = new Swiper(".mySwiper", {
    sildesPerview: 4,
    loop: true,
    autoplay:true
});


//roomlist
const elRoom_img = document.querySelectorAll('.room_img li');

elRoom_img.forEach(function(li){
    li.onclick = ()=>{
        if(!li.classList.contains('active')){
            elRoom_img.forEach(function(removeLi){
                removeLi.classList.remove('active');
            })
        }
        li.classList.toggle('active');
    }
})


//special
function init(){
    const elWrap = document.querySelector('.wrap');
    const elSpecial = document.querySelector('.special');
    const elSpecialCon_img = document.querySelectorAll('.con_img');
    const elSpecialCon_txt = document.querySelectorAll('.con1_text');
    const elTour = document.querySelector('.tour');
    
    document.body.style.height = (elWrap.offsetHeight) + 'px';
    
    let inter = setInterval(()=>{
        let start = window.scrollY > elSpecial.offsetTop,
            end = (elTour.offsetTop - window.innerHeight) > window.scrollY 
        
        if(start && end){
            elSpecial.style = `transform:translateY(${window.scrollY - elSpecial.offsetTop}px)`;
        }else{
            if(!start) elSpecial.style = `transform:translateY(0px)`;
        }
        elWrap.style = `transform:translateY(-${window.scrollY}px)`;
    });


    let sNum = 0,oNum=0, bn=2000, timeOut;

    elSpecial.onwheel = (e)=>{

        clearTimeout(timeOut);

        timeOut = setTimeout(()=>{
            elSpecialCon_img[sNum].style.opacity = 0;
            elSpecialCon_txt[sNum].style.opacity = 0;
            
            

            if(e.deltaY > 0){
                //down
                oNum += 0.1;
                if(sNum != 2) sNum++;
                if(oNum > 1) oNum = 0;
            }
            // else{
            //     //up
            //     oNum -= 0.1;
            //     if(sNum > 0) sNum--;
            // }

            if(e.deltaY < 0){
                oNum -= 0.1;
                if(sNum > 0) sNum--;
                if(oNum < 0) oNum = 1;
            }else{
                oNum += 0.1;
                if(sNum != 2) sNum++;
                if(oNum > 1) oNum = 0;
            }


            console.log(oNum)

            elSpecialCon_img[sNum].style.opacity = oNum;
            elSpecialCon_txt[sNum].style.opacity = oNum;
        })
        
        
    }
}

window.onload = init;


/* 

    // 내릴때 (0)
    투명도을 증가...


    // 올리때 (1)
    투명도을 감소...


    //이전배너 / 다음배너
    투명도 1 or 0 넘을 경우 


    //===========업데이트==============


    // 내릴때
    투명도 1 = 0 리셋

    // 올릴때 
    투명도 0 -> 증가로 다시

 */



//tour
var swiper = new Swiper(".tour-mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});