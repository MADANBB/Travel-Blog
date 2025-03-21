import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
/* let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "21/3/2025, 4:30:00 pm",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "21/3/2025, 4:32:00 pm",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "21/3/2025, 4:35:00 pm",
  },
]; */
let posts = [
  {
    id: 1,
    title: "The Tech and Tradition of Karnataka",
    content: "Home to Bengaluru, India’s Silicon Valley, Karnataka also offers ancient architecture in Hampi and rich heritage across the state.",
    author: "Madan B B",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 2,
    title: "Exploring the Rich Heritage of Rajasthan",
    content: "Rajasthan is known for its palaces, forts, and vibrant culture. From Jaipur's Pink City to Udaipur's lakes, the state offers a timeless experience.",
    author: "Ananya Sharma",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 3,
    title: "The Serene Beauty of Kerala's Backwaters",
    content: "Kerala, God's Own Country, is famous for its tranquil backwaters, lush greenery, and Ayurvedic wellness retreats.",
    author: "Rahul Menon",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 4,
    title: "Savoring the Flavors of Punjab",
    content: "From buttery parathas to spicy curries, Punjab is a food lover’s paradise. The culture and hospitality are as rich as its cuisine.",
    author: "Simran Kaur",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 5,
    title: "A Spiritual Journey Through Varanasi, Uttar Pradesh",
    content: "One of the oldest cities in the world, Varanasi is a city of spiritual awakening, Ganga ghats, and ancient temples.",
    author: "Amit Verma",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 6,
    title: "Monsoon Magic in Meghalaya",
    content: "Meghalaya, the abode of clouds, boasts stunning waterfalls, living root bridges, and abundant rainfall that paints the landscape lush green.",
    author: "Priya Das",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 7,
    title: "Cultural Fusion in West Bengal",
    content: "West Bengal combines literature, art, and cuisine beautifully — from Durga Puja celebrations to Kolkata’s colonial charm.",
    author: "Debraj Chatterjee",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 8,
    title: "Desert Adventures in Gujarat",
    content: "Explore the white sands of Rann of Kutch, colorful handicrafts, and historic temples in this culturally vibrant state.",
    author: "Karan Patel",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 9,
    title: "Chhattisgarh: The Hidden Gem of India",
    content: "With dense forests, tribal art, and beautiful waterfalls, Chhattisgarh offers an offbeat yet enchanting travel experience.",
    author: "Nikita Tiwari",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  },
  {
    id: 10,
    title: "Sikkim: The Land of Peace and Mountains",
    content: "Nestled in the Himalayas, Sikkim is known for its cleanliness, Buddhist monasteries, and breathtaking views of Kanchenjunga.",
    author: "Rinchen Bhutia",
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  }
];



let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//GET All posts
app.get("/posts", (req,res)=>{
  console.log(posts);
  res.json(posts);
});


//GET a specific post by id
app.get("/posts/:id", (req,res)=>{
  const post = posts.find((p)=> p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({message: "Post not found"});
  res.json(post);
});

//POST a new post
app.post("/posts",(req,res)=>{
  const newId = lastId+=1;
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };
  lastId = newId;
  posts.push(newPost);
  res.status(201).json(newPost);
})

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  const post = posts.find((p)=> p.id === parseInt(req.params.id));
  if(!post) return res.status(404).json({message:"Post Not Found"});

  if(req.body.title) post.title = req.body.title;
  if(req.body.content) post.content = req.body.content;
  if(req.body.author) post.author = req.body.author;

  res.json(post);
});

//DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req,res)=>{
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({message:"Post Not Found"});
  
  posts.splice(index, 1);
  res.sendStatus(200).json({message: "Post Deleted"});
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
