const canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

canvas.width = window.innerWidth - 28
canvas.height = window.innerHeight - 70

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

let restor = []
let index = -1

let draw_color = 'black'
let draw_width = 2
let is_drawing = false

function change_color(ele) {
    draw_color = ele.style.backgroundColor
}

canvas.addEventListener('touchstart', start, false)
canvas.addEventListener('touchmove', draw, false)
canvas.addEventListener('mousedown', start, false)
canvas.addEventListener('mousemove', draw, false)

canvas.addEventListener('touchend', stop, false)
canvas.addEventListener('mouseup', stop, false)
canvas.addEventListener('mouseout', stop, false)

function start(e) {
    e.preventDefault()

    is_drawing = true
    context.beginPath()
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
}

function draw(e) {
    e.preventDefault()

    if (is_drawing) {
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
        context.strokeStyle = draw_color
        context.lineWidth = draw_width
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.stroke()
    }
}

function stop(e) {
    e.preventDefault()

    if (is_drawing) {
        context.stroke()
        context.closePath()
        is_drawing = false
    }

    if (e.type != 'mouseout') {
        restor.push(context.getImageData(0, 0, canvas.width, canvas.height))
        index += 1
    }
    console.log(restor)
}

function clear_canvas() {
    context.fillStyle = 'white'
    context.clearRect(0, 0, canvas.width, canvas.height)

    restor = []
    index = -1
}

function undo() {
    if (index <= 0) {
        clear_canvas()
    } else {
        index -= 1
        restor.pop()
        context.putImageData(restor[index], 0, 0)
    }
}