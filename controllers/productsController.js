import {
    faker
} from '@faker-js/faker'

const getRandom = (param) => {
    if(param === 'name'){
        return names[Math.floor(Math.random()*names.length)]

    }else if(param === "thumb"){
        return thumbnails[Math.floor(Math.random() * thumbnails.length)]
    }
    else {
        return prices[Math.floor(Math.random() * prices.length)]
    }
}

const names = ["Notebook_1", "Notebook_2", "Notebook_3", "Notebook_4", "Notebook_5"];

const thumbnails = [
    "https://http2.mlstatic.com/D_NQ_NP_913944-MLA44973386650_022021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_674861-MLA48633666850_122021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_792009-MLA47221488421_082021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_732599-MLA48061930662_102021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_691014-MLA47861577646_102021-V.webp",
]

const prices = [
    990, 1500, 2000, 3000, 1700
]

const createCombinations = id => {
    return{
        id,
        name:getRandom("name"),
        thumbnail:getRandom("thumb"),
        price:getRandom("price")
    }
}

function buildProduct(){

    const products = [];
    for(let i =0; i < prices.length; i++){
        products.push(createCombinations(getId()))
    }   
    return products;
}


let id = 1;
const getId = () =>{
    return id++;
}

// console.log(buildProduct())


export const getProducts = async (req,res,next) => {
   return res.json({products:buildProduct()});
}


export { buildProduct }