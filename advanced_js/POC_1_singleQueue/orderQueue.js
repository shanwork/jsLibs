var duration = 5 ;
var totalOrders = 0;
var timePerUnit = 50 ; // mS
  var orderQueue = dynamicQueue() ;
  orderQueue.initialize(orders) ;
  
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

orderQueue.displayRunStatus = function(order) {
  let li = document.getElementById(order.orderId + '_listItem') ;
  console.log('Display', li) ;
  if (li){
     li.className =  'cells inProgress' ;

    li.innerHTML =   order.displayName + '(id: ' + order.orderId + '), processing:' 
    +  Math.round((order.currentCount/order.maxCount) * 100 )  + ' <br/>  Qty:' + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  ;
  }
}
orderQueue.displayEndStatus = function(order) {
let li = document.getElementById(order.orderId + '_listItem') ;
        if (li){
          li.innerHTML =   order.displayName + '(id: ' + order.orderId + '), processed, waiting delivery:  <br/>  Qty:' 
          + order.quantity + ', Cost: '+ Math.round(order.totalCost * 100.00)/100.00  ;
        li.className =  'cells ended' ;
          if(orderDeliveryWaitingList){
            orderDeliveryWaitingList.appendChild(li) ;
          }
        }
}
