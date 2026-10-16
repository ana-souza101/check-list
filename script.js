// ctrl F, para pesquisar palavras;

var tarefas = JSON.parse(localStorage.getItem("tarefas"));

var listaDeTarefas = document.getElementById("lista-tarefas");
var inputTarefa = document.getElementById("input-tarefa");

function salvarTarefasLocalStorage(){
    var json = JSON.stringify(tarefas)  // ele vai pegar um objeto e ele vai passar para string
    localStorage.setItem("tarefas", json)

}

function adicionarTarefa(){
    var texto = inputTarefa.value.trim() // remove espaço no inicio e no fim

    if(texto === ""){
        alert("Você precisar digitar algo no campo para poder adicionar uma nova tarefa!")
        return;
    }

    if(texto.length <= 3){
        alert("Você precisa digitar mais de 3 letras!")
    }

    var novaTarefa = {
        id: tarefas[tarefas.length - 1].id + 1, // crypto.randomUUID gera um id unico, sempre um id novo, nunca um repetido
        texto: texto,
        checked: false
    }

    tarefas.push(novaTarefa);
    salvarTarefasLocalStorage();
    desenharTarefas();

    inputTarefa.value = "";

// PEGAR O TEXTO QUE O USUARIO DIGITOU
//CRIAR UM NOVO OBJETO QUE REPRESENTA A TAREFA
//ADICIONAR A TAREFA NO TAREFAS
//ATUALIZAR A TELA
}

function excluirTarefa(id){
                                  // se       // for diferente            // pula para o próximo
    tarefas = tarefas.filter(tarefa => tarefa.id !== id) // lista plural, um objeto, singular
    salvarTarefasLocalStorage();
    desenharTarefas(); // atualiza novamente
    

    //PERCORRER A LISTA COMPARANDO O ID DA TAREFA COM O INFORMADO
    // SE FOR IGUAL, REMOVE
    //SE NÃO, PASSA PRO PRÓXIMO
}

function alternarTarefa(id){
    var tarefa = tarefas.find(tarefa => tarefa.id === id);
    if(tarefa !== undefined){
        tarefa.checked = !tarefa.checked;
        salvarTarefasLocalStorage();
        desenharTarefas();
    }

    //ENCONTRAR A TAREFA
    //MODIFICAR OU INVERTER O VALOR DO 'CHECKED'
    //ATUALIZAR NOVAMENTE A TELA
}

function desenharTarefas() {
    listaDeTarefas.innerHTML = " "; // apagar o que  tem em tela, para poder redesenhar depois

    for (var i = 0; i < tarefas.length; i++) {
        var icone = tarefas[i].checked === true ? "radio_button_checked" : "radio_button_unchecked";
        var classes = tarefas[i].checked === true ? "tarefa tarefa-concluida" : "tarefa";

        listaDeTarefas.innerHTML += `<li class= "${classes}">
        <button class="botao-check" onclick="alternarTarefa(${tarefas[i].id})">
            <span class="material-symbols-outlined">
               ${icone}
            </span>
        </button>

        <span class="tarefa-texto">
            ${tarefas[i].texto}
        </span>

        <button class="botao-excluir" onclick="excluirTarefa(${tarefas[i].id})">
            <span class="material-symbols-outlined">
                delete
            </span>
        </button>

    </li>`;

    }

};
// já chamou em baixo para quando atualizar, ela já ser executada
desenharTarefas();