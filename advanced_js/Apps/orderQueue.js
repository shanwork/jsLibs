var duration = 5 ;
var startTime = 0;
var endTime = 0 ;
var newTime = 0 ;
var timePerUnit = 50 ; // mS
var delivering = 0 ;
var orderQueue = dynamicQueue() ;
var deliveryQueue = dynamicQueue() ;
// stats collection
var totalOrders = 0;
var totalRevenue = 0 ;
var totalQuantity = 0 ;
var itemCounter = 0;
var itemRawData = [
  {

  }
]

orderQueue.initialize(orders) ;
deliveryQueue.initialize(deliveryList) ;
//while (delivering < orders.length){
  function testRandom(){
    alert(delivering) ;
  }
  var rules = {
    //fixedList: [1000, 2000, 500, 3000, 300] ,
    randomRange: [10000, 30000] ,
    maxIterations: 1
    
  
  }
//  deliveryQueue.setRandomInterval(testRandom, rules) ;
//}

preprocessOrder = function( order) {
  order.maxCount = Number(order.quantity) * Number(timePerUnit) ;
  order.totalCost = Number(order.quantity) * Number(order.unitCost) ;
  order.orderId = ++totalOrders ;
  totalRevenue += order.totalCost ;
  totalQuantity += order.quantity ;
  let orderStats = document.querySelector('#orderStats');
  if (orderStats){
    orderStats.innerHTML = 'Total Orders placed : ' + totalOrders + ' Total Revenue: ' + Math.round(totalRevenue * 100)/100.00  + ' Total Items: ' + totalQuantity ;
  }
  let foundIndex = itemRawData.findIndex((item)=> { return item.name === order.displayName; } );
  let itemWiseStats = document.querySelector('#itemWiseStats') ;
  if (itemRawData.length === 0 || foundIndex < 0){
   let itemData = {
      name: order.displayName,
      itemCode: order.itemCode,
      quantity: order.quantity,
      totalCost:order.totalCost,
      orders: 1,
      itemCounter: itemCounter++ 
   }
   itemRawData.push(itemData) ;
   if (itemWiseStats){
     var tr = document.createElement('TR') ;
     tr.id = 'row' + itemData.itemCode ;
     var td1 = document.createElement('TD') ;
     td1.id = 'name' + itemData.itemCode ;
     td1.innerHTML = itemData.name ;
     tr.appendChild(td1) ;
     var td2 = document.createElement('TD') ;
     td2.id = 'quantity' + itemData.itemCode ;
     td2.innerHTML = itemData.quantity ;
     tr.appendChild(td2) ;
     var td3 = document.createElement('TD') ;
     td3.id = 'totalCost' + itemData.itemCode ;
     td3.innerHTML = Math.round(itemData.totalCost * 100)/100.00 ;
     tr.appendChild(td3) ;
     var td4 = document.createElement('TD') ;
     td4.id = 'totalOrders' + itemData.itemCode ;
     td4.innerHTML = itemData.orders ;
     tr.appendChild(td4) ;
     itemWiseStats.appendChild(tr);
   }
 }
 else {
   itemRawData[foundIndex].quantity += order.quantity ;
   itemRawData[foundIndex].totalCost += order.totalCost ;
   itemRawData[foundIndex].orders++ ;
   let tableQuantity = document.querySelector('#quantity' + itemRawData[foundIndex].itemCode) ;
   if (tableQuantity)
    tableQuantity.innerHTML = itemRawData[foundIndex].quantity ;
    let tableCost = document.querySelector('#totalCost' + itemRawData[foundIndex].itemCode) ;
    if (tableCost)
    tableCost.innerHTML = Math.round(itemRawData[foundIndex].totalCost * 100)/100.00 ;
     let tabletotalOrders = document.querySelector('#totalOrders' + itemRawData[foundIndex].itemCode) ;
     if (tabletotalOrders)
     tabletotalOrders.innerHTML = itemRawData[foundIndex].orders ;
        }
}
createOrder = function(order, randomize=true, itemIndex=-1, itemQuantity=-1 ) {
    let orderItemIndex = 0 ;
    if (randomize === true ) {
        orderItemIndex = Math.round(Math.random() * items.length) ;
        order.quantity = Math.round(Math.random() * 15) ;
        if (order.quantity < 1) {
          order.quantity = 1 ;
        }
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
      order.itemCode = items[orderItemIndex].id ;
      order.unitCost= items[orderItemIndex].price ;
//      preprocessOrder(order) ;
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

orderQueue.displayRunStatus = function(order) {
  let li = document.getElementById(order.orderId + '_listItem') ;
  console.log('startTime:', startTime, 'newTime:', newTime, 'endTime', endTime) ;
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
            orderDeliveryWaitingList.insertBefore(li, orderDeliveryWaitingList.childNodes[0]); 
            window.setTimeout(pollOrdersForDelivery, 3000) ;
          }
        }
}

deliveryQueue.displayRunStatus = function(order) {
  let li = document.getElementById(order.orderId + '_listItem') ;
 
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
              orderDeliveredList.insertBefore(li, orderDeliveredList.childNodes[0]); 
           // orderDeliveredList.appendChild(li) ;
            }
          }
  }
  function addOrder(){
    var newOrder = Object.create(order)  ;
    createOrder(newOrder, true) ;
    orderQueue.addJob(newOrder,0) ;
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
function pollEnd() {
     if (newTime  < endTime){
       orderQueue.setRandomInterval(addOrder, rules) ;
     }
}