//header
let headRequest = async function(){
    let res = await fetch('./header.html');
    let data = await res.text();

    let tag = document.createElement('header');
    tag.innerHTML=data;
    document.body.prepend(tag);

    //header-buger
    const elNavbug = document.querySelector('.bug');
    const elNavbug_span = document.querySelectorAll('.bug > span');
    const elNav = document.querySelector('.nav-menu00');
    
    elNavbug.onclick = function(){
        this.classList.toggle('active');
        elNav.classList.toggle('active');        
        if(elNavbug.classList.contains('active')){
            elNavbug_span.forEach(function(span){
                span.style='background-color:#333;'
            })
        }else{
            elNavbug_span.forEach(function(span){
                span.style=''
            })
        }
    }

}
headRequest();



//header-scrollTime
let pos = {y:0, dy:0, state:''};
let scrollState = function(){
    pos.y=window.scrollY;
    pos.state = (pos.y > pos.dy) ? true : false ;
    pos.dy=pos.y;
}
let headerActive = function(e){
    const elHeader = document.querySelector('header');
    const elLogo = document.querySelector('.logo a');
    const elRight_lang = document.querySelectorAll('.lang a');
    const elBug = document.querySelectorAll('.bug span');
    if(pos.state){
        // down
        elHeader.classList.add('active');
        
    }else{
        // up
        elHeader.classList.remove('active');
        if(window.scrollY!=0){
            elHeader.style='background-color:#fff;'
            elLogo.style='color: #999F54;'
            elRight_lang.forEach(function(lang){
                lang.style='color: #333;'
            })
            elBug.forEach(function(bug){
                bug.style='background-color:#333;'
            })
        }else{
            elHeader.style=''
            elLogo.style=''
            elRight_lang.forEach(function(lang){
                lang.style=''
            })
            elBug.forEach(function(bug){
                bug.style=''
            })
        }
    }
}
window.onscroll = function(){
    scrollState();
    headerActive();
}





//footer
// let body = document.querySelector('body');
let footerRequest = async function(){
    let res2 = await fetch('./footer.html');
    let data2 = await res2.text();

    let tag2 = document.createElement('footer');
    tag2.innerHTML=data2;
    if(document.body.classList.contains('main')==true){
        document.querySelector('.wrap').append(tag2);
    }else{
        document.body.append(tag2);
    }

}
footerRequest();