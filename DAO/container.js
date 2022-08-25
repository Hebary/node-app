import { formatDistanceToNow } from "date-fns";
import fs from 'fs'

export class Container {

    constructor(route) {
        this.route = route;
    }

    async save( item ) {
        const items = await this.getAll();
        item.timestamps = formatDistanceToNow(new Date(Date.now()) , {addSuffix: true});

        if(items.some(some => some.id === item.id )){
            return console.log('no se admiten repetidos, calmado ^^')
        }

        items.push(item);

        try {
            await fs.promises.writeFile(this.route, JSON.stringify(items, null, 2));
            return item.id;
        } catch (error) {
            throw new Error(`Saving error ${error}`); 
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.route, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return []
        }        
    }

    async getById( id ) {
        const items = await this.getAll();
        return items.find(item => item.id === id);
    }
  

    async deleteById(id) {
        let items = await this.getAll();
        items = items.filter(item => item.id !== id);
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(items, null, 2));
            return 'Item deleted successfully';
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        let items = await this.getAll();
        items = [];
        try {
            await fs.promises.writeFile(this.route, JSON.stringify(items, null, 2));
            return items;
        } catch (error) {
            console.log(error);
        }

    }
    
    async updateOne(id, item) {
        const items = await this.getAll();
        const index = items.findIndex(item => item.id === id);
        items[index] = item;
        if(index === -1){
            throw new Error(`Item ${id} not found`);
        }

        try {
            await fs.promises.writeFile(this.route, JSON.stringify(items, null, 2));
            return 'Item updated successfully';
        } catch (error) {
            console.log(error);
        }
    }
}

//Helper function
function idGenerator(){
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}


function codeGenerator(){
    return Math.random().toString(32).substring(2);
}