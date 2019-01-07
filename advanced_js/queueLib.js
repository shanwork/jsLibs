 
// Simple Job Queue API.. takes a list of job objects each with its individual max interations (max count), counter and polling interval
var dynamicQueue = function( ) {
  return new dynamicQueue.init() ;
}

// simulates constructor
dynamicQueue.init = function(){
}

// API... 
dynamicQueue.API = {
  runningJobHandles:[],
  jobMonitorHandles:[],
  
  // remove after the object is tested 
  showObject: function() {
    console.log(this) ;
  },
  // wrapper around the timer start and end closure functions
  pollQueue: function(timer, agenter) {
    var self = this;
    let startCount = 0 ;
    
    // closure fn to  start new job
    function initTimer(count, agenter){
      let agentTimer = window.setInterval( function() {
        if (agenter.currentCount < agenter.maxCount){
          agenter.currentCount++ ;
        }
        if (self.displayRunStatus) { 
          self.displayRunStatus(agenter) ; 
        }
        console.log(count++,`\b`) ;
      }, agenter.pollInterval) ;
      self.runningJobHandles.push(agentTimer) ;
      return agentTimer ;
    }
    
    let itemCount = 0 ;
    let counter = initTimer(itemCount, agenter) ;
    
    let timerTracker = window.setInterval( function() {
      if (agenter.currentCount >= agenter.maxCount) {
        window.clearInterval(counter) ;
        if (self.displayEndStatus) { // coding sense but awfull english
          self.displayEndStatus(agenter) ;
        }      
        console.log('Completed: ', agenter.name ) ;
      }}, timer) ;
    this.jobMonitorHandles.push(timerTracker) ;
  }, 
  stopTracker: function() {
     if (this.jobMonitorHandles.length > 0 ){
      for ( var i = 0; i < this.jobMonitorHandles.length; ++i ){
        window.clearInterval( this.jobMonitorHandles[i] );
        console.log('reset', this.jobMonitorHandles[i] ) ;
      }
      while (this.jobMonitorHandles.length > 0){
        let k = this.jobMonitorHandles.shift() ;
      }
    }
  },
  stopAgents: function(name, all=false) {
    if (all === true) { // all agents
      if (this.runningJobHandles.length > 0 ){
        for ( var i = 0; i < this.runningJobHandles.length; ++i ){
          window.clearInterval( this.runningJobHandles[i] );
          console.log('reset', this.runningJobHandles[i] ) ;
        }
        while (this.runningJobHandles.length > 0){
          let k = this.runningJobHandles.shift() ;
        }
      }
    }
    else {
      // coming soon
    }
    console.log('ending all jobs:', this.runningJobHandles.length) ;
  },
  abort: function() {
    console.log('ending all') ;
    this.stopAgents('', true) ;
    this.stopTracker() ;
    
    
  },
  reset: function(agenter) {
    agenter.currentCount = 0 ;
    
  },
  displayRunStatus:null, 
  displayEndStatus:null, 
  
}
dynamicQueue.init.prototype = dynamicQueue.API ;