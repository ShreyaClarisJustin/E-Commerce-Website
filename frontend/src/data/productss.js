const products = [
  {
    id: 1,
    title: "Engineering Mathematics Textbook",
    price: 350,
    category: "Books",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
  },
  {
    id: 2,
    title: "Introduction to Algorithms Book",
    price: 500,
    category: "Books",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
  },
  {
    id: 3,
    title: "Scientific Calculator (Casio)",
    price: 700,
    category: "Electronics",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
  },
  {
    id: 4,
    title: "Wireless Mouse",
    price: 300,
    category: "Electronics",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
  },
  {
    id: 5,
    title: "Laptop Stand",
    price: 450,
    category: "Electronics",
    condition: "New",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28"
  },
  {
    id: 6,
    title: "Wooden Study Table",
    price: 2000,
    category: "Furniture",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1582582494700-2e15b9f2d8c9"
  },
  {
    id: 7,
    title: "Folding Chair",
    price: 800,
    category: "Furniture",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657"
  },
  {
    id: 8,
    title: "Mini Bookshelf",
    price: 900,
    category: "Furniture",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
  },
  {
    id: 9,
    title: "Single Mattress",
    price: 1200,
    category: "Hostel Essentials",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c"
  },
  {
    id: 10,
    title: "Bedsheet Set",
    price: 300,
    category: "Hostel Essentials",
    condition: "New",
    image: "https://images.unsplash.com/photo-1582582429416-c7b4c3fbb42d"
  },
  {
    id: 11,
    title: "Laundry Basket",
    price: 200,
    category: "Hostel Essentials",
    condition: "New",
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1"
  },
  {
    id: 12,
    title: "Extension Board",
    price: 250,
    category: "Hostel Essentials",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215"
  },
  {
    id: 13,
    title: "Electric Kettle",
    price: 700,
    category: "Appliances",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
  },
  {
    id: 14,
    title: "Table Lamp",
    price: 350,
    category: "Appliances",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074"
  },
  {
    id: 15,
    title: "Table Fan",
    price: 900,
    category: "Appliances",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1597005268161-b0c6f43f9a32"
  },
  {
    id: 16,
    title: "Bluetooth Speaker",
    price: 800,
    category: "Electronics",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231658"
  },
  {
    id: 17,
    title: "Gaming Headphones",
    price: 1200,
    category: "Electronics",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9"
  },
  {
    id: 18,
    title: "USB Flash Drive 32GB",
    price: 250,
    category: "Electronics",
    condition: "New",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215"
  },
  {
    id: 19,
    title: "Mountain Bicycle",
    price: 4500,
    category: "Transport",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8"
  },
  {
    id: 20,
    title: "Bicycle Lock",
    price: 150,
    category: "Transport",
    condition: "New",
    image: "https://images.unsplash.com/photo-1595433562696-65f7c9d8e57b"
  },
  {
    id: 21,
    title: "Badminton Racket",
    price: 400,
    category: "Sports",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3"
  },
  {
    id: 22,
    title: "Football",
    price: 350,
    category: "Sports",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
  },
  {
    id: 23,
    title: "Cricket Bat",
    price: 900,
    category: "Sports",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1593766788306-28561086694f"
  },
  {
    id: 24,
    title: "Laptop Backpack",
    price: 600,
    category: "Accessories",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa"
  },
  {
    id: 25,
    title: "Winter Jacket",
    price: 1000,
    category: "Clothing",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716f"
  },
  {
    id: 26,
    title: "College Hoodie",
    price: 500,
    category: "Clothing",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1556821840-3a9c6d18f8aa"
  },
  {
    id: 27,
    title: "Lab Coat",
    price: 250,
    category: "Lab Equipment",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1580281657521-69d9e6cfa6e5"
  },
  {
    id: 28,
    title: "Engineering Drawing Kit",
    price: 450,
    category: "Lab Equipment",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1581091012184-5c9b3d9c8a1c"
  },
  {
    id: 29,
    title: "Yoga Mat",
    price: 300,
    category: "Sports",
    condition: "New",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e"
  },
  {
    id: 30,
    title: "Desk Organizer",
    price: 200,
    category: "Accessories",
    condition: "New",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07"
  }
];

export default products;