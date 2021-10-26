const fs = require('fs') 
const path = require('path')
const TypeLine = require('./enum')
const {ParseLine, FormatNewLine} = require('./utils')
const {ValidateClient, ValidateEmail} = require('./validations')

const fileNameOrigem = 'clientes.txt'
const fileNameDestino = 'clientes'
const saveJson = false;
const saveCSV = true;

//Valido se existe o arquivo antes de ler
if(!fs.existsSync(path.join('.', fileNameOrigem))){
  console.log(`Arquivo ${fileNameOrigem} não encontrado.`)
}
else{
  //Começo a leitura do arquivo 
  fs.readFile(path.join('.', fileNameOrigem), 'utf8',(err,data) => {
    //Quebro o arquivo pelos Enter para ler linha a linha
    const strData = data.toString().split('\r\n');
    let lineTypeCurrent = TypeLine.NAO_USADA;
    let objectLine = [];
  
    //Tratamento linha a linha
    for(let i=0;i<strData.length;i++){
      let keyLine = strData[i].substr(4,5);
  
      if(keyLine.trim() != ''){
        if(keyLine.replace(/[^\d]/g,'').length == 5 && strData[i].indexOf('@') == -1){
          lineTypeCurrent = TypeLine.CODIGO;
          objectLine.push({});
        }     
  
        if(lineTypeCurrent != TypeLine.NAO_USADA){
          if(lineTypeCurrent < TypeLine.EMAIL && ValidateEmail(strData[i].replace(/\n/g,''))){
            lineTypeCurrent= TypeLine.EMAIL;
          }

          //Pego o pase pelo tipo da linha
          const parseObj = ParseLine[lineTypeCurrent];

          objectLine[objectLine.length-1] = {...objectLine[objectLine.length-1], ...parseObj(strData[i])} 
          lineTypeCurrent++;
  

          if(lineTypeCurrent > TypeLine.EMAIL){
            lineTypeCurrent= TypeLine.NAO_USADA;
          }
        }
      }
      else{
        lineTypeCurrent = TypeLine.NAO_USADA;
      }
    }
  
  
    if(saveJson){
      fs.writeFile(path.join('.',`${fileNameDestino}.json`),JSON.stringify(objectLine),'utf8', (err) =>{
        if(!err){
          console.log('Criação de arquivo Json efetuado com sucesso.')
        }
        else{
          console.log('Erro na criação de arquivo Json.')
          console.log(err);
        }
      })
    }
  
    if(saveCSV){
      const validClients = [];
      const invalidClients = [];

      objectLine.forEach(client => {
        try{
          ValidateClient(client)
          validClients.push(client);
        }
        catch(ex){
          client.comment = ex;
          invalidClients.push(client);
        }
      })


      //Cria arquivo CSV com clientes validos
      const csvClientes = validClients.map(cliente => FormatNewLine(cliente)).join('\r\n');
      
      fs.writeFile(path.join('.',`${fileNameDestino}.csv`),csvClientes.replace(/undefined/g,''),'utf8', (err) =>{
        if(!err){
          console.log('Criação de arquivo CSV efetuado com sucesso.')
        }
        else{
          console.log('Erro na criação de arquivo CSV.')
          console.log(err);
        }
      })

      //Cria arquivo CSV de clientes invalidos
      const csvClientesInvalidos = invalidClients.map(cliente => FormatNewLine(cliente)).join('\r\n');
      
      fs.writeFile(path.join('.',`${fileNameDestino}.err.csv`),csvClientesInvalidos.replace(/undefined/g,''),'utf8', (err) =>{
        if(!err){
          console.log('Criação de arquivo CSV de dados inválidos efetuado com sucesso.')
        }
        else{
          console.log('Erro na criação de arquivo CSV de dados inválidos.')
          console.log(err);
        }
      })
    }
  
    console.log(`Foram convertidos ${objectLine.length} cadastros de clientes`);
  })
}
