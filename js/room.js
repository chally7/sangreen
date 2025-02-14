
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
        delay: 3000,  // 초마다 자동 전환
        disableOnInteraction: false, // 유저가 조작해도 자동재생 유지
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
        },
        1025:{
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
        }
    }
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

// 🔥 스크롤 감지하여 현재 보이는 방에 맞게 active 자동 변경
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

// 돋보기 버튼 클릭 시 팝업 열기
document.querySelectorAll('.swiper-slide a').forEach(btn => {
    btn.addEventListener('click', function (event) {
        event.preventDefault(); // 기본 링크 기능 방지
        
        // 클릭한 돋보기 버튼의 부모 .swiper-slide 내부 이미지 가져오기
        const imgSrc = this.parentElement.querySelector('img').src;

        // 팝업 이미지 변경
        document.getElementById('popup-img').src = imgSrc;

        // 팝업 보이기
        document.getElementById('popup').style.display = 'flex';
    });
});

// 팝업 닫기 기능
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
});

// 팝업 바깥 클릭 시 닫기
document.getElementById('popup').addEventListener('click', function (event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function () {
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

    // 팝업 닫기 기능
    document.querySelector(".close").addEventListener("click", function () {
        popup.style.display = "none";
    });

    // 팝업 배경 클릭 시 닫기
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});


// 1️⃣2️⃣3️⃣



