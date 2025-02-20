//상단 배너 애니메이션
const textElement = document.querySelectorAll(".banner_text h2 span");

textElement.forEach((char, i) => {
    let random = Math.random()*0.15;
    char.style.animationDelay = i * random +'s';
});

//예약 명단
let reserveDeta = {
    예약정보:[
        {입실날짜:"2025-02-17", 퇴실날짜:"2025-02-18", 호실:"Room 101호", 이름:"안지현", 전화번호:"010-1111-1111", 이메일:"mocha@gmail.com", 예약번호:"2025021720250218101", 성인:"1명", 어린이:"0명"},
        {입실날짜:"2025-02-17", 퇴실날짜:"2025-02-18", 호실:"Room 102호", 이름:"김똥개", 전화번호:"010-1234-5679", 이메일:"ddongdog@gmail.com", 예약번호:"2025021720250218102", 성인:"2명", 어린이:"0명"},
        {입실날짜:"2025-02-17", 퇴실날짜:"2025-02-18", 호실:"Room 103호", 이름:"김똥개", 전화번호:"010-1234-5679", 이메일:"ddongdog@gmail.com", 예약번호:"2025021720250218103", 성인:"2명", 어린이:"0명"},
        {입실날짜:"2025-02-19", 퇴실날짜:"2025-02-26", 호실:"Room 104호", 이름:"안영희", 전화번호:"010-7445-1111", 이메일:"hello-HeoGak@naver.com", 예약번호:"2025021920250226104", 성인:"2명", 어린이:"4명"},
        {입실날짜:"2025-02-20", 퇴실날짜:"2025-02-24", 호실:"Room 103호", 이름:"소연희", 전화번호:"010-1212-1212", 이메일:"yoen@gmail.com", 예약번호:"2025022020250224103", 성인:"4명", 어린이:"0명"},
        {입실날짜:"2025-02-22", 퇴실날짜:"2025-02-23", 호실:"Room 102호", 이름:"정시온", 전화번호:"010-2222-1212", 이메일:"xiexie@naver.com", 예약번호:"2025022220250223102", 성인:"2명", 어린이:"0명"},
        {입실날짜:"2025-02-22", 퇴실날짜:"2025-02-23", 호실:"Room 101호", 이름:"정수리", 전화번호:"010-7979-5252", 이메일:"ddongsmell@gmail.com", 예약번호:"2025022220250223101", 성인:"1명", 어린이:"1명"},
        {입실날짜:"2025-02-24", 퇴실날짜:"2025-02-26", 호실:"Room 101호", 이름:"이소나", 전화번호:"010-9876-5432", 이메일:"sonazzang@naver.com", 예약번호:"2025022420250226101", 성인:"2명", 어린이:"2명"},
        {입실날짜:"2025-02-24", 퇴실날짜:"2025-02-27", 호실:"Room 104호", 이름:"김민재", 전화번호:"010-4477-9988", 이메일:"soccerking@gmail.com", 예약번호:"2025022420250226104", 성인:"4명", 어린이:"0명"},
    ]
};
localStorage.setItem('reserveDeta', JSON.stringify(reserveDeta));
console.log(localStorage.getItem('reserveDeta'));


function reserv01(){
         // 캘린더 요소 선택
        var calendarEl = document.getElementById('calendar01');
        var calendarleftEl = document.getElementById('calender_left');
        var calendarrightEl = document.getElementById('calender_right');
    
        var calendarEl = new FullCalendar.Calendar(calendarEl, {
            // 옵션 설정
            height: 'auto', 
            initialView: 'dayGridMonth', // 초기 뷰 설정
            local: 'ko',
            headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next',
            },
            
            views: {
                dayGridMonth: {
                    titleFormat: function(date) {
                        let year = date.date.year;
                        let month = String(date.date.month + 1).padStart(2, '0'); // 1월이 0으로 시작하므로 +1
                        return `${year}.${month}`; // "2025.02" 형식으로 변환
                    }
                }
            },
            dayCellDidMount: function(info) {
                let today = new Date();
                let cellDate = new Date(info.date);
    
                const calendar = info.view.calendar; // FullCalendar 인스턴스 가져오기
                const currentMonth = info.view.currentStart.getMonth();// 현재 보이는 달의 월 가져오기
                if (info.date.getMonth() === currentMonth) {
                  // .fc-daygrid-day-frame 요소 찾기
                const dayFrame = info.el.querySelector(".fc-daygrid-day-frame");
                  if (dayFrame) { // 해당 요소가 있을 경우 실행
                    const container = document.createElement("div");
                    container.classList.add("fixed-text-container"); // 스타일을 위한 부모 div
                    // 추가할 텍스트 배열
                    const texts = [
                    "101호 / ₩129,000",
                    "102호 / ₩129,000",
                    "103호 / ₩149,000",
                    "104호 / ₩199,000"
                    ];
                    // 각 텍스트를 div로 만들어 추가
                    texts.forEach(text => {
                        const textEl = document.createElement("div");
                        textEl.classList.add("fixed-text");
                        textEl.textContent = text;
                        container.appendChild(textEl);
                    });
                    // .fc-daygrid-day-frame 안에 추가
                    dayFrame.appendChild(container);
                }
                }
            },
        });
        
        const checkinoutPEl = document.querySelector('checkinout > p');
        var today = new Date();
        var nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); // 다음 달 1일

        var calendarleftEl = new FullCalendar.Calendar(calendarleftEl, {
            
            selectable: true,
            dateClick: function(info) {
            alert('clicked ' + info.dateStr);
            },
            select: function(info) {
            alert('selected ' + info.startStr + ' to ' + info.endStr);
            },

            height: 'auto',
            initialView: 'dayGridMonth',
            locale: 'en',
            headerToolbar: {
                left: 'today',
                center: 'title',
                right: '',
            },
            initialDate: today, // 현재 날짜 기준 (이번 달)
            views: {
                dayGridMonth: {
                    titleFormat: function(date) {
                        let year = date.date.year;
                        let month = String(date.date.month + 1).padStart(2, '0'); // 1월이 0으로 시작하므로 +1
                        return `${year}.${month}`; // "2025.02" 형식으로 변환
                    }
                }
            },
        });
        

        var calendarrightEl = new FullCalendar.Calendar(calendarrightEl, {
            
            selectable: true,
            dateClick: function(info) {
            alert('clicked ' + info.dateStr);
            },
            select: function(info) {
            alert('selected ' + info.startStr + ' to ' + info.endStr);
            },
            
            height: 'auto',
            initialView: 'dayGridMonth',
            locale: 'en',
            headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next',
            },
            initialDate: nextMonth, // 다음 달 표시
            views: {
                dayGridMonth: {
                    titleFormat: function(date) {
                        let year = date.date.year;
                        let month = String(date.date.month + 1).padStart(2, '0'); // 1월이 0으로 시작하므로 +1
                        return `${year}.${month}`; // "2025.02" 형식으로 변환
                    }
                }
            },
        });
        
        calendarEl.render();
    
        // reserv01.html
        // 예약하기 바 룸 선택
        const roombtnEl = document.querySelectorAll('.room_name p, .room_select');
        const roomEl = document.querySelector('.room_list');
        const checkinoutEl = document.querySelector('.left .checkinout');
        const calenderEl = document.querySelector('.reserve_popupbar .calender');
        const adultEl = document.querySelectorAll('.left .adult, .left .children');
        const userEl = document.querySelector('.reserve_popupbar .user');
        const closeEl = document.querySelector(".close");

        roombtnEl.forEach(function(ele){
            ele.addEventListener('click', function(){
                roomEl.classList.toggle('active');
            });
        });

        checkinoutEl.onclick = function(){
            calenderEl.classList.toggle('active');
            setTimeout(function(){
                calendarleftEl.render();
                calendarrightEl.render();
            },50)
        };
        
        closeEl.onclick = function(){
            calenderEl.classList.remove('active');
        }

        adultEl.forEach(function(ele){
            ele.onclick = function(){
                userEl.classList.toggle('active');
            };
        });

        //룸 선택 내용 변경
        const roomNameEl = document.querySelector('.room_name> p');
        const roomListEl = document.querySelectorAll('.room_list p');

        roomListEl.forEach(function(ele){
            ele.onclick=function(){
                roomNameEl.innerHTML = ele.innerHTML;
            }
        });

        //인원 수 변경
        const adultbtnEl = document.querySelectorAll(".button_num > .adult_btn");
        const childrenbtnEl = document.querySelectorAll(".button_num > .children_btn");
        const adultEl1 = document.querySelector(".user_adult .button_num p");
        const childrenEl1 = document.querySelector(".user_children .button_num p");
        
        let num = 0;
        let num2 = 0;

        let adult =
            adultbtnEl.forEach(function(){
                adultbtnEl[1].onclick=function(){
                    if(num<10){
                        adultEl1.innerHTML=++num;
                    }
                }
                adultbtnEl[0].onclick=function(){
                    if(num>0){
                        adultEl1.innerHTML=--num;
                    }
                }
            });
        let childern =
            childrenbtnEl.forEach(function(){
                childrenbtnEl[1].onclick=function(){
                    if(num2<10){
                        childrenEl1.innerHTML=++num2;
                    }
                }
                childrenbtnEl[0].onclick=function(){
                    if(num2>0){
                        childrenEl1.innerHTML=--num2;
                    }
                }
            });
        const userbtnEl = document.querySelector('.user_btn');
        const adulttext = document.querySelector('.adult > p');
        const childrentext = document.querySelector('.children > p');
        const popupuser = document.querySelector('.user');

        userbtnEl.onclick=function(e){
            e.preventDefault(); //새로고침 방지
            adulttext.innerHTML = num;
            childrentext.innerHTML = num2;
            if(popupuser.classList.contains('active')){
                popupuser.classList.remove('active')
            }
        }
};

function reserv02(){
    //전체 동의
    const agree01El = document.querySelector('#agree1');
    const agree02El = document.querySelector('#agree2');
    const agree03El = document.querySelector('#agree3');

    agree01El.addEventListener('change', function() {
        // 전체 동의 체크박스가 체크되면 아래 두 체크박스를 체크
        if (agree01El.checked) {
            agree02El.checked = true;
            agree03El.checked = true;
        } else {
            // 전체 동의 체크박스가 체크 해제되면 아래 두 체크박스도 체크 해제
            agree02El.checked = false;
            agree03El.checked = false;
        }
    });

    //무통장 입금 클릭 시
    const cashEl = document.querySelectorAll('#cash,#card');
    const textEl = document.querySelector('.payment_methods02');

    cashEl.forEach(function(ele, e){
        ele.addEventListener('change', function() {
            if (cashEl[1].checked) {
                textEl.classList.add("active");
            }else{
                textEl.classList.remove("active");
            }
        });
    })
}

function reserv03(){
    //resrev03.html
    
    //조회하기 팝업창
    const inputboxEl = document.querySelector('.reserv03_inputbox a')
    const checkEl = document.querySelector('.reserv03_check');
    const closeBtn = document.querySelector('.close');
    
    inputboxEl.onclick = function(){
        checkEl.classList.add('active');
    };
    closeBtn.onclick = function(){
        checkEl.classList.rem('active');
    };

}

if(window.location.pathname==='/git-project/sangreen/reserv01.html'){
    reserv01();
}else if(window.location.pathname==='/git-project/sangreen/reserv02.html'){
    reserv02();
}else if(window.location.pathname==='/git-project/sangreen/reserv03.html'){
    reserv03();
}







