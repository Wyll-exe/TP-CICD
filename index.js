const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connexion  MongoDB
mongoose.connect('mongodb://localhost:27017/itemsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connecté !"))
.catch(err => console.error("Erreur de connexion avec MongoDB: !", err));


// modèle Mongoose
const itemSchema = new mongoose.Schema({
    word: String,
});


itemSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret._id;  
      delete ret.__v;   
      return ret;
    }
  });
  
  
const Item = mongoose.model('Item', itemSchema);



// Route GET
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route POST 
app.post('/items', async (req, res) => {
    const newItem = new Item({
        word: req.body.word,
    });
    
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// serveur POR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});