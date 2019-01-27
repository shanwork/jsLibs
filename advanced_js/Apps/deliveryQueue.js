

var deliveryAddressCount = deliveryAddresses.length-1 ;
var agentCount = agents.length-1 ;
var nameCount = names.length-1 ;

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
    li.className = 'cells inProgress'; 
    li.innerHTML = '<span> Delivery by: <strong>' + agenter.displayName + '</strong>: distance covered: ' + agenter.currentCount / 10 + ' of ' + agenter.maxCount/10  + ' miles</span>' 
    + '<br/><span> <em style="font-weight:200;">To:</em>' + destination + '</span>'    ;
  }
}
myDespatch.displayEndStatus = function(agenter) {
let li = document.getElementById(agenter.name + '_listItem') ;
        if (li){
          let destination =  deliveryAddresses[agenter.deliveryIndex].name + ':' + deliveryAddresses[agenter.deliveryIndex].address 
          li.className = 'cells ended' ; 
          li.innerHTML = '<span> Delivered by: <strong>' + agenter.displayName + '</strong>: distance covered: ' +  agenter.maxCount/10  + ' miles</span>' 
          + '<br/><span> <em style="font-weight:200;">To:</em>' + destination + '</span>'    ;
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
function randomize(single=false, job=null) {
  if (single===true || job !== null ){
    let newId = Math.round(Math.random()*100) ;
    
    
    let displayName = names[Math.floor(Math.random() * nameCount)] ;
    let deliveryAddressIndex =Math.floor(Math.random() * deliveryAddressCount) ;
    let maxCount = deliveryAddresses[deliveryAddressIndex].distanceMetric ;
    let pollInterval = maxCount > 180? 500: maxCount > 120? 700: 900 ;
    if (job === null ){
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
    else {
       job.deliveryIndex = deliveryAddressIndex;
       job.maxCount = maxCount;
       job.pollInterval = pollInterval;
       job.currentCount = 0; 
      }
    }

  return ;
}
function setActiveStatus( controlList, disable=true){
  controlList.forEach(element => {
    if (element) {
      element.disabled = disable ;
    }
  });
}