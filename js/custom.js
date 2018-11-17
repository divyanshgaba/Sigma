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
  $('#vid').click(function(){
    var canvas = document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video,0,0);
    var features = [{
      "type": "TYPE_UNSPECIFIED",
      "maxResults": 1
  },
    {
      "type": "LANDMARK_DETECTION",
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
      "type": "SAFE_SEARCH_DETECTION",
      "maxResults": 1
  },
    {
      "type": "IMAGE_PROPERTIES",
      "maxResults": 1
  },
    {
      "type": "CROP_HINTS",
      "maxResults": 1
  },
    {
      "type": "WEB_DETECTION",
      "maxResults": 1
  }
 ]
    var requestObject = {}
    requestObject.requests = [{}];
    requestObject.requests[0].image={}
    requestObject.requests[0].image.content = canvas.toDataURL().substring(22);
    requestObject.requests[0].features =  features;
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

});
