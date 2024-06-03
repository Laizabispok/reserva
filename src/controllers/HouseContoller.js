import House from '../models/House'
import User from '../models/User'
import * as Yup from 'yup'

class HouseController {
    async index(req, res) {
        const {status} = req.query
        const houses = await House.find({status })
        return res.json(houses) 
    }

    async store(req, res) {
        const schema = Yup.object().shape({
          descripion: Yup.string().required(),
          price: Yup.number().required(),
          location: Yup.string().required(),
          status: Yup.boolean().required(),
        });
        const { filename } = req.file
        const { descripition, price, location, status } = req.body
        const { user_id } = req.headers
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' })
        }

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            descripition,
            price,
            location,
            status,
        })
        return res.json(house)
    }

    async update(req, res){
        const schema = Yup.object().shape({
          descripition: Yup.string().required(),
          price: Yup.number().required(),
          location: Yup.string().required(),
          status: Yup.boolean().required(),
        });
        const { filename } = req.file
        const { house_id } = req.params
        const { descripion, price, location, status} = req.body
        const { user_id } = req.headers
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.'})
    }
    const user = await User.findById(user_id)
    const houses = await House.findById(house_id)
    if (String(user._id) !== String(houses.user)) {
        return res.status(401).json({ error: 'Não autorizado' })
    }
    await House.updateOne({ _id: house_id }, {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
    })
    return res.send()
    }
}

export default new HouseController()