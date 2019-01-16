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
   displayName: 'white bread buns',
   quantity: 10,
   unitCost: 7.99,
   totalCost: 0 ,
   name: 'PeterS',
   maxCount: 0,
   deliveryIndex: 0,
   pollInterval: 500,  
   currentCount: 0 
  },{
    displayName: 'Frida Andersen',
   name: 'FridaA',
   maxCount: deliveryAddresses[1].distanceMetric,
   deliveryIndex: 1,
   pollInterval: 500,
   currentCount: 0 
  },
   {
    displayName: 'Paul George',
   name: 'PaulG',
   maxCount:  deliveryAddresses[2].distanceMetric,
   deliveryIndex: 2,
   pollInterval: 500,
   currentCount: 0 
  },
   {
    displayName: 'Mario Dsouza',
   name: 'MarioD',
   maxCount:  deliveryAddresses[3].distanceMetric,
   deliveryIndex: 3,
   pollInterval: 500,
   currentCount: 0 
  }