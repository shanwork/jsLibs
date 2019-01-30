## Queuing API
Using the asynchronous aspects of javascript, this is an 'iteratively building' API to create a queue system, where it would, typically, be applied to a despatch system like a pizza delivery service or even an ambulance service

The library sits in the file:
**queueLib.js** : which has the API to starts, run and update (including addig and deleting) a single set of jobs


#### Application/ Proof of Concept pages 
Currently, the following iterations are availabe:

1. Simple single thread, single list The output can be tried out   [here](http://www.use-my-software.com/myapp/newJS/queueTest.html)

2. Single Thread but having two lists. click [here](http://www.use-my-software.com/myapp/newJS/singleQueueTest.html)

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
Starts the polling for a job.. wrapper around a closure function which  starts the job and monitors the end condition.
The function mentioned returns _**window.setInterval**_ objects which is stored in an array: 
~~~~ Javascript 
dynamicQueue.API =  { 
  //..
 runningJobHandles:[] ,
 // ..
}
 ~~~~
***startJobs()*** 
Runs the polling for the list of job objects *(internally calls **pollQueue**)*

**setRandomInterval(callback, rules)** 
Executes the _**callback**_ function specified at intervals specified as per the _**rules**_ object. API is thus named because the rules can set at random polling.
_**(W.I.P. but this is applied in my P.O.C. where orders are randomly added [here](http://www.use-my-software.com/myapp/newJS/Apps/orders.html))**_
**Example**
~~~~ Javascript
//sample
  var rules = {
    //fixedList: [1000, 2000, 500, 3000, 300] ,
    randomRange: [10000, 30000] ,
    maxIterations: 1
    
  
  }
  //....
  function pollEnd() {
     if (newTime  < endTime){
       orderQueue.setRandomInterval(addOrder, rules) ;
     }
}
~~~~
***stopAgents()*** 
Uses window.clearInterval to stop the running jobs and clears the **runningJobHandles** array.

**abort()** 
Suspends the run. *(internally calls  **stopAgents**)*

**addJob(job, index=-1)** 
Adds a job. pauses the run to pick up the new element into the queue, and then resume
_*parameters*_
* job = job to be added
* index = if -1, appended to the end of the queue, if >= 0, inserted at that position in the queue

**deleteJob(job, index=-1)** 
 Remove a job. pauses the run to remove the element from the queue, and then resume. parameters and index usage same as above

_Both **addJob** and **deleteJob** work in conjunction with displayInitialize (if it is present) to dynamically update the UI. 
for deletion, the _**deliveryIndex**_ field of the object being deleted is set to -1. 
This is something that can be used to delete the element in the _**displayIniitialize**_ callback**_


**FUNCTION HANDLES**  to be provided by the user. _format **function(job)**_

**displayInitialize:** 
Called when adding a job
~~~~ Javascript
//sample
myDespatch.displayInitialize = function(agenter, index=-1) {
  let li = document.createElement('li');
    li.className =  'inProgress' ;
    li.id = agenter.name + '_listItem' ;
    let despatchList = document.getElementById('despatchList') ;
    // delete 
    if(agenter.deliveryIndex === -1){
        despatchList.removeChild(despatchList.childNodes[i])
     }// insert or append
     else {
        if (index > -1){
          despatchList.insertBefore(li, despatchList.childNodes[index]); 
        }
        else {
          despatchList.appendChild(li) ;
        }
     }
    
}
~~~~
**displayRunStatus**
Called when the job is running
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
Called when the job is ended
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
