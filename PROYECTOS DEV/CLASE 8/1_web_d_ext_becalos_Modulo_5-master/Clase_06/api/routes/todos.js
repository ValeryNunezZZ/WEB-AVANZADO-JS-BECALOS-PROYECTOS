const express = require('express');

/* Conexión a la base de datos */
const db = require("../db");

/* Router del servidor */
const router = express.Router();

/* Crear un todo (POST /api/todos) */
router.post('/', (req, res) => {
    const { task, dueDate } = req.body
    if (!task || !dueDate) return res.status(400).json({ error: 'Faltan datos obligatorios' });
    db.run(
        `INSERT INTO todos (task, dueDate) VALUES (?, ?)`,
        [task, dueDate],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
        }
    )
})

router.get('/', (req, res) => {
    db.all(
        `SELECT * FROM todos`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    )
})


router.delete('/', (req, res) => {
    const { id } = req.body;

    console.log("Mi id " + id)

    if (!id) return res.status(400).json({ error: 'ID requerido' });

    db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        // this.changes muestra cuántas filas fueron afectadas
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea eliminada correctamente' });
    });
});


router.put('/', (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: 'ID requerido' });

    db.get(`SELECT done FROM todos WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Tarea no encontrada' });

        const nuevoValor = row.done === 1 ? 0 : 1;

        db.run(`UPDATE todos SET done = ? WHERE id = ?`, [nuevoValor, id], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ mensaje: 'Tarea actualizada correctamente', id, done: nuevoValor });
        });
    });
});


module.exports = router;