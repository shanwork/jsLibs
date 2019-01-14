
var jobs = [];
var deliveryAddresses = [
  {
    name: 'Mary & John',
    address: '12 first lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 100
  },
  {
    name: 'Jenny & Frank',
    address: '15 first lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 105
  },
  {
    name: 'Denise & Jim',
    address: '34 fourth lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 195
  },
  {
    name: 'Joan & Jamesn',
    address: '123 main street, sector 1, cosmo city, ST 12321',
    distanceMetric: 25
  },
  {
    name: 'Francise & Bill',
    address: '231 main street, sector 1, cosmo city, ST 12321',
    distanceMetric: 55
  },
  {
    name: 'Ingrid & Bjorn',
    address: '112 second lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 120
  },
  {
    name: 'Leslie & Claude',
    address: '1 third lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 152
  },
  {
    name: 'Gerda & Klaus',
    address: '15 fourth lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 187
  },
  {
    name: 'Petra & Sergei',
    address: '12 second lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 102
  }
] ;
var agents = [
  {
 displayName: 'Peter Smith',
 name: 'PeterS',
 maxCount: deliveryAddresses[0].distanceMetric,
 deliveryIndex: 0,
 pollInterval: 500,  
 currentCount: 0 
},{
  displayName: 'Frida Andersen',
 name: 'FridaA',
 maxCount: deliveryAddresses[1].distanceMetric,
 deliveryIndex: 1,
 pollInterval: 2000,
 currentCount: 0 
},
 {
  displayName: 'Paul George',
 name: 'PaulG',
 maxCount:  deliveryAddresses[2].distanceMetric,
 deliveryIndex: 2,
 pollInterval: 1000,
 currentCount: 0 
},
 {
  displayName: 'Mario Dsouza',
 name: 'MarioD',
 maxCount:  deliveryAddresses[3].distanceMetric,
 deliveryIndex: 3,
 pollInterval: 800,
 currentCount: 0 
}
] ;
var names = ['Adrian', 'Annie', 'Arnold','Buster', 'Bella', 'Chatrlie', 'Catherine','Kelly', 'Jameson', "Jonathan", 'Joan', 'Jean', 'Jennifer', 'Jessica'];

var deliveryAddressCount = deliveryAddresses.length-1 ;
var agentCount = agents.length-1 ;
var nameCount = names.length-1 ;
var startDespatch = document.querySelector('#startDespatch') ;
var endDespatch = document.querySelector('#endDespatch') ;
var abortDespatch = document.querySelector('#abortDespatch') ;
var restart = document.querySelector('#restart') ;
var addJob = document.querySelector('#addJob') ;
var insertJob0 = document.querySelector('#insertJob0') ;
var insertJob3 = document.querySelector('#insertJob3') ;
var popJob = document.querySelector('#popJob') ;
var shiftJob = document.querySelector('#shiftJob') ;
var spliceJob = document.querySelector('#spliceJob') ;
var despatchList = document.querySelector('#despatchList') ;
var waitingList = document.querySelector('#waitingList') ;

var myDespatch = dynamicQueue() ;

myDespatch.initialize(agents) ;

myDespatch.displayInitialize = function(agenter, index=-1) {
  
  let exists = false ;
  if(waitingList && waitingList.childNodes.length > 0){
    for (i = waitingList.childNodes.length-1 ; i >=0;i--){
        if(waitingList.childNodes[i].id=== agenter.name + '_listItem'){
            despatchList.appendChild(waitingList.childNodes[i]) ;
            exists = true ;
           break ;
        }
      }
  }
  if(despatchList && despatchList.childNodes.length > 0){
    for (i = despatchList.childNodes.length-1 ; i >=0;i--){
        if(despatchList.childNodes[i].id=== agenter.name + '_listItem'){
            exists = true ;
          // delete 
          if(agenter.deliveryIndex === -1)
          {
            despatchList.removeChild(despatchList.childNodes[i])
          }
           break ;
        }
      }
  }
  if (exists === false){
    let li  = document.createElement('li');
    li.className =  'start' ;
    li.id = agenter.name + '_listItem' ;
    if (index > -1){
      despatchList.insertBefore(li, despatchList.childNodes[index]); 
    }
    else {
      despatchList.appendChild(li) ;
    }
  }
    
}

myDespatch.displayRunStatus = function(agenter) {
  let li = document.getElementById(agenter.name + '_listItem') ;
  console.log('Display', li) ;
  if (li){
    let destination =  deliveryAddresses[agenter.deliveryIndex].name + ': ' + deliveryAddresses[agenter.deliveryIndex].address 
    li.className =  'inProgress' ;

    li.innerHTML = agenter.displayName + '<br/>Delivery:  ' + destination + '<br/>' + agenter.currentCount / 10 + ' of' + agenter.maxCount/10  + ' miles' ;
  }
}
myDespatch.displayEndStatus = function(agenter) {
let li = document.getElementById(agenter.name + '_listItem') ;
        if (li){
          let destination =  deliveryAddresses[agenter.deliveryIndex].name + ',<br/> ' + deliveryAddresses[agenter.deliveryIndex].address 
          li.innerHTML = agenter.displayName + '<br/>, Delivered to : ' + destination  ;
          li.className =  'ended' ;
          if(waitingList){
            waitingList.appendChild(li) ;
          }
        }
}

function initializeAgents(totalAgents, agents=null, restart=false){
  let deliveryAddressIndex = agentCount ;
  let maxCount = deliveryAddresses[deliveryAddressIndex].distanceMetric ;
  let pollInterval = maxCount > 180? 500: maxCount > 120? 700: 900 ;
  if (agents === null || restart == true  ){
    deliveryAddressIndex =Math.floor(Math.random() * deliveryAddressCount) ;
    maxCount = deliveryAddresses[deliveryAddressIndex].distanceMetric ;
    pollInterval = maxCount > 180? 500: maxCount > 120? 700: 900 ;
    if (agents===null){
      var newJob =  
      {
       displayName: displayName, 
      name: displayName,
      deliveryIndex: deliveryAddressIndex,
      maxCount: maxCount,
      pollInterval: pollInterval,
      currentCount: 0 
     }
     return newJob ;
    }
    for (let i = agentCount ; i >=0 ; i--, deliveryAddressIndex--){
      if (deliveryAddressIndex < 0 ){
        deliveryAddressIndex = deliveryAddressCount ;
      }
      agents[i].deliveryIndex = deliveryAddressIndex ;
      maxCount = deliveryAddresses[deliveryAddressIndex].distanceMetric ;
      pollInterval = maxCount > 180? 500: maxCount > 120? 700: 900 ;
      agents[i].maxCount = maxCount ;
      agennts[i].pollInterval = pollInterval ;
    }
  }
  return null ;
}
function randomize(single=false) {
  if (single===true){
    let newId = Math.round(Math.random()*100) ;
    
    
    let displayName = names[Math.floor(Math.random() * nameCount)] ;
    let deliveryAddressIndex =Math.floor(Math.random() * deliveryAddressCount) ;
    let maxCount = deliveryAddresses[deliveryAddressIndex].distanceMetric ;
    let pollInterval = maxCount > 180? 500: maxCount > 120? 700: 900 ;
    var newJob =  
    {
     displayName: displayName, 
    name: displayName,
    deliveryIndex: deliveryAddressIndex,
    maxCount: maxCount,
    pollInterval: pollInterval,
    currentCount: 0 
   }
   return newJob ;
  }
  return ;
}
console.log(myDespatch.showObject())
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
     myDespatch.startJobs(true, true ) ;
  }) ;
}
else alert('restart not found') ;

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

if (spliceJob ){
  spliceJob.addEventListener('click', function(){
    myDespatch.deleteJob(2) ;
  }) ;
}
else alert('delete mid job btn not found') ;