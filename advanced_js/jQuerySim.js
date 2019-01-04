/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */
var elementID 
  var _$ = function(elementId){
        elementID = elementId.replace('#','') ;
        return new _$.init(elementId);
    }
   _$.API = 
   {
       addClass: function(className) {
           let elementId = document.getElementById(elementID);
           if (elementId !== null) {
               elementId.textContent='added class:' + Math.random()* 8 ;
                elementId.classList.add(className) ;
           }
           else alert('not found') ; 
           return this;
       } ,
        removeClass: function(className) {
           let elementId = document.getElementById(elementID);
           if (elementId !== null) {
                elementId.textContent='removed class' + Math.random()* 8 ;
                elementId.classList.remove(className) ;
           }
           else alert('not found') ; 
           return this;
       } ,
       delay: function (timeOut) {
           date1 = new Date() ;
           date2 = new Date() ;
           while (date2.getTime() - date1.getTime() < timeOut){
               date2 = new Date() ;
           }
           setTimeout(function() {
               date2 = new Date() ;
               console.log('callback', date2, date1, date2.getTime() - date1.getTime());
           }, timeOut) ;
           
           console.log(date2, date1, date2.getTime() - date1.getTime());
           return this ;
       
       } 
   }
    
    // like the constructor
    _$.init = function(elementId)
    {
        return document.querySelector(elementId) ;
    }
    _$.init.prototype = _$.API;
 
 _$('hello').addClass('class1').addClass('class2').delay(10000).removeClass('class2')   ;
_$('hello2').addClass('class1').addClass('class2').delay(3000).removeClass('class1')   ;

