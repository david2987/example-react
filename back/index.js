const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
const port = 4000
app.use(cors());

app.use(bodyParser.json());

const result = {

}

const resultArr = [];


app.get('/sum', (req, res) => {
    res.send(resultArr || []);
});


app.post('/sum', (req, res) => {
    id = resultArr.length ; 
    console.log(req.body);
    const calculo = req.body.calculo    
    // const [num,num2,operand] = req.body;
    const num = calculo.num;
    const num2 = calculo.num2;
    const operand = calculo.operand;
    let resultado = 0;
    switch (operand) {        
        case "+":            
        resultado = parseInt(num) + parseInt(num2)
            break;            
        case "-":            
        resultado = parseInt(num) - parseInt(num2)
            break;            
        case "*":            
        resultado = parseInt(num) * parseInt(num2)
            break;                        
        case "/":            
        resultado = parseInt(num) / parseInt(num2)
            break;                        
    }        
    resultArr[id] = resultado ;

    res.status(201).send(resultArr);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))