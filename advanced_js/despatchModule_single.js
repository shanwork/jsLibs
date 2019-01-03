/* Iteration 1 single agent single thread */ 
var startDespatch = document.querySelector('#startDespatch') ;
var endDespatch = document.querySelector('#endDespatch') ;
var despatchList = document.querySelector('#despatchList') ;
agent = {
  name: 'Agent1',
  maxCount: 20,
  pollInterval: 3000,
  currentCount: 0 
}
agent2 = {
  name: 'Agent2',
  maxCount: 30,
  pollInterval: 1000,
  currentCount: 0 
}
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
  globalComplete = window.setInterval( function() {
    if (agenter.currentCount >= agenter.maxCount) {
      window.clearInterval(counter) ;
      let li = document.getElementById(agenter.name + '_listItem') ;
      if (li){
        li.textContent = 'Completed: ' + agenter.currentCount ;
         li.className =  'ended' ;
      }
      console.log('Completed: ', agenter.name ) ;
    
    }}, timer) ;
}
if (startDespatch) {
  startDespatch.addEventListener('click', function(){
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    li1.className =  'inProgress' ;
    li2.className =  'inProgress' ;
    li1.id = agent.name + '_listItem' ;
    li2.id = agent2.name + '_listItem' ;
    document.getElementById('despatchList').appendChild(li1) ;
    document.getElementById('despatchList').appendChild(li2) ;
pollQueue(2000, agent) ;
pollQueue(2000, agent2) ;
});
}
else {
  alert('start btn not found') ;
}

if(endDespatch){
  endDespatch.addEventListener('click', function(){
    window.clearInterval(globalComplete) ;
    console.log('reset', globalComplete ) ;
  }) ;
}

/*
Exception: SyntaxError: expected expression, got '='
@Scratchpad/2:36
*/