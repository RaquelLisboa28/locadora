const clientRepository = require("../repositories/clientReposity");
const { ObjectId } = require("mongodb");

class ClientController {
  async index(req, res) {
    const clients = await clientRepository.find();
    res.json(clients);
  }

  async show(req, res) {
    const id = req.params.id;
    const client = await clientRepository.findOne({
      _id: new ObjectId(id),
    });
    res.json(client);
  }

  async store(req, res) {
    const newClient = await clientRepository.insertOne(req.body);
    res.json(newClient);
  }

  async update(req, res) {
    const updatedData = await clientRepository.updateOne(
      { _id: new ObjectId(req.params.id) },
      updatedData
    );
    res.json(updatedData);
  }

  async destroy(req, res) {
    await clientRepository.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json("Cliente Removido");
  }
}

module.exports = new ClientController();
