var  toggleHelpBtn   = document.querySelector('#toggleHelpBtn') ;
var  changeDefault  = document.querySelector('#changeDefault') ;
var startOrderDespatch = document.querySelector('#startOrderDespatch') ;
var endDespatch = document.querySelector('#endDespatch') ;
var abortDespatch = document.querySelector('#abortDespatch') ;
var restart = document.querySelector('#restart') ;
var restart1 = document.querySelector('#restart1') ;
var addJob = document.querySelector('#addJob') ;
var insertJob0 = document.querySelector('#insertJob0') ;
var insertJob3 = document.querySelector('#insertJob3') ;
var popJob = document.querySelector('#popJob') ;
var shiftJob = document.querySelector('#shiftJob') ;
var spliceJob = document.querySelector('#spliceJob') ;
var deliveredOrders = document.querySelector('.orderLists.deliveredOrders')
var deliveringOrders = document.querySelector('.orderLists.deliveringOrders')
var processingOrders = document.querySelector('.orderLists.processingOrders')
var orderDeliveredList = document.querySelector('#orderDeliveredList') ;
var orderProcessWaitingList = document.querySelector('#orderProcessWaitingList') ;
var orderDeliveryWaitingList = document.querySelector('#orderDeliveryWaitingList') ;

if (toggleHelpBtn)
{
  toggleHelpBtn.addEventListener('click', () => {
    if (setUp){
      if (setUp.style.display==='block')
          {
            toggleHelpBtn.innerHTML = 'Show Description and Detail stats';
            setUp.style.display='none';
            if (deliveringOrders && durationOver.style.display !== 'block'){
              deliveredOrders.style.marginTop='65px';
              deliveringOrders.style.marginTop='65px';
              processingOrders.style.marginTop='65px';
              
              
            }
          }
          else {
            toggleHelpBtn.innerHTML = 'Hide Description and Detail stats';
            setUp.style.display='block';
            deliveredOrders.style.marginTop='5px';
            deliveringOrders.style.marginTop='5px' ;
            processingOrders.style.marginTop='5px';
          }
   }
  })
}
  if (startOrderDespatch) {
    
    startOrderDespatch.addEventListener('click', function(){
        let orderDurat = document.querySelector('#orderDurat');
      duration = Number(orderDurat.value) ;
      alert('Starting with a duration of ' + duration  + 'minute(s)') ;
      startTime = new Date() ;
      endTime = new Date(startTime.getTime() + duration * 60000).getTime() ;
      durationOver.style.display= "none" ;
       
      orderQueue.startJobs() ;
      deliveryQueue.startJobs() ;
      
    newTime = new Date().getTime() ;
    let poll = window.setInterval(() =>
    {
      if (newTime  >= endTime){
        durationOver.innerHTML = '<h5>DONE</H5> The stipulated duration of ' + duration + 'minute(s)  is reached; No new orders processed, existing orders will be fulfilled' ;
        durationOver.style.display= "block" ;
        window.clearInterval(poll);
      }
      newTime = new Date().getTime() ;
      pollEnd() ;
    }, 3000) ;
  
  });
  }
  else {
    alert('start btn not found') ;
  }