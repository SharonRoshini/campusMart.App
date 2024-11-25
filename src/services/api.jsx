// api.js
import bed from "./../assets/bed.png";
import table from "./../assets/table.png";
import speaker from "./../assets/speaker.png";
// import kitchen from "./../assets/kitchen.png";

const products = [
  {
    id: 1,
    name: "Mattress & Bed",
    price: "$110",
    image: bed,
    category: "Furniture",
    negotiable: true,
    age: "1 year",
    contact: "123-456-7890",
    location: "New York",
    availableTill: "2024-12-31",
    condition: "Good",
    description: "A comfortable mattress and bed frame, perfect for a cozy bedroom.",
    contactInfo: {
    "name": "John Doe",
    "phone": "+123456789",
    "email": "johndoe@example.com"}
  },
  {
    id: 2,
    name: "Study Table",
    price: "$40",
    image: table,
    category: "Furniture",
    negotiable: true,
    age: "1 year",
    contact: "123-456-7890",
    location: "New York",
    availableTill: "2024-12-31",
    condition: "Brand New",
    description: "A sturdy and spacious study table, ideal for students or home offices.",
    contactInfo: {
      "name": "Jane Doe",
      "phone": "+123456789",
      "email": "janedoe@example.com"}
  },
  {
    id: 3,
    name: "PC and Speakers",
    price: "$170",
    image: speaker,
    category: "Furniture",
    negotiable: true,
    age: "1 year",
    contact: "123-456-7890",
    location: "New York",
    availableTill: "2024-12-31",
    condition: "Like New",
    description: "A powerful PC setup with high-quality speakers for entertainment or work.",
    contactInfo: {
      "name": "John Moe",
      "phone": "+123456789",
      "email": "johnmoe@example.com"}
  }
];

export default products;

  
  