# jsLibs repository


Hi

This is the start of my attempt to build a set of APIs which may be useful for reducing coding efforts


## Content
### MathStatsAndMisc.js
This is a simple Javascript framework library containing three sets of APIs. Evolved from the loose set of functions of 'util.js' below
( <..> = optional argument )
#### 1. MathsAndStats
  usage : 
   let stats = MathsAndStats();
   let average = stats.average([1,2,3,4,5,78], 3);
   ..
 APIs ( '<roundOff>' is redundant, we can use presence of absence of '<decPlaces>' to decide whether to round off or not)
  - decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places
  - circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
  - circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
  - average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
  - meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
  - variance(arrayOfNumbers, <decPlaces>, <roundOff>) 
  - standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff>) 
  
#### 2. JSObjects
    usage : 
   let objectUtils = JSObjects();
    
   - deepCopy
    usage and example
    var testObject = { x: 3, y: { a:1, b:2}, z: [1,2,3,4]};
   var copyTo = {} ;
   var keymodifiers = [{key: 'x', operation: '+', operand: '1'}, {key: 'z', operation: 'concat', operand: '5'}
   objectUtils.deepCopy(testObject,copyTo,keymodifiers)
   // copyTo ={ x: 4, y: { a:1, b:2}, z: [15,25,35,45]};
The function below is used to deep (non reference ) copy an object to another, ie the source and destination
objects are in totally different location; simply put changing the source object will not affect the destination object and vice versa

Using object.values, typeOf, isArray and recusrsion, this builds the destination object element by element, layer by layer.
Works for combination of JSON type objects and Arrays; havent implemented yet for functions.at
  ##### Still some other use cases to take care of in nesting, array drill down,etc ###

#### 3. DOMManipulator
   Useful for custom DOM Manipulation, if you may not want a full blown libary.(WIP). Functions can be chained:  
   ###### usage let domElemment = DOMManipulator(elementID);
   ###### API
   - display(displayStyle)       sets display mode of the element(block, none, etc)
   - text(textToAdd, style=null) sets the text of the element, optionally, sets the style
   - textClass(textToAdd, class=null) sets the text of the element, optionally, sets the class
   (below functions:
       override=false, means it appends to existing style,true = override the style)
   - background(backGroundStyle, override=false) sets background color
   - foreground(foreGroundStyle, override=false) sets color
   - border(borderStyle, override=false ) sets border style.  
   - fade(startOpacity, endOpacity, timeInt ) fade in or out based on two opacities, in timeInt ms
   - conditionExpressionStyle(expression, styleTrue, styleFalse) sets style=styleTrue or styleFalse based on condiiton expression
   - conditionExpressionClass(expression, classTrue, classFalse) sets class=classTrue or classFalse based on condiiton expression
   - switchExpressionClass(expressionClassList, append = true)  * Not tested yet *
       sets class based on evaluation of each expression in 'expressionClassList', appends the class, else overwrites
        example of expressionClassList = 
        [
           {
               exp: areaZip == 94105,
               className: SFOAreaClass
           },
            {
               exp: material == 'marble',
               className: primeMaterialClass
           }
        ] 
   ###### WIP on existing API:
      - consolidate xx() and xxClass() API to a single function, making it transparent to the calling code to send a style string or a classname to the (same) function
      - optional override/append apply to all relevant

----------------------------------------------------------------------

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
8. ##### sortList(list, ascending)  - sorts a list ascending (true) or descending (ascending=false). Currently using bubble sort. Quicksort WIP
9. ##### average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
10. ##### meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff?>)
11. ##### variance(arrayOfNumbers, <decPlaces>, <roundOff?>) 
12. ##### standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff?>) 
-----------------------------------------------------------------------------------------------------
### Proof of concept
   This is a single page show casing cloning and modifying. (right now WIP on the statistics API, howwever, I've implemented the average API.    
   [git source](https://github.com/shanwork/jsLibs/tree/master/statistics)  
 [pubished output ](http://www.use-my-software.com/myApp/statistics/home.html#/entry) 
(right click to 'open in new tab' for both the above links)  
Click 'Generate Test Data'.
Right now it is 'work in progress', need to 
* complete the implementation, 
* add documentation,  
* refine the styling, etc.
but it shows how the seed object is *cloned and modified* ,  
1. ##### deepCopy
This would be useful if the object is being cloned to generate large amounts of test data
Best shown with an example 
* Original copy, let's call it 
  ##### testObject.   
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
