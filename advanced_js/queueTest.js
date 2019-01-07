
var jobs = [];
var myDespatch = dynamicQueue() ;

myDespatch.displayRunStatus = function(agenter) {
  let li = document.getElementById(agenter.name + '_listItem') ;
  console.log('Display', li) ;
  if (li){
    li.textContent = agenter.name + ':' + agenter.currentCount ;
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
var despatchList = document.querySelector('#despatchList') ;
var agents = [
   {
  name: 'Job0',
  maxCount: 20,
  pollInterval: 500,  
  currentCount: 0 
},{
  name: 'Job1',
  maxCount: 20,
  pollInterval: 2000,
  currentCount: 0 
},
  {
  name: 'Job2',
  maxCount: 30,
  pollInterval: 1000,
  currentCount: 0 
},
  {
  name: 'Job3',
  maxCount: 40,
  pollInterval: 800,
  currentCount: 0 
}
] ;
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
    for (agent of agents ){
      let li = document.createElement('li');
      li.className =  'inProgress' ;
      li.id = agent.name + '_listItem' ;
      document.getElementById('despatchList').appendChild(li) ;
      myDespatch.pollQueue(2000, agent) ;
    }
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
     for (agent of agents ){
      myDespatch.pollQueue(2000, agent) ;
    }
      abortDespatch.innerHTML = 'Abort(interupt)';
    }
   /* if (myDespatch.jobMonitorHandles.length > 0 ){
      for ( var i = 0; i < myDespatch.jobMonitorHandles.length; ++i ){
        window.clearInterval( myDespatch.jobMonitorHandles[i] );
        console.log('reset', myDespatch.jobMonitorHandles[i] ) ;
      }
    }*/
  }) ;
}
else alert('abort not found') ;

if(restart){
  restart.addEventListener('click', function(){
     alert('restarting...')
     for (agent of agents ){
      myDespatch.reset(agent) ;
      
      let li = document.getElementById(agent.name + '_listItem' ) ;
      if (li){
        li.className =  'inProgress' ;
      }
      myDespatch.pollQueue(2000, agent) ;
      
    }   
  }) ;
}
else alert('restart not found') ;