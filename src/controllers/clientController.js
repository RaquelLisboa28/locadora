const clientRepository = require("../repositories/clientReposity");
const { ObjectId } = require("mongodb");
const { z } = require("zod");

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
    const clientSchema = z.object({
      name: z
        .string({ message: "é necessário informar o nome." })
        .min(1),
      contact: z
        .number({ message: "É necessário informar o contato." })
        .min(11),
      gender: z
        .string({ message: "é necessário informar o sexo." })
        .min(1),
    });

    const response = await clientSchema.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({
        message: response.error.errors.map((error) => error.message).join(", "),
      });
    }

    const data = response.data;

    const newClient = await clientRepository.insertOne(data);
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
