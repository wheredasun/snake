const snakeColor = "rgba(0, 0, 0, 0.5)";
const bgColor = "rgba(0, 0, 0, 0.2)";
const fruitColor = "rgba(0, 0, 0, 0.8)";

var _direction = "RIGHT";
var direction = function(newDirection) {
    if (newDirection) {
        switch (newDirection) {
            case 'UP':
                _direction = "UP";
                break;
            case 'DOWN':
                _direction = "DOWN";
                break;
            case 'LEFT':
                _direction = "LEFT";
                break;
            case 'RIGHT':
                _direction = "RIGHT";
                break;
            default:
                throw new Error("Unknown direction:" +
                    "only UP, DOWN, LEFT and RIGHT values are allowed.");
        }
    }
    return _direction;
};

var px = 5;

const left = 37;
const up = 38;
const right = 39;
const down = 40;

var snake;

function init() {
    direction("RIGHT");
    snake = [[28, 30],[29, 30], [30, 30], [31, 30], [32, 30]];
    window.requestAnimationFrame(draw);
}

document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case up:
            if (direction() !== "DOWN") {
                direction("UP");
            } else {
                return;
            }
            break;
        case down:
            if (direction() !== "UP") {
                direction("DOWN");
            } else {
                return;
            }
            break;
        case left:
            if (direction() !== "RIGHT") {
                direction("LEFT");
            } else {
                return;
            }
            break;
        case right:
            if (direction() !== "LEFT") {
                direction("RIGHT");
            }
            else {
                return;
            }
            break;
    }
    window.requestAnimationFrame(draw);
});

function checkCollecting(snake) {
    var i, l = snake.length;
    var head = snake[l - 1];

    if (head[0] === fruit[0] && head[1] === fruit[1]) {
        c++;
        fruit = [Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)];
        return true;
    } else {
        snake.shift();
        return false;
    }
}

function checkLoseConditions(snake) {
    var i, l = snake.length;
    var head = snake[l - 1];
    for (i = 0; i < l - 1; i++) {
        if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
            alert("GAME OVER!");
            init();
        }
    }

    if (head[0] >= 60 || head[1] >= 60 || head[0] < 0 || head[1] < 0) {
        alert("GAME OVER!");
        init();
    }
}

var fruit = [Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)]
var t;
var c = 0; // collected
var createNew = true;

function draw() {
    clearTimeout(t);
    let ctx = document.getElementById("canvas").getContext("2d");

    ctx.clearRect(0, 0, 300, 300);
    ctx.save();

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 300, 300);
    ctx.save();

    var head = snake[snake.length - 1].slice();
    switch (direction()) {
        case "UP":
            head[1] -= 1;
            break;
        case "DOWN":
            head[1] += 1;
            break;
        case "RIGHT":
            head[0] += 1;
            break;
        case "LEFT":
            head[0] -= 1;
            break;
    }

    snake.push(head);

    if (createNew) {
        createNew = false;
    }

    createNew = checkCollecting(snake);

    ctx.fillStyle = snakeColor;
    var i, l = snake.length;
    for (i = 0; i < l; i += 1) {
        ctx.fillRect(snake[i][0] * px, snake[i][1] * px, px, px);
    }

    ctx.fillStyle = fruitColor;
    ctx.fillRect(fruit[0] * px, fruit[1] * px, px, px);

    checkLoseConditions(snake);

    var interval = 500 - c * px;
    if (interval < 0) {
        interval = 0;
    }

    t = setTimeout(function() {
        window.requestAnimationFrame(draw);
    }, interval);

    document.getElementById("score").innerText = c;
}

init();
