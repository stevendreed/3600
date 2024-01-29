const { Tag } = require('../models/Tag');
const axios = require('axios');

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

// call fetchSubjects and process the data
for (const subject of subjects) {
  try {
    // Check if the tag already exists
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