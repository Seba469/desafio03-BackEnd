import fs from 'fs'
import {v4 as uuidV4} from 'uuid'

const path = './src/classes/json/productos.json'

export default class ProductManager{

    getProducts = async (limit) => {
        try{
            //if (fs.existsSync(path)){
                const data = await fs.promises.readFile(path, "utf-8")
                const products = JSON.parse(data)
                
                //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                //console.log ("productos", products)
                //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                if (limit != undefined){
                    let i
                    let productsLimits = []

                    for (i = 0; i < limit; i++){
                        productsLimits.push(products[i])
                    }

                    return productsLimits
                }
                
                return products
           // }
        }
        catch (error){
            console.log(`Ocurrio un error ${error.message}`)
        }    
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        try{
            const products = await this.getProducts()

            if(!title, !description, !price, !thumbnail, !code, !stock){
                console.log("Debe completar todos los campos")
                return
            }
            
            const index = products.findIndex(p => p.code === code )
    
            if (index != -1){
                console.log("Codigo repetido")
                return
            }

            const newProduct = {
                id: uuidV4(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
    
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            console.log("Producto agregado")
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }  
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts()
        
            const productoFiltrado = products.filter(prod => prod.id === id)
            
            if (productoFiltrado.length === 0){
                console.log("Not found")
                return
            }else{
                //console.log(productoFiltrado)
                return productoFiltrado
            }  
        } 
        catch (error) {
            console.log(`Ocurrio un error ${error.message}`)
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts()

            const productosFiltrados = products.filter(prod => prod.id != id)
    
            console.log("producto eliminado correctamente")
            await fs.promises.writeFile(path, JSON.stringify(productosFiltrados, null, '\t'))
        } 
        catch (error) {
            console.log(`Ocurrio un error ${error.message}`)
        }
    }   
    
    /*updateProduct = async (id, title, description, price, thumbnail, code, stock) => {

        const products = await this.getProducts()
    
        const productObject = {id, title, description, price, thumbnail, code, stock}
        const productoFiltrado = products.filter(prod => prod.id === id)
    
        const updatedProduct = {...productoFiltrado[0], ...productObject}
    
        const index = products.findIndex(prod => prod.id === id)
        products.slice(index, 1, updatedProduct )
        
    
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        
    }*/

    updateProduct = async (id, infoNueva) => {
        try{
            const productos = await this.getProducts()
            const indice = productos.findIndex(prod => prod.id === id)

            productos[indice] = {...productos[indice], ...infoNueva}

            console.log("producto actualizado correctamente")
            await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }
    }
}

