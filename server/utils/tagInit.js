const mongoose = require('mongoose');
require('dotenv').config();
const { Tag } = require('../models/tags');
const axios = require('axios');
require('dotenv').config();

// needs its own connection because its a self-contained script
// doesn't share runtime with the database so initializing it here is important
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

// function to fetch subjects from Open Library
async function fetchSubjects() {
  try {
    // make a GET request to the Open Library API
    const response = await axios.get('https://openlibrary.org/subjects.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return null;
  }
}

// main function to process and save tags
async function processAndSaveTags() {
  // call fetchSubjects and process the data
  const data = await fetchSubjects();
  if (data) {
    const subjects = data.subjects;
    for (const subject of subjects) {
      try {
        // check if the tag already exists
        const existingTag = await Tag.findOne({ name: subject.name });
        if (!existingTag) {
          // create new tag
          const tag = new Tag({ name: subject.name });
          // save tag
          await tag.save();
          console.log(`Tag saved: ${subject.name}`);
        } else {
          // error if tag already exists
          console.log(`Tag already exists: ${subject.name}`);
        }
      } catch (error) {
        // issue with saving tag
        console.error(`Error saving tag: ${error}`);
      }
    }
  }
}

// run the main function
processAndSaveTags().then(() => {
  mongoose.disconnect()
    .then(() => console.log("MongoDB disconnected"))
    .catch(err => console.error(`Error disconnecting MongoDB: ${err}`));
});