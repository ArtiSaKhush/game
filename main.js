//встроенный метод __.preventDefault() - предотвращает все действия в объекте, в к-м вызван этот метод
//встроенный метод __.value - получает значениe к-е мы записали в input
// setTimeout  - выполняет что-то всего 1 раз
// setInterval - работает так же как и setTimeout, но выполняет все бесконечно 
// document.createElement('') - создаёт элемент в HTML c тем тегом, что указан в аргументе
//Метод __.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим)
// __.append - говорит что появится внутри элемента
// __.target - возвращает тот эл-т на который мы нажимаем
// event.target.classList.contains('ball') - эл-т на к-й мы нажали содержит в себе класс ball


let input = document.querySelector('.input'),
    btn = document.querySelector('.btn'),
    timeOut = document.querySelector('.time'),
    box = document.querySelector('.game__box'),
    score = 0, //кол-во набранных очков
    time = 0, //время которое даётся для игры
    interval = 0; 

btn.addEventListener('click', (event)/* event - это объект, в к-м есть очень много полезных ключей */ => {
    event.preventDefault() //встроенный метод preventDefault() - предотвращает все действия в объекте, в к-м вызван этот метод
    if(input.value > 4){ //встроенный метод value - получает значение к-е мы записали в input
        time = input.value
        input.value = ''
        score = 0;
        clearInterval(interval) // очищает значение interval
        let result = document.querySelector('.result')
        if(result) {
            result.style.display = 'none'
        }
        start()
        
    } 
    
})
box.addEventListener('click', (event) => {
    if(event.target.classList.contains('ball')){ // event.target.classList.contains('ball') - эл-т на к-й мы нажали содержит класс ball
        score++
        event.target.remove()
        createBall()
    }
})
function start() {
    interval = setInterval(() => decrease(),1000)
    createBall()
}
function decrease() {
    if (time == 0) {
        endGame()
    }else {
        let currentTime = --time
        if(currentTime < 10) {
            currentTime = '0' + currentTime
        }
        timeOut.innerHTML = '00:' + currentTime
    }
}
function endGame() {
    box.innerHTML = `<h2 class='result'>Вы набрали ${score} очков</h2>`
}
function createBall() {
    let ball = document.createElement('div') //document.createElement('') - создаёт элемент в HTML c тем тегом, что указан в аргументе
    let size = random(20, 100)
    let cor = box.getBoundingClientRect(); //Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим)
    let x = random(0, cor.width - size)
    let y = random(0, cor.height - size)
    ball.classList.add('ball')
    ball.style.width = size + 'px'
    ball.style.height = size + 'px'
    ball.style.left = x + 'px'
    ball.style.top = y + 'px'
    ball.style.background = '#' + random(100000,999999)
    let rad = random(0,1)
    if(rad == 0) {
        ball.style.borderRadius = 0 + '%';
    }else if(rad == 1){
        ball.style.borderRadius = 50+ '%' ;  
    }
    
    box.append(ball) // __.append - говорит что появится внутри элемента
    
}
function random(min,max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
