const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/dealershipsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dealerSchema = new mongoose.Schema({
  id: Number, city: String, state: String, st: String,
  address: String, zip: String, lat: Number, long: Number,
  short_name: String, full_name: String,
});

const reviewSchema = new mongoose.Schema({
  id: String, name: String, dealership: Number, review: String,
  purchase: Boolean, purchase_date: String, time: String,
  car_make: String, car_model: String, car_year: Number,
});

const Dealer = mongoose.model('Dealer', dealerSchema);
const Review = mongoose.model('Review', reviewSchema);

const seedData = async () => {
  await Dealer.deleteMany({});
  await Review.deleteMany({});

  const dealers = [
    {id: 1, full_name: "Kansas City Auto", city: "Kansas City", state: "Kansas", st: "KS", address: "123 Main St", zip: "66101"},
    {id: 2, full_name: "Detroit Premium Motors", city: "Detroit", state: "Michigan", st: "MI", address: "456 Auto Ave", zip: "48201"},
    {id: 3, full_name: "Texas Trucks & SUVs", city: "Austin", state: "Texas", st: "TX", address: "789 Lone Star Blvd", zip: "73301"}
  ];

  const reviews = [
    {id: "1", name: "John Doe", dealership: 1, review: "Great service, very happy with my new car!", sentiment: "positive", car_make: "Audi", car_model: "A4", car_year: 2023},
    {id: "2", name: "Jane Smith", dealership: 1, review: "The buying process was a bit slow, but overall okay.", sentiment: "neutral", car_make: "BMW", car_model: "X5", car_year: 2022},
    {id: "3", name: "Mike Johnson", dealership: 2, review: "Terrible experience, would not recommend.", sentiment: "negative", car_make: "Ford", car_model: "F-150", car_year: 2021}
  ];

  await Dealer.insertMany(dealers);
  await Review.insertMany(reviews);

  console.log("Database seeded successfully");
  process.exit();
};

seedData();
