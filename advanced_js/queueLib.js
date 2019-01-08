 
// Simple Job Queue API.. takes a list of job objects each with its individual max interations (max count), counter and polling interval
var dynamicQueue = function( ) {
  return new dynamicQueue.init() ;
}

// simulates constructor
dynamicQueue.init = function(){
}

// API... 
dynamicQueue.API = {
  jobs: [],
  runningJobHandles:[],
  jobMonitorHandles:[],
  
  initialize: function(jobs) {
    this.jobs = jobs ;
  },
  // remove after the object is tested 
  showObject: function() {
    console.log(this) ;
  },
  // wrapper around the timer start and end closure functions
  pollQueue: function(timer, job) {
    var self = this;
    let startCount = 0 ;
    
    // closure fn to  start new job
    function initTimer(count, job){
      let agentTimer = window.setInterval( function() {
        if (job.currentCount < job.maxCount){
          job.currentCount++ ;
        }
        if (self.displayRunStatus) { 
          self.displayRunStatus(job) ; 
        }
        console.log(count++,`\b`) ;
      }, job.pollInterval) ;
      self.runningJobHandles.push(agentTimer) ;
      return agentTimer ;
    }
    
    let itemCount = 0 ;
    let counter = initTimer(itemCount, job) ;
    
    let timerTracker = window.setInterval( function() {
      if (job.currentCount >= job.maxCount) {
        window.clearInterval(counter) ;
        if (self.displayEndStatus) { // coding sense but awfull english
          self.displayEndStatus(job) ;
        }      
        console.log('Completed: ', job.name ) ;
      }}, timer) ;
    this.jobMonitorHandles.push(timerTracker) ;
  }, 
  startJobs: function(newUI=true, restart=false ) {  
    for (job of this.jobs ){
      if (restart === true) {
        this.reset(job) ;
      }
      if (newUI === true && this.displayInitialize !== null) {
          this.displayInitialize(job) ;

      }
    this.pollQueue(2000, job) ;
  }
    
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
  reset: function(job) {
    job.currentCount = 0 ;
    
  },
  addJob: function(job) {
    this.jobs.push(job) ;
    if (this.jobMonitorHandles.length > 0 ){
      this.displayInitialize(job) ;
      this.abort() ;
      this.startJobs(false) ;
    }
  },
  displayInitialize:null,
  displayRunStatus:null, 
  displayEndStatus:null, 
  
}
dynamicQueue.init.prototype = dynamicQueue.API ;