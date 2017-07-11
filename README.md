# jsLibs repository


Hi

This is the start of my attempt to build a set of APIs which may be useful for reducing coding efforts


## Content
### util.js
A bunch of APIs, created as a raw js file, non-minimized, not formatted as a framework
<..> = optional argument
#### Misc and object manipulation
1. ##### deepCopy(src, dest, <modifylist?>) - non referencial copy from one object (src) to another (dest). Additional optional argument <modifyList> will modify value of some of the keys of the destination object. (Detailed explanation below)

2. ##### modifyFields(modify list)  added to the Object.prototype 
   modifies field values of an object (as above)
 ###### NOTE: at this point, 'modifyFields' fails for trying to modify fields of objects cloned by Object.create or new object, because the fields in the cloned object go to the '__proto__' component of the cloned object and my current logic does not yet provision for this


----------------------------------------------------------------------------------------------------
#### Math, Sorting, Geometry and Statistics
3. ##### decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places
4. ##### swap(boxedSwapElements, ascending) 
  - swaps two elements elem1, elem2 boxed in the object 'boxedSwapElements'
  - ascending = true, swaps them so elem1 < elem2, ascending = false swaps so elem1 > elem2, ascending=null/undefined, swaps them anyway
5. #####  bubble (list, startIndex, endIndex) 
    - pushes an element in list at startIndex to endIndex, after saving in temp and pushing in between elements forward
6. ##### circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
7. ##### circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
9. ##### average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
10. ##### meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff?>)
11. ##### variance(arrayOfNumbers, <decPlaces>, <roundOff?>) 
12. ##### standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff?>) 
-----------------------------------------------------------------------------------------------------
1. ##### deepCopy
This would be useful if the object is being cloned to generate large amounts of test data
Best shown with an example 
* Original copy, let's call it 
  #####testObject.   
(We used to play a game called name-place-animal-thing when kids, this object is sort of a sample)
{
    "0":"zero",  
    "name":"Anna",  
    "place":"Agra",  
    "animal":"Antelope",  
    "thing":"Armchair",  
    "points":10,  
    "playerNumber":1,  
    "alternates":{  
       "item1":"Andrew",  
       "item2":"Arnold",  
       "item3":"Accra",  
       "item4":"Adis Ababa",  
       "item5":"African Elephant",  
       "item6":"Armadillo",  
       "item7":{  
         "ten":"ten",  
         "arr":  
          ["a","b",{"name":"1","afe":"2"}]  
        }  
     }  
};  
* simple copy,  
  let's call it 
  ##### simpleCopy.  
  Code:
  ##### deepCopy(testObject, simpleCopy) ;
  ##### deepcopied= true;
  ##### simpleCopy.dateCopied = new Date();
  #### Output
{  
    "0":"zero",    
    "name":"Anna",    
    "place":"Agra",    
    "animal":"Antelope",    
    "thing":"Armchair",    
    "points":10,    
    "playerNumber":1,     
    "alternates":{     
       "item1":"Andrew",    
       "item2":"Arnold",    
       "item3":"Accra",  
       "item4":"Adis Ababa",  
       "item5":"African Elephant",  
       "item6":"Armadillo",  
       "item7":{  
         "ten":"ten",  
         "arr":  
          ["a","b",{"name":"1","afe":"2"}]  
        }  
     }  
     ,"deepcopied":true,  
     "dateCopied":"2017-07-06T22:23:35.694Z"  
};  

* using the following modifyList object
var modifyListNPAT=  
[  
    {  
       key: 'name',  
       operation: 'searchReplace',  
       searchString: 'na',  
       operand: 'nabelle'  
    } ,  
    {  
       key: 'animal',  
       operation: 'concat',  
       operand: 's'  
    } ,  
    {
       key: 'arr',  
       operation: 'concat',  
       operand: '32'  
    },  
    {  
       key: 'points',  
       operation: '*',  
       operand: '1.5'  
    },  
    {
       key: 'playerNumber',  
       operation: '+',  
       operand: '1'  
    }  
     ,
    {
       key: 'item2',
       operation: 'explicitReplace',
       operand: 'Armitage'
    } ,
    {
       key: 'item1',
       operation: 'searchReplace',
       searchString: 'drew',
       operand: 'toine'
    }
    
]  

* Modified object  
{
    "0":"zero",  
    "name":"Annabelle",  // from Anna",  
    "place":"Agra",  
    "animal":"Antelopes", // s concatenated  
    "thing":"Armchair",  
    "points":15, // from 10  
    "playerNumber":2, // from 1,  
    "alternates":{  
       "item1":"Antoine", // from "Andrew",  
       "item2":"'Armitage", // from "Arnold",  
       "item3":"Accra",  
       "item4":"Adis Ababa",  
       "item5":"African Elephant",  
       "item6":"Armadillo",  
       "item7":{  
         "ten":"ten",  
         "arr":  
          ["a32","b32",{"name":"1","afe":"2"}] // 32 concatenated  
        }  
     }
     ,"deepcopied":true,  
     "dateCopied":"2017-07-06T22:30:35.694Z"  
};  

* Imagine taking a blank array and pushing the original and sequentially modified clones of it to this array, modifying the values of the modifyList object dynamically!!!

2. modifyFields(modify list)  added to the Object.prototype 
  - modifies field values of an object (as above)
 ### NOTE: at this point, it fails for trying to modify fields of objects cloned by Object.create or new object, because the fields in the cloned object go to the '__proto__' component of the cloned object and my current logic does not yet provision for this
 
----------------------------------------------------------------------------------------------------
3. decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places
4. circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
5. circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
6. average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
7. meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
8. variance(arrayOfNumbers, <decPlaces>, <roundOff>) 
9. standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff>) 

### index.html 
Markup with javascript calling the above APIs with a set of console.logs

###
Readme (this file)

## History - significant dates

#### July 2 2017 Initial push to git hub, initial set of files uploaded.
