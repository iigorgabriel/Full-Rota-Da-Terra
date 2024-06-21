var express = require('express');
var router = express.Router();
const url = "https://ljrflw4d-4000.brs.devtunnels.ms/users";

// Middleware para verificar o token
function checkToken(req, res, next) {
  const token = req.session.token || "";
  if (!token) {
    return res.status(401).redirect('/login');
  }
  req.token = token;
  next();
}

// GET users listing
router.get('/', checkToken, function (req, res, next) {
  let title = "Gestão de Usuários";
  let cols = ["Id", "Nome", "Senha", "Email", "Telefone", "Ações"];

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.token}`
    }
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      return res.json();
    })
    .then((users) => {
      res.render('layout', { body: 'pages/users', title, users, cols, error: "", name: "" });
    })
    .catch((error) => {
      console.error('Erro', error);
      res.redirect('/login');
    });
});

// POST new user
router.post("/", checkToken, (req, res) => {
  const { username, password, email, phone } = req.body;
  fetch(url + '/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${req.token}`
    },
    body: JSON.stringify({ username, password, email, phone })
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      return res.json();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: error.message || 'Erro desconhecido' });
    });
});

// UPDATE user
router.put("/:id", checkToken, (req, res) => {
  const { id } = req.params;
  const { username, password, email, phone } = req.body;
  fetch(url + '/' + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${req.token}`
    },
    body: JSON.stringify({ username, password, email, phone })
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      return res.json();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: error.message || 'Erro desconhecido' });
    });
});

// REMOVE user
router.delete("/:id", checkToken, (req, res) => {
  const { id } = req.params;
  fetch(url + '/' + id, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${req.token}`
    }
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      return res.json();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: error.message || 'Erro desconhecido' });
    });
});

// GET user by id
router.get("/:id", checkToken, (req, res) => {
  const { id } = req.params;
  fetch(url + '/' + id, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${req.token}`
    }
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      return res.json();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: error.message || 'Erro desconhecido' });
    });
});

module.exports = router;
