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
 displayName: 'Peter Smythe',
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
] ;
var names = ['Adrian', 'Annie', 'Arnold','Buster', 'Bella', 'Chatrlie', 'Catherine','Kelly', 'Jameson', "Jonathan", 'Joan', 'Jean', 'Jennifer', 'Jessica'];
