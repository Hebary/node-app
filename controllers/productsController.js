import {
    faker
} from '@faker-js/faker'

const getRandom = (param) => {

    if(param === "thumb"){
        return thumbnails[Math.floor(Math.random() * thumbnails.length)]
    }
    else{
        return console.log("hola buen día");
    }
   
}


const thumbnails = [
    "https://http2.mlstatic.com/D_NQ_NP_913944-MLA44973386650_022021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_674861-MLA48633666850_122021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_792009-MLA47221488421_082021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_732599-MLA48061930662_102021-V.webp",
    "https://http2.mlstatic.com/D_NQ_NP_691014-MLA47861577646_102021-V.webp",
]



const createCombinations = id => {
    return{
        id,
        name:faker.commerce.productName(),
        //faker no hacía lo que le pedía con la img
        thumbnail: getRandom("thumb"),
        price:faker.datatype.float({ max: 1700 })
    }
}

function buildProduct(){

    const products = [];
    for(let i = 0; i < 5; i++){
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