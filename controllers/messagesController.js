import { faker } from "@faker-js/faker";
import { Messages } from '../server.js'

export function buildMessage(email, msg){
        return{
            autor:{
            id: email,
            nomber:faker.name.fullName(),
            edad: faker.datatype.number({ max: 100 }),
            avatar: faker.internet.avatar(),
            alias: faker.internet.userName(),
            },
            text: msg
            }
        }


export const getMessages = async (req,res)=>{
    const { id } = req.params;
    let message = await Messages.getById(id)
    if(!message) {
        return res.json(await Messages.getAll())
    }
    res.json(message)
}

export const postMessages = async (req, res) => {
    const { email, msg } = req.body;
    
    const message = buildMessage(email, msg);
    await Messages.save(message)
    return res.json({msg:'msg saved succesfully' });
}

