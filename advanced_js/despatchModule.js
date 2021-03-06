(function despatches () {
  'use strict'
/* Iteration 1 single agent single thread */ 
var startDespatch = document.querySelector('#startDespatch') ;
var endDespatch = document.querySelector('#endDespatch') ;
var despatchList = document.querySelector('#despatchList') ;
var agents = [
  {
  name: 'Agent1',
  maxCount: 20,
  pollInterval: 2000,
  currentCount: 0 
},
  {
  name: 'Agent2',
  maxCount: 30,
  pollInterval: 1000,
  currentCount: 0 
},
  {
  name: 'Agent3',
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
function pollQueue(timer, agenter) {
  console.log('hello') ;
  let startCount = 0 ;
  function initTimer(count, agenter){
    console.log('Started: ', agenter.name ) ;
    let counter = window.setInterval( function() { 
    agenter.currentCount++ ;
      let li = document.getElementById(agenter.name + '_listItem') ;
      if (li){
        li.textContent = agenter.name + ':' + agenter.currentCount ;
      }
    console.log(count++,`\b`) ;
  }, agenter.pollInterval) ;
    return counter ;
  }
  let itemCount = 0 ;
  let counter = initTimer(itemCount, agenter) ;
  let globalComplete2 = window.setInterval( function() {
    if (agenter.currentCount >= agenter.maxCount) {
      window.clearInterval(counter) ;
      let li = document.getElementById(agenter.name + '_listItem') ;
      if (li){
        li.textContent = 'Completed: ' + agenter.currentCount ;
         li.className =  'ended' ;
      }
      console.log('Completed: ', agenter.name ) ;
    
    }}, timer) ;
  allTimers.push(globalComplete2) ;
}
if (startDespatch) {
  startDespatch.addEventListener('click', function(){
    for (agent of agents ){
      let li = document.createElement('li');
      li.className =  'inProgress' ;
      li.id = agent.name + '_listItem' ;
      document.getElementById('despatchList').appendChild(li) ;
      pollQueue(2000, agent) ;
    }
});
}
else {
  alert('start btn not found') ;
}

if(endDespatch){
  endDespatch.addEventListener('click', function(){
    window.clearInterval(globalComplete) ;
    
    if (allTimers.length > 0 ){
      for ( var i = 0; i < allTimers.length; ++i ){
        window.clearInterval( allTimers[i] );
        console.log('reset', allTimers[i] ) ;
      }
    }
  }) ;
}
})() ;
