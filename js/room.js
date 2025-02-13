
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  centeredSlides: true,
  loop:true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,  // 초마다 자동 전환
    disableOnInteraction: false, // 유저가 조작해도 자동재생 유지
  },
});



const elBtn = document.querySelectorAll('.room-indi li'); 
const elSection = document.querySelectorAll('article');

elBtn.forEach(function(btn, i) {
    btn.onclick = function() {
        //  모든 버튼의 'active' 클래스 제거
        elBtn.forEach(a => a.classList.remove('active'));

        //  클릭한 버튼만 'active' 클래스 추가
        btn.classList.add('active');

        // 해당 섹션으로 부드럽게 스크롤 이동
        elSection[i].scrollIntoView({ behavior: 'smooth' });
    };
});





// 1️⃣2️⃣3️⃣
