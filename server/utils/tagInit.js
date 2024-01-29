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
  console.log(data);
  const subjects = data.subjects;
if (Array.isArray(subjects)) {
  for (const subject of subjects) {
    try {
      // extract the tag name from the subject
      const tagName = subject.name;
      // check if the tag already exists
      const existingTag = await Tag.findOne({ name: tagName });
      if (!existingTag) {
        // create a new tag
        const tag = new Tag({ name: tagName });
        // save the new tag
        await tag.save();
        console.log(`Tag saved: ${tagName}`);
      } else {
        console.log(`Tag already exists: ${tagName}`);
      }
    } catch (error) {
      console.error(`Error saving tag: ${error}`);
    }
  }

// run the main function
processAndSaveTags().then(() => {
  mongoose.disconnect()
    .then(() => console.log("MongoDB disconnected"))
    .catch(err => console.error(`Error disconnecting MongoDB: ${err}`));
});