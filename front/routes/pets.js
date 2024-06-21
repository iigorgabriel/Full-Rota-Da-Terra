const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const url = "https://ljrflw4d-4000.brs.devtunnels.ms/pets/";

// Middleware para extrair o token da sessão (exemplo)
const getTokenFromSession = (req) => {
  return req.session.token || '';
};

// GET lista de pets
router.get('/', async (req, res) => {
  try {
    const token = getTokenFromSession(req);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Erro ao obter lista de pets');
    }
    const pets = await response.json();
    let title = "Gestão de Pets";
    let cols = ["Id", "Nome", "Raça", "Cor", "Sexo", "Ações"];
    res.render('layout', { body: 'pages/pets', title, pets, cols, error: "" });
  } catch (error) {
    console.error('Erro ao buscar lista de pets:', error);
    res.redirect('/login');
  }
});

// POST cria um novo pet
router.post("/", async (req, res) => {
  try {
    const { name, race, colour, gender } = req.body;
    const token = getTokenFromSession(req);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, race, colour, gender })
    });
    if (!response.ok) {
      throw new Error('Erro ao criar novo pet');
    }
    const pet = await response.json();
    res.send(pet);
  } catch (error) {
    console.error('Erro ao criar novo pet:', error);
    res.status(500).send(error.message);
  }
});

// PUT atualiza um pet pelo ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, race, colour, gender } = req.body;
    const token = getTokenFromSession(req);
    const response = await fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, race, colour, gender })
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar pet');
    }
    const updatedPet = await response.json();
    res.send(updatedPet);
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    res.status(500).send(error.message);
  }
});

// DELETE remove um pet pelo ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = getTokenFromSession(req);
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Erro ao remover pet');
    }
    const deletedPet = await response.json();
    res.send(deletedPet);
  } catch (error) {
    console.error('Erro ao remover pet:', error);
    res.status(500).send(error.message);
  }
});

// GET busca um pet pelo ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = getTokenFromSession(req);
    const response = await fetch(url + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar pet');
    }
    const pet = await response.json();
    res.send(pet);
  } catch (error) {
    console.error('Erro ao buscar pet:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
