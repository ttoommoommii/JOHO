let classifier;
let video;
let label = "";
let resultsP;//

let img;//画像データ




function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    // Initialize the Image Classifier method with MobileNet and the video as the second argument
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);
    
    resultsP = createP('Loading model and video...');
}

function preload() {
  img = loadImage('img/img2.png');
}

function draw() {
    image(video, 0, 0);
    fill(0);
    textSize(30);
    strokeWeight(3);
    stroke(20, 181, 255);
    text("カメラ映像から推測すると！！",80,height - 40)
    textSize(20);
    text(label, 110, height - 10);
    image(img, 0, height - 69, 70, 70);
}

function modelReady() {
    console.log('Model Ready');
    classifyVideo();
  }
  
  // Get a prediction for the current video frame
  function classifyVideo() {
    classifier.classify(gotResult);
  }
  
  // When we get a result
  function gotResult(err, results) {
    // The results are in an array ordered by confidence.
    if (err) {
        console.error(err);
    } else {
    resultsP.html('信頼度：' + nf(results[0].confidence, 0, 2));
    label=results[0].label;
    classifyVideo();
    }
  }