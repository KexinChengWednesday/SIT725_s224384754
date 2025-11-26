var express = require("express");
const app = express();

app.use("/", express.static(__dirname + "/public"));
app.use(express.urlencoded(false));

app.use(express.json());

const summerDrinks = [
  {
    title: "Iced Lemon Tea",
    image: "images/lemon-tea.jpg",
    link: "View Recipe",
    description: "A refreshing lemon-flavored iced tea that cools you instantly."
  },
  {
    title: "Strawberry Smoothie",
    image: "images/strawberry-smoothie.jpg",
    link: "View Recipe",
    description: "A sweet and creamy blend of fresh strawberries and yogurt."
  },
  {
    title: "Mango Coconut Cooler",
    image: "images/mango-coconut.jpg",
    link: "View Recipe",
    description: "A tropical drink with mango and coconut milk for a rich taste."
  }
]

app.get("/api/drinks", (req, res) => {
  res.json(summerDrinks)
})

const port = process.env.port||3000;

console.log("initializing");

app.listen(port,()=> {
  console.log("check at", port);
  console.log("...")
});
