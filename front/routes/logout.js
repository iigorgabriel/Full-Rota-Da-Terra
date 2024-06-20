var express = require('express');
var router = express.Router();


const url = "https://n5011p3j-4000.brs.devtunnels.ms/logout"

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).send({ error: 'Erro ao fazer logout' });
        }
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(async (res) => {
            if (!res.ok) {
                const err = await res.json()
                console.log('err', err)
                throw err
            }
            return res.json()
        }).then((data) => {
            console.log('veio', data)
            res.redirect('/login')
        }).catch((error) => {
            console.log('Erro', error)
            res.status(500).send({ error: 'Erro ao fazer logout' });
        })
    });
});

module.exports = router;