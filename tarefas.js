class Tarefa {
    constructor(nome, categoria, realizada){
      this.nome = nome;
      this.categoria = categoria;
      this.realizada = realizada;
    }

    adicionaNaPagina(containerEl){
        let key = containerEl.childElementCount;
      containerEl.innerHTML += `
        <li key=${key} class="item-tarefa ${this.realizada? 'marcado': ''} categoria-${this.categoria}">
          ${this.nome}
        </li>
      `;
    }
}

const tarefas = [
    new Tarefa('Estudar Flutter', 'estudos', true),
    new Tarefa('Comprar Arroz', 'compras', false),
    new Tarefa('Ir na academia', 'lazer', false),
];

let listaTarefas = document.querySelector('#lista-tarefas');
listaTarefas.innerHTML = '';
  
for ( let tarefa of tarefas ) {
    tarefa.adicionaNaPagina(listaTarefas);
}

let incluirNovaTarefa = document.querySelector('#incluir-nova-tarefa');
let nomeNovaTarefa = document.querySelector('#nova-tarefa-nome');
let categoriaNovaTarefa = document.querySelector('#nova-tarefa-categoria');

function adicionarNovaTarefa() {
    let novaTarefa = new Tarefa(nomeNovaTarefa.value, categoriaNovaTarefa.value, false);
    tarefas.push(novaTarefa);
    novaTarefa.adicionaNaPagina(listaTarefas);
    nomeNovaTarefa.value = '';
    nomeNovaTarefa.focus();
}

incluirNovaTarefa.addEventListener('click', () => {
    adicionarNovaTarefa();
});

let filtroDeCategoriaEl = document.querySelector('#filtro-de-categoria');

filtroDeCategoriaEl.addEventListener('change', () => {
    let valorFiltro = filtroDeCategoriaEl.value;
    const itemTarefa = document.querySelectorAll('.item-tarefa');
    for (let item of itemTarefa) {
        if(valorFiltro === ""){
            item.classList.remove('retido-no-filtro');
        } else {
            item.classList.remove('retido-no-filtro');
            if (!item.classList.contains(`categoria-${valorFiltro}`)) {
                item.classList.add('retido-no-filtro');
            }
        }
        
    }
});

nomeNovaTarefa.addEventListener('keyup', (e) => {
    if( e.key === 'Enter' ) {
        adicionarNovaTarefa();
    }
});

listaTarefas.addEventListener('click', (e) => {
    e.target.classList.toggle('marcado');
    var id = e.target.attributes.key.value
    tarefas[id].realizada = !tarefas[id].realizada;
  
});
