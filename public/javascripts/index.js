var pool = document.getElementById('screen');
var banner = document.getElementById('banner');
var refresh = document.getElementById('newGame');
var resume = document.getElementById('resume');
var sound = document.getElementById('sound');
var w = window.innerWidth;
var h = window.innerHeight;
pool.height = h;
pool.width = w;
var context = new AudioContext;
var oscillator = context.createOscillator();
oscillator.connect(context.destination);
oscillator.frequency.value = 200;

var backcolor = 'rgba(0,0,0,0.3)'
window.onresize = function () {
    w = window.innerWidth;
    h = window.innerHeight;
    pool.height = h;
    pool.width = w;
}

var N = 5;
var Turns = 5;

score.innerHTML = 'Turns:' + Turns + ' -';
for (i = 0; i < N; i++) {
    var chrn = String.fromCharCode(65 + i);
    score.innerHTML += ' ' + chrn + ':0';
}
step = 0;
score = document.getElementById('score');
$ = pool.getContext('2d');
panim = {};
canim = {};
players = [];
for (i = 0; i < N; i++){    
    var newplayer = {
        x: Math.random() * round(w),
        y: Math.random() * round(h),
        dir: Math.floor((Math.random() * 4)),
        v: 0.2,
        body: [],
        flag: 0,
        score: 0
    };
    players.push(newplayer);

}


var foodcount = 0;
var temp = [];
for (i = 0; i < N; i++) temp[i] = players[i].v;
refresh.onclick = function () {
    location.reload();
}
resume.onclick = function () {
    banner.style.display = 'none';
    for (i = 0; i < players.length; i++) {
        players[i].v = temp[i];
    }

}
food = {
    x: Math.random() * round(w),
    y: Math.random() * round(h)
};
for (i = 0; i < players.length; i++) {
    snake = players[i];
    snake.body.push({
        x: snake.x,
        y: snake.y
    });
    snake.body[0].x = round(snake.x);
    snake.body[0].y = round(snake.y);
}

function update(snake) {

    switch (snake.dir) {
        case 0:
            snake.x += (snake.v * 10);
            break;
        case 1:
            snake.y -= (snake.v * 10);
            break;
        case 2:
            snake.x -= (snake.v * 10);
            break;
        case 3:
            snake.y += (snake.v * 10);
            break;
    }
    if (snake.x > round(w) - 10) {
        snake.x = 0 + 10;
        console.log(snake.x);
        //            resume.style.display = 'none';
        //            end();
        //            scoreCard();
    }
    if (snake.x < 10) {
        //            temp = snake.v;
        //            snake.v = 0;
        snake.x = round(w) - 10;
        console.log(snake.x)
            /*resume.style.display = 'none';
            end();
            scoreCard();*/
    }
    if (snake.y > round(h) - 10) {
        /*temp = snake.v;
        snake.v = 0;*/
        snake.y = 0 + 10;
        console.log(snake.y);
        /*resume.style.display = 'none';
        end();
        scoreCard();*/
    }
    if (snake.y < 10) {
        /*temp = snake.v;
        snake.v = 0;*/
        snake.y = round(h) - 10;
        console.log(snake.y);
        /*resume.style.display = 'none';
        end();
        scoreCard();*/
    }
    if (round(snake.body[0].x) == round(food.x) && round(snake.body[0].y) == round(food.y)) {
        gulp(snake);
    }
    if (round(snake.x) != snake.body[0].x || round(snake.y) != snake.body[0].y) {
        step++;
        snake.flag = 1;
        for (i = snake.body.length - 1; i > 0; i--) {
            snake.body[i].x = snake.body[i - 1].x;
            snake.body[i].y = snake.body[i - 1].y;
        }
    }
    snake.body[0].x = round(snake.x);
    snake.body[0].y = round(snake.y);
    for (i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
            snake.score = (snake.score / 1.1);
            panim = {
                color: snake.startColor,
                frames: 40,
                x: snake.body[0].x,
                y: snake.body[0].y
            };
            score.innerHTML = 'Turns:' + (Turns - foodcount) + ' -';
            for (j = 0; j < N; j++) {
                var chrn = String.fromCharCode(65 + j);
                score.innerHTML += ' ' + chrn + ':' + (Math.floor(players[j].score));
            }
        }
    }
}

function end() {
    oscillator.start(0);
    window.setTimeout(function () {
        oscillator.frequency.value = 146.75;
    }, 50);
    window.setTimeout(function () {
        oscillator.stop(0);
    }, 120);
}
score_count = 0;

function scoreCard() {
    window.setTimeout(function () {
        document.getElementById('scoreBoard').innerHTML = 'Score - '; //document.getElementById('score').innerHTML;
        for (i = 0; i < N; i++) {
            var chrn = String.fromCharCode(65 + i);
            document.getElementById('scoreBoard').innerHTML += chrn + ':' + (Math.floor(players[i].score)) + ' ';
        }
        banner.style.display = 'block';
    }, 500);
}

function gulp(snake) {
    panim = {
        color: snake.startColor,
        frames: 40,
        x: food.x,
        y: food.y
    };
    foodcount++;
    for (i = 0; i < N; i++) {
        players[i].v += 0.01;
    }
    //score.innerHTML = 'A:' + (players[1].body.length) + ' B:' + (players[0].body.length);
    if (foodcount == Turns) {
        for (i = 0; i < N; i++) {
            players[i].v = 0;
        }
        end();
        scoreCard();
    }
    food.x = (Math.random() * (round(w) - 100)) + 10;
    food.y = (Math.random() * (round(h) - 100)) + 10;
    for (i = 0; i < snake.body.length; i++) {
        if (food.x == snake.body[i].x && food.y == snake.body[i].y) {
            gulp(snake);
            return;
        }
    }
    snake.score = snake.score + foodcount;
    snake.body.push({
        x: -10,
        y: 0
    });

    score.innerHTML = 'Turns:' + (Turns - foodcount) + ' -';
    for (i = 0; i < N; i++) {
        var chrn = String.fromCharCode(65 + i);
        score.innerHTML += ' ' + chrn + ':' + (Math.floor(players[i].score));
    }
}

function round(tray) {
    return 10 * Math.floor(tray / 10);
}
refresh.onmouseover = function () {
    this.focus();
}
refresh.onmouseout = function () {
    this.blur();
}
resume.onmouseover = function () {
    this.focus();
}
resume.onmouseout = function () {
    this.blur();
}
resume.onkeypress = function (e) {
    if (e.keyCode == 32 || e.keyCode == 13) {
        this.click();
    }
}
refresh.onkeypress = function (e) {
    if (e.keyCode == 32 || e.keyCode == 13) {
        this.click();
    }
}

players[0].startColor = 0;
for (i = 1; i < N; i++) {
    var chiii = Math.floor(100 / N);
    if (chiii < 1) chiii = 1;
    players[i].startColor = players[i - 1].startColor + chiii;
}
//players[1].startColor = players[0].startColor + 25;

function draw(players, k) {
    snake = players[k];
    $.fillStyle = "hsla(" + ((snake.body.length + snake.startColor) * 5) + ",100%,100%,1)"
    $.fillRect(Math.floor(food.x / 10) * 10, Math.floor(food.y / 10) * 10, 10, 10);
    for (i = 0; i < snake.body.length; i++) {
        $.fillStyle = "hsla(" + ((i + snake.startColor) * 5) + ",100%,50%,0.25)";
        $.fillRect(snake.body[i].x, snake.body[i].y, 10, 10);
    }

    //for(i=0;i<panim.length;i++){
    anim = panim;
    if (anim.frames > 0) {
        $.fillStyle = 'hsla(' + (anim.color * 5) + ',100%,50%,' + (0.7 * (anim.frames / 100)) + ')';
        $.beginPath();
        $.arc(anim.x, anim.y, (anim.frames / 3), 0, 2 * Math.PI);
        $.closePath();
        $.fill();
        anim.frames--;
        //}
    }
    anim = canim;
    if (anim.frames > 0) {
        $.fillStyle = 'hsla(' + (anim.color * 5) + ',100%,50%,' + (0.7 * (anim.frames / 100)) + ')';
        $.beginPath();
        $.arc(anim.x, anim.y, (anim.frames / 3), 0, 2 * Math.PI);
        $.closePath();
        $.fill();
        anim.frames--;
        //}
    }

    update(snake);
    if (k < N - 1) draw(players, k + 1);
}
document.body.onkeydown = function (e) {
    switch (e.keyCode) {
        case 39:
            if (players[0].dir != 2 && players[0].flag == 1) {
                players[0].dir = 0;
                players[0].flag = 0;
            }
            break;
        case 38:
            if (players[0].dir != 3 && players[0].flag == 1) {
                players[0].dir = 1;
                players[0].flag = 0;
            }
            break;
        case 37:
            if (players[0].dir != 0 && players[0].flag == 1) {
                players[0].dir = 2;
                players[0].flag = 0;
            }
            break;
        case 40:
            if (players[0].dir != 1 && players[0].flag == 1) {
                players[0].dir = 3;
                players[0].flag = 0;
            }
            break;
        case 13:

            //players[0].v = players[0].v / 1.2;
            //players[0].flag = 0;

            break;
        case 68:
            if (players[1].dir != 2 && players[1].flag == 1) {
                players[1].dir = 0;
                players[1].flag = 0;
            }
            break;
        case 87:
            if (players[1].dir != 3 && players[1].flag == 1) {
                players[1].dir = 1;
                players[1].flag = 0;
            }
            break;
        case 65:
            if (players[1].dir != 0 && players[1].flag == 1) {
                players[1].dir = 2;
                players[1].flag = 0;
            }
            break;
        case 83:
            if (players[1].dir != 1 && players[1].flag == 1) {
                players[1].dir = 3;
                players[1].flag = 0;
            }
            break;
        case 32:

            //players[1].v = players[1].v / 1.2;
            //players[1].flag = 0;
            break;
        case 27:
            temp[0] = players[0].v;
            temp[1] = players[1].v;
            players[0].v = 0;
            players[1].v = 0;
            scoreCard();
    }
}

function init() {
    $.fillStyle = backcolor;
    $.fillRect(0, 0, w, h);
    /*for(i=0;i<N;i++)
    {
    	var currplayer=players[i];
    	draw(currplayer);
    }*/
    draw(players, 0);
    window.requestAnimationFrame(init);
}
init();


function changeval(userid, direct) {
    dirop = (direct + 2) % 4;
    if (players[userid].dir != dirop && players[userid].flag == 1) {
        players[userid].dir = direct;
        players[userid].flag = 0;
    }
}

function newsnake()
{
    var k=N;
    N++;
    
    var newplayer = {
        x: Math.random() * round(w),
        y: Math.random() * round(h),
        dir: Math.floor((Math.random() * 4)),
        v: 0.2,
        body: [],
        flag: 0,
        score: 0
    };
    players.push(newplayer);
    return k;
}