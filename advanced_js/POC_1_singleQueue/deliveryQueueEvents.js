'use strict'


/* Iteration 1 single agent single thread */ 
var allTimers = [] ;
var agent = {
  name: 'Agent1',
  maxCount: 20,
  pollInterval: 3000,
  currentCount: 0 
}
var allTimers = [] ;
var globalComplete; 
var startTime ;
var endTime ;
var duration = 1.0 ;
var  toggleHelpBtn   = document.querySelector('#toggleHelpBtn') ;
var  changeDefault  = document.querySelector('#changeDefault') ;
var startDespatch = document.querySelector('#startDespatch') ;
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
var despatchList = document.querySelector('#despatchList') ;
var waitingList = document.querySelector('#waitingList') ;
var durationOver = document.querySelector('#durationOver') ;
let setUp = document.querySelector('#setUp') ;
    var jobDivActive = document.querySelector('.jobDivs.activeDelivery') ;
    var jobDivStandby = document.querySelector('.jobDivs.standbyDelivery') ;
    var btnToggleList = [
  endDespatch,
  abortDespatch ,
  restart ,
  restart1 ,
  addJob ,
  insertJob0,
  insertJob3,
  popJob,
  shiftJob,
  spliceJob 
] ;
if (toggleHelpBtn)
{
  toggleHelpBtn.addEventListener('click', () => {
    if (setUp){
      if (setUp.style.display==='block')
          {
            toggleHelpBtn.innerHTML = 'Show Description and other buttons';
            setUp.style.display='none';
            if (jobDivActive && durationOver.style.display !== 'block'){
              jobDivActive.style.marginTop='65px';
              jobDivStandby.style.marginTop='65px';
            }
          }
          else {
            toggleHelpBtn.innerHTML = 'Hide Description and other buttons';
            setUp.style.display='block';
            jobDivActive.style.marginTop='5px' ;
            jobDivStandby.style.marginTop='5px' ;
          }
   }
  })
}
if (changeDefault){
    changeDefault.addEventListener('click', function(){
      let durat = document.querySelector('#durat');
      duration = Number(durat.value) ;
  });
  }
  if (startDespatch) {
    startTime = new Date() ;
    
    startDespatch.addEventListener('click', function(){
        let durat = document.querySelector('#durat');
      duration = Number(durat.value) ;
      alert('Starting with a duration of ' + duration  + 'minute(s)') ;
      endTime = new Date(startTime.getTime() + duration * 60000).getTime() ;
      durationOver.style.display= "none" ;
      setActiveStatus(btnToggleList, false) ;
       
    myDespatch.startJobs() ;
    let newTime = new Date().getTime() ;
    let poll = window.setInterval(() =>
    {
      if (newTime  >= endTime){
        durationOver.innerHTML = '<h5>DURATION OVER</H5> The stipulated duration of ' + duration + 'minute(s)  is reached; jobs in progress will run their course and complete, while available jobs remain unstarted.' ;
        durationOver.style.display= "block" ;
        setActiveStatus(btnToggleList) ;
        if (jobDivActive){
          jobDivActive.style.marginTop='5px'
          jobDivStandby.style.marginTop='5px'
        }
   window.clearInterval(poll);
      }
      newTime = new Date().getTime() ;
      myDespatch.jobs.forEach((job)=> {
          if (job.maxCount === job.currentCount){
            randomize(false, job) ;
            myDespatch.startJobs(true, true, job) ;
          }
      });
    }, 3000) ;
  
  });
  }
  else {
    alert('start btn not found') ;
  }
  
  if(endDespatch){
    endDespatch.addEventListener('click', function(){
      myDespatch.stopTracker() ;
    }) ;
  }
  if(abortDespatch){
    abortDespatch.addEventListener('click', function(){
      if(abortDespatch.innerHTML === 'Interupt') {
        myDespatch.abort() ;
        abortDespatch.innerHTML = 'Resume';
      }
      else if (abortDespatch.innerHTML === 'Resume') {
        myDespatch.startJobs(false) ;
        abortDespatch.innerHTML = 'Interupt';
      }
    }) ;
  }
  else alert('abort not found') ;
  
  if(restart){
    restart.addEventListener('click', function(){
       alert('restarting...');
       myDespatch.startJobs(true, true ) ;
    }) ;
  }
  else alert('restart not found') ;
  if(restart1){
    restart1.addEventListener('click', function(){
       myDespatch.startJobs(true, true, myDespatch.jobs[0]) ;
    }) ;
  }
  else alert('restart1 not found') ;
  if(addJob){
    addJob.addEventListener('click', function(){
      var newJob =  randomize(true ) ;
      myDespatch.addJob(newJob) ;
    }) ;
  }
  else alert('add job btn not found') ;
  
  if (insertJob0 ){
    insertJob0.addEventListener('click', function(){
      var newJob =  randomize(true ) ;
      myDespatch.addJob(newJob,0) ;
    }) ;
  }
  else alert('insert 0 job btn not found') ;
  if (insertJob3 ){
    insertJob3.addEventListener('click', function(){
      var newJob =  randomize(true ) ;
      myDespatch.addJob(newJob,3) ;
    }) ;
  }
  else alert('insert 0 job btn not found') ;
  
  if (popJob ){
    popJob.addEventListener('click', function(){
      myDespatch.deleteJob() ;
    }) ;
  }
  else alert('delete end job btn not found') ;
  
  if (shiftJob ){
    shiftJob.addEventListener('click', function(){
      myDespatch.deleteJob(0) ;
    }) ;
  }
  else alert('delete 1st job btn not found') ;
  
  /*if (spliceJob ){
    spliceJob.addEventListener('click', function(){
      myDespatch.deleteJob(2) ;
    }) ;
  }
  else alert('delete mid job btn not found') ;*/