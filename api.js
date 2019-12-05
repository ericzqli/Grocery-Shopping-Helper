let express = require("express");
let app = express();
 
app.use(express.static("app"));
//app is name of the directory
 
app.listen(8080, ()=>{
    console.log("Server Initialization Success");
})
