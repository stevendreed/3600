const mongoose = require('mongoose');
require('dotenv').config();
const { Tag } = require('../models/tags');
const axios = require('axios');
require('dotenv').config();

// needs its own connection because its a self-contained script
// doesn't share runtime with the database so initializing it here is important
const tagUri = 'mongodb://localhost:27017/Cluster0';

mongoose.connect(tagUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected on port 27017"))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

// function to fetch categories from dbpedia
// querying here to fetch independently from the schema.js
async function fetchCategories() {
  try {
    const graphqlQuery = {
      query: `
        query {
          dcterms_subject {
            label
          }
        }
      `
    };
    const response = await axios.post('https://dbpedia.org/sparql', graphqlQuery);
    return response.data;
  } catch (error) {
    console.error('Error fetching Categories:', error);
    return null;
  }
}

// main function to process and save tags
async function processAndSaveTags() {
  // fetches the data from the api
  const data = await fetchCategories();
  console.log(data);
  // checks if the data exists and if it contains the array
  if (data && data.data && Array.isArray(data.data.dcterms_subject)) {
    // maps the data to an array of tag names
    const tagNames = data.data.dcterms_subject.map((subject) => subject.label);
    console.log('Extracted tag names:', tagNames); 
     // loops through the extracted names
    for (const tagName of tagNames) {
      try {
        // checks if the tag already exists
        const existingTag = await Tag.findOne({ name: tagName });
        if (!existingTag) {
          // if it doesn't exist, creates a new tag
          const tag = new Tag({ name: tagName });
          // saves the tag
          await tag.save();
          console.log(`Tag saved: ${tagName}`);
        } else {
          // logs that the tag name already exists
          console.log(`Tag already exists: ${tagName}`);
        }
      } catch (error) {
        // logs error if there was any issue
        console.error(`Error saving tag: ${error}`);
      }
    }
  }
}

// run the main function
processAndSaveTags()
  .then(() => {
    mongoose.disconnect()
      .then(() => console.log("MongoDB disconnected"))
      .catch(err => console.error(`Error disconnecting MongoDB: ${err}`));
});