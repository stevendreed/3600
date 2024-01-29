const mongoose = require('mongoose');
require('dotenv').config();
const { Tag } = require('../models/tags');
const tagNames = require('./tagList');

const tagUri = 'mongodb://localhost:27017/Cluster0';

mongoose.connect(tagUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected on port 27017"))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

// function to save tags to the database
async function saveTagsToDB() {
  try {
    // loop through the tagNames array and save each tag to the database
    for (const tagName of tagNames) {
      const existingTag = await Tag.findOne({ name: tagName });
      if (!existingTag) {
        const tag = new Tag({ name: tagName });
        await tag.save();
        console.log(`Tag saved: ${tagName}`);
      } else {
        console.log(`Tag already exists: ${tagName}`);
      }
    }
  } catch (error) {
    console.error(`Error saving tags to the database: ${error}`);
  } finally {
    // disconnect from MongoDB once tags are saved (optional)
    mongoose.disconnect()
      .then(() => console.log("MongoDB disconnected"))
      .catch(err => console.error(`Error disconnecting MongoDB: ${err}`));
  }
}

// call the function to save tags to the database
saveTagsToDB();
