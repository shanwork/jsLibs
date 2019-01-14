## Queuing API
Using the asynchronous aspects of javascript, this is an 'iteratively building' API to create a multiple queue system, where it would, typically, be applied to a despatch system like a pizza delivery service or even an ambulance service

As of today there the contents of this folder include the  files

**queueLib.js** : starts, runs and updates a single set of jobs

**queueTest.js**, and **queueTest.html**: apply the above API.

The output can be tried out   [here](http://www.use-my-software.com/myapp/newJS/queueTest.html)


_(More advanced usage where two queues exist, one started and in progress, and one completed. When clicking the restart button, the completed items transfer back to the in progress ones
click [here](http://www.use-my-software.com/myapp/newJS/carryOutDeli.html)

**Note** This is WIP, and styling, texts are not the greatest!!!
)_
#### Current queueLib API and usage
* At this point, the API is in a transit phase. 
* The intended functionality is divided between **queueLib.js** (API) and **queueTest.js**, where code will be moved over from the latter file to the former and made into API format. 
* **queueLib.js** needs a list of *job* objects to run.  
* **queueTest.js** gives this list and instantiates the queue, also provides the callbacks for how to display each job status when running or completed.

###### Usage 
  The object is called ***dynamicQueue*** 
  ~~~~ Javascript 
  var myDespatch = dynamicQueue() ;
  // structure of job object(s) is an example list
  var agents = [
  {
 displayName: 'Team a rapid project',
 name: 'Team_a_Project',
 maxCount: 20,
 deliveryIndex: 0,
 pollInterval: 500,  
 currentCount: 0 
},{
  displayName: 'Team b long project',
 name: 'Team_b_Project',
 maxCount: 20,
 deliveryIndex: 1,
 pollInterval: 2000,
 currentCount: 0 
}];

myDespatch.initialize(agents) ;
  ~~~~

##### API  
**initialize(list)** 
Initializes the queue with a _**list**_ of job objects *( see above example for object structure )*

**pollQueue(timer, job)** 
Starts the polling for a job.. wrapper around a two closure functions which:  start the job and monitor the end condition,  and terminate when it is reach, respectively.
The two functions mentioned return _**window.setInterval**_ objects which are stored in two arrays: 
~~~~ Javascript 
dynamicQueue.API =  { 
  //..
 runningJobHandles:[] ,
 jobMonitorHandles:[],
 // ..
}
 ~~~~
***startJobs()*** 
Runs the polling for the list of job objects *(internally calls **pollQueue**)*

***stopTracker()*** 
Uses window.clearInterval to stop the monitoring jobs and clears the **jobMonitorHandles** array

***stopAgents()*** 
Uses window.clearInterval to stop the running jobs and clears the **runningJobHandles** array.

**abort()** 
Suspends the run. *(internally calls the **stopTracker** and **stopAgents**)*

**addJob(job, index=-1)** 
Adds a job. pauses the run to pick up the new element into the queue, and then resume
_*parameters*_
* job = job to be added
* index = if -1, appended to the end of the queue, if >-0, inserted at that position in the queue

**deleteJob(job, index=-1)** 
 Remove a job. pauses the run to remove the element from the queue, and then resume
_*parameters*_
* job = job to be deleted
* index = if -1, deleted from the end of the queue, if >-0, deleted from that position in the queue

_Both **addJob** and **deleteJob** work in conjunction with displayInitialize (if it is present) to dynamically update the UI. 
for deletion, the _**deliveryIndex**_ field of the object being deleted is set to -1. 
This is something that can be used to delete the element in the _**displayIniitialize**_ callback**_


**FUNCTION HANDLES**  to be provided by the user. _format **function(job)**_

**displayInitialize:** 
~~~~ Javascript
//sample
myDespatch.displayInitialize = function(agenter) {
  let li = document.createElement('li');
    li.className =  'inProgress' ;
    li.id = agenter.name + '_listItem' ;
    document.getElementById('despatchList').appendChild(li) ;
    
}
~~~~
**displayRunStatus**
~~~~ Javascript
//sample
myDespatch.displayRunStatus = function(agenter) {
  let li = document.getElementById(agenter.name + '_listItem') ;
  console.log('Display', li) ;
  if (li){
    li.className =  'inProgress' ;
    li.textContent = agenter.displayName + ', count:  ' + agenter.currentCount + '/' + agenter.maxCount + ', polling: ' + agenter.pollInterval;
  }
}
~~~~
**displayEndStatus**
~~~~ Javascript
//sample
myDespatch.displayEndStatus = function(agenter) {
let li = document.getElementById(agenter.name + '_listItem') ;
        if (li){
          li.textContent = 'Completed: ' + agenter.currentCount ;
          li.className =  'ended' ;
        }
}
~~~~
  *(view the accompanying **queueTest.js** and **.html** files )*
