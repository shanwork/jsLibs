# jsLibs repository


Hi

This is the start of my attempt to build a set of APIs which may be useful for reducing coding efforts


## Content
### util.js
A bunch of APIs, created as a raw js file, non-minimized, not formatted as a framework
<..> = optional argument

1. deepCopy(src, dest, <modifylist>) - non referencial copy from one object (src) to another (dest). Additional optional argument <modifyList> will modify value of some of the keys of the destination object. This would be useful if the object is being cloned to generate large amounts of test data
2. decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places
3. circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
4. circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
5. average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 

### index.html 
Markup with javascript calling the above APIs with a set of console.logs

###
Readme (this file)

## History - significant dates

#### July 2 2017 Initial push to git hub, initial set of files uploaded.
