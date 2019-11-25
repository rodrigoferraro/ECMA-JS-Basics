const fs = require('fs');

const roda = 1;

if (roda===1){
  console.log('ini 1');

  const conteudo = fs.readFileSync(__filename);

  console.log('conteúdo', conteudo);

  console.log('fim 1');
}

if (roda===2){
  console.log('ini 2');

  fs.readFile(__filename, (erro, dados) => {

    console.log('conteúdo da leitura async', dados);

  });

  console.log('fim 2');
}

if (roda===3){
  console.log('ini 3');

  const util = require('util');

  const readFilePromise = util.promisify(fs.readFile);

  readFilePromise(__filename)
  .then(dados => console.log(dados));

  console.log('fim 3');
}
