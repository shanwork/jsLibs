 
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
          if (self.displayRunStatus) { 
            self.displayRunStatus(job) ; 
          }
          job.currentCount++ ;
        }
        if (job.currentCount >= job.maxCount) {
          if (self.displayEndStatus) { // coding sense but awfull english
            self.displayEndStatus(job) ;
          }  
  window.clearInterval(agentTimer) ;
         }   
      
        console.log(count++,`\b`) ;
      }, job.pollInterval) ;
      self.runningJobHandles.push(agentTimer) ;
      return agentTimer ;
    }
    
    let itemCount = 0 ;
    let counter = initTimer(itemCount, job) ;
  }, 
  startJobs: function(newUI=true, restart=false, job = null ) {  
    
    if (job !== null){
      let existingJob = this.jobs.find((jb)=> jb.name === job.name) ; 
      this.reset(existingJob) ;
      if ( this.displayInitialize !== null) {
        this.displayInitialize(existingJob) ;
      }
      this.pollQueue(2000, existingJob) ;
      return ;
    }
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
  },
  reset: function(job) {
    job.currentCount = 0 ;
    
  },
  // Job addition and deletion
  // ... queue
  addJob: function(job, index=-1) {
    switch (index){
      case -1:
      this.jobs.push(job) ; // as name suggests, push
        break ;
      case 0:
        this.jobs.unshift(job) ;
        break ;
      default: this.jobs.splice(index, 0, job) ;
        break ;
    }
  //  if (this.jobMonitorHandles.length > 0 ){
      this.displayInitialize(job,index) ;
      this.abort() ;
      this.startJobs(false) ;
  //  }
  },
  deleteJob: function(index=-1 ) {
    let deletedJob = null ;
    switch (index){
      case -1:
      deletedJob = this.jobs.pop() ; // as name suggests, push
        break ;
      case 0:
      deletedJob = this.jobs.shift() ;
        break ;
      default: deletedJob = this.jobs.splice(index, 1, job) ;
        break ;
    }
    if (deletedJob !== null) {
      deletedJob.deliveryIndex = -1 ;
    }
  //  if (this.jobMonitorHandles.length > 0 ){
    if ( this.displayInitialize){
      this.displayInitialize(deletedJob) ;
    }
      this.abort() ;
      this.startJobs(true) ;
  // }
  },
  
  displayInitialize:null,
  displayRunStatus:null, 
  displayEndStatus:null, 
  
}
dynamicQueue.init.prototype = dynamicQueue.API ;