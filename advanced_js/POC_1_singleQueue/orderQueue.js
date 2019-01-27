var duration = 5 ;
var totalOrders = 0;
var timePerUnit = 50 ; // mS
var delivering = 0 ;
var orderQueue = dynamicQueue() ;
var deliveryQueue = dynamicQueue() ;
orderQueue.initialize(orders) ;
deliveryQueue.initialize(deliveryList) ;
//while (delivering < orders.length){
  function testRandom(){
    alert(delivering) ;
  }
  var rules = {
    //fixedList: [1000, 2000, 500, 3000, 300] ,
    randomRange: [1000, 3000] ,
    maxIterations: 10
    
  
  }
//  deliveryQueue.setRandomInterval(testRandom, rules) ;
//}

preprocessOrder = function( order) {
  order.maxCount = Number(order.quantity) * Number(timePerUnit) ;
  order.totalCost = Number(order.quantity) * Number(order.unitCost) ;
  order.orderId = ++totalOrders ;
}
createOrder = function(order, randomize=true, itemIndex=-1, itemQuantity=-1 ) {
    let orderItemIndex = 0 ;
    if (randomize === true ) {
        orderItemIndex = Math.round(Math.random() * items.length) ;
        order.quantity = Math.round(Math.random() * 15) ;
    }
    else 
    {
        orderItemIndex = itemIndex;
        order.quantity = itemQuantity ;
    }
    if (orderItemIndex < 0) {
        orderItemIndex = 0;
    }
    if (orderItemIndex >= items.length) {
        orderItemIndex = items.length-1;
    }
      order.displayName = items[orderItemIndex].name ;
      order.unitCost= items[orderItemIndex].price ;
}

orderQueue.displayInitialize = function(order, index=-1) {
  preprocessOrder(order) ;
  let exists = false ;
  if(orderProcessWaitingList && orderProcessWaitingList.childNodes.length > 0){
    for (i = orderProcessWaitingList.childNodes.length-1 ; i >=0;i--){
        if(orderProcessWaitingList.childNodes[i].id=== order.name + '_listItem'){
          orderProcessWaitingList.appendChild(orderProcessWaitingList.childNodes[i]) ;
            exists = true ;
           break ;
        }
      }
  }
  
     let li  = document.createElement('li');
    li.className =  'start' ;
    li.id = order.orderId + '_listItem' ;
    if (index > -1){
      orderProcessWaitingList.insertBefore(li, orderProcessWaitingList.childNodes[index]); 
    }
    else {
      orderProcessWaitingList.appendChild(li) ;
    }
     
}
deliveryQueue.displayInitialize = function(order, index=-1) {
}
/*
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
*/
orderQueue.displayRunStatus = function(order) {
  let li = document.getElementById(order.orderId + '_listItem') ;
  if (li){
     li.className =  'cells inProgressProcessing' ;
    li.innerHTML =   '<span><strong>Order ' + order.orderId + '</strong>(' + order.displayName + ') :' 
    +  Math.round((order.currentCount/order.maxCount) * 100 )  + '% complete </span> <br/><span>Qty:' + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  + '</span>';
  }
}
orderQueue.displayEndStatus = function(order) {
order.deliveryIndex = delivering++ ;
let li = document.getElementById(order.orderId + '_listItem') ;
        if (li){
          li.className =  'cells endedProcessing' ;
          li.innerHTML =   '<span><strong>Order ' + order.orderId + '</strong>(' + order.displayName + ') ready to deliver</span><br/>' +
          '<span>Qty:' + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  + '</span>';
          if(orderDeliveryWaitingList){
            orderDeliveryWaitingList.appendChild(li) ;
            window.setTimeout(pollOrdersForDelivery, 1000) ;
          }
        }
}

deliveryQueue.displayRunStatus = function(order) {
  let li = document.getElementById(order.orderId + '_listItem') ;
  console.log('Display', li) ;
  if (li){
     li.className =  'cells inProgressDelivering' ;
    li.innerHTML =   '<span><strong>Order ' + order.orderId + '</strong>(' + order.displayName + ') :' 
    +  Math.round((order.currentCount/order.maxCount) * 100 )  + '% complete </span> <br/><span>Qty:' + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  + '</span>';
  }
}

deliveryQueue.displayEndStatus = function(order) {
  let li = document.getElementById(order.orderId + '_listItem') ;
          if (li){
            li.className =  'cells orderDelivered' ;
            li.innerHTML =   '<span><strong>Order ' + order.orderId + '</strong>(' + order.displayName + ') Delivered</span><br/>' +
            '<span>Qty:' + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  + '</span>';
            if(orderDeliveredList){
              orderDeliveredList.appendChild(li) ;
            }
          }
  }
  
function pollOrdersForDelivery(){
orders.forEach((order, index)=>{
   if(order.deliveryIndex >=0){
    let ind = orders[index] ;
    let li = document.getElementById(order.orderId + '_listItem') ;
    orders.splice(index,1) ;
    order.currentCount = 0 ;
    deliveryQueue.addJob(order) ;
  orderQueue.startJobs(false) ;
    if (li){
      li.className =  'cells inProgressDelivering' ;
      li.innerHTML =   '<span><strong>Order ' + order.orderId + '</strong>(' + order.displayName + ') delivering</span><br/>' +
      '<span>Qty:' + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  + '</span>';
    }
    }
}) ;
}