const mongoose = require('mongoose');
const db = require('../models'); 
const tagNames = require('./tagList'); 

const tagUri = 'mongodb://localhost:27017/Cluster0';

mongoose.connect(tagUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected on port 27017"))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

const initializeTags = async () => {
  try {
    for (const tagName of tagNames) {
      const tagExists = await db.Tags.findOne({ name: tagName });
      if (!tagExists) {
        const newTag = new db.Tags({ name: tagName });
        await newTag.save();
        console.log(`Added tag: ${tagName}`);
      }
    }
    console.log('Tags initialization completed.');
  } catch (error) {
    console.error('Error initializing tags:', error);
  }
};

initializeTags().then(() => mongoose.disconnect());