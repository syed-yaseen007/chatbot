const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // if Node <18, install with npm i node-fetch

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyC4feZNV8RooFwcQUMtySHKwchJZnaUAzk'; // Your Google API key

app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  const endpoint = `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${API_KEY}&limit=1&indent=True`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Google API error' });
    }

    const data = await response.json();
    if (data.itemListElement && data.itemListElement.length > 0) {
      const entity = data.itemListElement[0].result;
      const name = entity.name || 'Unknown';
      const description = entity.description || '';
      const detailedDesc = (entity.detailedDescription && entity.detailedDescription.articleBody) || '';

      return res.json({
        name,
        description,
        detailedDesc,
      });
    } else {
      return res.json({ message: "Sorry, I couldn't find information on that." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
