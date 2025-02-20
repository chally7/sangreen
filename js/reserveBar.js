const checkedtextEl = document.querySelector('.checkinout > p');

//방 금액
let roomPrice = {101 : 129000, 102 : 129000, 103 : 149000, 104 : 199000};

//예약하기 바에서 룸 선택
let roomData ="101";

//예약하기 바에서 날짜 선택
let startDate01; //입실날짜
let endDate01; //퇴실날짜

//입실날짜 - 퇴실날짜
let night = 0;

//2페이지에서 쓸 1회성 localStorage
let roomData2;

//어른, 어린이 인원 수
let num = 0;
let num2 = 0;

let oneDay = 24*60*60*1000;

//예약 명단
let reserveDeta = JSON.parse(localStorage.getItem('reserveDeta'))|| {101:[],102:[],103:[],104:[]};
console.log(reserveDeta);

function reserv01(){
         // 캘린더 요소 선택
        var calendarleftEl = document.getElementById('calender_left');

        function formatDate(date) {
            const days = ["일", "월", "화", "수", "목", "금", "토"];
        
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, "0");
            let day = String(date.getDate()).padStart(2, "0");
            let dayOfWeek = days[date.getDay()]; // 요일 가져오기
        
            return `${year}. ${month}. ${day} ${dayOfWeek}`;
        }
        
        // 오늘 날짜
        let today = new Date();
        let formattedToday = formatDate(today);
        
        // 내일 날짜
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        let formattedTomorrow = formatDate(tomorrow);

        checkedtextEl.innerHTML = `${formattedToday} - ${formattedTomorrow}`

        var calendarleftEl = new FullCalendar.Calendar(calendarleftEl, {
            
            selectable: true,
            select: function(info) {
                let startDate = new Date(info.startStr);
                startDate01 = startDate.toISOString().split("T")[0];

                let endDate = new Date(info.endStr);
                let endDate03 = endDate.setDate(endDate.getDate() - 1); // 하루 빼기
                endDate01 = endDate.toISOString().split("T")[0];
                
                let formatDate = (date) => {
                    let year = date.getFullYear();
                    let month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (01, 02 형식)
                    let day = String(date.getDate()).padStart(2, '0'); // 일 (01, 02 형식)
                    let weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' }).replace('.', ''); // 요일 (토, 일 등)
                    
                    return `${year}. ${month}. ${day} ${weekday}`;
                };
                night = (endDate - startDate)/oneDay;

                formattedStartStr = formatDate(startDate);
                formattedEndStr = formatDate(endDate);

                //선택 날짜 P태그에 옮기기
                checkedtextEl.innerHTML = `${formattedStartStr} - ${formattedEndStr}`;
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
                        let checkInDate = new Date(disabledDate[i].입실날짜);  // 입실날짜
                        let checkOutDate = new Date(disabledDate[i].퇴실날짜);  // 퇴실날짜
                        // 퇴실날짜 하루 전으로 설정
                        checkOutDate.setDate(checkOutDate.getDate() - 1);
                    
                        // 날짜 범위 색칠
                        let currentDate = new Date(checkInDate);
                        
                        while (currentDate <= checkOutDate) {
                            let dateStr = currentDate.toISOString().split('T')[0];  // 'yyyy-mm-dd' 형식
                            let dayElement = document.querySelector(`#calender_left .fc-day[data-date="${dateStr}"]`);
                            
                            if (dayElement) {
                                dayElement.style.backgroundColor = '#ccc';  // 회색 배경색 설정
                            }
                            
                            // 날짜 1일 추가
                            currentDate.setDate(currentDate.getDate() + 1);
                            
                        }
                    });

                    // disabledDate.forEach(function(ele, i){
                    //     if (date === disabledDate[i].입실날짜) {
                    //         let b = new Date(disabledDate[i].입실날짜)
                    //         // b.getDate()+2
                    //         // console.log(b.getDate()+night);
                    //         console.log(night);
                            
                            
                    //         cell.style.pointerEvents = 'none'; // 클릭 불가
                    //       cell.style.backgroundColor = '#ccc'; // 비활성화된 색상
                    //       cell.style.opacity = '0.5'; // 투명도
                    //     }
                    // })
                });
            },

            selectAllow: function(selectInfo) {
                let dayEl = document.querySelector(`#calender_left .fc-day[data-date="${selectInfo.startStr}"]`); // td 요소 선택

                if (dayEl) {
                    let bgColor = window.getComputedStyle(dayEl).backgroundColor; // td의 실제 배경색 가져오기
                    console.log(`날짜: ${selectInfo.startStr}, 배경색: ${bgColor}`); // 디버깅 로그

                    return bgColor !== 'rgb(204, 204, 204)'; // 배경색이 회색이면 false 반환 (선택 불가)
                }
                return true; // 요소가 없으면 선택 가능

                // console.log(selectInfo);

                // let disabledDate = reserveDeta[roomData];
                // let date = selectInfo.start;

                // let a = disabledDate.filter((item)=>{
                //     let y = date.getFullYear(),
                //         m = date.getMonth()+1,
                //         d = date.getDate();

                //     if(d < 10){ d = '0'+d; }
                //     if(m < 10){ m = '0'+m; }

                //     return item.입실날짜 == `${y}-${m}-${d}`;
                // })

                // if(a.length){return false;}
                // else{ return true;}
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
        
        
        document.addEventListener('click', function(e){

            if (!roombtnEl[0].contains(e.target) && !roomEl.contains(e.target)) {
                roomEl.classList.remove('active')
            }
            if (!userEl.contains(e.target)){
                userEl.classList.remove('active')
            }
            if (!calenderEl01.contains(e.target)) {
                calenderEl01.classList.remove('active')
            }
        },true);

        roombtnEl.forEach(function(ele){
            ele.addEventListener('click', function(e){
                roomEl.classList.toggle('active');
                userEl.classList.remove('active');
                calenderEl01.classList.remove('active');
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
        const adultEl1 = document.querySelector(".user_adult .button_num > p");
        const childrenEl1 = document.querySelector(".user_children .button_num > p");
        
        adultbtnEl.forEach(function(ele,i){
            ele.onclick=function(){
                if(num<10 && i==1){
                    adultEl1.innerHTML=++num;
                }else if(num>0 && i==0){
                    adultEl1.innerHTML=--num;
                }
            }
        });

        childrenbtnEl.forEach(function(ele2,i2){
            ele2.onclick=function(){
                if(num2<10 && i2===1){
                    childrenEl1.innerHTML=++num2;
                }else if(num2>0 && i2===0){
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
        }
        reserv01.onclick=function(e){
            //1회성 localStorage
            roomData2 = {호실 : roomData, 입실날짜 : startDate01, 퇴실날짜 : endDate01, 성인 :num, 어린이 : num2}
            console.log(roomData2);
            localStorage.setItem('roomData2', JSON.stringify(roomData2));
        }
};
reserv01();