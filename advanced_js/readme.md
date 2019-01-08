## Queuing API
Using the asynchronous aspects of javascript, this is an 'iteratively building' API to create a multiple queue system, where it would, typically, be applied to a despatch system like a pizza delivery service or even an ambulance service

As of today there the contents of this folder include the  files

**queueLib.js** : starts, runs and updates a single set of jobs

**queueTest.js**, and **queueTest.html**: apply the above API.

The output can be tried out   [here](http://www.use-my-software.com/myapp/newJS/queueTest.html)

#### Current queueLib API and usage
* At this point, the API is in a transit phase. 
* The intended functionality is divided between **queueLib.js** (API) and **queueTest.js**, where code will be moved over from the latter file to the former and made into API format. 
* **queueLib.js** needs a list of *job* objects to run.  
* **queueTest.js** gives this list and instantiates the queue, also provides the callbacks for how to display each job status when running or completed.

##### API  
  ###### Usage 
  The object is called ***dynamicQueue*** 
  ~~~~ Javascript 
  var myDespatch = dynamicQueue() ;
  var agents = [
  {
 displayName: 'Team a rapid project',
 name: 'Team_a_Project',
 maxCount: 20,
 pollInterval: 500,  
 currentCount: 0 
},{
  displayName: 'Team b long project',
 name: 'Team_b_Project',
 maxCount: 20,
 pollInterval: 2000,
 currentCount: 0 
}];
  ~~~~
  *(view the accompanying **queueTest.js** and **.html** files )*
