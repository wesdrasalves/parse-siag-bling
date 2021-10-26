# Parse cadastro de clientes do Sistema SIAG para BLING

## 📄🤟  


Script em NodeJS usado para fazer o parse dos dados cadastrais de clientes do sistema SIAG, exportado em arquivo TXT. 

- Trata e valida dados 
- Executa transformação dos dados em arquivo JSON
- Criação de CSV no padrão de importação do sistema BLING

No início do arquivo main.js pode trocar o nome dos arquivos gerados e lidos, e se quer gerar Json ou CSV.
O nome do arquivo destino não precisa da extenção, pois a mesma é colocado na geração do arquivo

```
const fileNameOrigem = 'clientes.TXT'
const fileNameDestino = 'clientes'
const saveJson = false;
const saveCSV = true;
```

Para executar o parse, basta rodar o comando abaixo.

```
node main.js
```

🔴 IMPORTATE: Só é gerado arquivo com registros inválidos na versão CSV, o arquivo de erros é gerado com nome "nome_arquivo.err.csv".
 
