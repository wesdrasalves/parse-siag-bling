const TypeLine = require('./enum')

const parseCondigo = function(line){
  let cleanLine = line.replace(/\n/g,'')

  const codigo = cleanLine.substr(4,5);

  const razao = cleanLine.length>= 54 ? cleanLine.substr(9,45) : cleanLine.substr(9);
  const endereco = cleanLine.length> 54 ? cleanLine.substr(54) : '';

  return {
      codigo: codigo.trim(),
      razao: razao.trim(),
      endereco: endereco.trim()
    }
} 


const parseCNPJ = function(line){
  let cleanLine = line.replace(/\n/g,'')
  
  const cpfCnpj = cleanLine.substr(4,18);
  const inscricao = cleanLine.length > 22 ? cleanLine.substr(21,27) :  cleanLine.substr(21);
  const nomeFantazia = cleanLine.length > 49 ? cleanLine.substr(49) :  '';

  return {
    cpfCnpj: cpfCnpj.indexOf('/') > -1 ? cpfCnpj : cpfCnpj.trim().substr(0,14),
    tipoPessoa: cpfCnpj.indexOf('/') > -1 ? 'PJ' : 'PF',
    inscricaoEstadual: inscricao.indexOf('/') > -1 ? inscricao: '',
    nomeFantazia: nomeFantazia
  } 
} 


const parseEndereco = function(line){
  let cleanLine = line.replace(/\n/g,'')
  
  const bairro = cleanLine.length >= 27 ? cleanLine.substr(4,22) : cleanLine.substr(4);
  const cidade = cleanLine.length > 27 ? cleanLine.substr(26,24) : cleanLine.substr(26);
  const uf =  cleanLine.length > 51 ? cleanLine.substr(50,4) : cleanLine.substr(50);
  const cep =  cleanLine.length > 55 ? cleanLine.substr(54,8) : cleanLine.substr(54);
  const telefone = cleanLine.length > 63 ? cleanLine.substr(62,13) : cleanLine.substr(62);
  const contato = cleanLine.length > 76 ? cleanLine.substr(76) : '';

  return {
          bairro: bairro.trim(),
          cidade: cidade.trim(),
          uf: uf.trim(),
          cep: cep.trim(),
          telefone: telefone.trim().replace(/ /g,'') == '()-' ? '' : telefone,
          contato: contato.trim()
        };
} 


const parseEmail = function(line){
  return {email: line.trim().replace(/\n/g,'') }
} 


const ParseLine = {
  [TypeLine.CODIGO]: parseCondigo,
  [TypeLine.CNPJ]: parseCNPJ,
  [TypeLine.ENDERECO]: parseEndereco,
  [TypeLine.EMAIL]: parseEmail
}


const FormatNewLine = function (objectLine){
  const {codigo, razao, endereco,
    bairro,cidade,uf,cep,telefone,contato,
    cpfCnpj, tipoPessoa, inscricaoEstadual, nomeFantazia,
    email,comment} = objectLine

  return `"${codigo}";"${codigo}";"${razao}";"${nomeFantazia || ''}";"${endereco}";"";"";"${bairro}";"${cep}";"${cidade}";"${uf}";"${contato}";"${telefone}";"";"";"${email || ''}";"";"${tipoPessoa=='PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}";"${cpfCnpj || ''}";"${inscricaoEstadual || ''}";"";"Ativo";"${comment || ''}"${';""'.repeat(18)}`;
}


module.exports ={
  ParseLine,
  FormatNewLine,
} ;