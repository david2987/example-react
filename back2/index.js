
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4002;

// DB SERVER
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '123456',
    port: 5432,
})

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.use(cors());
app.use(bodyParser.json());


const product = []

// LISTAR TODO LOS PRODUCTOS 
app.get('/list', (req,res) => {

    const getProductos = async () => {
        try {
            const products = await client.query(
                "select id,title,price from products"
            );
            return products.rows
        } catch (error) {
            console.error(error.stack);
            return false;
        } 
    }

    getProductos().then(result => {
        if (result) {            
            res.send(result)
        }
    })

});


// LISTAR UN  PRODUCTO ESPECIFICO
app.get('/list/:id', (req,res) => {
    const searchId = req.params.id;

    const getProducto = async (id) => {
        try {
            const products = await client.query(
                "select id,title,price from products where id = $1" , [id]
            );
            return products.rows
        } catch (error) {
            console.error(error.stack);
            return false;
        } 
    }

    getProducto(searchId).then(result => {
        if (result) {            
            res.send(result)
        }
    })

});


///  CREA UN PRODUCTO 
app.post('/create', (req, res) => {    
    const title = req.body.title;
    const price = req.body.price;
    
    const insertProduct = async () => {
        try {
            await client.query(
                `INSERT INTO "products" ( "title" , "price")  
                 VALUES ( $1 , $2)`, [title, price]); // sends queries
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        } 
    };

    insertProduct().then(result => {
        if (result) {
            console.log('Product inserted');
        }
    });


    res.send(`Se agrego correctamente el Producto ${title}`)
})



app.put('/update/:id', (req,res) =>{

    const id = req.params.id;
    const title = req.body.title;
    const price = req.body.price;

    console.log(id,title,price);

    const updateProduct = async (id) =>{
        try {
            const datos = await client.query("UPDATE products SET title = $1 , price = $2 where id = " + id ,[title,price])
            return datos.rows
        } catch (error) {
            console.log(error);
            return false
        }
    }

    updateProduct(id).then(result => {
        if(result){
            res.send(`Se actualizó correctamente el producto ${title}`)
        }
    })

})


app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    
        const deleteProduct = async (id) =>{
            try {
                client.query("DELETE FROM products where id = $1",[id])
                return true   
            } catch (error) {
                console.log(error);
                return false
            }
            
        }            

    deleteProduct(id).then(result=> {
        if(result){
            res.send(`Se eliminó correctamente el producto Nº ${id}` )
        }
    })
})


app.listen(port, () => console.log("Listening 4002"));
