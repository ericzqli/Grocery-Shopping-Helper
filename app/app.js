let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

async function app() {
 console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  let num_of_class = 0; //Number of class
  const list_of_btnstyle = ['btn btn-primary','btn btn-danger','btn btn-warning','btn btn-success','btn btn-info'];
  const list_of_barstyle = ['progress-bar','progress-bar bg-danger','progress-bar bg-warning','progress-bar bg-success','progress-bar bg-info'];
  const list_of_progressbar = ['bar_1','bar_2','bar_3','bar_4','bar_5'];
  const list_of_prob = ['prob_1','prob_2','prob_3','prob_4','prob_5'];
  let classes = [];
  const classesid = ['0','1','2','3','4'];
  // Create an object from Tensorflow.js data API which could capture image 
  // from the web camera as Tensor.
  //console.log(list_of_btnstyle[0])
  const webcam = await tf.data.webcam(webcamElement);

  // Reads an image from the webcam and associates it with a specific class
  // index.

/*  const addExample = async classId => {
    // Capture an image from the web camera.

    const img = await webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(img, 'conv_preds');

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  
  };
  */
  var interval;
  function train(event) {
    let y = 0;
    if (event.type === 'mousedown'){
      const x = event.target.id;
      y = classes.findIndex(classname => {
        return classname === x;
      });
      interval = setInterval(async function(){
        const img = await webcam.capture();
       
        const activation = net.infer(img, 'conv_preds');
        classifier.addExample(activation, y);
        img.dispose();
      },150);
    }
    if (event.type === 'mouseup'){
      clearInterval(interval);
    }
  }

  const newModel = () => {
    classifier.clearAllClasses();
    for (let counter = 0; counter<num_of_class; counter++){
      let obj_1 = document.getElementById(classes[counter]);
      obj_1.remove();
      let obj_2 = document.getElementById(list_of_prob[counter]);
      obj_2.remove();
      let obj_3 = document.getElementById(list_of_progressbar[counter]);
      obj_3.removeAttribute('class');
      obj_3.removeAttribute('style');
    }
    classes = [];
    num_of_class = 0;
  }


  const resetModel = () => {
    classifier.clearAllClasses();
    for (let counter = 0; counter < num_of_class; counter++){
      document.getElementById(list_of_prob[counter]).style.width = 0;
    }
   }


  const addClass = () => {
    let ncs = document.getElementById('newclass');
    if((classes.includes(ncs.value)===false) && num_of_class<5){
    let csid = ncs.value; //class id
    let newbtn = document.createElement('BUTTON'); //new button
    newbtn.id = csid; //set the id of new button to the class id
    newbtn.className = list_of_btnstyle[num_of_class]; //set the style of the button
    newbtn.style.margin = '2px'
    newbtn.innerHTML = csid;
    classes.push(csid);
    let csls = document.getElementById('classlist');
    csls.appendChild(newbtn)

    let newpbar = document.createElement('div')
    newpbar.id = list_of_prob[num_of_class];
    newpbar.className = list_of_barstyle[num_of_class];
    newpbar.role = 'progressbar';
    newpbar.style.width = '0px';
    newpbar.innerHTML = '0%';

    let progls = document.getElementById(list_of_progressbar[num_of_class]);
    progls.className = 'progress';
    progls.style.height = '45px';
    progls.style.width = '350px';
    progls.appendChild(newpbar);

    num_of_class = num_of_class + 1;
    document.getElementById(csid).addEventListener('mousedown', () => train(event));   // When clicking a button, add an example for that class.
    document.getElementById('newclass').value = "";
  }
  }

  // based on the code below, we are able to save the model
  //From https://github.com/tensorflow/tfjs/issues/633
  const saveModel = async modelId => {
   let dataset = classifier.getClassifierDataset()
   console.log(dataset);
   console.log(typeof dataset);
   var datasetObj = {}
   Object.keys(dataset).forEach((key) => {
     let data = dataset[key].dataSync();
     // use Array.from() so when JSON.stringify() it covert to an array string e.g [0.1,-0.2...] 
     // instead of object e.g {0:"0.1", 1:"-0.2"...}
     datasetObj[key] = Array.from(data); 
   });
   datasetObj["className"] = classes;
   console.log(datasetObj);
   let jsonStr = JSON.stringify(datasetObj)
   //can be change to other source
   createAndDownloadFile("modelParameter.json", jsonStr);
 }
   function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a');
    var blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
}
let array;




function getPretrainData() {
  var name = "List" + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var string = c.substring(name.length, c.length);
      array = string.split(",")
      console.log(array);
      
    }
  }
  var classNumber = document.getElementById('inputClassNumber').value;
  console.log(classNumber);
  for (var i = 0; i < array.length; i++) {
    var curUrl = array[i];
    var img = document.getElementById("imgPreTrain01");
    img.src = curUrl;
    console.log(img.src);
    for (var j = 0; j < 10; j++) {
     
        const activation = net.infer(img, 'conv_preds');
        classifier.addExample(activation, classNumber - 1);
    


    }
  }
  




  
}





const loadModel = () =>{
    var selectedFile = document.getElementById("files").files[0];//get file object
    var name = selectedFile.name;//read file name
    var size = selectedFile.size;//read file size


    var reader = new FileReader();//
    reader.readAsText(selectedFile);//read content
    
    reader.onload = function(){
        console.log(typeof this.result);//
        let tensorObj = JSON.parse(this.result);
        newModel();
        console.log(tensorObj);
        classes = tensorObj["className"];
        num_of_class = classes.length;
        console.log(tensorObj);
        delete tensorObj.className;
        for(var i = 0; i < num_of_class; i++) {
             
              
              let csid = classes[i]; //class id
              let newbtn = document.createElement('BUTTON'); //new button
              newbtn.id = csid; //set the id of new button to the class id
              newbtn.className = list_of_btnstyle[i]; //set the style of the button
              newbtn.style.margin = '2px'
              newbtn.innerHTML = csid;
             
              let csls = document.getElementById('classlist');
              csls.appendChild(newbtn)

              let newpbar = document.createElement('div')
              newpbar.id = list_of_prob[i];
              newpbar.className = list_of_barstyle[i];
              newpbar.role = 'progressbar';
              newpbar.style.width = '0px';
              newpbar.innerHTML = '0%';

              let progls = document.getElementById(list_of_progressbar[i]);
              progls.className = 'progress';
              progls.style.height = '45px';
              progls.style.width = '350px';
              progls.appendChild(newpbar);

              
              document.getElementById(csid).addEventListener('mousedown', () => train(event)); 
        }










        Object.keys(tensorObj).forEach((key) => {
         
      tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024])
    })
    // console.log(this.result);
      console.log(tensorObj);
      classifier.setClassifierDataset(tensorObj);
    };
    // console.log(typeof reader);
    // console.log(tensorObj);
    // // let tensorObj = reader;
    // //covert back to tensor
    // Object.keys(tensorObj).forEach((key) => {
    //   tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024])
    // })
    // // console.log(tensorObj)
    // classifier.setClassifierDataset(tensorObj);
}






  document.getElementById('body').addEventListener('mouseup', () => train(event));
  document.getElementById('save').addEventListener('click', () => saveModel(1));
  document.getElementById('new').addEventListener('click', () => newModel());
  document.getElementById('reset').addEventListener('click', () => resetModel());
  document.getElementById('addClass').addEventListener('click', () => addClass());
  document.getElementById('preTrain').addEventListener('click', () => getPretrainData());
  document.getElementById('import').addEventListener('click', () => loadModel());

  while (true) {
    if(classifier.getNumClasses() === 0) {
      document.getElementById('console').innerText =`\n${'Please start customizing your app!'}`
    }
    else {
      const img = await webcam.capture();

      // Get the activation from mobilenet from the webcam.
      const activation = net.infer(img, 'conv_preds');
      // Get the most likely class and confidences from the classifier module.
      const result = await classifier.predictClass(activation,10);
      //Threshold set to 0.6
      if(result.confidences[result.label]<0.7){
        document.getElementById('console').innerText = `\n${'Undefined Object'}`
      }else{
        document.getElementById('console').innerText = `\nPrediction: ${classes[result.label]}`;
      }
      for (let counter = 0; counter < num_of_class; counter++){
        document.getElementById(list_of_prob[counter]).innerText = `${result.confidences[classesid[counter]]*100}`+'%';
        document.getElementById(list_of_prob[counter]).style.width = result.confidences[classesid[counter]]*350;
      }
      // Dispose the tensor to release the memory.
      img.dispose();
    }

    await tf.nextFrame();
  }
}

app();