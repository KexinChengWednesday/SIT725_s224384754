var express = require("express");
const app = express();
//urlandport
const config = {
  mongoUrl: "mongodb://127.0.0.1:27017/summerDrinksDB",
  port: Number(process.env.PORT) || 3000,
};
const mongoose = require("mongoose");

app.use(express.static(__dirname + "/public"));
//
app.use(express.urlencoded({extended:false}));
app.use(express.json());


const drinkSchema = new mongoose.Schema(
  {
    title: String,
  link: String,
  image: String,
  description: String,
  price: Number,         
  isIced: Boolean,      
  tags: String,        
  createdAt: Date  
  },
  { collection: "drinks" }
);

const Drink = mongoose.model("Drink", drinkSchema);

//mongo
mongoose.connect(config.mongoUrl);


mongoose.connection.on("connected", () => {
  console.log("connect successfully");
});

app.get("/api/drinks", async (req, res) => {
  const drinks = await Drink.find({});
  res.json({ statusCode: 200, data: drinks, message: "ready" });
});

app.listen(config.port, () => {
  console.log("listen", config.port);
});
