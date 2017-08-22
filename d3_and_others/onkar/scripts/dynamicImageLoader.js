/* Javascript to display a dynamic (unknown quantity) list of images and then drag and drop them
  Part 1: display the dynamic list
   ================================
   Using dom manipulation adding child elements
   - call a function fetch image array.  (the code inside this function could be a call to a REST API)
   
   part 2 drag and drop. Used the HTML5 bases attributes and APIs isdraggable, ondrag, etc 
   On the drop, I calculate the new positions in the image array given the start index from the image and the end index from the div (the names of the img and divs end with 1 based index)

   I am also using  localstorage as the get for the latest snapshot of the image array. Took this decision to preserve state even if the user refreshes the browser
   (There is a reset button which restores the original order)
*/
/* <--- HTML5/Javascript for drag and drop and reorder ---- */
function drag(ev) {
    //    alert(ev.target.id);
         ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
    ev.preventDefault();
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var swapDivid = data.replace("drag", "dragDiv");
    var from = parseInt(data.replace("drag", ""))-1;
    var to = parseInt(ev.currentTarget.id.replace("dragDiv", ""))-1;
   
    reorderOnDrop(from, to);

  //  ev.currentTarget.removeChild(document.getElementById(swapImgid));
}
/* custom function to re-order. Not trying to get fancy here, I just re-order the array
  preserved in localstorage and re-draw.
*/
function reorderOnDrop(fromIndex, toIndex) {
    var currentImageSnapshot = localStorage.getItem("imageList").split(',');
    console.log(currentImageSnapshot);
    var startIndex = 0, endIndex = currentImageSnapshot.length;
    var draggedImage = currentImageSnapshot[fromIndex];
    if (fromIndex > toIndex) {
        for (var i = fromIndex; i >= toIndex; i--) {
            if (i > 0)
                currentImageSnapshot[i] = currentImageSnapshot[i - 1];
            else
                currentImageSnapshot[i] = currentImageSnapshot[endIndex - 1];
        }

    }
    else {
        for (var i = fromIndex ; i <= toIndex; i++) {
            if (i < (endIndex - 1))
                currentImageSnapshot[i] = currentImageSnapshot[i + 1];
            else
                currentImageSnapshot[i] = currentImageSnapshot[0];
        }
    }
    currentImageSnapshot[toIndex] = draggedImage
    localStorage.setItem("imageList", currentImageSnapshot);
    init(true);
    console.log(currentImageSnapshot);

}
/* ----> */

/* building the dom/rendering tree adding the div and enclosed image to the container 
   true flag is to erase existing data in the previous order
   If I reach it, the next iteration is to move the redraw to a separate function where I 
   delete and redraw only the affected cells
*/
    function init( refresh)
    {
        var dynamicPhotoListContainer = document.getElementById('dynamicPhotoListContainer');
        if (!dynamicPhotoListContainer) {
          
            return;
        }
        if (refresh) {
            while (dynamicPhotoListContainer.hasChildNodes()) {
                dynamicPhotoListContainer.removeChild(dynamicPhotoListContainer.lastChild);
            }
        }
        var dynamicImageList = fetchImageArray().split(',');
        var index=0;
        dynamicImageList.forEach(function (object) {
            var newDiv = document.createElement('div');
            newDiv.setAttribute('id', "dragDiv" + ++index);
            newDiv.setAttribute('ondrop', 'drop(event)');
            newDiv.setAttribute('ondragover', 'allowDrop(event)');
            // assuming three images per row
             
            dynamicPhotoListContainer.appendChild(newDiv);
               var newImg= document.createElement('img');
               newImg.setAttribute('src', object);
               newImg.setAttribute('draggable', 'true');
               newImg.setAttribute('ondragstart','drag(event)');
               newImg.setAttribute('id', "drag" + index);
               newDiv.appendChild(newImg);
                
        });
        // this is not a responsive design, but not getting too fancy
        dynamicPhotoListContainer.style.height = (dynamicPhotoListContainer.parentNode.parentNode.offsetHeight - 100 ) + "px"

    }
    function fetchImageArray() {
        if (!localStorage.getItem("imageList")) {
            var images = [
                "images/dynamic_list/1.png",
                "images/dynamic_list/2.png",
                "images/dynamic_list/3.png",
                "images/dynamic_list/4.png",
                "images/dynamic_list/5.png",
                "images/dynamic_list/6.png",
                "images/dynamic_list/7.png",
                "images/dynamic_list/8.png",
                "images/dynamic_list/9.png",
                "images/dynamic_list/10.png",
                "images/dynamic_list/11.png",
                "images/dynamic_list/12.png"
            ]
            localStorage.setItem("imageList", images);
            localStorage.setItem("originalImageList", images);
        }
        return  localStorage.getItem("imageList");
    }
    function resetImageArray() {
        localStorage.setItem("imageList", localStorage.getItem("originalImageList"));
        init(true);
    }
   
    init();
 