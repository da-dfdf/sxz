prediction1 = "";
meaning = "";

Webcam.set({
    height:300,
    width:350,
    image_format:'PNG',
    PNG_quality:90
});

Camera = document.getElementById("camera");
Webcam.attach('#Camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "picture_taken" src = "'+data_uri+'"/>';
        console.log("snapshot taken");

    });

}

console.log("ml5:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2eyEPzIe_/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    var speechData1 = "The first prediction is " + prediction1;
    var speechData2 = "The meaning is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speechData1 + speechData2);
    synth.speak(utterThis);

}
function Check(){
    img = document.getElementById("picture_taken");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
  if (error){
      console.error(error);
  }
  else{
      console.log(results);
      document.getElementById("resultName1").innerHTML = results[0].label;
      
      prediction1 = results[0].label;
      speak();

      if (results[0].label == "Thumbs Up"){
          document.getElementById("updateEmoji1").innerHTML = "&#128077;";
      } 
      if (results[0].label == "Middle Finger"){
        document.getElementById("updateEmoji1").innerHTML = "&#128406;";
    } 
    if (results[0].label == "Peace"){
        document.getElementById("updateEmoji1").innerHTML = "&#128076;";
    } 

    if (results[0].label == "Thumbs Up"){
        document.getElementById("resultName2").innerHTML = "A sign to show that things are ok or a way of saying good job";
    } 
    if (results[0].label == "Middle Finger"){
      document.getElementById("resultName2").innerHTML = "Somebody is mad at you";
  } 
  if (results[0].label == "Peace"){
      document.getElementById("resultName2").innerHTML = "Everything is ok";
  } 


  }

}