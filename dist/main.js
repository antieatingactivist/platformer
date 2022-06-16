(()=>{"use strict";class t{constructor(t){this.ctx=t,this.color="#000033"}update(t){this.xScrollOffset=t,this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.fillRect(0+this.xScrollOffset,0,1e3,480)}}class i{constructor(t,i,s,h){this.ctx=t,this.xScrollOffset=0,this.height=100,this.width=50,this.x=i+this.xScrollOffset,this.y=s,this.color="#ff0000",this.id=h}update(t){this.xScrollOffset=t,this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height)}}class s extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=1,this.width=e,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x+this.xScrollOffset,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height)}}class h extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=20,this.width=e,this.color="#ffff00"}}class e extends i{constructor(t,i,s,h){super(t,i,s,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[],this.objectStandingOn="none",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1);for(var i=0;i<this.yUpVelocity;i++)this.y--,this.checkObstacleCeilings()&&(this.yUpVelocity=0,this.longJumping=!1,this.shortJumping=!1);this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing?this.shortJump():this.longJumping&&this.shortJumping?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<5&&(this.xLeftVelocity+=.2)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<5&&(this.xRightVelocity+=.2)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}moveLeft(){for(let t of this.obstacles)t.x+t.width+t.xScrollOffset<this.x+this.xScrollOffset||t.y-t.height>this.y||this.y-this.height>t.y||this.x+this.xScrollOffset<t.x+t.xScrollOffset||t.height<=1?this.x-=Math.floor(this.xLeftVelocity):(this.x=t.x+t.width+t.xScrollOffset-this.xScrollOffset,this.xLeftVelocity=0)}moveRight(){for(let t of this.obstacles)t.x-this.width+t.xScrollOffset-1>this.x+this.xScrollOffset||t.y-t.height>this.y||this.y-this.height>t.y||this.x+this.xScrollOffset>t.x+t.xScrollOffset||t.height<=1?this.x+=Math.floor(this.xRightVelocity):(this.x=t.x-this.width+t.xScrollOffset-this.xScrollOffset-1,this.xRightVelocity=0)}bounce(){this.yUpVelocity=26,this.standing=!1}shortJump(){this.yUpVelocity=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}checkObstacleSurfaces(){const t=[this.y>=this.ctx.canvas.attributes.height.textContent-1];for(let i of this.obstacles){let s=this.y>=i.y-i.height-1&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&this.y<i.y;t.push(s),s&&i.isKillable&&i.isEnemy&&(i.isDead=!0,this.bounce())}return t.some((t=>t))}checkObstacleCeilings(){const t=[];for(let i of this.obstacles){let s=this.y-this.height==i.y&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&i.height>1;if(t.push(s),s&&i.isKillable&&i.isBreakableBrick){i.isDead=!0;break}}return t.some((t=>t))}moveDown(){for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="30px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}   ${this.xScrollOffset}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}   ${i.xScrollOffset}`,10,60+t),t+=30}}class o extends e{constructor(t,i,s,h){super(t,i,s,h),this.color="#ff00ff",this.isPlayer=!0}}class l extends e{constructor(t,i,s,h){super(t,i,s,h),this.isEnemy=!0,this.color="#ff0044",this.movingRight=!1,this.movingLeft=!0,this.xLeftVelocity=.2,this.xRightVelocity=.2}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}standUp(){this.height=50}moveLeft(){for(let t of this.obstacles)t.x+t.width+t.xScrollOffset<this.x+this.xScrollOffset||t.y-t.height>this.y||this.y-this.height>t.y||this.x+this.xScrollOffset<t.x+t.xScrollOffset||t.height<=1||t.id==this.id?this.x-=this.xLeftVelocity:(this.x=t.x+t.width+t.xScrollOffset-this.xScrollOffset,this.movingLeft=!1,this.movingRight=!0,t.isPlayer&&(t.isDead=!0))}moveRight(){for(let t of this.obstacles)t.x-this.width+t.xScrollOffset-1>this.x+this.xScrollOffset||t.y-t.height>this.y||this.y-this.height>t.y||this.x+this.xScrollOffset>t.x+t.xScrollOffset||t.height<=1||t.id==this.id?this.x+=this.xRightVelocity:(this.x=t.x-this.width+t.xScrollOffset-this.xScrollOffset-1,this.movingRight=!1,this.movingLeft=!0,t.isPlayer&&(t.isDead=!0))}}class c extends i{constructor(t,i,s,h){super(t,i,s,h),this.isBreakableBrick=!0,this.height=50,this.width=50,this.color="#880000",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y-=40,this.color="#555555"),this.render()}}const n=480;window.onload=function(){const i={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=n,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(p,20),this.garbageCollectionInterval=setInterval(v,5e3)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};let e;i.start();const f=[];let r,x=[],g=!1,a=0,y=0,d=0,u=0;function p(){u-=.5,d-=1,i.clear(),e.update(d);for(let t of f)t.update(u);for(let t of x)t.update(u),t.obstacles=[...f,...x,r];g&&a++,5==a&&(r.longJumping=!0),r.update(u),r.obstacles=[...f,...x]}function m(t,s,e){const o=new h(i.context,t,n-s,y,e);f.push(o),y++}function S(t,s){const h=new l(i.context,t,s,y);x.push(h),y++}function O(t,s){const h=new c(i.context,t,n-s,y);f.push(h),y++}function v(){x=x.filter((t=>!t.isDead))}e=new t(i.context),r=new o(i.context,20,459,y),y++,O(100,150),O(150,150),O(200,150),O(250,150),O(250,200),O(300,200),O(350,200),function(t,h,e){const o=new s(i.context,-100,460,y,6e3);f.push(o),y++}(),m(-100,40,100),m(1e3,40,100),S(800,430),S(900,430),S(970,430),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(r.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(r.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(r.crouching=!0)," "!=t.key||t.repeat||(g=!0,r.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(r.movingLeft=!1),"ArrowRight"==t.key&&(r.movingRight=!1),"ArrowDown"!=t.key||t.repeat||(r.crouching=!1)," "!=t.key||t.repeat||(g=!1,a=0,r.shortJumping=!1,r.longJumping=!1)}))}})();