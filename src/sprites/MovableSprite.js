import Sprite from "./Sprite";

export default class MovableSprite extends Sprite {
    constructor(ctx, x, y, id) {
        super(ctx, x, y, id);
        this.movingLeft = false;
        this.movingRight = false;
        this.shortJumping = false;
        this.longJumping = false;
        this.standing = true;
        this.crouching = false;
        this.xLeftVelocity = 0;
        this.xRightVelocity = 0;
        this.yUpVelocity = 0;
        this.yDownVelocity = 0;
        this.obstacles = [];
        this.objectStandingOn = "none";
        this.isKillable = true;
        this.isDead = false;
    } 
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;

        if (this.isDead) {
            this.y+=10;
            this.color = "#555555";
            this.movingRight = false;
            this.movingLeft = false;
        }

        //falling
        else if ( !this.checkObstacleSurfaces() ) {
            this.standing = false;
            this.moveDown();
        }
        else if (this.yUpVelocity == 0) { 
            this.yDownVelocity = 0;
            this.standing = true;
        }
        
        //moving left
        if (this.movingLeft) {
            this.moveLeft();
        }
        //moving right
        if (this.movingRight) {
            this.moveRight();    
        }
        //crouching
        if (this.crouching) {
            this.crouch();
        }
        else {
            this.standUp();
        }        
        //render
        this.render();
        
    }    
    crouch() {
        this.height = 50; 
    }
    standUp() {
        this.height = 100;
    }
    moveLeft() {
        var obstacleInTheWay;
        for (let obstacle of this.obstacles) {
            if (!(
                obstacle.x+obstacle.width+obstacle.xScrollOffset < this.x+this.xScrollOffset ||
                obstacle.y-obstacle.height > this.y ||
                this.y-this.height > obstacle.y ||
                this.x+this.xScrollOffset < obstacle.x+obstacle.xScrollOffset ||
                obstacle.height <= 1 ||
                obstacle.id == this.id ||
                !obstacle.isObstacle
            )) {          
                obstacleInTheWay = obstacle;
            }
        }
        if (!obstacleInTheWay) this.x-=this.xLeftVelocity;
        else {
            if (this.isPlayer) {
                this.x = obstacleInTheWay.x+obstacleInTheWay.width;
                this.xLeftVelocity = 0;
                if (obstacleInTheWay.isEnemy) this.isDead = true;
            } else {
                this.movingLeft = false;
                this.movingRight = true;
                if (obstacleInTheWay.isPlayer) obstacleInTheWay.isDead = true;
            }
            
        }
 
    }
    moveRight() {
        var obstacleInTheWay;
        for (let obstacle of this.obstacles) {

            if (!(
                obstacle.x-this.width+obstacle.xScrollOffset-1 > this.x+this.xScrollOffset || 
                obstacle.y-obstacle.height > this.y ||
                this.y-this.height > obstacle.y ||
                this.x+this.xScrollOffset > obstacle.x+obstacle.xScrollOffset ||
                obstacle.height <= 1 ||
                obstacle.id == this.id ||
                !obstacle.isObstacle
            )) {          
                obstacleInTheWay = obstacle;
            }
        }
        if (!obstacleInTheWay) this.x+=this.xRightVelocity;
        else {
            if (this.isPlayer) {

                this.x = obstacleInTheWay.x-this.width-1;
                this.xRightVelocity = 0;
                if (obstacleInTheWay.isEnemy) this.isDead = true;
            } else {
                this.movingRight = false;
                this.movingLeft = true;
                if (obstacleInTheWay.isPlayer) obstacleInTheWay.isDead = true;
            }
        }
                
    }
    bounce() {
        this.yUpVelocity = 26;
        this.standing = false;  
    } 
    checkObstacleSurfaces() {
        //create surfaces array with floor in index 0
        const surfaces = [];
        //check every obstacle for top surfaces and push into surfaces array
        for (let obstacle of this.obstacles) {
            let isObstacleUnderneath = 
                this.y >= obstacle.y-obstacle.height-1 && 
                this.x+this.width+this.xScrollOffset >= obstacle.x+obstacle.xScrollOffset && 
                this.x+this.xScrollOffset < obstacle.x+obstacle.width+obstacle.xScrollOffset && 
                this.y < obstacle.y &&
                obstacle.isObstacle;

            surfaces.push(isObstacleUnderneath);

            if (isObstacleUnderneath && obstacle.isKillable) {
                if (obstacle.isEnemy || (this.isEnemy && obstacle.isPlayer)) {
                    obstacle.isDead = true;
                    this.bounce();
                }
            }

        }
        //if play is hitting any surface, return true
        return surfaces.some( (surface) => surface );
    }
    checkObstacleCeilings() {
        const ceilings = [];

        for (let obstacle of this.obstacles) {
            let isObstacleAbove =
                this.y-this.height == obstacle.y && 
                this.x+this.width+this.xScrollOffset >= obstacle.x+obstacle.xScrollOffset && 
                this.x+this.xScrollOffset < obstacle.x+obstacle.width+obstacle.xScrollOffset &&
                obstacle.height > 1 &&
                obstacle.isObstacle;

            ceilings.push(isObstacleAbove);
            
            if (isObstacleAbove && obstacle.isKillable && obstacle.isBreakableBrick) {
                obstacle.isDead = true;
                break; //loop exits once first brick is destroyed
            }
        }

        return ceilings.some( (ceilings) => ceilings);
    }
    moveDown() {
        //kill sprite if dropped below the bottom of the window
        if (this.y >= this.windowHeight) {
            this.isDead = true;
        }
        for (let i = 0; i < this.yDownVelocity; i++) {
            this.y++;
            if (this.checkObstacleSurfaces()) break;
        }
        if (this.yDownVelocity < 20) this.yDownVelocity++;
    }
        
}