const carRepository = require("../repositories/carReposity")
const { ObjectId } = require("mongodb")
const { z } = require("zod")

class carController{
    async index(req, res){
        const cars = await carRepository.find()
        res.json(cars)
    }

    async show(req, res){
        const id = req.params.id
        const car = await carRepository.findOne({
            _id: new ObjectId(id)
        })
        res.json(car)
    }

    async store(req, res){
      const carSchema = z.object({
      model: z
        .string({ message: "é necessário informar o modelo." })
        .min(1),
      year_manufacture: z
        .number({ message: "É necessário informar o ano de fabricação." })
        .min(1),
      color: z
        .string({ message: "é necessário informar a cor do carro." })
        .min(1),
      manufacturer: z
        .string({ message: "é necessário informar o fabricante." })
        .min(1),  
    });

    const response = await carSchema.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({
        message: response.error.errors.map((error) => error.message).join(", "),
      });
    }

    const data = response.data;

    const newCar = await carRepository.insertOne(data)
    res.json(newCar)
    }

    async update(req, res){
        const updatedData = await carRepository.updateOne(
            {_id: new ObjectId(req.params.id)},
            updatedData
        )
        res.json(updatedData)
    }

    async destroy(req, res){
        await carRepository.deleteOne(
            {_id: new ObjectId(req.params.id)}
        )
        res.json("Carro removido")
    }
}

module.exports = new carController()