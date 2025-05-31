const express = require('express');
const db = require("../db");
const router = express.Router();

// Registrar usuario (POST /api/users)

router.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'Faltan datos obligatorios' });

    db.run(
        `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`,
        [name, email, password, phone || null],
        function (err) {
            if (err) return res.status(400).json({ erro: err.message });
            res.status(201).json({ id: this.lastID, name, email, phone })
        }
    )
})


router.post('/login', (req, res) => {

    console.log(req.body)
    const { emailLogin, passwordLogin } = req.body
    //console.log("body: " + req.body)
    if (!emailLogin || !passwordLogin) return res.status(400).json({ error: 'Faltan datos obligatorios' });

    db.get(

        `SELECT * FROM users WHERE email = ? AND password = ?`,[emailLogin, passwordLogin], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(401).json({ error: 'Credenciales inválidas' });

            res.json(row); // o puedes devolver solo partes del usuario (ej. id, email, token)
        }
    )

})

module.exports = router;