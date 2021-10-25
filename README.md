# Parse cadastro de clientes do Sistema SIAG para BLING

## 📄🤟  


Script em NodeJS para transformar arquivo com base cadastral de cliente do sistema SIAG, fazendo a transformação do dado em JSON para backup e criando CSV no padrão de importação do sistema BLING.

No início do arquivo main.js pode trocar o nome dos arquivos gerados e lidos, e se quer gerar Json ou CSV.

```
const fileNameOrigem = 'clientes.TXT'
const fileNameJsonDestino = 'clientes.json'
const fileNameCsvDestino = 'clientes.csv'
const saveJson = false;
const saveCSV = true;
```

Para executar o parse, basta rodar o comando abaixo.

```
node main.js
```
 
