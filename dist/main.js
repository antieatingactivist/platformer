(()=>{"use strict";class t{constructor(t,i,s,h){this.ctx=t,this.xScrollOffset=0,this.height=100,this.width=50,this.x=i+this.xScrollOffset,this.y=s,this.color="#ff0000",this.id=h}update(t){this.xScrollOffset=t,this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height)}}class i extends t{constructor(t,i,s,h,e){super(t,i,s,h),this.height=1,this.width=e,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x+this.xScrollOffset,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height)}}class s extends t{constructor(t,i,s,h,e){super(t,i,s,h),this.height=20,this.width=e,this.color="#ffff00"}}class h extends t{constructor(t,i,s,h){super(t,i,s,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[],this.objectStandingOn="none",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1);for(var i=0;i<this.yUpVelocity;i++)this.y--,this.checkObstacleCeilings()&&(this.yUpVelocity=0,this.longJumping=!1,this.shortJumping=!1);this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing?this.shortJump():this.longJumping&&this.shortJumping?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<5&&(this.xLeftVelocity+=.2)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<5&&(this.xRightVelocity+=.2)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}moveLeft(){for(let t of this.obstacles)t.x+t.width+t.xScrollOffset<this.x+this.xScrollOffset||t.y-t.height>this.y||this.y-this.height>t.y||this.x+this.xScrollOffset<t.x+t.xScrollOffset||t.height<=1?this.x-=Math.floor(this.xLeftVelocity):(this.x=t.x+t.width+t.xScrollOffset-this.xScrollOffset,this.xLeftVelocity=0)}moveRight(){for(let t of this.obstacles)t.x-this.width+t.xScrollOffset-1>this.x+this.xScrollOffset||t.y-t.height>this.y||this.y-this.height>t.y||this.x+this.xScrollOffset>t.x+t.xScrollOffset||t.height<=1?this.x+=Math.floor(this.xRightVelocity):(this.x=t.x-this.width+t.xScrollOffset-this.xScrollOffset-1,this.xRightVelocity=0)}bounce(){this.yUpVelocity=26,this.standing=!1}shortJump(){this.yUpVelocity=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}checkObstacleSurfaces(){const t=[this.y>=this.ctx.canvas.attributes.height.textContent-1];for(let i of this.obstacles){let s=this.y>=i.y-i.height-1&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&this.y<i.y;t.push(s),s&&(this.objectStandingOn=i.id),this.ctx.fillText(this.objectStandingOn,840,100),s&&i.isKillable&&i.isEnemy&&(i.isDead=!0,this.bounce())}return t.some((t=>t))}checkObstacleCeilings(){const t=[];for(let i of this.obstacles){let s=this.y-this.height==i.y&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&i.height>1;if(t.push(s),s&&i.isKillable&&i.isBreakableBrick){i.isDead=!0;break}}return t.some((t=>t))}moveDown(){for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="30px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}   ${this.xScrollOffset}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}   ${i.xScrollOffset}`,10,60+t),t+=30}}class e extends h{constructor(t,i,s,h){super(t,i,s,h),this.color="#ff00ff",this.isPlayer=!0}}class o extends t{constructor(t,i,s,h){super(t,i,s,h),this.isBreakableBrick=!0,this.height=50,this.width=50,this.color="#880000",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y-=40,this.color="#555555"),this.render()}}const l=480;window.onload=function(){var t={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=l,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(a,20),this.garbageCollectionInterval=setInterval(d,5e3)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};t.start();const h=[];let c,n=[],r=!1,f=0,x=0;function a(){t.clear();for(let t of h)t.update(0);for(let t of n)t.update(0),t.obstacles=[...h,...n,c];r&&f++,5==f&&(c.longJumping=!0),c.update(0),c.obstacles=[...h,...n]}function g(i,e,o){const c=new s(t.context,i,l-e,x,o);h.push(c),x++}function y(i,s){const e=new o(t.context,i,l-s,x);h.push(e),x++}function d(){n=n.filter((t=>!t.isDead))}c=new e(t.context,20,459,x),x++,y(100,150),y(150,150),y(200,150),y(250,150),y(250,200),y(300,200),y(350,200),function(s,e,o){const l=new i(t.context,-100,460,x,6e3);h.push(l),x++}(),g(-100,40,100),g(1e3,40,100),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(c.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(c.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(c.crouching=!0)," "!=t.key||t.repeat||(r=!0,c.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(c.movingLeft=!1),"ArrowRight"==t.key&&(c.movingRight=!1),"ArrowDown"!=t.key||t.repeat||(c.crouching=!1)," "!=t.key||t.repeat||(r=!1,f=0,c.shortJumping=!1,c.longJumping=!1)}))}})();