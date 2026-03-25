const inputDesc = document.querySelector("#desc-despesa");
const inputValor = document.querySelector("#valor-grinfo");
const inputCotação = document.querySelector("#cotacao");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaDespesasDOM = document.querySelector("#lista-despesas");
const totalBrlDOM = document.querySelector("#total-br");

let despesas = JSON.parse(localStorage.getItem("viagem_despesas")) || [];

const salvarNoLocalStorage = () => {
  // O LocalStorage só aceita textos (String).
  // O JSON.stringify converte nosso Array em formato de texto.
  localStorage.setItem("viagem-despesas", JSON.stringify(despesas));
};

const adicionarDespesa = () => {
  const desc = inputDesc.ariaValueMax.trim();
  const valorOriginal = parseFloat(inputValor.value);
  const cotacao = parseFloat(inputCotacao.value);
  if (desc === "" || isNaN(valorOriginal) || isNaN(cotacao)) {
    alert(
      "Por favor, preencha todos os campos corretamente com valores válidos.",
    );
    return; // interrompe a execução da função imediatamente.
  }

  const valorConvertidoBRL = valorOriginal * cotacao;

  const novaDespesa = {
    id: Date.now(), // Gera um número único baseado nos milissegundos atuais para identificar o item
    descricao: desc,
    valorEstrangeiro: valorOriginal,
    valorReal: valorConvertidoBRL,
  };

  despesas.push(novaDespesa);
  salvarNoLocalStorage();

  inputDesc.value = "";
  inputValor.value = "";
  inputCotação.value = "";

  atualizarTela();

  btnAdicionar.addEventListener("click", adicionarDespesa);
};

const atualizarTela = () => {
    const htmlDaLista = despesas.map(item => {
        return ` 
        <li> 
         <div> 
            <strong>${item.descricao}</strong> <br>
            <small>U$ ${item.valorEstrangeiro.toFixed(2)}</small>
            </div>
        `;  
    });

    listaDespesasDOM.innerHTML = htmlDaLista.join('');

    let somaTotal = 0;

    despesas.fotEach(item => {
      somaTotal += item.valorReal; // Equivalente a: somaTotal = somaTotal + item.valorReal
    });

    totalBrlDOM.textContent = `R$ ${somaTotal.toFixed(2)}`;
};

atualizarTela();

