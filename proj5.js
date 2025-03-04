// Project 5 JavaScript: overlay when an image is selected

window.addEventListener("load", createLightbox);

 
function createLightbox() {
   // Lightbox Container
   let lightBox = document.getElementById("lightbox");
   let lbImages = document.createElement("div");

   // Design the lightbox images container
   lightBox.appendChild(lbImages);
   lbImages.id = "lbImages";

   // Add image to the conainer
    let image = document.createElement("img");
    image.src = "me.JPG";
    image.alt = "Photo of Josiah Lane";
    image.onclick = createOverlay;
    lbImages.appendChild(image);
   
   
   // this function is called when the user clicks the image
   function createOverlay() {
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";
      
      // Add the figure box to the overlay
      let figureBox = document.createElement("figure");
      overlay.appendChild(figureBox);
      
      // Add the image to the figure box
      let overlayImage = this.cloneNode(true);
      overlayImage.src = "me2.JPG"
      figureBox.appendChild(overlayImage);
      
      // Add a close button to the overlay
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(overlay);
      }      
      overlay.appendChild(closeBox);
      document.body.appendChild(overlay);
   }   
}

