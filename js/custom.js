$(document).ready(function(){

  var videoHeight = 240;
  var videoWidth = 240;
  const constraints = {
    video: {height: videoHeight, width: videoWidth}
  }
  var video = document.querySelector('video');
  navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {video.srcObject = stream});
  $('#image').hide();
  $('#scale-element').click(function(){
    var canvas = document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video,0,0);
    var features = [{
      "type": "TYPE_UNSPECIFIED",
      "maxResults": 1
  },
    {
      "type": "FACE_DETECTION",
      "maxResults": 1
  },
    {
      "type": "LOGO_DETECTION",
      "maxResults": 1
  },
    {
      "type": "LABEL_DETECTION",
      "maxResults": 1
  },
    {
      "type": "TEXT_DETECTION",
      "maxResults": 5
  },
    {
      "type": "DOCUMENT_TEXT_DETECTION",
      "maxResults": 1
  }
 ]
    var requestObject = {};
    requestObject.requests = [{}];
    requestObject.requests[0].image={};
    requestObject.requests[0].image.content = canvas.toDataURL().substring(22);
    requestObject.requests[0].features =  features;
    requestObject.requests.imageContext = {};
    requestObject.requests.imageContext.languageHints = ["en-t-i0-handwrit"];
    var jsonObject = JSON.stringify(requestObject);
    console.log(jsonObject);
    $.ajax({
      type: "POST",
      data: jsonObject,
      url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCRtGjYu-VWn7SU6Cvmo8rd8D4r8C2upqE",
      contentType: "application/json",
      success: function(response){
        console.log(response);
      }
    });
  });
  var scale = 1,
  gestureArea = document.getElementById('gesture-area'),
  scaleElement = document.getElementById('scale-element'),
  resetTimeout;

interact(gestureArea)
.gesturable({
  onstart: function (event) {
    clearTimeout(resetTimeout);
    scaleElement.classList.remove('reset');
  },
  onmove: function (event) {
    scale = scale * (1 + event.ds);

    scaleElement.style.webkitTransform =
    scaleElement.style.transform =
      'scale(' + scale + ')';

    dragMoveListener(event);
  },
  onend: function (event) {
    
  }
})
.draggable({ onmove: dragMoveListener });

function reset () {
scale = 1;
scaleElement.style.webkitTransform =
scaleElement.style.transform =
  'scale(1)';
}
function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  // translate the element

    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


});
