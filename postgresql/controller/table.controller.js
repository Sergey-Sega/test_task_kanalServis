const db = require('../db')

class TableController{
    async createTable(req,res){
        const {name,date,quantity,distance} = req.body
        const newDistance = await db.query(`INSERT INTO person(name,date,quantity,distance) values ($1, $2, $3, $4) RETURNING *`, [name,date,quantity,distance])
        res.json(newDistance.rows[0])
    }
    async getTable(req,res){
        const tables = await db.query('SELECT * FROM person')
        res.json(tables.rows)
    }
    async getOneTable(req,res){
        const id = req.params.id
        const tables = await db.query('SELECT * FROM person where id = $1', [id])
        res.json(tables.rows[0])
    }
    async updateTable(req,res){
        const {id,name,date,quantity,distance} = req.body
        const table = await db.query(
            'UPDATE person set name = $1, date = $2, quantity = $3, distance = $4 where id = $5 RETURNING *',
             [id,name,date,quantity,distance])
        res.json(table.rows[0])
    }
    async deleteTable(req,res){
        const id = req.params.id
        const table = await db.query('DELETE FROM person where id = $1', [id])
        res.json(table.rows[0])
    }
}

module.exports = new TableController()