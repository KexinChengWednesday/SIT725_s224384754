const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
  extra: String,
});

const Drink = mongoose.model("Drink", drinkSchema);

const sampleDrinks = [
  {
    title: "Iced Lemon Tea",
    image: "images/lemon-tea.jpg",
    link: "View Recipe",
    description: "A refreshing lemon-flavored iced tea that cools you instantly.",
    extra: "Best served with ice and fresh lemon slices.",
  },
  {
    title: "Strawberry Smoothie",
    image: "images/strawberry-smoothie.jpg",
    link: "View Recipe",
    description: "A sweet and creamy blend of fresh strawberries and yogurt.",
    extra: "You can add honey to make it sweeter.",
  },
  {
    title: "Mango Coconut Cooler",
    image: "images/mango-coconut.jpg",
    link: "View Recipe",
    description: "A tropical drink with mango and coconut milk for a rich taste.",
    extra: "Perfect for hot summer afternoons.",
  },
];

async function runSeed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/summerDrinksDB");
    console.log("Connected to MongoDB (seed)");

    await Drink.deleteMany({});
    console.log("Cleared old drinks");

    await Drink.insertMany(sampleDrinks);
    console.log("Seeded drinks collection");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

runSeed();
