const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const adicionarTarefa = document.querySelector('.app__form-add-task')
const inputTarefa = document.querySelector('.app__form-textarea')
const btnSalvarTarefa = document.querySelector('.app__form-footer__button  ')

// Lista de tarefas
const tarefas = []

//Mostrar interface de tarefa
btnAdicionarTarefa.addEventListener('click', () => {
   adicionarTarefa.classList.toggle('hidden')
})

adicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault()
    const tarefa = {
        descricao : inputTarefa.value
    }
    tarefas.push(tarefa)
    localStorage.setItem('Tarefas', JSON.stringify(tarefas))
})