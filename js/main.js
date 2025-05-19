const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function editaTarefa(li) {
  const botaoEdita = document.createElement('button');
  botaoEdita.innerText = '✎';
  botaoEdita.setAttribute('class', 'editar');
  botaoEdita.setAttribute('title', 'Editar esta tarefa');
  li.appendChild(botaoEdita);

  botaoEdita.addEventListener('click', function () {

    // Evita múltiplos inputs se clicar mais de uma vez (erro solucionado)
    if (li.querySelector('input')) return;

    // Encontra o texto da tarefa (antes dos botões)
    const textoNode = Array.from(li.childNodes).find(
      node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
    );

    const textoAtual = textoNode?.textContent.trim() || '';

    // Cria o input
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoAtual;
    input.style.fontSize = '1em';
    input.style.width = '70%';

    // Substitui o texto pelo input
    if (textoNode) li.replaceChild(input, textoNode);
    else li.insertBefore(input, li.firstChild);

    input.focus();

    function salvarEdicao() {
      const novoTexto = input.value.trim();
      if (novoTexto) {
        const novoTextoNode = document.createTextNode(novoTexto + ' ');
        li.replaceChild(novoTextoNode, input);
        salvarTarefas(); 
      }
    }

    // CSS
    input.classList.add('input-edicao');
    input.addEventListener('blur', salvarEdicao);
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        salvarEdicao();
      }
    });
  });
}



function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = '🗑';
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);

}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  editaTarefa(li);
  salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
