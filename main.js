status = "";
objects = [];
obj_name = "";

function setup() {
    canvas = createCanvas(390, 370);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw (){
    image(video, 0, 0, 390, 370);
    if (status != "") {
        objectDetector.detect(video, getResults);
        for(i=0; i<objects.length; i++) {
            fill("orange");
            percent = floor(objects[i].confidence*100) + "%";
            text(objects[i].label + " " + percent, objects[i].x + 15, objects[i].y + 15);
            noFill();
            
            stroke("orange");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (obj_name != "") {
                if (objects[i].label == obj_name) {
                    document.getElementById("found").innerHTML = obj_name + " Found";
                    video.stop();
                    objectDetector.detect(getResults);
                    var synth = window.speechSynthesis;
                 var speech_data = obj_name + " has been found";
                 var utter_this = new SpeechSynthesisUtterance(speech_data);
                 synth.speak(utter_this);
                }
                else {
                    document.getElementById("found").innerHTML = obj_name + " Not Found";
                }
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    obj_name = document.getElementById("name").value;
}

function modelLoaded() {
console.log("Model Loaded!");
status = true;
}

function getResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}