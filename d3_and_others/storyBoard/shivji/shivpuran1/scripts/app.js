
/* Slide show functions..*/
var start=null, slideShowIndex=1;

startSlideShow = function(){
   let startShow = document.getElementById('startShow');
    if (startShow){
        startShow.disabled= true;
        startShow.className = 'playButtons' ;
   } 
   let endShow = document.getElementById('endShow');
    if (endShow) {
        endShow.disabled= false ;
        endShow.className = 'playButtons playButtonPink' ;
    }
    start = window.setInterval( function(){
        loadChapterDiv(slideShowIndex++,true,false);
   },slideShowInterval);
}
endSlideShow = function(){
    window.clearInterval(start);
    if(slideShowIndex > chapterData.length)
        slideShowIndex=1;
    let startShow = document.getElementById('startShow');
    if (startShow){ 
        startShow.disabled= false;
        startShow.className = 'playButtons playButtonGreen' ;
    }
    let endShow = document.getElementById('endShow');
    if (endShow){
        endShow.disabled= true ;
        endShow.className = 'playButtons' ;
    }
}
/* ... Slide show functions*/

/* cover page to main section merge.. in time, the cover page will be absorbed in the json as well */
var currentIndex =1, prevIndex=1;
var currentContentIdTest = 'testpage1', currentContentId = 'page1'
var storyBoard = document.getElementById('storyBoard');
var details = document.getElementById('details');
var storyBoardHeader = document.getElementById('storyBoardHeader') ;
openStory = function(fadeMode=0){
     let index = 0;
    
    let domElementCurtain = DOMElement('curtain');
    let domElementMainStory = DOMElement('mainStory');
    let fadeOutIterations = [
        { start:1.0, end:0.9, timout:200 }, 
        { start:0.9, end:0.8, timout:200 },
        { start:0.8, end:0.6, timout:600 },
        { start:0.6, end:0.4, timout:400 },
        { start:0.4, end:0.2, timout:500 } ,
        { start:0.2, end:0.0, timout:500 }
    ];
            
    switch(fadeMode){
        case 0: domElementCurtain.transitionFadeParallel(domElementMainStory,fadeOutIterations,index,null);
            break;
        case 1: 
            let iterationsFadeIn = [
                { start:0.0, end:0.2, timout:400 },
                { start:0.2, end:0.4, timout:500 }, 
                { start:0.4, end:0.6, timout:300 }, 
                { start:0.6, end:0.8, timout:100 },
                { start:0.8, end:1.0, timout:100 }
            ];
            domElementCurtain.transitionFadeSequential(domElementMainStory,fadeOutIterations,index,null);
            break;
    }
    let domElement = DOMElement('curtain');
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
            slideShowIndex=index;
    }
}
loadChapterDiv = function(index, postBack=true,static=true){
   
    // for the slide show
    if (index > chapterData.length){
        endSlideShow();
    }
    if (postBack==false) {
        let chapterRowDiv = document.getElementById('chapterRow');
        if (chapterRowDiv) {
            let prevButton = document.createElement("button");
            prevButton.setAttribute("style", defaultButtonStyle);
            prevButton.innerHTML = '<<< PREV'
            prevButton.addEventListener('click', function() { loadChapterDiv( -1 ) } );
            chapterRowDiv.appendChild(prevButton);
            let chapterDetailDiv = document.createElement("div");
            chapterDetailDiv.setAttribute("id", 'chapt_details'  );
            chapterDetailDiv.style.width="20px";
            chapterDetailDiv.style.backgroundColor='red';
            chapterDetailDiv.innerHTML = "<span>Click to Hide Me</span>";
            chapterDetailDiv.textContent = "Click to Hide Me";
            chapterDetailDiv.setAttribute("title", 'click to hide');
            chapterDetailDiv.addEventListener('click',
                function() {
                    document.getElementById('chapt_details').style.display='none';
                    document.getElementById('show_chapt_details').style.display='block';
                } );
            chapterRowDiv.appendChild(chapterDetailDiv);
            let showChapterDetailDiv = document.createElement("div");
            showChapterDetailDiv.setAttribute("id", 'show_chapt_details'  );
            chapterDetailDiv.innerHTML = "Click to Hide Me"
            chapterDetailDiv.style.display= 'none' ;
            showChapterDetailDiv.setAttribute("title", 'click to hide');
            showChapterDetailDiv.addEventListener('click',
                function() {
                    document.getElementById('chapt_details').style.display='block';
                    document.getElementById('show_chapt_details').style.display='none';
                } );
            chapterRowDiv.appendChild(showChapterDetailDiv);
            for (let chaptIndex=0; chaptIndex < chapterData.length;chaptIndex++){
                let chapterButton = document.createElement("button");
                let buttonText = chapterData[chaptIndex].buttonText?
                    chapterData[chaptIndex].buttonText:"" + (chaptIndex+1);
                chapterButton.innerHTML = buttonText;
                chapterButton.setAttribute("style", chapterData[chaptIndex].buttonStyle?   chapterData[chaptIndex].buttonStyle  :defaultButtonStyle);
                chapterButton.setAttribute("id", 'chapt_' + (chaptIndex+1) );
                chapterButton.setAttribute("title", chapterData[chaptIndex].title);
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
    } // postback == false
    // next and previous btns, prev click has -1 parameter
    if (index ==-1){
        index = currentIndex-1;
        if (index ==0 )
            index =  chapterData.length;
    }
    // next has -2 param
    if (index ==-2){
        index = currentIndex+1;
        if (index >  chapterData.length)
            index = 1;
    }
    /*
     <div  id='top'   >
                <h2 >Showcasing the APIs offered by  MathsStatsAndMisc.js </h2>
            <div >
                <h3><strong>Table of Contents</strong></h3>
            <ul>
                <li><a href=#about>About</a></li>
                <li><a href='#cloning'>Cloning and modifying</a></li>
                <li><a href='#mathsAndStats'>Mathematical and Statistics API</a></li>
                <li><a href='#domManupulation'>Dom Manipulation</a></li>
            </ul>
            </div>
            <div id='about'>
                <h3>About the library and this page</h3>
                <p>
                    This is a simple, 'non third party framework' html page with JavaScript, including <em>JUST</em> the '.js' file <strong>MathsStatsAndMisc.js</strong>, which attempts to showcase the usage of the APIs contained in it. Barebones HTML, some basic CSS styling to make it presentable, this is broken up into divs, <em>EACH</em> with code examples bullet pointed. The library will have lot of additions, some (transparent) changes with time, but I like to think, there is enough to present at this stage.</p>
                
                
                <ul>
                    <li class='no-decor'>As of <span id='dateSpan'></span>, the file consists of three sets of APIs:</li>
                    <li>JSObjects 
                        <br/>At this point, there is only one function called <strong>deepCopy</strong> which clones an object with the option of modifying the values of the fields of the cloned object.
                        <br/> This can be used to automate generation large amounts of test data, using cloning and modification with looping and randomization appropriately
                        <br/> Some aspects of a JavaScript object like functions as values, and some use cases are still to be covered.
                        <br/> See the section <a href='#cloning'>Cloning and modifying</a> for a sample implementation
                    </li>
                    <li>MathsAndStats
                        <br/> APIs to calculate the circle area and circumference, given a radius value, and average, mean and standard deviation and variance for a list of numbers.
                        <br/> There is also an API to round off to n decimal places
                        <br/> See the section <a href='#mathsAndStats'>Mathematical and Statistics API</a> for a sample implementation
                    </li>
                    <li>DOMManipulator<br/>
                        Set of chained APIs styled on jQuery and d3, though I have not implemented a symbol like '$(' or 'd3.'
                    </li>
                    </ul>
               <a href="#top"><strong>Back To Top of Page</strong></a>
    */
    highlightSelectionButton(index);
    // .. loading content
    let currentChapter = chapterData[index-1]; 
    let subTitleList = [];
    let contentText = '',text='', notesText = ''; 
    for (let i = 0; i < currentChapter.subsections.length;i++){
        if (currentChapter.subsections[i].subTitle && currentChapter.subsections[i].subTitle != '') {
            if (subTitleList.length >= 1){
                contentText += "<a href='#top'><strong>Back To Top</strong></a>";
                contentText += "<h4 id='sect" + (subTitleList.length) +"'>" + currentChapter.subsections[i].subTitle + "</h4>";
            }
            else {
                contentText += "<h4>" + currentChapter.subsections[i].subTitle + "</h4>";
            }
        
            subTitleList.push( currentChapter.subsections[i].subTitle);
        }
        if (currentChapter.subsections[i].content && currentChapter.subsections[i].content != '') {
            contentText +=   currentChapter.subsections[i].content
                .replace(/\<noteref/g,'\<sup\><a id=\'noteref_')
                .replace(/\_note/g,'\' href=\'#note_')
                .replace(/footer\>/g,'\'\>')
                .replace(/\<\/note\>/g,'\<\/a\><\/sup\>');
        //     contentText +=   currentChapter.subsections[i].content.replace(/\<note[0-9]*\>\(/g,'\<sup\><a href=\'#').replace(/\)<\/note\>/g,'\'\>note\<\/a\><\/sup\>');
       //       contentText +=   currentChapter.subsections[i].content.replace(/\<note\>\(/g,'\<sup\><a href=\'#\'\>*</a>\<\sup\>');//.replace(/\)<\/note>,'\\'>*\<\\a\><\/sup\>')  ;
       // workimg  contentText +=   currentChapter.subsections[i].content.replace(/\<note\>\(.\)<\/note>/g,'\<sup\>A<\/sup\>')  ;
       //              contentText +=   currentChapter.subsections[i].content.replace(/\<note\>\(.\)\<\\note\>/,'<sup>t</sup>')  ;
    
        }
        if(currentChapter.subsections[i].notes && currentChapter.subsections[i].notes.length > 0)
        {
             notesText +=  '<p><strong>Notes</strong><ol>';
            for (let mm=1 ; mm <= currentChapter.subsections[i].notes.length ; mm++){
                notesText +=  '<li id=\'note_' + mm + '\'>' +  currentChapter.subsections[i].notes[mm-1] + '        <a href=\'#noteref_' + mm + '\'>(return)</a></li>';
            }
               notesText +=  '</ol></p>';
        }
    }//.. loading content
    if (subTitleList.length > 1){
        contentText += "<a href='#top'><strong>Back To Top</strong></a>";
        /*
        <ul>
                <li><a href=#about>About</a></li>
                <li><a href='#cloning'>Cloning and modifying</a></li>
                <li><a href='#mathsAndStats'>Mathematical and Statistics API</a></li>
                <li><a href='#domManupulation'>Dom Manipulation</a></li>
            </ul>
        */
        text += "<ul id=top style='text-align:left'>";
        for (let j = 0 ; j < subTitleList.length;j++){
            text += "<li><a href=#sect" + (j) + ">" + subTitleList[j] + "</a></li>";
        }
        text+= "</ul>";
    }
    text += contentText + notesText;
    // fade out
  let headerStyleNoCSS ='';// currentChapter.headerStyleNoCSS?currentChapter.headerStyleNoCSS:defaultHeaderStyleNoCSS ;
  let detailStyleNoCSS = '';// currentChapter.detailStyleNoCSS?currentChapter.detailStyleNoCSS:defaultDetailStyleNoCSS;
  
  loadContent = function () {
               details.setAttribute("style", detailStyleNoCSS);
   
    if (postBack==false){
        let firstChapterDiv = document.createElement("div");
        firstChapterDiv.setAttribute('id',currentContentId);
        firstChapterDiv.innerHTML=text;
        details.appendChild(firstChapterDiv);
    }
    let contentContainer = document.createElement("div");
    let newPageID = 'page' + index;
    if (storyBoard && (newPageID != currentContentId)){
        if (!document.getElementById(currentContentId)){
            let oldChapterDiv = document.createElement('div');
            oldChapterDiv.setAttribute('id',currentContentId);
            oldChapterDiv.innerHTML = text ;
            details.appendChild(oldChapterDiv);
    }
        let newChapterDiv = document.createElement('div');
        newChapterDiv.setAttribute('id',newPageID);
        newChapterDiv.innerHTML = text ;
        details.appendChild(newChapterDiv);
        let oldChapterD = DOMElement(currentContentId);
        let newChapterD = DOMElement(newPageID);
        newChapterD.display('none');
        currentContentId = newPageID;
        let fadeOutIterations = [
        { start:1.0, end:0.9, timout: 200 }, 
        { start:0.9, end:0.8, timout: 200 },
        { start:0.8, end:0.6, timout: 600 },
        { start:0.6, end:0.4, timout: 400 },
        { start:0.4, end:0.2, timout: 500 } ,
        { start:0.2, end:0.0, timout: 500 }
        ];
        let fadeIndex =0;
        oldChapterD.transitionFadeParallel(newChapterD,fadeOutIterations,fadeIndex,null);
        if(oldChapterD)
            details.removeChild(oldChapterD.element);
    }
    };
   // contentContainer = 
    let headerStyle = currentChapter.headerStyle?currentChapter.headerStyle:defaultHeaderStyle
    let detailStyle = currentChapter.detailStyle?currentChapter.detailStyle:defaultDetailStyle
    // using d3 ..
     d3Load = function() {
    d3.select("#storyBoard")
        .select('H2')
        .style(headerStyle)
        .text(currentChapter.title );
    let contentStyle =currentChapter.contentStyle?  currentChapter.contentStyle:defaultContentStyle ;
    d3.select("#storyBoard")
        .style(contentStyle  );
    d3.select("#details")
        .style(detailStyle)
      .html(text); 
    }();
    
}
