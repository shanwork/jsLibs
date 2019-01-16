var jobs = [];
var deliveryAddresses = [
  {
    name: 'Ms Resident1',
    address: '12 first lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 100
  },
  {
    name: 'Ms Resident2 and ms Resident3',
    address: '15 first lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 105
  },
  {
    name: 'Ms Resident4, Ms Resident5, Mr Resident6',
    address: '34 fourth lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 195
  },
  {
    name: 'Mr Resident7, Spunky the dog',
    address: '123 main street, sector 1, cosmo city, ST 12321',
    distanceMetric: 25
  },
  {
    name: 'Ms. Resident8, Mr. Resident9, Tabby the Siamese',
    address: '231 main street, sector 1, cosmo city, ST 12321',
    distanceMetric: 55
  },
  {
    name: 'Mr. Resident10',
    address: '112 second lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 120
  },
  {
    name: 'Mr. Resident 11 and \'family\' ',
    address: '1 third lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 152
  },
  {
    name: 'Mr Resident 12, Mr Resident 13, BirdieTalk the parrot',
    address: '15 fourth lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 187
  },
  {
    name: 'Ms Redident 14',
    address: '12 second lane, sector 1, cosmo city, ST 12321',
    distanceMetric: 102
  }
] ;
var agents = [
  {
 displayName: 'Dolphin Lover',
 name: 'DLover',
 maxCount: deliveryAddresses[0].distanceMetric,
 deliveryIndex: 0,
 pollInterval: 500,  
 currentCount: 0 
},{
  displayName: 'Orca Watcher',
 name: 'OWatcher',
 maxCount: deliveryAddresses[1].distanceMetric,
 deliveryIndex: 1,
 pollInterval: 500,
 currentCount: 0 
},
 {
  displayName: 'Grey Scientist',
 name: 'GScientist',
 maxCount:  deliveryAddresses[2].distanceMetric,
 deliveryIndex: 2,
 pollInterval: 500,
 currentCount: 0 
},
 {
  displayName: 'Sei Friend',
 name: 'SFriend',
 maxCount:  deliveryAddresses[3].distanceMetric,
 deliveryIndex: 3,
 pollInterval: 500,
 currentCount: 0 
}
] ;
var names = ['A_Beluga_helper', 
'Amble_Humpback', 
'Arcane_Sperm','Bell_Bowhead','Below_Fin', ' Cult_Porpoise', 'Curious_Brydes','Kite_Omuras', 'Jive_Mimke', "Jump_NorthAltantic" ];
