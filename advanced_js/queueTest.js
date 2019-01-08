
var jobs = [];
var agents = [
  {
 displayName: 'Team a rapid project',
 name: 'Team_a_Project',
 maxCount: 20,
 pollInterval: 500,  
 currentCount: 0 
},{
  displayName: 'Team b long project',
 name: 'Team_b_Project',
 maxCount: 20,
 pollInterval: 2000,
 currentCount: 0 
},
 {
  displayName: 'Team c mid project',
 name: 'Team_c_Project',
 maxCount: 30,
 pollInterval: 1000,
 currentCount: 0 
},
 {
  displayName: 'Team d quick project',
 name: 'Team_d_Project',
 maxCount: 40,
 pollInterval: 800,
 currentCount: 0 
}
] ;
var myDespatch = dynamicQueue() ;

myDespatch.initialize(agents) ;

myDespatch.displayInitialize = function(agenter) {
  let li = document.createElement('li');
    li.className =  'inProgress' ;
    li.id = agenter.name + '_listItem' ;
    document.getElementById('despatchList').appendChild(li) ;
    
}

myDespatch.displayRunStatus = function(agenter) {
  let li = document.getElementById(agenter.name + '_listItem') ;
  console.log('Display', li) ;
  if (li){
    li.className =  'inProgress' ;
    li.textContent = agenter.displayName + ', count:  ' + agenter.currentCount + '/' + agenter.maxCount + ', polling: ' + agenter.pollInterval;
  }
}
myDespatch.displayEndStatus = function(agenter) {
let li = document.getElementById(agenter.name + '_listItem') ;
        if (li){
          li.textContent = 'Completed: ' + agenter.currentCount ;
          li.className =  'ended' ;
        }
}

console.log(myDespatch.showObject())
  'use strict'
/* Iteration 1 single agent single thread */ 
var startDespatch = document.querySelector('#startDespatch') ;
var endDespatch = document.querySelector('#endDespatch') ;
var abortDespatch = document.querySelector('#abortDespatch') ;
var restart = document.querySelector('#restart') ;
var addJob = document.querySelector('#addJob') ;
var despatchList = document.querySelector('#despatchList') ;
var allTimers = [] ;
var agent = {
  name: 'Agent1',
  maxCount: 20,
  pollInterval: 3000,
  currentCount: 0 
}
var allTimers = [] ;
var globalComplete; 
if (startDespatch) {
  startDespatch.addEventListener('click', function(){
    myDespatch.startJobs() ;
});
}
else {
  alert('start btn not found') ;
}

if(endDespatch){
  endDespatch.addEventListener('click', function(){
    myDespatch.stopTracker() ;
   /* if (myDespatch.jobMonitorHandles.length > 0 ){
      for ( var i = 0; i < myDespatch.jobMonitorHandles.length; ++i ){
        window.clearInterval( myDespatch.jobMonitorHandles[i] );
        console.log('reset', myDespatch.jobMonitorHandles[i] ) ;
      }
    }*/
  }) ;
}
if(abortDespatch){
  abortDespatch.addEventListener('click', function(){
    if(abortDespatch.innerHTML === 'Abort(interupt)') {
      myDespatch.abort() ;
      abortDespatch.innerHTML = 'Resume';
    }
    else if (abortDespatch.innerHTML === 'Resume') {
      myDespatch.startJobs(false) ;
      abortDespatch.innerHTML = 'Abort(interupt)';
    }
  }) ;
}
else alert('abort not found') ;

if(restart){
  restart.addEventListener('click', function(){
     alert('restarting...');
     myDespatch.startJobs(false, true ) ;
    /* for (agent of agents ){
      myDespatch.reset(agent) ;
      
      let li = document.getElementById(agent.name + '_listItem' ) ;
      if (li){
        li.className =  'inProgress' ;
      }
      myDespatch.pollQueue(2000, agent) ;
      
     }*/   
  }) ;
}
else alert('restart not found') ;

if(addJob){
  addJob.addEventListener('click', function(){
    let newId = Math.round(Math.random()*100) ;
    let maxCount = Math.round(Math.random()*100) ;
    let pollInterval = maxCount > 60? 800: maxCount > 40? 900: 1200 ;
    var newJob =  
    {
     displayName: 'Team ' + newId + ' quick project',
    name: 'Team_' + newId + '_Project',
    maxCount: maxCount,
    pollInterval: pollInterval,
    currentCount: 0 
   }
     myDespatch.addJob(newJob) ;
    /* for (agent of agents ){
      myDespatch.reset(agent) ;
      
      let li = document.getElementById(agent.name + '_listItem' ) ;
      if (li){
        li.className =  'inProgress' ;
      }
      myDespatch.pollQueue(2000, agent) ;
      
     }*/   
  }) ;
}
else alert('restart not found') ;