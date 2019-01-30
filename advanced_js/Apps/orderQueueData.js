var items = 
[
    {
        name: 'wheat bread loaf',
        category1: 'bakery',
        category2: 'breads',
        id: 'bakWheatLoaf1',
        price: 7.99,
        units: 1,

    },
    {
        name: 'wheat bread buns',
        category1: 'bakery',
        category2: 'breads',
        id: 'bakWheatBuns1',
        price: 7.99,
        units: 5,

    }, {
        name: 'white bread loaf',
        category1: 'bakery',
        category2: 'breads',
        id: 'bakWhiteLoaf1',
        price: 6.99,
        units: 1,

    },
    {
        name: 'white bread buns',
        category1: 'bakery',
        category2: 'breads',
        id: 'bakWhitetBuns1',
        price: 6.99,
        units: 5,

    }
]

var orders  = [
    {
   displayName: 'white bread loaf',
   itemCode: 'bakWhiteLoaf1',
   orderId: 1,
   quantity: 2,
   unitCost: 6.99,
   totalCost: 0 ,
   maxCount: 500,
   deliveryIndex: -1,
   pollInterval: 500,  
   currentCount: 0 
  },{
    displayName: 'white bread buns',
    itemCode: 'bakWhitetBuns1',
   orderId: 2,
    quantity: 7,
    unitCost: 6.99,
    totalCost: 0 ,
    maxCount: 500,
    deliveryIndex: -1,
    pollInterval: 500,  
    currentCount: 0 
   },
   {
    displayName: 'wheat bread loaf',
    itemCode: 'bakWheatLoaf1',
   orderId: 3,
    quantity: 3,
    unitCost: 7.99,
    totalCost: 0 ,
    name: 'PeterS',
    maxCount: 500,
    deliveryIndex: -1,
    pollInterval: 500,  
    currentCount: 0 
   },
   {
    displayName: 'wheat bread loaf',
    itemCode: 'bakWheatLoaf1',
   orderId: 4,
    quantity: 5,
    unitCost: 7.99,
    totalCost: 0 ,
    name: 'PeterS',
    maxCount: 500,
    deliveryIndex: -1,
    pollInterval: 500,  
    currentCount: 0 
   }] ;

   var deliveryList = [] ;

   var  order  =   {
    displayName:'' ,
    orderId: 0,
    quantity: 0,
    unitCost: 0,
    totalCost: 0,
    maxCount: 0,
    deliveryIndex:-1,
    pollInterval: 500, 
    currentCount:0
   }