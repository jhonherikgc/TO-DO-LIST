const tarefas = [];
const input = document.getElementById('inputTarefa');
const btn = document.getElementById('btnAdicionar');
const lista = document.getElementById('listaTarefas');

btn.addEventListener('click', () => {
  const novaTarefa = input.value.trim();
  if (novaTarefa !== '') {
    tarefas.push(novaTarefa);
    input.value = '';
    renderizarTarefas();
  }
});

function renderizarTarefas() {
  lista.innerHTML = '';
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.textContent = tarefa;
    lista.appendChild(li);
  });

}
function removerTarefas () {
    const remover = document.querySelector('.btn-remover')
}

