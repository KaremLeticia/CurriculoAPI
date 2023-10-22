async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });
 
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function selectCurriculos() {
    const client = await connect();
    const res = await client.query('SELECT * FROM curriculo');
    return res.rows;
}

async function selectCurriculo(id) {
    const client = await connect();
    const res = await client.query('SELECT * FROM curriculo WHERE id=$1', [id]);
    return res.rows;
}

async function insertCurriculo(curriculo){
    const client = await connect();
    const sql = 'INSERT INTO curriculo (nome, idade, email, telefone, informacoes) VALUES ($1, $2, $3, $4, $5)';
    const values = [curriculo.nome, curriculo.idade, curriculo.email, curriculo.telefone, curriculo.informacoes];
    return await client.query(sql, values);
}

async function updateCurriculo(id, curriculo){
    const client = await connect();
    const sql = 'UPDATE curriculo SET nome=$1, idade=$2, email=$3, telefone=$4, informacoes=$5 WHERE id=$6';
    const values = [curriculo.nome, curriculo.idade, curriculo.email, curriculo.telefone, curriculo.informacoes, id];
    return await client.query(sql, values);
}

async function deleteCurriculo(id){
    const client = await connect();
    const sql = 'DELETE FROM curriculo where id=$1;';
    return await client.query(sql, [id]);
}
 
module.exports = { selectCurriculos, selectCurriculo, insertCurriculo, updateCurriculo, deleteCurriculo }