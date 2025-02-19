//상단 배너 애니메이션
const textElement = document.querySelectorAll(".banner_text h2 span");

//방 금액
let roomPrice = {101 : 129000, 102 : 129000, 103 : 149000, 104 : 199000}

//예약하기 바에서 룸 선택
let roomData ="101";

//예약하기 바에서 날짜 선택
let checkinoutLeft;

//2페이지에서 쓸 1회성 localStorage
let roomData2;

//어른, 어린이 인원 수
let num = 0;
let num2 = 0;

textElement.forEach((char, i) => {
    let random = Math.random()*0.15;
    char.style.animationDelay = i * random +'s';
});

//예약 명단
let reserveDeta = JSON.parse(localStorage.getItem('reserveDeta'));

function reserv01(){
         // 캘린더 요소 선택
        var calendarEl = document.getElementById('calendar01');
        var calendarEl = new FullCalendar.Calendar(calendarEl, {
            // 옵션 설정
            height: 'auto', 
            initialView: 'dayGridMonth', // 초기 뷰 설정
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
                    // 해야할것 => 방호수가 날짜에 일치 한다면 텍스트 보더 넣기

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
        calendarEl.render();

        var calendarleftEl = document.getElementById('calender_left');
        var today = new Date();
        var nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); // 다음 달 1일

        var calendarleftEl = new FullCalendar.Calendar(calendarleftEl, {
            
            selectable: true,
            select: function(info) {
                let startDate = new Date(info.startStr);
                let endDate = new Date(info.endStr);
                endDate.setDate(endDate.getDate() - 1); // 하루 빼기
                
                let formatDate = (date) => {
                    let year = date.getFullYear();
                    let month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (01, 02 형식)
                    let day = String(date.getDate()).padStart(2, '0'); // 일 (01, 02 형식)
                    let weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' }).replace('.', ''); // 요일 (토, 일 등)
            
                    return `${year}. ${month}. ${day} ${weekday}`;
                };
            
                let formattedStartStr = formatDate(startDate);
                let formattedEndStr = formatDate(endDate);
            
                // alert(`선택한 날짜: ${formattedStartStr} - ${formattedEndStr}`);
                checkinoutLeft = `${formattedStartStr} - ${formattedEndStr}`

                //선택 날짜 데이터베이스 저장
                localStorage.setItem('checkinoutLeft', JSON.stringify(checkinoutLeft));

                //선택 날짜 P태그에 옮기기
                checkedtextEl.innerHTML = checkinoutLeft;
                calenderEl01.classList.remove('active');
            },
            selectMirror: true,

            height: 'auto',
            initialView: 'dayGridMonth',
            locale: 'en',
            headerToolbar: {
                left: 'today',
                center: 'title',
                right: 'next',
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
            datesSet: function(arg) {
                
                let disabledDate = reserveDeta[roomData];

                let dayCells = document.querySelectorAll('.fc-day');  // 모든 날짜 셀 가져오기
                
                dayCells.forEach(function(cell) {
                  let date = cell.getAttribute('data-date'); // 셀의 날짜 속성 가져오기
                    disabledDate.forEach(function(ele, i){
                        if (date === disabledDate[i].입실날짜) {
                          cell.style.pointerEvents = 'none'; // 클릭 불가
                          cell.style.backgroundColor = '#ccc'; // 비활성화된 색상
                          cell.style.opacity = '0.5'; // 투명도
                        }
                    })
                });
            },
            selectAllow: function(selectInfo) {
                console.log(selectInfo);

                let disabledDate = reserveDeta[roomData];

                let date = selectInfo.start;                

                let a = disabledDate.filter((item)=>{
                    let y = date.getFullYear(),
                        m = date.getMonth()+1,
                        d = date.getDate();

                    if(d < 10){ d = '0'+d; }
                    if(m < 10){ m = '0'+m; }

                    return item.입실날짜 == `${y}-${m}-${d}`;
                })

                if(a.length){return false;}
                else{ return true;}
            }
        });
    
        // reserv01.html
        // 예약하기 바 룸 선택
        const roombtnEl = document.querySelectorAll('.room_name p, .room_select');
        const roomEl = document.querySelector('.room_list');
        const checkinoutEl = document.querySelector('.left .checkinout');
        const calenderEl01 = document.querySelector('.reserve_popupbar .calender');
        const adultEl = document.querySelectorAll('.left .adult, .left .children');
        const userEl = document.querySelector('.reserve_popupbar .user');
        const closeEl = document.querySelector(".calender_top > .close");
        const closeEl2 = document.querySelector(".user_top > .close");
        const checkedtextEl = document.querySelector('.checkinout > p');

            roombtnEl.forEach(function(ele){
                ele.addEventListener('click', function(){
                    roomEl.classList.toggle('active');
                    userEl.classList.remove('active');
                    calenderEl01.classList.remove('active')
                });
            });
    
            checkinoutEl.onclick = function(){
                calenderEl01.classList.toggle('active');
                setTimeout(function(){
                    calendarleftEl.render();
                },50)
            };
            closeEl.onclick = function(){
                calenderEl01.classList.remove('active');
            };
            closeEl2.onclick = function(){
                userEl.classList.remove('active');
            };
            adultEl.forEach(function(ele){
                ele.onclick = function(){
                    userEl.classList.toggle('active');
                };
            });
    
            //룸 선택 내용 변경
            const roomNameEl = document.querySelector('.room_name> p');
            const roomListEl = document.querySelectorAll('.room_list p');
            
            const roomNum = Object.keys(reserveDeta);
    
            roomListEl.forEach(function(ele, i){
                ele.onclick = function(){
                    roomNameEl.innerHTML = ele.innerHTML;
                    //방의 데이터 갖기
                    roomData = roomNum[i];
                    calendarleftEl.render();
                }
            });

            //인원 수 변경
            const adultbtnEl = document.querySelectorAll(".button_num > .adult_btn");
            const childrenbtnEl = document.querySelectorAll(".button_num > .children_btn");
            const adultEl1 = document.querySelector(".user_adult .button_num p");
            const childrenEl1 = document.querySelector(".user_children .button_num p");
    
            adultbtnEl.forEach(function(ele, i){
                adultbtnEl[i].onclick=function(){
                    if(num<10){
                        adultEl1.innerHTML=++num;
                    }else if(num>0){
                        adultEl1.innerHTML=--num;
                    }
                }
            });
    
            childrenbtnEl.forEach(function(ele, i){
                childrenbtnEl[i].onclick=function(){
                    if(num2<10){
                        childrenEl1.innerHTML=++num2;
                    }else if(num2>0){
                        childrenEl1.innerHTML=--num2;
                    }
                }
            });
    
            const userbtnEl = document.querySelector('.user_btn');
            const adulttext = document.querySelector('.adult > p');
            const childrentext = document.querySelector('.children > p');
            const popupuser = document.querySelector('.user');
            const reserv01 = document.querySelector('.right a')
    
            userbtnEl.onclick=function(e){
                e.preventDefault(); //새로고침 방지
                adulttext.innerHTML = num;
                childrentext.innerHTML = num2;
                if(popupuser.classList.contains('active')){
                    popupuser.classList.remove('active')
                }
                //어른 값
                localStorage.setItem('num', JSON.stringify(num));
                //어린이 값
                localStorage.setItem('num2', JSON.stringify(num2));
            }
            reserv01.onclick=function(e){
                localStorage.setItem('num', JSON.stringify(num));
                localStorage.setItem('num2', JSON.stringify(num2));

                //1회성 localStorage
                roomData2 = {호실 : roomData, 입실날짜 : checkinoutLeft, 성인 :num, 어린이 : num2}
                console.log(roomData2);
                localStorage.setItem('roomData2', JSON.stringify(roomData2));

            }
            
};

function reserv02(){

    let oneDay = 24*60*60*1000;
    let page2Data = JSON.parse(localStorage.getItem('roomData2'));

    //Pdate = 2025. 02. 24 월 - 2025. 02. 27 목 값에서 하이픈 기준으로 배열을 나눔
    let Pdate = page2Data.입실날짜;

    //[0] = "2025. 02. 24 월"
    //[1] = "2025. 02. 27 목" => 배열로 변환
    let Pdatesplit = Pdate.split(' - ');

    //[0],[1] = "2025. 02. 24 월" 문자로 된 값을 날짜로~
    let Pdatesub0 = new Date(Pdatesplit[0].substring(0,12));
    let Pdatesub1 = new Date(Pdatesplit[1].substring(0,12));
    
    let day = Pdatesub1-Pdatesub0;
    
    //몇박인지 확인
    console.log(day/oneDay);
    
    let totalprice = roomPrice[page2Data.호실]*(day/oneDay);

    //예약자 정보
    //이름
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

    const roomNum02 = document.querySelector('.cash > .room > h3');
    const roomData02 = document.querySelectorAll('.room p');
    const total = document.querySelector('.total > p')

    roomNum02.innerHTML = 'Room '+ page2Data.호실 
    roomData02[0].innerHTML = page2Data.입실날짜
    roomData02[1].innerHTML = page2Data.성인
    roomData02[2].innerHTML = page2Data.어린이
    total.innerHTML = `₩${totalprice.toLocaleString("ko-KR")}`;
    
    const inputText = document.querySelectorAll('.input_icon');
    const paybtnEl = document.querySelector('.right_stick > a');

    //결제하기 클릭하면 로컬스토리지에 저장꾸
    paybtnEl.onclick = function(e){
        e.preventDefault(); //새로고침 방지

        let roomDataAll =  JSON.parse(localStorage.getItem('roomData2'));
        roomDataAll.이름 = inputText[0].value;
        roomDataAll.전화번호 = inputText[1].value;
        roomDataAll.이메일 = inputText[2].value;

        //새로 넣은 데이터 저장하기
        reserveDeta[roomDataAll.호실].push(roomDataAll);

        console.log(reserveDeta);
        localStorage.setItem('reserveDeta',JSON.stringify(reserveDeta));

    }
    

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
    JSON.parse(localStorage.getItem('reserveDeta'));
    console.log(reserveDeta);

    reserveDeta[101].forEach((ele, i2)=>{
        ele.이름
        console.log(ele.이름);
        
    })
    reserveDeta[101].forEach((ele, i2)=>{
        ele.전화번호
    })
    reserveDeta[102].forEach((ele, i2)=>{
        ele.이름
    })
    reserveDeta[102].forEach((ele, i2)=>{
        ele.전화번호
    })
    reserveDeta[103].forEach((ele, i2)=>{
        ele.이름
    })
    reserveDeta[103].forEach((ele, i2)=>{
        ele.전화번호
    })
    reserveDeta[104].forEach((ele, i2)=>{
        ele.이름
    })
    reserveDeta[104].forEach((ele, i2)=>{
        ele.이름
    })



    
    //조회하기 팝업창
    const inputboxEl = document.querySelector('.reserv03_inputbox a')
    const checkEl = document.querySelector('.reserv03_check');
    const closeBtn = document.querySelector('.reserv03_check_top > .close');
    const reserv03BtnEL = document.querySelectorAll('.reserv03_btn > a');
    const roomDate = document.querySelectorAll('.room_num li > p:nth-of-type(2)')
    
    const inputText03 = document.querySelectorAll('.input_icon');

    inputboxEl.onclick=function(){
        roomDate[1].innerHTML = reserveDeta[101][1].이름
    }
    console.log(reserveDeta[101][1].이름)






    inputboxEl.onclick = function(e){
        e.preventDefault(); //새로고침 방지
        checkEl.classList.add('active');
    };
    closeBtn.onclick = function(e){
        e.preventDefault(); //새로고침 방지
        checkEl.classList.remove('active');
    };

    reserv03BtnEL.forEach(()=>{
        // reserv03BtnEL[0].onclick = ()=>{
        //     ;
        // }
        reserv03BtnEL[1].onclick = (e)=>{
            e.preventDefault(); //새로고침 방지
            checkEl.classList.remove('active');
        }
        
    })
}

if(window.location.pathname==='/git-project/sangreen/reserv01.html'){
    reserv01();
}else if(window.location.pathname==='/git-project/sangreen/reserv02.html'){
    reserv02();
}else if(window.location.pathname==='/git-project/sangreen/reserv03.html'){
    reserv03();
}







