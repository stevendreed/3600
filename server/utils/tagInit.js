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
fetchSubjects().then(async data => {
  if (data) {
    // extract subjects from the data
    const subjects = data.subjects; 
    // iterate over each subject and save to db
    for (const subject of subjects) {
      try {
        // create a new tag for each subject
        const tag = new Tag({ name: subject.name });
        await tag.save();
        console.log(`Tag saved: ${subject.name}`);
      } catch (error) {
        console.error(`Error saving tag: ${error}`);
      }
    }
  }
});