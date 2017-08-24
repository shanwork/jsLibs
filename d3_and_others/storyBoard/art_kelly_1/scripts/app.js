var removeAll = function()
{
       console.log(d3.select("#storyBoard").selectAll('div').html());
}
var currentIndex =1, prevIndex=1;
openStory = function(fadeMode=0){
     let index = 0;
    
    let domElementCurtain = DOMElement('curtain');
    let domElementMainStory = DOMElement('mainStory');
    let fadeOutIterations = [
        {
            start:1.0, 
            end:0.9,
            timout:200
        }, {
            start:0.9, 
            end:0.8,
            timout:200
        },
        {
            start:0.8, 
            end:0.6,
            timout:600
        },
        {
            start:0.6, 
            end:0.4,
            timout:400
        },
        {
            start:0.4, 
            end:0.2,
            timout:500
        }
        ,
        {
            start:0.2, 
            end:0.0,
            timout:500
        }
    ];
            
    switch(fadeMode){
        case 0: domElementCurtain.transitionFadeParallel(domElementMainStory,fadeOutIterations,index,null);//fadeParallel (domElementCurtain, domElementMainStory, fadeOutIterations, iterationsFadeIn, index,0);
            break;
        case 1: 
            let iterationsFadeIn = [
        {
            start:0.0, 
            end:0.2,
            timout:400
        },
        {
            start:0.2, 
            end:0.4,
            timout:500
        },
        {
            start:0.4, 
            end:0.6,
            timout:300
        },
        {
            start:0.6, 
            end:0.8,
            timout:100
        }
        ,
        {
            start:0.8, 
            end:1.0,
            timout:100
        }
    ];
            domElementCurtain.transitionFadeSequential(domElementMainStory,fadeOutIterations,index,null);
            break;
    }
    let domElement = DOMElement('curtain');
   
  
    
  
    return;
}


openStory2 = function(){
    let domElement = DOMElement('introImage');
    domElement.fade(1.0, 0.8,4000, function() { 
         let domElement2 = DOMElement('introImage');
         domElement2.fade(0.8, 0.4,3000, function() {
            let domElement3 = DOMElement('introImage');
            domElement3.fade(0.4, 0.0,1000, function() {
             
            }); 
         });
         DOMElement('curtain').display('none');
    });
  let domElement4 = DOMElement('mainStory');
              domElement4.display('block')
                .fade(0.0,5.0,600, function(){
                   let domElement5 = DOMElement('mainStory');
                  domElement5.fade(0.5,1.0,600);
                });
}
highlightSelectionButton = function(index){
    if (index != currentIndex){
    prevIndex = currentIndex;
     let prevClickButton = document.getElementById('chapt_'+ currentIndex);
     if (prevClickButton)
         prevClickButton.style.opacity='1.0';
    let currentClickButton = document.getElementById('chapt_'+ index);
     if (currentClickButton) 
         currentClickButton.style.opacity='0.2';
    currentIndex=index;
}
}
loadChapterDiv = function(index, postBack=true){
if (postBack==false)
    {
        let chapterRowDiv = document.getElementById('chapterRow');
        if (chapterRowDiv){
            let defaultButtonStyle = "padding:3px;font-weight:bold;color:green;background-color:lightyellow; border: 1px solid green;margin:2px; border-radius:3px;";
            let prevButton = document.createElement("button");
            prevButton.setAttribute("style", defaultButtonStyle);
            prevButton.innerHTML = '<<< PREV'
            prevButton.addEventListener('click', function() { loadChapterDiv( -1 ) } );
            chapterRowDiv.appendChild(prevButton);
            for (let chaptIndex=0; chaptIndex < kellysPaintings.length;chaptIndex++){
                let chapterButton = document.createElement("button");
                let buttonText = kellysPaintings[chaptIndex].buttonText?
                    kellysPaintings[chaptIndex].buttonText:"Chapter " + (chaptIndex+1);
                chapterButton.innerHTML = buttonText;
                chapterButton.setAttribute("style", kellysPaintings[chaptIndex].buttonStyle?   kellysPaintings[chaptIndex].buttonStyle  :defaultButtonStyle);
                chapterButton.setAttribute("id", 'chapt_' + (chaptIndex+1) );
                chapterButton.setAttribute("title", kellysPaintings[chaptIndex].title);
                chapterButton.addEventListener('click', function() { loadChapterDiv( chaptIndex+1 ) } );
                chapterRowDiv.appendChild(chapterButton);
                let currentButton = document.getElementById('chapt_1');
                if (currentButton)
                    currentButton.style.opacity='0.2';
                        
            }
            let nextButton = document.createElement("button");
            nextButton.setAttribute("style", defaultButtonStyle);
            nextButton.innerHTML = 'NEXT >>>'
            nextButton.addEventListener('click', function() { loadChapterDiv( -2 ) } );
            chapterRowDiv.appendChild(nextButton);
            
        }
    }
if (index ==-1){
    index = currentIndex-1;
    if (index ==0 )
        index =  kellysPaintings.length;
}
    if (index ==-2){
    index = currentIndex+1;
    if (index >  kellysPaintings.length)
        index = 1;
}

 highlightSelectionButton(index);

let currentChapter = kellysPaintings[index-1];// ,end) ;//index+1);
let text = ''; 
for (let i = 0; i < currentChapter.subsections.length;i++){
                        if (currentChapter.subsections[i].subTitle && currentChapter.subsections[i].subTitle != '')
                        {
                            text += "<h4>" + currentChapter.subsections[i].subTitle + "</h4>";
                        }
                        if (currentChapter.subsections[i].content && currentChapter.subsections[i].content != '')
                        {
                            text +=   currentChapter.subsections[i].content  ;
                        }
                    }
let defaultHeaderStyle= 
    {
        'font-weight': '900',
        'color':'firebrick',
         'background-color': 'transparent', 'opacity':'1.5'
    };
let headerStyle = currentChapter.headerStyle?currentChapter.headerStyle:defaultHeaderStyle
d3.select("#storyBoard")
    .select('H2')
    .style(headerStyle)
    .text(currentChapter.title );
let defaultContentStyle =  { 'border':'3px outset orange',
             'background-image': 'url("images/lord-krishna-786.jpg")',
             'background-size': 'contain',
             'border-radius':'4px', 
             'padding':'2px',
             'color':'orange', 
             'opacity':'0.5',
             'background': 'silver', /* For browsers that do not support gradients */
  'background': '-webkit-linear-gradient(left, red , yellow)',/* For Safari 5.1 to 6.0 */
  'background': '-o-linear-gradient(right, red, yellow)', /* For Opera 11.1 to 12.0 */
  'background': '-moz-linear-gradient(right, red, yellow)', /* For Firefox 3.6 to 15 */
  'background': 'linear-gradient(to right, red , yellow)', /* Standard syntax */
            
              'background-color':'lightgoldenrodyellow'}
let t = d3.transition()
    .duration(7500);
let contentStyle =currentChapter.contentStyle?  currentChapter.contentStyle:defaultContentStyle ;
d3.select("#storyBoard")
    .style(contentStyle  );
  d3.select("#details")
    .style( { 
      'background-color':'#778866',
        'opacity':'0.7',
        'margin': '10px',
      'padding':'5px',
        'color':'black',
        'font-weight':'900',
        'border':'2px solid #334455'})
      .html(text);          
}
