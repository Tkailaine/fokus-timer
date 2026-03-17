//Cor de fundo html
const html = document.querySelector('html')
//Botões
const botoesContexto = document.querySelectorAll('.app__card-button')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const btnConfiguracoes = document.querySelector('#btn__configuracoes')

//Configuracoes
const configuracoes = document.querySelector('#configuracoes')
let exibindoConfiguracoes = false;
const timeConfiguracao = document.querySelector('#timeConfiguracao')
const btnSalvarTempo = document.querySelector('#btnSalvarTempo')
const setaBtnConfiguracoes = document.querySelector('.seta')

//Temporizador
const tempoTela = document.querySelector('#timer')
//Imagem da página
const imagemHero = document.querySelector('.app__image')
//Título principal
const tituloHero = document.querySelector('.app__title')
//Botao Temporizador
const botaoTemporizador = document.querySelector('#start-pause')
const botaoIniciarPausar = document.querySelector('#start-pause span')
const iconePlayPause = document.querySelector('.app__card-primary-butto-icon')


//Tempo temporizador de cada modo
let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;


//Musica
const musicaInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const somPlay = new Audio('sons/play.wav')

//const musica = new Audio('sons/piseiro.mp3')
musica.loop = true
//define onde começar o audio
musica.currentTime = 60;

musicaInput.addEventListener('change', () => ( musica.paused ? musica.play() : musica.pause()
))

const frases = [
    {
        modo : 'foco',
        frase: 'Otimize sua produtividade,',
        fraseStrong : 'mergulhe no que importa.'
    },
    {
        modo : 'duracao-curta',
        frase: 'Que tal dar uma respirada?',
        fraseStrong: 'Faça uma pausa curta!'
    },
    {
        modo : 'duracao-longa',
        frase: 'Hora de voltar à superfície.',
        fraseStrong: 'Faça uma pausa longa'
    }
]


focoBtn.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    alterarTitulo(frases,0)
    focoBtn.classList.add('active')
   
})

curtoBtn.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
   alterarTitulo(frases,1)
   curtoBtn.classList.add('active')
   
})

longoBtn.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
     alterarTitulo(frases,2)
     longoBtn.classList.add('active')
   

})

function alterarContexto(contexto){
    exibirTempo()
    botoesContexto.forEach((contexto) => contexto.classList.remove('active'))
    html.setAttribute('data-contexto', `${contexto}` )
    imagemHero.setAttribute('src', `imagens/${contexto}.png`)
}

function alterarTitulo(lista,index){
    tituloHero.innerHTML = ` <h1 class="app__title">
            ${lista[index].frase}<br>
            <strong class="app__title-strong">
                ${lista[index].fraseStrong}
            </strong>
        </h1>`

}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        //Criando evento personalizado (outras partes podem ouvir e reagir ao evendo, como o scriptCr)
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    exibirTempo()
}

botaoTemporizador.addEventListener('click', () => iniciarOuPausar())

//setInterval realiza um intervalo de milisegundos para realizar uma função
function iniciarOuPausar(){

    if(intervaloID){
        zerar()
        botaoIniciarPausar.textContent = 'Começar'
        iconePlayPause.setAttribute('src', 'imagens/play_arrow.png')
        return
    }
    intervaloID = setInterval(contagemRegressiva, 1000)
    somPlay.play()    
    botaoIniciarPausar.textContent = 'Pausar'
    iconePlayPause.setAttribute('src', 'imagens/pause.png')
    }


function zerar(){
    clearInterval(intervaloID)
    intervaloID = null
}

function exibirTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second:'2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}` 
    
}

btnConfiguracoes.addEventListener('click', () => {
    if(!exibindoConfiguracoes){
         configuracoes.classList.add('active')
         setaBtnConfiguracoes.classList.add('rotacionada')   
         exibindoConfiguracoes = true
    }else{
        configuracoes.classList.remove('active')
        setaBtnConfiguracoes.classList.remove('rotacionada')
        exibindoConfiguracoes = false
    }
    })

//alterando tempo alternativo
btnSalvarTempo.addEventListener('click', (event) => {
    event.preventDefault()
    tempoDecorridoEmSegundos = parseInt(timeConfiguracao.value) * 60
    if(isNaN(tempoDecorridoEmSegundos)  || tempoDecorridoEmSegundos < 0){
        alert('Digite um tempo válido em minutos')
        return
    }
    exibirTempo()
    
})


exibirTempo()