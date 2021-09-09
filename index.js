const https = require('https');
const fs = require('fs');
const argumentos = process.argv.slice(2);

let codigo = argumentos[0];
let nombre_codigo = argumentos[1];
let unidad_medida = argumentos[2];
let conversion_pesos = Number(argumentos[3]);

// 2.-
https.get('https://mindicador.cl/api',(resp) => {
        resp.on('data',(data) => {

             let indicadores = JSON.parse(data);
             console.log(indicadores)
             let dolar = indicadores.dolar.valor;
             console.log(dolar)
             let dolar_convertido = (conversion_pesos/dolar).toFixed(2);
             console.log(dolar_convertido)
//3.-  
             fs.writeFile(`${codigo}.${nombre_codigo}`,
                        `A la fecha: ${Date()}
                         \n Fue realizada cotización con los siguientes datos:
                         \n Cantidad de pesos a convertir: ${conversion_pesos} 
                         \n Convertido a "${unidad_medida}" da un total de: 
                         \n $${dolar_convertido}`, 
                        'utf8',
                        () => {
// 4.- 
                            console.log('La conversión fue todo un exito, se generará un nuevo archivo \n');
                            fs.readFile(`${codigo}.${nombre_codigo}`,'utf8',(error, data) => {
                                console.log(`${data}`);
                            })
                        }
             )
        })
    })  
    .on('error',(error) => {
        console.log('Error: ' + error.message)
    })