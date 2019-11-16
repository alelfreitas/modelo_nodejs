const dao = {};
const query_get = 'SELECT E* FROM TABLE';

dao.getDDados = (connection, params) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(query_get, [], (err, lista) => {
                if (err) reject({error: err.sqlMessage});
                // logger.info(`lista: ${lista.length}`);
                resolve(lista);
            });
        } catch (e) {
            reject({error: e.message});
        }
    });
};

module.exports=dao;