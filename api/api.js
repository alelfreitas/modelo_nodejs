const api = {};
const depoimentos = require('../dao/dao');

api.getDados = (req, res) => {
    depoimentos.getDados(req.connection, req.query)
            .then(lista => res.status(200).json(lista))
            .catch(err => res.status(400).json(err));
};

module.exports=api;