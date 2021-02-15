let windowPar = document.getElementById("window-par")
let button = document.getElementById("start-button")
let timer = document.getElementById("timer")
let needle = document.getElementById("needle")
let scoreDiv = document.getElementById("score")
let missedDiv = document.getElementById("missed")
let ballWidth = 45
let time = 30
let balls = []
let score = 0
let missed = 0
let playTime
let wind
let ballsIntervalTime = 800
button.onclick = start
function start() {
    let ballsInterval = setInterval(() => {
        let ball
        ball = document.createElement("div")
        ball.classList = "ball"
        let leftDist = Math.random() * (windowPar.clientWidth - ballWidth) + "px"
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        ball.style.left = leftDist
        ball.style.backgroundColor = "#" + randomColor
        ball.style.animationName = "ball"
        windowPar.appendChild(ball)
        balls.push(ball)
    }, ballsIntervalTime)
    setInterval(() => {
        let windRandom = Math.random()
        if (windRandom < 0.5) {
            windowPar.style.background = "linear-gradient(-90deg, white 80%, blue)"
            wind = windowPar.getBoundingClientRect().right - windowPar.getBoundingClientRect().left - 45
        } else {
            windowPar.style.background = "linear-gradient(90deg, white 80%, blue)"
            wind = 0
        }
    }, 3000)
    setInterval(() => {
        if (time >= 0) {
            timer.innerHTML = time + "sec"
            time--
        }
    }, 1000)
    playTime = setTimeout(() => clearInterval(ballsInterval), time * 1000)
}



let windowBoundaries = windowPar.getBoundingClientRect();
windowPar.addEventListener('mousemove', e => {
    neddlePosX = e.clientX - windowBoundaries.left
    needle.style.left = neddlePosX + "px"
    needlePos = needle.getBoundingClientRect()
})

setInterval(() => {
    balls.forEach(ball => {
        ball.style.left = wind + "px"
        // let duration = (windowPar.getBoundingClientRect().right - ball.getBoundingClientRect().x).toFixed(0)/100 + "s"
        ball.style["-webkit-transition-duration"] = "10s"
        ball.style["-webkit-transition-timing-function"] = "ease-out"
        if (isCollide(ball.getBoundingClientRect(), needlePos) === true) {
            ball.style.display = 'none';
            windowPar.removeChild(ball)
            score++
            scoreDiv.innerHTML = 'Score: ' + score
        } else if (ball.getBoundingClientRect().y === -291) {
            missed++
            missedDiv.innerHTML = 'Missed: ' + missed
            windowPar.removeChild(ball)
        }
    })
}, 100)

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}






