import Background  from "./backgrounds/Background";
import levels from "./levels";

import {
    Floor, 
    Player, 
    Enemy, 
    BreakableBrick, 
    FloorWithBottom
} from "./sprites/";



const canvasWidth = 1000;
const canvasHeight = 480;



function main() {
    const gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
            this.garbageCollectionInterval = setInterval(clearUnusedSprites, 5000);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    gameArea.start();
    document.addEventListener('keydown', typeLetter);
    document.addEventListener('keyup', releaseLetter);
  
    let background;
    let allObstacles = [];
    let allEnemies = [];
    let player;
    let jumpPressed = false;
    let jumpDuration = 0;
    let spriteId = 0;
    let xScrollOffset = 0;

    
    //level select
    const levelObjects = levels[0](canvasHeight);  
    createLevel();



    function updateGameArea() {

        gameArea.clear();

        background.update(xScrollOffset);
        for (let obstacle of allObstacles) {
            obstacle.update(xScrollOffset);
        }
        for (let enemy of allEnemies) {
            enemy.update(xScrollOffset);
            enemy.obstacles = [...allObstacles, ...allEnemies, player];
        }
        if (jumpPressed) {
            jumpDuration++;
        }
        if (jumpDuration == 5) {
            player.longJumping = true;
        }
        
        xScrollOffset = player.update(xScrollOffset);

        player.obstacles = [...allObstacles, ...allEnemies];
    }
        
    function typeLetter(e) {
        if (e.key == "ArrowLeft" && !e.repeat) {
            player.movingLeft = true;
        }
        if (e.key == "ArrowRight" && !e.repeat) {
            player.movingRight = true;
        }
        if (e.key == "ArrowDown" && !e.repeat) {
            player.crouching = true;
        }
        if (e.key == " " && !e.repeat) {
            jumpPressed = true;
            player.shortJumping = true;
        }

    }

    function releaseLetter(e) {
        if (e.key == "ArrowLeft") {
            player.movingLeft = false;
        }
        if (e.key == "ArrowRight") {
            player.movingRight = false;
        }
        if (e.key == "ArrowDown") {
            player.crouching = false;
        }
        if (e.key == " ") {
            jumpPressed = false;
            jumpDuration = 0;
            player.shortJumping = false;
            player.longJumping = false;

        }
    }

    function createLevel() {
        Object.keys(levelObjects).forEach(key => {
            switch (key) {
                case "background": {
                    createBackground(levelObjects.background);
                    break;
                }
                case "player": {
                    createPlayer(...levelObjects.player);
                    break;
                }
                case "floors": {
                    for (let params of levelObjects.floors) {
                        createFloor(...params);
                    }
                    break;
                }
                case "floorsWithBottom": {
                    for (let params of levelObjects.floorsWithBottom) {
                        createFloorWithBottom(...params);
                    }
                    break;
                }
                case "breakableBricks": {
                    for (let params of levelObjects.breakableBricks) {
                        createBreakableBrick(...params);
                    }
                    break;
                }
                case "enemies": {
                    for (let params of levelObjects.enemies) {
                        createEnemy(...params);
                    }
                    break;
                }
            }
        });
    }

    

    function createBackground() {
        background = new Background(gameArea.context, 1);
    } 
    
    function createFloor(x,y,width) {
        const floor = new Floor(gameArea.context, x, canvasHeight-y, spriteId, width);
        allObstacles.push(floor);
        spriteId++;
    }
    function createFloorWithBottom(x,y,width) {
        const floor = new FloorWithBottom(gameArea.context, x, canvasHeight-y,spriteId, width);
        allObstacles.push(floor);
        spriteId++;
    }
    function createPlayer(x, y) {
        player = new Player(gameArea.context, x, y, spriteId);
        spriteId++;
    }
    function createEnemy(x,y) {
        const enemy = new Enemy(gameArea.context, x, y, spriteId);
        allEnemies.push(enemy);
        spriteId++;
    }
    function createBreakableBrick(x, y) {
        const brick = new BreakableBrick(gameArea.context, x, canvasHeight-y, spriteId)
        allObstacles.push(brick);
        spriteId++;
    }

    function clearUnusedSprites() {
        allEnemies = allEnemies.filter(enemy => !enemy.isDead);
        allObstacles = allObstacles.filter(obstacle => !obstacle.isDead);
    }
}



window.onload = main;