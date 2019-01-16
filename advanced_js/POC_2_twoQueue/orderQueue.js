var duration = 5 ;
var totalOrders = 1;
var timePerUnit = 1000 ; // mS
var order  = 
    {
   displayName: 'white bread buns',
   quantity: 10,
   totalCost: 0 ,
   name: 'PeterS',
   maxCount: deliveryAddresses[0].distanceMetric,
   deliveryIndex: 0,
   pollInterval: 500,  
   currentCount: 0  
  };
preprocessOrder = function( order) {
  order.maxCount = Number(order.quantity) * Number(timePerUnit) ;
  order.totalCost = Number(order.quantity) * Number(order.unitCost) ;
  order.id = totalOrders++ ;
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
var orders = dynamicQueue() ;
