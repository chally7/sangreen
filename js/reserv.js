document.addEventListener('DOMContentLoaded', function() {
    // 캘린더 요소 선택
    var calendarEl = document.getElementById('calendar');

    // FullCalendar 초기화
    var calendar = new FullCalendar.Calendar(calendarEl, {
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
        events: [
            {
                title: '이벤트 1',
                start: '2025-02-01'
            },
            {
                title: '이벤트 2',
                start: '2025-02-07',
                end: '2025-02-10'
            },
            {
                title: '이벤트 3',
                start: '2025-02-09T12:00:00',
                allDay: false // 하루 종일 이벤트가 아님
            }
        ],
        dateClick: function(info) {
            alert('날짜 클릭: ' + info.dateStr);
        }
    });

    // 캘린더 렌더링
    calendar.render();
});

// document.addEventListener("DOMContentLoaded", function () {
//     const textElement = document.querySelectorAll(".banner_text span");
//     const text = textElement.innerText;
//     textElement.innerHTML = ""; 
//     let random = Math.ceil(Math.random()*4);

//     text.forEach((char, i) => {
//         const span = document.createElement("span");
//         span.innerText = char;
//         span.style.animationDelay = `${i}*${random}s`;
//         textElement.appendChild(span);
//     });
// });

    const textElement = document.querySelectorAll(".banner_text h2 span");

    textElement.forEach((char, i) => {
        let random = Math.random()*0.15;
        char.style.animationDelay = i * random +'s';
    });