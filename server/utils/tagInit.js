const axios = require('axios');

async function fetchSubjects() {
  try {
      const response = await axios.get('https://openlibrary.org/subjects.json');
      return response.data;
  } catch (error) {
      console.error('Error fetching subjects:', error);
      return null;
  }
}