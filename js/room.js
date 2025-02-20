let mql = window.matchMedia("(min-width:300px) and (max-width: 1024px)");

let mql2 = window.matchMedia("(max-width: 480px)");
// ㄴmatchMedia 반응형부분 들어갈 때 수정하는거, ture false 인지 확인해주는 역할
let breakPoint = true;
mql.addListener((e)=>{
    breakPoint = e.matches;
})

const textElement = document.querySelectorAll(".banner_text span");

textElement.forEach((char, i) => {
    let random = Math.random()*0.15;
    char.style.animationDelay = i * random +'s';
}); 


var swiper = new Swiper(".mySwiper", {
    
    loop:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,  // 3초마다 자동 전환
        disableOnInteraction: false, // 유저가 조작해도 자동재생 유지
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
        },//640이상일때 슬라이드 1개
        1025:{
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
        }//1025이상일때 슬라이드 2개
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const roomBtns = document.querySelectorAll(".room-indi li"); // 101~104호 버튼들
    const rooms = document.querySelectorAll("article"); // 각 방 article 요소

    function getOffset() {
        if (window.innerWidth <= 1024) {
            return 10; // 아이패드 여백 
        }else{
            return 100; // PC 여백 
        }
    }
    // function getOffset() {
    //     if (window.innerWidth <= 768) {
    //         return 10; // 모바일 여백 
    //     } else if (window.innerWidth <= 1024) {
    //         return 20; // 아이패드 여백 
    //     } else {
    //         return 100; // PC 여백 
    //     }
    // }

    roomBtns.forEach((btn, i) => {
        btn.addEventListener("click", function () {
            const offset = getOffset(); // 기기별 여백 가져오기
            const targetPosition = rooms[i].getBoundingClientRect().top + window.scrollY - offset;

            // 부드러운 스크롤 이동
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        });
    });
    

    

    const roomIndi = document.querySelector(".room-indi"); // 스크롤에 따라 숨길 요소
    const firstRoom = document.querySelector("article:first-child"); // 101호
    let lastScrollY = window.scrollY; // 마지막 스크롤 위치 저장
    let timeout; // 타이머 변수

    function showRoomIndi() {
        roomIndi.classList.add("visible");
        roomIndi.classList.remove("hidden");
    }

    function hideRoomIndi() {
        roomIndi.classList.add("hidden");
        roomIndi.classList.remove("visible");
    }


    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        let firstRoomRect = firstRoom.getBoundingClientRect(); // 101호 위치 확인

        // 101호가 화면 상단에 있을 때 .room-indi 보이게 설정
        if (firstRoomRect.top >= 0) {
            showRoomIndi();
        } else {
            // 스크롤 방향에 따라 보이거나 숨기기
            if (currentScrollY > lastScrollY) {
                showRoomIndi(); // 아래로 스크롤 시 보이기
            } else {
                hideRoomIndi(); // 위로 스크롤 시 숨기기
            }
        }

        lastScrollY = currentScrollY; // 현재 스크롤 위치 저장

        // 사용자가 스크롤하면 기존 타이머 초기화
        clearTimeout(timeout);

        // 3초 후 자동 표시 (다시 타이머 시작)
        timeout = setTimeout(showRoomIndi, 1000);
    });

    // 페이지 로드시 3초 후 자동 표시 시작
    timeout = setTimeout(showRoomIndi, 1000);
    const swiperSlides = document.querySelectorAll(".swiper-slide a"); // 돋보기 버튼들
    const popup = document.getElementById("popup");
    const popupSwiperWrapper = document.getElementById("popup-swiper-wrapper");
    let popupSwiper; // 팝업 Swiper 변수

    swiperSlides.forEach((btn, index) => {
        btn.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 링크 기능 방지

            // 클릭한 돋보기 버튼이 속한 Swiper 컨테이너 찾기
            const currentSwiper = btn.closest(".swiper");
            const slides = currentSwiper.querySelectorAll(".swiper-slide img:not([src*='돋보기'])"); // 🔥 돋보기 이미지는 제외!

            // 팝업 Swiper 내부 슬라이드 초기화
            popupSwiperWrapper.innerHTML = ""; // 기존 내용 삭제

            // 클릭한 Swiper의 모든 이미지 추가 (돋보기 버튼 제외)
            slides.forEach((img) => {
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");

                const image = document.createElement("img");
                image.src = img.src;

                slide.appendChild(image);
                popupSwiperWrapper.appendChild(slide);
            });

            // 팝업 보이기
            popup.style.display = "flex";

            // Swiper 초기화 (이미 초기화된 경우 제거 후 다시 생성)
            if (popupSwiper) popupSwiper.destroy();

            popupSwiper = new Swiper(".popupSwiper", {
                slidesPerView: 1,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                loop: true,
                initialSlide: index, // 현재 클릭한 이미지에서 시작
            });
        });
    });


    // 팝업 배경 클릭 시 닫기
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});



const roomBtns = document.querySelectorAll('.room-indi li'); // 101~104호 버튼들
const rooms = document.querySelectorAll('article'); // 각 방 article 요소

// 클릭 시 해당 방으로 스크롤 이동 및 active 적용
roomBtns.forEach((btn, i) => {
    btn.addEventListener('click', function () {
        const offset = 100; // 상단 여백 조정
        const targetPosition = rooms[i].getBoundingClientRect().top + window.scrollY - offset;

        // 부드러운 스크롤 이동
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // 모든 버튼에서 active 제거 후 클릭한 버튼에 추가
        roomBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});



//  스크롤 감지하여 현재 보이는 방에 맞게 active 자동 변경
let ticking = false;

window.addEventListener('scroll', function () {
    if (!ticking) {
        requestAnimationFrame(() => {
            let currentIndex = -1;
            let minDiff = Infinity;

            rooms.forEach((room, i) => {
                const rect = room.getBoundingClientRect();
                const diff = Math.abs(rect.top - window.innerHeight / 2); // 화면 중앙과의 거리

                if (diff < minDiff) {
                    minDiff = diff;
                    currentIndex = i; // 가장 가까운 방을 선택
                }
            });

            if (currentIndex !== -1) {
                // 모든 버튼의 active 제거 후, 현재 보이는 방의 버튼만 active 추가
                roomBtns.forEach(b => b.classList.remove('active'));
                roomBtns[currentIndex].classList.add('active');
            }

            ticking = false;
        });

        ticking = true;
    }
});


//reserv-btn
if(mql2.matches){
    const resAll = document.querySelector('.reserve_popupbar');
    const resBtn = document.querySelector('.mb_reserv');
    resBtn.onclick=()=>{
        resBtn.classList.toggle('active');
        resAll.classList.toggle('active');
    }
}


// 1️⃣2️⃣3️⃣



