// Required modules 
const express = require("express");
const app = express();
const dblib = require("./dblib.js");

const multer = require("multer");
const upload = multer();

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));

// Setup EJS
app.set("view engine", "ejs");

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Application folders
app.use(express.static("public"));

// Start listener
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started (http://localhost:3000/) !");
});

// Setup routes
app.get("/", (req, res) => {
    //res.send("Root resource - Up and running!")
    res.render("index");
});

///////////////////// SEARCH USING REGULAR POST METHOD
// GET
app.get("/search", async (req, res) => {
  // Omitted validation check
  const totRecs = await dblib.getTotalRecords();
  // FOR TESTING 
  // ==============  GET / SEARCH =========
  console.log("==================  GET / SEARCH =============");
  console.log(totRecs);
  //
  //Create an empty product object (To populate the form with values)
  const prod = {
    prod_id: "",
    prod_name: "",
    prod_desc: "",
    prod_price: ""
  };
  res.render("search", {
      type: "get",
      totRecs: totRecs.totRecords,
      prod: prod
  });
});

// POST
app.post("/search", async (req, res) => {
  // Omitted validation check
  //  Can get totRecs from the page rather than using another DB call.
  //  Add it as a hidden form value.
  const totRecs = await dblib.getTotalRecords();

  // TESTING - WHAT CAME IN FROM THE FORM
  console.log("=======  SEARCH - POST ===========");
  console.log("=====  SEARCH - POST - req.body  ====");
  console.log(req.body);

  dblib.findProducts(req.body)
      .then(result => {
          res.render("search", {
              type: "post",
              totRecs: totRecs.totRecords,
              result: result,
              prod: req.body
          })
      })
      .catch(err => {
          res.render("search", {
              type: "post",
              totRecs: totRecs.totRecords,
              result: `Unexpected Error: ${err.message}`,
              prod: req.body
          });
      });
});

////////////////////// SEARCH AJAX 

// GET
app.get("/searchajax", async (req, res) => {
    // Omitted validation check
    const totRecs = await dblib.getTotalRecords();
    res.render("searchajax", {
        totRecs: totRecs.totRecords,
    });
});

// POST
app.post("/searchajax", upload.array(), async (req, res) => {
    dblib.findProducts(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", error: err.message}));

});