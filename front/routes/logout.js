var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const url = "https://0ss2bctf-4000.brs.devtunnels.ms/logout"

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).send({ error: 'Erro ao fazer logout' });
        }
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(async (response) => {
            if (!response.ok) {
                const err = await response.json();
                console.log('Erro na requisição:', err);
                throw err;
            }
            return response.json();
        }).then((data) => {
            console.log('Resposta da requisição:', data);
            res.redirect('/login'); // Redireciona para a página de login após o logout
        }).catch((error) => {
            console.error('Erro ao fazer logout:', error);
            res.status(500).send({ error: 'Erro ao fazer logout' });
        });
    });
});
