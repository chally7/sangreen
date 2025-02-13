const elObserve = document.querySelectorAll('li img');


let callback = function(entries, observe){  
    entries.forEach(function(item){
        if(item.isIntersecting){
            item.target.classList.add('active');
            observe.unobserve(item.target);
        }
    })
}


let ob = new IntersectionObserver(callback);
elObserve.forEach(function(item){
    ob.observe(item);
})
