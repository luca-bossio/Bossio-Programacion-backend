import fs from 'fs'
//CLASE CONTENEDORA
const path = 'src/public/usuarios.json';

class UsuarioManager {

    getAll = async () => {
        try {
            if (fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8');
                let productos = JSON.parse(fileData)
                return productos;
            }else{
                return [];
            }} catch (error) {console.log("error" +error)};
    }

    save = async (producto) => {
        try{
            let productos = await this.getAll();
            if(productos.length === 0){
                producto.id=1;
                productos.push(producto);
                await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'));
                return productos[producto.id] + producto.id
            }else{
                producto.id = productos[productos.length-1].id+1;
                productos.push(producto);
                await fs.promises.writeFile(path,JSON.stringify(usuarios,null,'\t'));
            }
            return [producto]
        }catch(error){
            console.log("Cannot write file: "+error)
        }
        
    }

    replace = async (producto,id) => {
        let productos = await this.getAll();
        if (id-1 < productos.length){
            productos.splice(id-1,1,producto)
            await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'));
        }else{
            return 1
        }
    }
    
    getById = async (id) =>{
        try {
            let productos = await this.getAll();
            if (id-1 <= productos.length){
                return productos[[id-1]]
            }else{
                return 1
            }
            
        } catch (error) {
            console.log(`El usuario ID=> ${id} no existe`)  
        }
    }

    deletById = async (id) =>{
        try {
            let productos = await this.getAll();
            if (id-1 <= productos.length){
                productos.splice(id-1,1)
                await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'));
            }else{
                return 1
            }
            
        } catch (error) {
            console.log("getById =>" +error)
        }
    }

    deletAll = async () =>{
        try {
            await fs.promises.writeFile(path,"[]");
        } catch (error) {
            console.log(error)
        }
    }
}


export default UsuarioManager;
