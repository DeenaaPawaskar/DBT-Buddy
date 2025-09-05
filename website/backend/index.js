const express = require("express");
const path = require("path");
const app = express();
let port = 3000;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html when user visits "/home"
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

//root terminal
app.get("/",(req,res)=>{
    res.send("root working");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


