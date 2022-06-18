(()=>{"use strict";class t{constructor(t){this.ctx=t,this.height=480,this.width=2e3,this.color="#000033"}update(t){this.xScrollOffset=t%this.width/2,this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.fillRect(0+this.xScrollOffset,0,this.width,this.height),this.ctx.fillStyle="#333388dd",this.ctx.fillRect(200+this.xScrollOffset,100,100,60),this.ctx.fillRect(230+this.xScrollOffset,130,100,60),this.ctx.fillRect(1200+this.xScrollOffset,100,100,60),this.ctx.fillRect(1230+this.xScrollOffset,130,100,60)}}class i{constructor(t,i,s,h){this.ctx=t,this.xScrollOffset=0,this.height=100,this.width=50,this.x=i+this.xScrollOffset,this.y=s,this.color="#ff0000",this.id=h}update(t){return this.xScrollOffset=t,this.render(),0}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class s extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=1,this.width=e,this.color="#ffff00",this.bgHeight=20,this.bgColor="#003333"}render(){return this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(this.x+this.xScrollOffset,this.y,this.width,this.bgHeight),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),0}}class h extends i{constructor(t,i,s,h,e){super(t,i,s,h),this.height=20,this.width=e,this.color="#ffff00"}}class e extends i{constructor(t,i,s,h){super(t,i,s,h),this.movingLeft=!1,this.movingRight=!1,this.shortJumping=!1,this.longJumping=!1,this.standing=!0,this.crouching=!1,this.xLeftVelocity=0,this.xRightVelocity=0,this.yUpVelocity=0,this.yDownVelocity=0,this.obstacles=[],this.objectStandingOn="none",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}moveLeft(){var t;for(let i of this.obstacles)i.x+i.width+i.xScrollOffset<this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset<i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x+t.width,this.xLeftVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingLeft=!1,this.movingRight=!0,t.isPlayer&&(t.isDead=!0)):this.x-=this.xLeftVelocity}moveRight(){var t;for(let i of this.obstacles)i.x-this.width+i.xScrollOffset-1>this.x+this.xScrollOffset||i.y-i.height>this.y||this.y-this.height>i.y||this.x+this.xScrollOffset>i.x+i.xScrollOffset||i.height<=1||i.id==this.id||(t=i);t?this.isPlayer?(this.x=t.x-this.width-1,this.xRightVelocity=0,t.isEnemy&&(this.isDead=!0)):(this.movingRight=!1,this.movingLeft=!0,t.isPlayer&&(t.isDead=!0)):this.x+=this.xRightVelocity}bounce(){this.yUpVelocity=26,this.standing=!1}checkObstacleSurfaces(){const t=[];for(let i of this.obstacles){let s=this.y>=i.y-i.height-1&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&this.y<i.y;t.push(s),s&&i.isKillable&&((i.isEnemy||this.isEnemy&&i.isPlayer)&&(i.isDead=!0),this.bounce())}return t.some((t=>t))}checkObstacleCeilings(){const t=[];for(let i of this.obstacles){let s=this.y-this.height==i.y&&this.x+this.width+this.xScrollOffset>=i.x+i.xScrollOffset&&this.x+this.xScrollOffset<i.x+i.width+i.xScrollOffset&&i.height>1;if(t.push(s),s&&i.isKillable&&i.isBreakableBrick){i.isDead=!0;break}}return t.some((t=>t))}moveDown(){this.y>=this.ctx.canvas.attributes.height.textContent&&(this.isDead=!0);for(let t=0;t<this.yDownVelocity&&(this.y++,!this.checkObstacleSurfaces());t++);this.yDownVelocity<20&&this.yDownVelocity++}displayStats(){this.ctx.fillStyle=this.color,this.ctx.font="30px Arial",this.ctx.fillText(`(x) ${this.x} - ${this.x+this.width} (y) ${this.y} - ${this.y-this.height}   ${this.xScrollOffset}`,10,30);let t=0;for(let i of this.obstacles)this.ctx.fillStyle=i.color,this.ctx.fillText(`(x) ${i.x} - ${i.x+i.width} (y) ${i.y} - ${i.y-i.height}   ${i.xScrollOffset}`,10,60+t),t+=30}}class o extends e{constructor(t,i,s,h){super(t,i,s,h),this.color="#ff00ff",this.isPlayer=!0,this.offset=0}determineView(){return this.x>400&&(this.offset=-(this.x-400)),this.offset}update(t){this.xScrollOffset=t,this.isDead&&(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1);for(var i=0;i<this.yUpVelocity;i++)this.y--,this.checkObstacleCeilings()&&(this.yUpVelocity=0,this.longJumping=!1,this.shortJumping=!1);return this.yUpVelocity>0&&this.yUpVelocity--,this.shortJumping&&this.standing&&!this.isDead?this.shortJump():this.longJumping&&this.shortJumping&&this.yUpVelocity>0?this.fullJump():this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&(!this.crouching||this.yUpVelocity>0)?(this.moveLeft(),this.xLeftVelocity<20&&(this.xLeftVelocity+=1)):this.xLeftVelocity>0?(this.moveLeft(),this.xLeftVelocity--):this.xLeftVelocity=0,this.movingRight&&(!this.crouching||this.yUpVelocity>0)?(this.moveRight(),this.xRightVelocity<20&&(this.xRightVelocity+=1)):this.xRightVelocity>0?(this.moveRight(),this.xRightVelocity--):this.xRightVelocity=0,this.crouching?this.crouch():this.standUp(),this.render()}crouch(){this.height=50}standUp(){this.height=100}shortJump(){this.yUpVelocity=20,this.standing=!1}fullJump(){this.shortJumping=!1,this.standing=!1,this.yUpVelocity+=10,this.longJumping=!1}render(){return this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+this.xScrollOffset,this.y-this.height,this.width,this.height),this.determineView()}}class c extends e{constructor(t,i,s,h){super(t,i,s,h),this.isEnemy=!0,this.color="#ff0044",this.movingRight=!1,this.movingLeft=!0,this.xLeftVelocity=1,this.xRightVelocity=1}update(t){this.xScrollOffset=t,this.isDead?(this.y+=10,this.color="#555555",this.movingRight=!1,this.movingLeft=!1):this.checkObstacleSurfaces()?0==this.yUpVelocity&&(this.yDownVelocity=0,this.standing=!0):(this.standing=!1,this.moveDown()),this.movingLeft&&this.moveLeft(),this.movingRight&&this.moveRight(),this.crouching?this.crouch():this.standUp(),this.render()}standUp(){this.height=50}}class l extends i{constructor(t,i,s,h){super(t,i,s,h),this.isBreakableBrick=!0,this.height=50,this.width=50,this.color="#880000",this.isKillable=!0,this.isDead=!1}update(t){this.xScrollOffset=t,this.isDead&&(this.y-=40,this.color="#555555"),this.render()}}const r=480;window.onload=function(){const i={canvas:document.createElement("canvas"),start:function(){this.canvas.width=1e3,this.canvas.height=r,this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),this.interval=setInterval(m,20),this.garbageCollectionInterval=setInterval(b,5e3)},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}};let e;i.start(),document.addEventListener("keydown",(function(t){"ArrowLeft"!=t.key||t.repeat||(n.movingLeft=!0),"ArrowRight"!=t.key||t.repeat||(n.movingRight=!0),"ArrowDown"!=t.key||t.repeat||(n.crouching=!0)," "!=t.key||t.repeat||(g=!0,n.shortJumping=!0)})),document.addEventListener("keyup",(function(t){"ArrowLeft"==t.key&&(n.movingLeft=!1),"ArrowRight"==t.key&&(n.movingRight=!1),"ArrowDown"==t.key&&(n.crouching=!1)," "==t.key&&(g=!1,x=0,n.shortJumping=!1,n.longJumping=!1)}));let n,f=[],a=[],g=!1,x=0,y=0,d=0;const u={background:1,player:[20,459],floors:[[-100,20,6e3]],floorsWithBottom:[[-100,40,100],[1e3,40,100]],breakableBricks:[[100,150],[150,150],[200,150],[250,150],[250,200],[300,200],[350,200]],enemies:[[800,430],[920,430],[1030,430],[300,0]]};function m(){i.clear(),e.update(d);for(let t of f)t.update(d);for(let t of a)t.update(d),t.obstacles=[...f,...a,n];g&&x++,5==x&&(n.longJumping=!0),d=n.update(d),n.obstacles=[...f,...a]}function p(t,h,e){const o=new s(i.context,t,r-h,y,e);f.push(o),y++}function v(t,s,e){const o=new h(i.context,t,r-s,y,e);f.push(o),y++}function w(t,s){const h=new c(i.context,t,s,y);a.push(h),y++}function S(t,s){const h=new l(i.context,t,r-s,y);f.push(h),y++}function b(){a=a.filter((t=>!t.isDead)),f=f.filter((t=>!t.isDead))}Object.keys(u).forEach((s=>{switch(s){case"background":e=new t(i.context);break;case"player":!function(t,s){n=new o(i.context,t,s,y),y++}(...u.player);break;case"floors":for(let t of u.floors)p(...t);break;case"floorsWithBottom":for(let t of u.floorsWithBottom)v(...t);break;case"breakableBricks":for(let t of u.breakableBricks)S(...t);break;case"enemies":for(let t of u.enemies)w(...t)}}))}})();