const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Evitar problemas con CORS

// Obtener todos los personajes
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
});

// Obtener un personaje por nombre
app.get('/characters/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    if (response.data.results.length > 0) {
      res.json(response.data.results[0]);
    } else {
      res.status(404).json({ error: 'Personaje no encontrado' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Personaje no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
