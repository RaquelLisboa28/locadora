const rentalRepository = require("../repositories/rentalReposity");
const carRepository = require("../repositories/carReposity");
const { ObjectId } = require("mongodb");
const { z } = require("zod");

class rentalController {
  async index(req, res) {
    const rental = await rentalRepository.find();
    res.json(rental);
  }

  async show(req, res) {
    const id = req.params.id;
    const rental = await rentalRepository.findOne({
      _id: new ObjectId(id),
    });
    res.json(rental);
  }

  async store(req, res) {
    const schema = z.object({
      car_id: z
        .string({ message: "é necessario informar o id do carro." })
        .min(1, "O id do carro é obrigatório."),
      client_id: z.string().min(1, "O id do cliente é obrigatório."),
      start_date: z
        .string()
        .min(1, "A data de início da locação é obrigatória."),
      end_date: z.string().min(1, "A data de fim da locação é obrigatória."),
      age: z
        .number({ message: "A idade é necessária" })
        .min(18, "Idade mínima de 18 anos é necessária."),
    });

    const response = await schema.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({
        message: response.error.errors.map((error) => error.message).join(", "),
      });
    }

    const data = response.data;

    // Antes de alugar o carro, verificar se o carro está disponível
    const car = await carRepository.findOne({
      _id: new ObjectId(req.body.car_id),
    });

    if (!car) {
      return res.status(404).json({
        message: "Carro não encontrado.",
      });
    }

    // Checar se o carro já está alugado
    if (car.isRented) {
      return res.status(404).json({
        message: "Este carro já está alugado.",
      });
    }

    // Alugar o carro de fato
    const newRental = await rentalRepository.insertOne(data);

    // Indisponibilizar o carro para locação
    await carRepository.updateOne(
      { _id: new ObjectId(req.body.car_id) },
      { isRented: true }
    );

    res.json(newRental);
  }

  async deliverRental(req, res) {
    const id = req.params.id;
    const rental = await rentalRepository.findOne({
      _id: new ObjectId(id),
    });

    if (!rental) {
      return res.status(404).json({
        message: "Locação não encontrada.",
      });
    }
    if (rental.delivery_date) {
      return res.status(404).json({
        message: "Esta locação já foi finalizada.",
      });
    }
    // Colocar a data de entrega no aluguel
    await rentalRepository.updateOne(
      { _id: new ObjectId(id) },
      { delivery_date: new Date() }
    );

    // Liberar o carro para locação
    await carRepository.updateOne(
      { _id: new ObjectId(rental.car_id) },
      { isRented: false }
    );

    res.json({
      message: "Carro entregue com sucesso!",
    });
  }

  async update(req, res) {
    const updatedData = await rentalRepository.updateOne(
      { _id: new ObjectId(req.params.id) },
      updatedData
    );
    res.json(updatedData);
  }

  async destroy(req, res) {
    await rentalRepository.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json("Locação removida!");
  }
}

module.exports = new rentalController();
