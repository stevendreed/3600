const db = require('../models'); 
const tagNames = require('./tagList'); 

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

module.exports = initializeTags;