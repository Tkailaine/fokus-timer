const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const adicionarTarefa = document.querySelector('.app__form-add-task')
const inputTarefa = document.querySelector('.app__form-textarea')
const btnSalvarTarefa = document.querySelector('.app__form-footer__button--confirm')
const listaTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
let tarefaSelecionada = null
let liTarefaSelecionada = null
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTarefas = document.querySelector('#btn-remover-todas')




// Lista de tarefas
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

//Mostrar interface de tarefa
btnAdicionarTarefa.addEventListener('click', () => {
   adicionarTarefa.classList.toggle('hidden')
})

function atualizarTarefa(){
     localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

adicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault()
    const tarefa = {
        descricao : inputTarefa.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    listaTarefas.append(elementoTarefa)
    atualizarTarefa()
    //Limpando textarea
    inputTarefa.value = '';
    //ocultar formulário
    adicionarTarefa.classList.add('hidden')
})

function criarElementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', 'imagens/edit.png')
    
    botao.onclick = () => {
    const novaDescricao = prompt('Qual é o novo nome da tarefa?')
    if(novaDescricao){
         paragrafo.textContent = novaDescricao
         tarefa.descricao = novaDescricao
         atualizarTarefa()}
    }
   

    botao.append(imagemBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if(tarefa.completa){
        ('app__section-task-list-item-active')
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    }else{
        li.onclick = () => { 
        //Deseleciona todas as tarefas antes de selecionar outra
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(tarefa => {
            tarefa.classList.remove('app__section-task-list-item-active')
        })
        li.classList.add('app__section-task-list-item-active')
        //remove descrição ao deselecionar tarefa
        if(tarefaSelecionada == tarefa){
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return

        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
       
    }

    }

    
    return li

}

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa)
    listaTarefas.append(elementoTarefa)

} )

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefa()
    }
})

btnRemoverConcluidas.onclick = () => {
    const seletor = ".app__section-task-list-item-complete"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = tarefas.filter(tarefa=> !tarefa.completa)
    atualizarTarefa()


}

btnRemoverTarefas.onclick = () => {
   const seletor = ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = []
    atualizarTarefa()

}

