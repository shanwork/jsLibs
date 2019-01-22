var  changeDefault  = document.querySelector('#changeDefault') ;
var startOrderDespatch = document.querySelector('#startOrderDespatch') ;
var endDespatch = document.querySelector('#endDespatch') ;
var abortDespatch = document.querySelector('#abortDespatch') ;
var restart = document.querySelector('#restart') ;
var restart1 = document.querySelector('#restart1') ;
var addJob = document.querySelector('#addJob') ;
var insertJob0 = document.querySelector('#insertJob0') ;
var insertJob3 = document.querySelector('#insertJob3') ;
var popJob = document.querySelector('#popJob') ;
var shiftJob = document.querySelector('#shiftJob') ;
var spliceJob = document.querySelector('#spliceJob') ;
var orderDeliveredList = document.querySelector('#orderDeliveredList') ;
var orderProcessWaitingList = document.querySelector('#orderProcessWaitingList') ;
var orderDeliveryWaitingList = document.querySelector('#orderDeliveryWaitingList') ;

  if (startOrderDespatch) {
    
    startOrderDespatch.addEventListener('click', function(){
        let orderDurat = document.querySelector('#orderDurat');
      duration = Number(orderDurat.value) ;
      alert('Starting with a duration of ' + duration  + 'minute(s)') ;
      startTime = new Date() ;
      endTime = new Date(startTime.getTime() + duration * 60000).getTime() ;
      durationOver.style.display= "none" ;
       
      orderQueue.startJobs() ;
    let newTime = new Date().getTime() ;
    let poll = window.setInterval(() =>
    {
      if (newTime  >= endTime){
        durationOver.innerHTML = '<h5>DURATION OVER</H5> The stipulated duration of ' + duration + 'minute(s)  is reached; jobs in progress will run their course and complete, while available jobs remain unstarted.' ;
        durationOver.style.display= "block" ;
        window.clearInterval(poll);
      }
      newTime = new Date().getTime() ;
      orderQueue.jobs.forEach((job)=> {
          if (job.maxCount === job.currentCount){
            randomize(false, job) ;
            orderQueue.startJobs(true, true, job) ;
          }
      });
    }, 3000) ;
  
  });
  }
  else {
    alert('start btn not found') ;
  }