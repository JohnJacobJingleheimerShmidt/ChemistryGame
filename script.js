//Pull Requests
//Provide goals for all six levels: 
//Level 1: Hydrogen and H2 Molecules, the first tutorial mission explianing the Game
//Level 2: Hydrogen and Oxygen, explaining combpound molecules. 
//Level 3: Hydrogen and Carbon
//Level 4: Carbon and Oxygen
//Level 5: Hydrogen, Carbon, Oxygen
//Level 6: Hydrogen and Nitrogen
//Level 7: Nitrogen and Oxygen
//Level 8: Hydrogen, Nitrogen, and Oxygen

const DEV_MODE = false;

//selects document
const stage = document.createElement('canvas'),
ctx = stage.getContext('2d'),
dialogue = document.querySelector('.dialogue'), 
startBtn = document.getElementById('start_button'),
//startBtn = dialogue.querySelector('button'),
hud = document.querySelector('.hud'),
scoreNode = hud.querySelector('.hud__score span');
stage.addEventListener("click", checkClick);
stage.addEventListener("mousemove", checkMove);

//initializes arrays for ship, lasers, and enemies
let ship,lasers = [],enemies = [],
playing = false,
gameStarted = false,
speedMultiplier,
enemySeedFrameInterval,
score = 0,
tick = 0,
laserTick = 0;

//sets initial conditions of inventory
let inv = {activeAmmo: "Hydrogen", ammoCounter: 1,
ammo1: "Hydrogen", ammo2: "Oxygen", hud: false, 
hydrogen: 10, hydrogenDisplayed: true, hydrogenPosition: 100,
nitrogen: 10, nitrogenDisplayed: true, nitrogenPosition: 130,
carbon: 10, carbonDisplayed: true, carbonposition: 160,
oxygen: 10, oxygenDisplayed: true, oxygenPosition: 190,
hydrogenMolecule: 10, hydrogenMoleculeDisplayed: false, 
hydrogenMoleculePosition: 180, oxygenMolecule: 10, 
oxygenMoleculeDisplayed: false, oxygenMoleculePosition: 180,
hydroxide: 10, hydroxideDisplayed: false, hydroxideMoleculePosition: 180,
water: 10, waterDisplayed: false, waterMoleculePosition: 180,
methane: 10, methaneDisplayed: false, methaneMoleculePosition: 180,
hydrogenMax: 30, hydrogenGoal: 30, hydrogenMoleculeGoal: 30, 
oxygenGoal: 30, oxygenMax: 30, oxygenMoleculeGoal: 30, 
nitrogenMax: 30, nitrogenGoal: 30, carbonMax: 30, carbonGoal: 30, 
ammoniaDisplayed: true, ammonia: 10, ammoniaPosition: 30, 
carbonDioxide: 10, 
feedBackText: "None", 
paused: false, pauseEnemySpeed: 0, pauseLaserSpeed: 0,
menuWidth: 200, missionBoxChecked: false, highlightedMission: 0, 
showVictoryScreen: false, showLevelSelect: true, 
activeMissionNumber: 0, missionObjectiveShown: false, missionObjectiveTimer: 0, 
levelSelectColor1: "blue", levelSelectColor2: "blue", levelSelectColor3: "blue", 
levelSelectColor4: "blue", levelSelectColor5: "blue", levelSelectColor6: "blue",
levelSelectWidth: 250, levelSelectHeight: 150,  
levelSelectX1: 20, levelSelectX2: 290, 
levelSelectY1: 20, levelSelectY2: 200, levelSelectY3: 380, 
};

function clearAllDisplay(){
	//gronk
	inv.hydrogenDisplayed = false; inv.hydrogenMoleculeDisplayed = false; 
	inv.waterDisplayed = false;
	inv.oxygenDisplayed = false; inv.oxygenMoleculeDisplayed = false;
	inv.nitrogenDisplayed = false;
	inv.hydroxideDisplayed = false;
	inv.carbonDisplayed = false;
	inv.carbonDioxideDisplayed = false; 
	inv.methaneDisplayed = false;
	inv.ammoniaDisplayed = false; 
}	
function setPosition(mol1, mol2, mol3){
	var activeMolecule1 = mol1; 
	var activeMolecule2 = mol2; 
	var activeMolecule3 = mol3; 
}
function randomBetween(min, max) { //creates random number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcScore(x) { // calculates score (not used)
  return Math.floor(1 / x * 500);
}
//checks clicks for level select
function checkMove(event){
	const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	const i = inv.menuWidth; 
	
	const m1_X1 = inv.menuWidth + inv.levelSelectX1;
	const m1_Y1 = inv.levelSelectY1;
	const m1_X2 = inv.levelSelectWidth;
	const m1_Y2 = inv.levelSelectHeight; 
	
	const m2_X1 = inv.menuWidth + inv.levelSelectX1;
	const m2_Y1 = inv.levelSelectY2;
	const m2_X2 = inv.levelSelectWidth;
	const m2_Y2 = inv.levelSelectHeight;
	
	const m3_X1 = inv.menuWidth + inv.levelSelectX1;
	const m3_Y1 = inv.levelSelectY3;
	const m3_X2 = inv.levelSelectWidth;
	const m3_Y2 = inv.levelSelectHeight;
	
	const m4_X1 = inv.menuWidth + inv.levelSelectX2;
	const m4_Y1 = inv.levelSelectY1;
	const m4_X2 = inv.levelSelectWidth;
	const m4_Y2 = inv.levelSelectHeight;
	
	const m5_X1 = inv.menuWidth + inv.levelSelectX2;
	const m5_Y1 = inv.levelSelectY2;
	const m5_X2 = inv.levelSelectWidth;
	const m5_Y2 = inv.levelSelectHeight;
	
	const m6_X1 = inv.menuWidth + inv.levelSelectX2;
	const m6_Y1 = inv.levelSelectY3;
	const m6_X2 = inv.levelSelectWidth;
	const m6_Y2 = inv.levelSelectHeight;
	
	const o1_X1 = (inv.menuWidth + 200);
	const o1_Y1 = inv.levelSelectY3;
	const o1_X2 = inv.levelSelectWidth;
	const o1_Y2 = inv.levelSelectHeight;
	
	if(inv.missionObjectiveShown == true){
		inv.missionObjectiveShown = false;
	}
	if(inv.paused == true && x>m1_X1 && y>m1_Y1 && x<(m1_X1+m1_X2) && y<(m1_Y1+m1_Y2)){
		inv.levelSelectColor1 = "purple";
		inv.highlightedMission = 1;
		inv.missionObjectiveShown = true;
	}else{
		inv.levelSelectColor1 = "blue";
		if(inv.level1Victory){
			inv.levelSelectColor1 = "green";
		}
	}
	
	if(inv.paused == true && x>m2_X1 && y>m2_Y1 && x<(m2_X1+m2_X2) && y<(m2_Y1+m2_Y2)){
		inv.levelSelectColor2 = "purple";
		inv.highlightedMission = 2;
		inv.missionObjectiveShown = true;
	}else{
		inv.levelSelectColor2 = "blue";
		if(inv.level2Victory){
			inv.levelSelectColor2 = "green";
		}
	}
	
	if(inv.paused == true && x>m3_X1 && y>m3_Y1 && x<(m3_X1+m3_X2) && y<(m3_Y1+m3_Y2)){
		inv.levelSelectColor3 = "purple"; 
		inv.highlightedMission = 3;
		inv.missionObjectiveShown = true;
	}else{
		inv.levelSelectColor3 = "blue";
		if(inv.level3Victory){
			inv.levelSelectColor3 = "green";
		}
	}
	
	if(inv.paused == true && x>m4_X1 && y>m4_Y1 && x<(m4_X1+m4_X2) && y<(m4_Y1+m4_Y2)){
		inv.levelSelectColor4 = "purple"; 
		inv.highlightedMission = 4;
		inv.missionObjectiveShown = true;
	}else{
		inv.levelSelectColor4 = "blue";
		if(inv.level4Victory){
			inv.levelSelectColor4 = "green";
		}
	}
	
	if(inv.paused == true && x>m5_X1 && y>m5_Y1 && x<(m5_X1+m5_X2) && y<(m5_Y1+m5_Y2)){
		inv.levelSelectColor5 = "purple"; 
		inv.highlightedMission = 5;
		inv.missionObjectiveShown = true;
	}else{
		inv.levelSelectColor5 = "blue";
		if(inv.level5Victory){
			inv.levelSelectColor5 = "green";
		}
	}
	
	if(inv.paused == true && x>m6_X1 && y>m6_Y1 && x<(m6_X1+m6_X2) && y<(m6_Y1+m6_Y2)){
		inv.levelSelectColor6 = "purple"; 
		inv.highlightedMission = 6;
		inv.missionObjectiveShown = true; 
	}else{
		inv.levelSelectColor6 = "blue";
		if(inv.level6Victory){
			inv.levelSelectColor6 = "green";
		}
	}
}

//checks clicks for level select
function checkClick(event){
	const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	const i = inv.menuWidth; 
	
	const m1_X1 = inv.menuWidth + inv.levelSelectX1;
	const m1_Y1 = inv.levelSelectY1;
	const m1_X2 = inv.levelSelectWidth;
	const m1_Y2 = inv.levelSelectHeight; 
	
	const m2_X1 = inv.menuWidth + inv.levelSelectX1;
	const m2_Y1 = inv.levelSelectY2;
	const m2_X2 = inv.levelSelectWidth;
	const m2_Y2 = inv.levelSelectHeight;
	
	const m3_X1 = inv.menuWidth + inv.levelSelectX1;
	const m3_Y1 = inv.levelSelectY3;
	const m3_X2 = inv.levelSelectWidth;
	const m3_Y2 = inv.levelSelectHeight;
	
	const m4_X1 = inv.menuWidth + inv.levelSelectX2;
	const m4_Y1 = inv.levelSelectY1;
	const m4_X2 = inv.levelSelectWidth;
	const m4_Y2 = inv.levelSelectHeight;
	
	const m5_X1 = inv.menuWidth + inv.levelSelectX2;
	const m5_Y1 = inv.levelSelectY2;
	const m5_X2 = inv.levelSelectWidth;
	const m5_Y2 = inv.levelSelectHeight;
	
	const m6_X1 = inv.menuWidth + inv.levelSelectX2;
	const m6_Y1 = inv.levelSelectY3;
	const m6_X2 = inv.levelSelectWidth;
	const m6_Y2 = inv.levelSelectHeight;
	
	const o1_X1 = (inv.menuWidth + 200);
	const o1_Y1 = 30;
	const o1_X2 = 400;
	const o1_Y2 = 300;
	/*
	if(inv.missionObjectiveShown == true){
		if(inv.paused == true && x>o1_X1 && y>o2_Y1 && x<(o3_X1+m6_X2) && y<(o4_Y1+m6_Y2)){
			inv.missionObjectiveShown = false;
		}
		inv.missionObjectiveShown = false;
	}
	*/
	if(inv.showLevelSelect == true){
		if(inv.paused == true && x>m1_X1 && y>m1_Y1 && x<(m1_X1+m1_X2) && y<(m1_Y1+m1_Y2)){
			startLevel1();
		}
		
		if(inv.paused == true && x>m2_X1 && y>m2_Y1 && x<(m2_X1+m2_X2) && y<(m2_Y1+m2_Y2)){
			startLevel2();
		}
		
		if(inv.paused == true && x>m3_X1 && y>m3_Y1 && x<(m3_X1+m3_X2) && y<(m3_Y1+m3_Y2)){
			startLevel3();
		}
		
		if(inv.paused == true && x>m4_X1 && y>m4_Y1 && x<(m4_X1+m4_X2) && y<(m4_Y1+m4_Y2)){
			startLevel4();
		}
		
		if(inv.paused == true && x>m5_X1 && y>m5_Y1 && x<(m5_X1+m5_X2) && y<(m5_Y1+m5_Y2)){
			startLevel5();
		}
		
		if(inv.paused == true && x>m6_X1 && y>m6_Y1 && x<(m6_X1+m6_X2) && y<(m6_Y1+m6_Y2)){
			startLevel6();
		}
	}
	if(inv.showVictoryScreen == true){
		inv.showVictoryScreen = false; 
		inv.showLevelSelect = true; 
	}
}

function startLevel1(){
	//starts conditions for level 1 
	//COMBINING HYDROGEN
	inv.activeMissionNumber = 1; inv.missionObjectiveShown = true;
	speedMultiplier = 1; inv.hud = true; 
	enemySeedFrameInterval = 100;
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	inv.paused = false;
	enemies = []; lasers = [];
	clearAllDisplay();
	inv.hydrogenDisplayed = true; inv.hydrogenPosition = 30;
	inv.hydrogenMoleculeDisplayed = true; inv.hydrogenMoleculePosition = 60; 
	inv.hydrogenMax = 100; inv.hydrogenGoal = 12;
	inv.hydrogenMoleculeGoal = 12; 
	inv.activeAmmo = "Hydrogen"; inv.ammoCounter = 1; inv.ammoCounterMax = 1;
	inv.ammo1 = "Hydrogen";
	ship.active = true; gameStarted = true;
}
function startLevel2(){
	//starts conditions for level 2 
	//OXYGEN AND HYDROGEN
	inv.activeMissionNumber = 2; inv.missionObjectiveShown = true;
	speedMultiplier = 1; inv.hud = true; 
	enemySeedFrameInterval = 100;
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	inv.paused = false;
	enemies = []; lasers = [];
	clearAllDisplay();
	inv.hydrogenDisplayed = true; inv.hydrogenPosition = 30; inv.hydrogenGoal = 12, 
	inv.hydrogenMoleculeDisplayed = true; inv.hydrogenMoleculePosition = 60; inv.hydrogenMoleculeGoal = 12; 
	inv.oxygenDisplayed = true; inv.oxygenPosition = 90; inv.oxygenGoal = 12; 
	inv.oxygenMoleculeDisplayed = true; inv.oxygenMoleculePosition = 120; inv.oxygenMoleculeGoal=12, 
	//inv.hydroxideDisplayed = true; inv.hydroxidePosition = 150;
	inv.waterDisplayed = true; inv.waterPosition = 150;
	inv.activeAmmo = "Hydrogen"; inv.ammoCounter = 1; inv.ammoCounterMax = 2;
	inv.hydrogenGoal = 12, inv.oxygenGoal = 12, inv.waterGoal = 12, 
	inv.ammo1 = "Hydrogen"; inv.ammo2="Oxygen"; 
	//inv.ammo3="Hydrogen Molecule"; inv.ammo4= "Oxygen Molecule"; inv.ammo5="Hydroxide"; inv.ammo6= "Water";
	ship.active = true; gameStarted = true;
}
function startLevel3(){
	//starts conditions for level 3
	//CARBON AND HYDROGEN
	inv.activeMissionNumber = 3; inv.missionObjectiveShown = true; inv.missionObjectiveTimer = 0;
	speedMultiplier = 1; inv.hud = true; 
	enemySeedFrameInterval = 100;
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	inv.paused = false;
	ship.active = true;
	enemies = []; lasers = [];
	clearAllDisplay();
	inv.hydrogenDisplayed = true; inv.hydrogenPosition = 30; inv.hydrogenGoal = 12; 
	inv.carbon = 10; inv.carbonDisplayed = true; inv.carbonPosition = 60; inv.carbonGoal = 12; 
	inv.methaneDisplayed = true; inv.methanePosition = 90; inv.methaneGoal = 12, 
	inv.activeAmmo = "Hydrogen"; inv.ammoCounter = 1; inv.ammoCounterMax = 2;
	inv.ammo1 = "Hydrogen"; inv.ammo2="Carbon"; 
	//inv.ammo3="Hydrogen Molecule"; inv.ammo4= "Oxygen Molecule"; inv.ammo5="Hydroxide"; inv.ammo6= "Water";
	gameStarted = true;
}

function startLevel4(){
	//starts conditions for level 4
	//Hydrogen and Nitrogen
	inv.activeMissionNumber = 4; inv.missionObjectiveShown = true; 
	inv.missionObjectiveTimer = 0; speedMultiplier = 1;
	enemySeedFrameInterval = 100; inv.hud = true; 
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	inv.paused = false; ship.active = true;
	enemies = []; lasers = [];
	clearAllDisplay();
	inv.nitrogenDisplayed = false; inv.hydrogenDisplayed = false;
	inv.carbon = 10; inv.carbonDisplayed = true; inv.carbonPosition = 60; inv.carbonGoal = 12; 
	inv.oxygen = 10; inv.oxygenDisplayed = true; inv.oxygenPosition = 90; inv.oxygenGoal = 12; 
	inv.carbonDioxide = 10; inv.carbonDioxideDisplayed = true; 
	inv.carbonDioxidePosition = 120; inv.carbonDioxideGoal = 12; 
	inv.activeAmmo = "Carbon"; inv.ammoCounter = 1; inv.ammoCounterMax = 2;
	inv.ammo1="Carbon"; inv.ammo2="Oxygen";
	//inv.ammo4= "Oxygen Molecule"; inv.ammo5="Hydroxide"; inv.ammo6= "Water";
	gameStarted = true;
}

function startLevel5(){
	//starts conditions for level 5
	speedMultiplier = 1; inv.activeMissionNumber = 5; inv.missionObjectiveShown = true; 
	enemySeedFrameInterval = 100; inv.hud = true; 
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	inv.paused = false;	
	ship.active = true; 
	clearAllDisplay();
	inv.oxygenDisplayed = true; inv.oxygenPosition = 60; inv.oxygenGoal = 12; 
	inv.hydrogenDisplayed = true; inv.hydrogenPosition = 30; inv.hydrogenGoal = 12; 
	inv.carbonDisplayed = true; inv.carbonPosition = 90; inv.carbonGoal = 12; 
	inv.carbonDioxideDisplayed = true; inv.carbonDioxidePosition = 120; inv.carbonDioxideGoal = 12; 
	inv.activeAmmo = "Carbon"; inv.ammoCounter = 1; inv.ammoCounterMax = 2;
	inv.ammo1="Carbon"; inv.ammo2="Oxygen";
	enemies = []; lasers = [];
	gameStarted = true;
}

function startLevel6(){
	//starts conditions for level 6
	//NEED TO ADD NITROGEN GOAL
	speedMultiplier = 1; inv.activeMissionNumber = 6; inv.missionObjectiveShown = true; 
	enemySeedFrameInterval = 100; inv.hud = true; 
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	inv.paused = false;	
	ship.active = true; 
	clearAllDisplay();
	inv.hydrogenDisplayed = true; inv.hydrogenPosition = 60; inv.hydrogenGoal = 12; 
	inv.nitrogenDisplayed = true; inv.nitrogenPosition = 30; inv.nitrogenGoal = 12; 
	inv.ammoniaDisplayed = true; inv.ammoniaPosition = 120; inv.ammoniaGoal = 12; 
	inv.activeAmmo = "Hydrogen"; inv.ammoCounter = 1; inv.ammoCounterMax = 2;
	inv.ammo1="Hydrogen"; inv.ammo2="Nitrogen";
	enemies = []; lasers = [];
	gameStarted = true;
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}

function changeAmmoUp(){  //Cycles through different ammo types	
	console.log("active ammo: "+ inv.ammo2);
	console.log("ammoCounter: "+ inv.ammoCounter);
	console.log("ammoCounterMax: "+ inv.ammoCounterMax);
	if (inv.ammoCounter == 1 && inv.ammoCounterMax > inv.ammoCounter){
		inv.ammoCounter += 1;
		inv.activeAmmo = inv.ammo2;
		return
	}
	if (inv.ammoCounter == 2 && inv.ammoCounterMax > inv.ammoCounter){
		inv.ammoCounter += 1;
		inv.activeAmmo = inv.ammo3;
		return
	}
	if (inv.ammoCounter == 3 && inv.ammoCounterMax > inv.ammoCounter){
		inv.ammoCounter += 1;
		inv.activeAmmo = inv.ammo4;
		return
	}
	if (inv.ammoCounter == 4 && inv.ammoCounterMax > inv.ammoCounter){
		inv.ammoCounter += 1;
		inv.activeAmmo = inv.ammo5;
		return
	}
	if (inv.ammoCounter == 5 && inv.ammoCounterMax > inv.ammoCounter){
		inv.ammoCounter = 1;
		inv.activeAmmo = inv.ammo1;
		return
	}
	else if (inv.ammoCounter = inv.ammoCounterMax){
		inv.ammoCounter = 1;
		inv.activeAmmo = inv.ammo1;
		return
	}
}

function Ship(options) { //defines the ships properties
  this.radius = 15;
  this.x = options.x || stage.width * .5 - this.radius - .5 + inv.menuWidth/2;
  this.y = options.y || stage.height - this.radius - 30;
  this.width = this.radius * 4;
  this.height = this.width;
  this.color = options.color || 'red';
  this.left = false;
  this.right = false;
  this.speed = 10;
  this.active = true;

  document.addEventListener('keydown', this.onKeyDown.bind(this));
  document.addEventListener('keyup', this.onKeyUp.bind(this));
}

Ship.prototype.update = function (x) { //updates the ship position
  this.x = x;
  this.y = stage.height - this.radius - 30;
};

Ship.prototype.draw = function () { //the drawing function of the ship
  ctx.save();

  if (DEV_MODE) {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }

  ctx.fillStyle = this.color;
  ctx.fillRect(this.x + this.radius + 10, this.y, 10, this.radius);
  ctx.fillRect(this.x, this.y + this.radius, this.width, 10);
  ctx.fillRect(this.x, this.y + this.radius + 10, 10, 5);
  ctx.fillRect(this.x + this.width - 10, this.y + this.radius + 10, 10, 5);
  ctx.restore();
};

Ship.prototype.onKeyDown = function (e) {
  	if (e.keyCode == 86){ //press v
		pauseGame(e);
	}
  if (ship.active) {
    if (e.keyCode === 39) this.right = true;else
    if (e.keyCode === 37) this.left = true;

    if (e.keyCode == 32 && !this.shooting) { //when spacebar is pressed, shoot laser
      this.shooting = true;
      laserTick = 0;
    }
	if (e.keyCode == 67){ //press c
		changeAmmoUp();
	}
  }
};

Ship.prototype.onKeyUp = function (e) {
  if (e.key === 'ArrowRight') this.right = false;else
  if (e.key === 'ArrowLeft') this.left = false;else
  if (e.keyCode == 32) this.shooting = false;
};

function Laser(options) { //determines laser properties 
  this.x = options.x - .5;
  this.y = options.y || stage.height - 50;
  this.radius = options.radius;
  this.width = this.radius*2;
  this.height = this.radius*2;
  this.speed = 15;
  this.color = options.color || 'white';
  this.name = options.name;
  this.active = true;
}

Laser.prototype.update = function (y) {
  this.y = y;
};

Laser.prototype.draw = function () { //draws laser
  if (DEV_MODE) {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

function Enemy(name, radius, color) { //intializes enmy objects
  this.name = name; //chemical name 
  this.radius = radius;
  this.width = this.radius * 2;
  this.height = this.width;
  this.x = randomBetween(0+inv.menuWidth, stage.width - this.width);
  this.y = -this.radius * 2;
  this.color = color;
  this.speed = 2;
  this.active = true;
  this.dimolecule = false;
}

Enemy.prototype.update = function (x, y) { //updates enemy position
  this.x = x;
  this.y = y;
};

Enemy.prototype.draw = function (){ //drawing function for enemies
  if (DEV_MODE) {
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  if(this.dimolecule){
	  ctx.arc(this.x + 2*this.radius2, this.y + this.radius2, this.radius2, 0, Math.PI * 2);
	  ctx.closePath();
	  ctx.fill();
  }
  else if(this.dimoleculeUneven){
	  ctx.arc(this.x + 4*this.radius2, this.y + this.radius2, this.radius2, 0, Math.PI * 2);
	  ctx.closePath();
	  ctx.fill();
  }
  else if(this.trimolecule){
	  ctx.arc(this.x + 4*this.radius2, this.y + this.radius2, this.radius2, 0, Math.PI * 2);
	  ctx.closePath();
	  ctx.fill();
	  ctx.arc(this.x +0.25*this.radius3, this.y + this.radius3, this.radius3, 0, Math.PI * 2);
	  ctx.closePath();
	  ctx.fill();
  };
  ctx.restore();
};

function hitTest(item1, item2) { //general collision code used for all collisions
  let collision = true;
  if (
  item1.x > item2.x + item2.width ||
  item1.y > item2.y + item2.height ||
  item2.x > item1.x + item1.width ||
  item2.y > item1.y + item1.height)
  {
    collision = false;
  }
  return collision;
}

function handleLaserCollision() { //TAB LASER COLLISION
  for (let enemy of enemies) {   //checks each object in enemy array vs the laser array
    for (let laser of lasers) {
      let collision = hitTest(laser, enemy);
      if (collision && laser.active) {
		if (enemy.name == "Hydrogen" && laser.name == "Hydroxide"){
			enemy.name = "Water"; 
			enemy.color = "blue";
			enemy.radius = 30;
			enemy.width = 30;
			enemy.height = 30;
			inv.feedBackText = "Water created";
		}
		else if (enemy.name == "Hydroxide" && laser.name == "Hydrogen"){
			enemy.name = "Water"; 
			enemy.color = "blue";
			enemy.radius = 30;
			enemy.radius2 = 15;
			enemy.radius3 = 15;
			enemy.dimolecule = false; enemy.dimoleculeUneven = false;
			enemy.trimolecule = true; 
			inv.feedBackText = "Water created";
		}
		else if (enemy.name == "Hydrogen" && laser.name == "Hydrogen"){
			enemy.name = "Hydrogen Molecule"; 
			enemy.color = "white";
			enemy.radius = 15;
			enemy.radius2 = 15;
			enemy.dimolecule = true;
			inv.feedBackText = "H2 created";
		}
		else if (enemy.name == "Hydrogen" && laser.name == "Oxygen"){
			enemy.name = "Hydroxide"; 
			enemy.color = "orange";
			enemy.radius = 30;
			enemy.radius2 = 15;
			enemy.dimoleculeUneven = true;				
			inv.feedBackText = "Hydroxide created";
		}
		else if (enemy.name == "Oxygen" && laser.name == "Hydrogen"){
			enemy.name = "Hydroxide"; 
			enemy.color = "orange";
			enemy.radius = 30;
			enemy.radius2 = 15;
			enemy.dimoleculeUneven = true;			
			inv.feedBackText = "Hydroxide created";
		}
		else if (enemy.name == "Oxygen" && laser.name == "Oxygen"){
			enemy.name = "Oxygen Molecule"; 
			enemy.color = "red";
			enemy.radius = 30;
			enemy.radius2 = 30;
			enemy.dimolecule = true;
			inv.feedBackText = "O2 created";
		}
		else if (enemy.name == "Oxygen Molecule" && laser.name == "Carbon"){
			enemy.name = "Carbon Dioxide"; 
			enemy.color = "red";
			enemy.radius = 30;
			enemy.radius2 = 20;
			enemy.radius3 = 30;
			enemy.dimolecule = true;
			inv.feedBackText = "O2 created";
		}
		else if (enemy.name == "Carbon" && laser.name == "Carbon"){
			enemy.name = "Diatomic Carbon"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 20;
			enemy.dimolecule = true;
			inv.feedBackText = "Diatomic Carbon";
		}
		else if (enemy.name == "Carbon" && laser.name == "Hydrogen"){
			enemy.name = "Carbyne"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 15;
			enemy.dimolecule = true;
			inv.feedBackText = "Carbyne created";
		}
		else if (enemy.name == "Hydrogen" && laser.name == "Carbon"){
			enemy.name = "Carbyne"; 
			enemy.color = "grey";
			enemy.radius = 15;
			enemy.radius2 = 20;
			enemy.dimolecule = true;
			inv.feedBackText = "Carbyne created";
		}
		else if (enemy.name == "Carbyne" && laser.name == "Hydrogen"){
			enemy.name = "Methylene"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 15;
			enemy.radius3 = 15;
			enemy.dimolecule = false; enemy.dimoleculeUneven = false;
			enemy.trimolecule = true; 
			inv.feedBackText = "Methylene created";
		}
		else if (enemy.name == "Hydrogen" && laser.name == "Carbyne"){
			enemy.name = "Methylene"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 15;
			enemy.radius3 = 15;
			enemy.dimolecule = false; enemy.dimoleculeUneven = false;
			enemy.trimolecule = true; 
			inv.feedBackText = "Methylene created";
		}
		else if (enemy.name == "Carbyne" && laser.name == "Carbyne"){
			enemy.name = "Alkyne"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 20;
			enemy.dimolecule = true;
			inv.feedBackText = "Alkyne created";
		}
		else if (enemy.name == "Methylene" && laser.name == "Hydrogen"){
			enemy.name = "Methanide"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 30;
			enemy.radius3 = 20;
			enemy.trimolecule = true;
			inv.feedBackText = "Methanide created";
		}
		else if (enemy.name == "Hydrogen" && laser.name == "Methylene"){
			enemy.name = "Methanide"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 30;
			enemy.radius3 = 20;
			enemy.trimolecule = true;
			inv.feedBackText = "Methanide created";
		}
		else if (enemy.name == "Methanide" && laser.name == "Hydrogen"){
			enemy.name = "Methane"; 
			enemy.color = "black";
			enemy.radius = 30;
			enemy.radius2 = 30;
			enemy.radius3 = 30;
			enemy.dimolecule = true;
			inv.feedBackText = "Methane created";
		}
		else if (enemy.name == "Hydrogen" && laser.name == "Methanide"){
			enemy.name = "Methane"; 
			enemy.color = "red";
			enemy.radius = 30;
			enemy.radius2 = 30;
			enemy.dimolecule = true;
			inv.feedBackText = "Methane created";
		}
		else if (enemy.name == "Carbon" && laser.name == "Oxygen"){
			enemy.name = "Carbon Monoxide"; 
			enemy.color = "red";
			enemy.radius = 30;
			enemy.radius2 = 30;
			enemy.dimolecule = true;
			inv.feedBackText = "Carbon Monoxide created";
		}
		else if (enemy.name == "Oxygen" && laser.name == "Carbon"){
			enemy.name = "Carbon Monoxide"; 
			enemy.color = "grey";
			enemy.radius = 30;
			enemy.radius2 = 30;
			enemy.dimolecule = true;
			inv.feedBackText = "Carbon Monoxide created";
		}
		else if(enemy.name == "Carbon Monoxide" && laser.name == "Oxygen"){
			enemy.name = "Carbon Dioxide"; 
			enemy.color = "grey";
			enemy.radius = 20;
			enemy.radius2 = 30;
			enemy.radius3 = 30;
			enemy.dimolecule = false; enemy.dimoleculeUneven = false;
			enemy.trimolecule = true;
			inv.feedBackText = "Carbon Dioxide created";
		}
		//gronk
		else if (enemy.name == "Nitrogen" && laser.name == "Hydrogen"){
			enemy.name = "NH Ion"; 
			enemy.color = "skyblue";
			enemy.radius = 30;
			enemy.radius2 = 15;
			enemy.dimolecule = true; 
			inv.feedBackText = "NH created";
		}
		else if (enemy.name == "NH Ion" && laser.name == "Hydrogen"){
			enemy.name = "NH2 Ion"; 
			enemy.color = "skyblue";
			enemy.radius = 30;
			enemy.radius2 = 15;
			enemy.radius3 = 15;
			enemy.dimolecule = false; enemy.dimoleculeUneven = false;
			enemy.trimolecule = true; 
			inv.feedBackText = "NH2 created";
		}
		else if (enemy.name == "NH2 Ion" && laser.name == "Hydrogen"){
			enemy.name = "Ammonia"; 
			enemy.color = "skyblue";
			enemy.radius = 30;
			enemy.radius2 = 20;
			enemy.radius3 = 20;
			enemy.dimolecule = false; enemy.dimoleculeUneven = false;
			enemy.trimolecule = true; 
			inv.feedBackText = "Ammonia created";
		}
		laser.active = false;
		// increase enemy speed and frequency of enemy spawns
		speedMultiplier += .025;
		if (enemySeedFrameInterval > 20) {
		  enemySeedFrameInterval -= 2;
		}
      }
    }
  }
}

function handleShipCollision() { 
  // check for collisions between ship and enemies TAB COLLISION
  if (enemies.length) {
    for (let enemy of enemies) {
		let collision = hitTest(ship, enemy);
		if (collision && enemy.name == "Hydrogen") {
			enemy.active = false;
			inv.hydrogen += 1;
		}
		else if (collision && enemy.name == "Oxygen") {
			enemy.active = false;
			inv.oxygen += 1;	
		}
		if (collision && enemy.name == "Hydroxide") {
			enemy.active = false;
			inv.hydroxide += 1;
		}
		if (collision && enemy.name == "Hydrogen Molecule") {
			enemy.active = false;
			inv.hydrogenMolecule += 1;
		}
		if (collision && enemy.name == "Oxygen Molecule") {
			enemy.active = false;
			inv.oxygenMolecule += 1;
		}
		if (collision && enemy.name == "Water") {
			enemy.active = false;
			inv.water += 1;
		}
		if (collision && enemy.name == "Carbon") {
			enemy.active = false;
			inv.carbon += 1;
		}
		if (collision && enemy.name == "Diatomic Carbon") {
			enemy.active = false;
			inv.diatomicCarbon += 1;
		}
		if (collision && enemy.name == "Carbon Monoxide") {
			enemy.active = false;
			inv.carbonMonoxide += 1;
		}
		if (collision && enemy.name == "Carbon Dioxide") {
			enemy.active = false;
			inv.carbonDioxide += 1;
		}
		if (collision && enemy.name == "Nitrogen") {
			enemy.active = false;
			inv.nitrogen += 1;
		}
		if (collision && enemy.name == "Ammonia") {
			enemy.active = false;
			inv.ammonia += 1;
		}
		if (collision && enemy.name == "Carbyne") {
			enemy.active = false;
			inv.carbyne += 1;
		}
		if (collision && enemy.name == "Methylene") {
		enemy.active = false;
		inv.methylene += 1;
		}
		if (collision && enemy.name == "Methanide") {
			enemy.active = false;
			inv.methanide += 1;
		}
		if (collision && enemy.name == "Methane") {
			enemy.active = false;
			inv.methane += 1;
		}
		else if (collision && enemy.name == "Carbon Dioxide") {
			enemy.active = false;
			inv.methane += 1;
		}
    }
  }
}

function drawHUD(){ //Renders the heads up display text
	var ctx = stage.getContext("2d");
		ctx.fillStyle = 'purple';
		ctx.fillRect(0,0,inv.menuWidth,stage.height)
	if (inv.hydrogenDisplayed && inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Hydrogen: "+ inv.hydrogen+"/"+inv.hydrogenGoal, 10, inv.hydrogenPosition);
	}
	if (inv.oxygenDisplayed && inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Oxygen: "+ inv.oxygen+"/"+inv.oxygenGoal, 10, inv.oxygenPosition);
	}
	if (inv.hydrogenMoleculeDisplayed && inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("H2 Molecule: "+ inv.hydrogenMolecule+"/"+inv.hydrogenMoleculeGoal, 10, inv.hydrogenMoleculePosition);
	}
	if (inv.oxygenMoleculeDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("O2 Molecule: "+ inv.oxygenMolecule+"/"+inv.oxygenMoleculeGoal, 10, inv.oxygenMoleculePosition);
	}
	if (inv.hydroxideDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Hydroxide: "+ inv.hydroxide+"/"+inv.hydrogenMoleculeGoal, 10, inv.hydroxidePosition);
	}
	if (inv.waterDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Water: "+ inv.water+"/"+inv.waterGoal, 10, inv.waterPosition);
	}
	if (inv.carbonDisplayed && inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Carbon: "+ inv.carbon+"/"+inv.carbonGoal, 10, inv.carbonPosition);
	}
	if (inv.carbonMonoxideDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Carbon Monoxide: "+ inv.carbonMonoxide+"/"+inv.carbonMonoxideGoal, 10, inv.carbonMonoxidePosition);
	}
	if (inv.carbonDioxideDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("CO2: "+ inv.carbonDioxide+"/"+inv.carbonDioxideGoal, 10, inv.carbonDioxidePosition);
	}
	if (inv.c2IonDioxideDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("CO2: "+ inv.c2Ion+"/"+inv.c2IonGoal, 10, inv.c2IonPosition);
	}
	if (inv.carbyneDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Carbyne: "+ inv.carbyne+"/"+inv.carbyneGoal, 10, inv.carbynePosition);
	}
	if (inv.methyleneDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Methylene: "+ inv.methylene+"/"+inv.methyleneGoal, 10, inv.methylenePosition);
	}
	if (inv.methanideDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Methanide: "+ inv.methanide+"/"+inv.methanideGoal, 10, inv.methanidePosition);
	}
	if (inv.methaneDisplayed){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Methane: "+ inv.methane+"/"+inv.methaneGoal, 10, inv.methanePosition);
	}
	if (inv.nitrogenDisplayed && inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Nitrogen: "+ inv.nitrogen+"/"+inv.nitrogenGoal, 10, inv.nitrogenPosition);
	}
	if (inv.ammoniaDisplayed && inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Ammonia: "+ inv.ammonia+"/"+inv.ammoniaGoal, 10, inv.ammoniaPosition);
	}
	if(inv.hud == true){
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Ammo: "+ inv.activeAmmo, 10, 550);
	}
}

function drawFeedBack(text){
	if(inv.hud == true){
		var ctx = stage.getContext("2d");
		ctx.font = "20px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Message: "+ inv.feedBackText, 10, 520);
	}
}

function drawShip(xPosition) { //renders ships on screen
  if (ship.active) {
    ship.update(xPosition);
    ship.draw();
  }
}

function drawEnemies() {  //renders molecules
  if (enemies.length) {
    for (let enemy of enemies) {
      // draw an enemy if it's active
      if (enemy.active) {
        enemy.update(enemy.x, enemy.y += enemy.speed * speedMultiplier);
        enemy.draw();
      }
    }
  }
}

function enemyCleanup() { //removes enemies when offscreen
  if (enemies.length) {
    enemies = enemies.filter(enemy => {
      let visible = enemy.y < stage.height + enemy.width;
      let active = enemy.active === true;
      return visible && active;
    });
  }
}

function drawLasers() { //renders lasers if there are lasers in array
  if (lasers.length) {
    for (let laser of lasers) {
      if (laser.active) {
        laser.update(laser.y -= laser.speed);
        laser.draw();
      }
    }
  }
}

function laserCleanup() { //removes lasers from array when off screen
  lasers = lasers.filter(laser => {
    let visible = laser.y > -laser.height;
    let active = laser.active === true;
    return visible && active;
  });
}

function restartGame(e){
	// reset the demo/intro/game to the actual game settings:
	speedMultiplier = 1;
	enemySeedFrameInterval = 100;
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	ship.active = true;
	enemies = []; 
	lasers = [];
	gameStarted = true;
}

function pauseGame(e){
	if(inv.paused == false){
		ship.active = false;
		if (lasers.length) {
		for (let laser of lasers) {
		  if (laser.active) {
			inv.pauseLaserSpeed = laser.speed;
			laser.speed = 0;
				}
			}
		}
		if (enemies.length) {
		for (let enemy of enemies){
		  if (enemy.active) {
			inv.pauseEnemySpeed = enemy.speed;  
			enemy.speed = 0;
				}
			}
		}
		inv.paused = true;
		return
	}
	
	if(inv.paused){
		if (lasers.length) {
		for (let laser of lasers){
		  if (laser.active) {
			laser.speed = inv.pauseLaserSpeed;
				}
			}
		}
		if (enemies.length) {
		for (let enemy of enemies) {
		  if (enemy.active) {
			enemy.speed = inv.pauseEnemySpeed;
				}
			}
		}
		ship.active = true;
		inv.paused = false;
	}
}

function renderVictoryScreen(){ //renders the victory screen when victory conditions are met
	if (inv.paused == true && inv.showVictoryScreen == true){
		var x1 = 300; var y1 = 100; 
		var w = 400; var h = 400; var radii = 5; 
		ctx.fillStyle = "green";
		ctx.beginPath();
		//ctx.fillRect(inv.menuWidth+x1, y1, w, h);
		ctx.roundRect(inv.menuWidth+x1, y1, w, h, radii);
		ctx.fill();
		ctx.font = "18px Arial";
		ctx.fillStyle = 'orange';
		ctx.fillText("Victory! Chemicals will be added to storage.", inv.menuWidth + x1+20, y1+30);
		ctx.fillText("Press button to continue", inv.menuWidth + x1+20, y1+60);
	}	
}

function renderPauseMenu(){ //Press V for PAUSE //Gronk
	var x1 = inv.levelSelectX1; var x2 = inv.levelSelectX2; 
	var y1 = inv.levelSelectY1; var y2 = inv.levelSelectY2; var y3 = inv.levelSelectY3; 
	var y4 = inv.levelSelectY4; var y5 = inv.levelSelectY5; var y6 = inv.levelSelectY6;
	var h = inv.levelSelectHeight; var w = inv.levelSelectWidth; var radii = 5; 
	console.log("render pause menu"); 
	if (inv.paused == true && inv.showVictoryScreen == true){
		renderVictoryScreen(); 
	}
	if(inv.missionObjectiveShown==true && inv.showVictoryScreen == false){
		renderMissionObjective(); 
	}
	if(inv.paused && inv.showLevelSelect ==true && inv.showVictoryScreen == false){
		if (inv.paused){
			ctx.beginPath(); 
			ctx.fillStyle = inv.levelSelectColor1;
			//ctx.fillRect(inv.menuWidth+x1, y1, w, h);
			ctx.roundRect(inv.menuWidth+x1, y1, w, h, radii);
			ctx.fill();
			ctx.font = "20px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 1: ", inv.menuWidth + x1+20, y1+30);
			ctx.fillText("Hydrogen", inv.menuWidth + x1+20, y1+60);
		}	
		if (inv.paused){
			ctx.beginPath(); 
			ctx.fillStyle = inv.levelSelectColor2;
			ctx.roundRect(inv.menuWidth+x1, y2, w, h, radii);
			ctx.fill(); 
			//ctx.fillRect(inv.menuWidth + x1, y2, w, h);
			ctx.font = "20px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 2: ", inv.menuWidth + x1+20, y2+30);
			ctx.fillText("Hydrogen and Oxygen", inv.menuWidth + x1+20, y2+60);
		}	
		if (inv.paused){
			ctx.beginPath(); 
			ctx.fillStyle = inv.levelSelectColor3;
			//ctx.fillRect(inv.menuWidth + x1, y3, w, h);	
			ctx.roundRect(inv.menuWidth+x1, y3, w, h, radii);
			ctx.fill(); 
			ctx.font = "20px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 3: ", inv.menuWidth + x1+20, y3+30);
			ctx.fillText("Hydrogen and Carbon", inv.menuWidth + x1+20, y3+60);
		}	
		if (inv.paused){
			ctx.beginPath(); 
			ctx.fillStyle = inv.levelSelectColor4;
			//ctx.fillRect(inv.menuWidth + x2, y1, w, h);
			ctx.roundRect(inv.menuWidth+x2, y1, w, h, radii);
			ctx.fill(); 
			ctx.font = "20px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 4: ", inv.menuWidth + x2+20, y1+30);
			ctx.fillText("Carbon and Oxygen", inv.menuWidth + x2+20, y1+60);
		}	
		if (inv.paused){
			ctx.beginPath(); 
			ctx.fillStyle = inv.levelSelectColor5;
			//ctx.fillRect(inv.menuWidth + x2, y2, w, h);
			ctx.roundRect(inv.menuWidth+x2, y2, w, h, radii);
			ctx.fill(); 
			ctx.font = "20px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 5:", inv.menuWidth + x2+20, y2+30);
			ctx.fillText("Hydrogen, Carbon, and", inv.menuWidth + x2+20, y2+60);
			ctx.fillText("Oxygen", inv.menuWidth + x2+20, y2+90);
		}	
		if (inv.paused){
			ctx.beginPath(); 
			ctx.fillStyle = inv.levelSelectColor6;
			//ctx.fillRect(inv.menuWidth + x2, y3, w, h);
			ctx.roundRect(inv.menuWidth+x2, y3, w, h, radii);
			ctx.fill(); 
			ctx.font = "20px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 6:", inv.menuWidth + x2+20, y3+30);
			ctx.fillText("Hydrogen and Nitrogen", inv.menuWidth + x2+20, y3+60);
		}
	}	
}

function renderMissionObjective(){ //gronk
	var x1 = 560; var y1 = 30; var radii = 5; 
	var objectiveWidth = 480; var objectiveHeight = 500; 
	if(inv.showLevelSelect == true){	
		if(inv.highlightedMission == 1){
			var ctx = stage.getContext("2d");
			//shows the mission objective when the player hovers over level select
			ctx.beginPath(); 
			ctx.fillStyle = 'blue';
			//ctx.fillRect(inv.menuWidth + x1, 30, objectiveWidth, objectiveHeight);
			ctx.roundRect(inv.menuWidth+x1, y1, objectiveWidth, objectiveHeight, radii);
			ctx.fill();
			ctx.font = "18px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 1: Hydrogren Atoms and Molecules", inv.menuWidth + x1+20, 60);
			ctx.fillRect(inv.menuWidth + x1+20, 65, 335, 2); //underlines text
			ctx.font = "16px Arial";
			ctx.fillText("Captain, we need to replenish our hydrogen fuel reserves!", inv.menuWidth + x1+20, 90, );
			ctx.fillText("Fortunately, hydrogen is the most abundant element in the ", inv.menuWidth + x1+20, 120, );
			ctx.fillText("universe. Collect the hydrogen atoms and combine them into ", inv.menuWidth + x1+20, 150, );
			ctx.fillText("more stable H2 molecules by firing them at one another.", inv.menuWidth + x1+20, 180, );
			ctx.fillText("Mission Goals", inv.menuWidth + x1+20, 240);
			ctx.fillRect(inv.menuWidth + x1+20, 245, 200, 2); //underlines text
			ctx.fillText("Collect 50 hydrogen atoms", inv.menuWidth + x1+20, 270);
			ctx.fillText("Collect 50 hydrogen molecules", inv.menuWidth + x1+20, 300);
		}

		if(inv.highlightedMission == 2){
			var ctx = stage.getContext("2d"); 
			ctx.beginPath(); 
			ctx.fillStyle = 'blue';
			//ctx.fillRect(inv.menuWidth + x1, 30, objectiveWidth, objectiveHeight);
			ctx.roundRect(inv.menuWidth+x1, y1, objectiveWidth, objectiveHeight, radii);
			ctx.fill();
			ctx.font = "18px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 2: Hydrogren and Oxygen", inv.menuWidth + x1+20, 60);
			ctx.fillRect(inv.menuWidth + x1+20, 65, 335, 2); //underlines text
			ctx.font = "16px Arial";
			ctx.fillText("Our water reserves have been depleted, but with the hydrogen", inv.menuWidth + x1+20, 90, );
			ctx.fillText("gathered in the previous mission, we can create water molecules", inv.menuWidth + x1+20, 120, );
			ctx.fillText("if we combine oxygen with two hydrogen atoms, replenishing our", inv.menuWidth + x1+20, 150, );
			ctx.fillText("water supplies for our crew and hydroponics.", inv.menuWidth + x1+20, 180, );
			ctx.fillText("Mission Goals", inv.menuWidth + x1+20, 240);
			ctx.fillRect(inv.menuWidth + x1+20, 245, 200, 2); //underlines text
			ctx.fillText("Collect 100 hydrogen atoms", inv.menuWidth + x1+20, 270);
			ctx.fillText("Collect 50 oxygen atoms", inv.menuWidth + x1+20, 300);
			ctx.fillText("Collect 50 water molecules", inv.menuWidth + x1+20, 330);
		}
		if(inv.highlightedMission == 3){
			var ctx = stage.getContext("2d"); 
			ctx.beginPath(); 
			ctx.fillStyle = 'blue';
			//ctx.fillRect(inv.menuWidth + x1, 30, objectiveWidth, objectiveHeight);
			ctx.roundRect(inv.menuWidth+x1, y1, objectiveWidth, objectiveHeight, radii);
			ctx.fill();
			ctx.font = "18px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 3: Hydrogren and Carbon", inv.menuWidth + x1+20, 60);
			ctx.fillRect(inv.menuWidth + x1+20, 65, 335, 2); //underlines text
			ctx.font = "16px Arial";
			ctx.fillText("In order to grow food and reinforce the carbon fiber in the", inv.menuWidth + x1+20, 90, );
			ctx.fillText("ships hull, we will need to collect carbon from nearby asteroids.", inv.menuWidth + x1+20, 120);
			ctx.fillText("Combine the carbon with hydrogen to create methane so ", inv.menuWidth + x1+20, 150)
			ctx.fillText("we can use it as fuel and to create organic molecules.", inv.menuWidth + x1+20, 180);
			ctx.fillText("Mission Goals", inv.menuWidth + x1+20, 240);
			ctx.fillRect(inv.menuWidth + x1+20, 245, 200, 2); //underlines text
			ctx.fillText("Collect 100 hydrogen atoms", inv.menuWidth + x1+20, 270);
			ctx.fillText("Collect 50 carbon atoms", inv.menuWidth + x1+20, 300);
			ctx.fillText("Collect 50 methane molecules", inv.menuWidth + x1+20, 330);
		}
		if(inv.highlightedMission == 4){
			var ctx = stage.getContext("2d"); 
			ctx.beginPath(); 
			ctx.fillStyle = 'blue';
			//ctx.fillRect(inv.menuWidth + x1, 30, objectiveWidth, objectiveHeight);
			ctx.roundRect(inv.menuWidth+x1, y1, objectiveWidth, objectiveHeight, radii);
			ctx.fill();
			ctx.font = "18px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 4: Carbon and Oxygen", inv.menuWidth + x1+20, 60);
			ctx.fillRect(inv.menuWidth + x1+20, 65, 335, 2); //underlines text
			ctx.font = "16px Arial";
			ctx.fillText("In order to grow more food for our crew, we need to gather", inv.menuWidth + x1+20, 90, );
			ctx.fillText("more carbon dioxide. The oxygen and carbon can be used to ", inv.menuWidth + x1+20, 120, );
			ctx.fillText("increase crop yields and then recycled for breathable oxygen", inv.menuWidth + x1+20, 150, );
			ctx.fillText("and other carbon-based molecules.", inv.menuWidth + x1+20, 180);
			ctx.fillText("Mission Goals", inv.menuWidth + x1+20, 240);
			ctx.fillRect(inv.menuWidth + x1+20, 245, 200, 2); //underlines text
			ctx.fillText("Collect 100 hydrogen atoms", inv.menuWidth + x1+20, 270);
			ctx.fillText("Collect 50 carbon atoms", inv.menuWidth + x1+20, 300);
			ctx.fillText("Collect 50 carbon dioxide molecules", inv.menuWidth + x1+20, 330);	
		}
		if(inv.highlightedMission == 5){
			var ctx = stage.getContext("2d"); 
			ctx.beginPath(); 
			ctx.fillStyle = 'blue';
			//ctx.fillRect(inv.menuWidth + x1, 30, objectiveWidth, objectiveHeight);
			ctx.roundRect(inv.menuWidth+x1, y1, objectiveWidth, objectiveHeight, radii);
			ctx.fill();
			ctx.font = "18px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 5: Carbon, Hydrogen, and Oxygen", inv.menuWidth + x1+20, 60);
			ctx.fillRect(inv.menuWidth + x1+20, 65, 335, 2); //underlines text
			ctx.font = "16px Arial";
			ctx.fillText("All life, at least from planet earth, is based on carbon.", inv.menuWidth + x1+20, 90, );
			ctx.fillText("It also hydrogen, oxygen, and water. Lets top of our supplies", inv.menuWidth + x1+20, 120, );
			ctx.fillText("before we head to the next sector. ", inv.menuWidth + x1+20, 150, );
			ctx.fillText("Mission Goals", inv.menuWidth + x1+20, 240);
			ctx.fillRect(inv.menuWidth + x1+20, 245, 200, 2); //underlines text
			ctx.fillText("Collect 100 hydrogen atoms", inv.menuWidth + x1+20, 270);
			ctx.fillText("Collect 50 oxygen atoms", inv.menuWidth + x1+20, 300);
			ctx.fillText("Collect 50 water molecules", inv.menuWidth + x1+20, 330);	
		}
		if(inv.highlightedMission == 6){
			var ctx = stage.getContext("2d"); 
			ctx.beginPath(); 
			ctx.fillStyle = 'blue';
			//ctx.fillRect(inv.menuWidth + x1, 30, objectiveWidth, objectiveHeight);
			ctx.roundRect(inv.menuWidth+x1, y1, objectiveWidth, objectiveHeight, radii);
			ctx.fill();
			ctx.font = "18px Arial";
			ctx.fillStyle = 'orange';
			ctx.fillText("Level 6: Hydrogren and Nitrogen", inv.menuWidth + x1+20, 60);
			ctx.fillRect(inv.menuWidth + x1+20, 65, 335, 2); //underlines text
			ctx.font = "16px Arial";
			ctx.fillText("For several important chemical compounds, such as fertilizer,", inv.menuWidth + x1+20, 90, );
			ctx.fillText("medicines, and even explosives, we require nitrogen. Collect", inv.menuWidth + x1+20, 120, );
			ctx.fillText("some nitrogen and hydrogen for our scientists.", inv.menuWidth + x1+20, 150, );
			ctx.fillText("Mission Goals", inv.menuWidth + x1+20, 240);
			ctx.fillRect(inv.menuWidth + x1+20, 245, 200, 2); //underlines text
			ctx.fillText("Collect 50 hydrogen atoms", inv.menuWidth + x1+20, 270);
			ctx.fillText("Collect 50 nitrogen atoms", inv.menuWidth + x1+20, 300);
			ctx.fillText("Collect 50 ammonia molecules", inv.menuWidth + x1+20, 330);	
		}
	}
}
function updateChemStorage(){ //updates 
	inv.hydrogenStorage += inv.hydrogen; 
	inv.hydrogen = 10; 
	inv.hydrogenMoleculeStorage += inv.hydrogenMolecule; 
	inv.hydrogenMolecule = 10; 
	inv.oxygenStorage += inv.oxygen; 
	inv.oxygen= 10; 
	inv.oxygenMoleculeStorage += inv.oxygenMolecule; 
	inv.oxygenMolecule = 10; 
	inv.carbonStorage += inv.carbon; 
	inv.carbon = 10; 
	inv.carbonDioxideStorage += inv.carbonDioxide; 
	inv.carbon = 10; 
}
function render(delta) {
  if (playing) {
	
    let xPos = ship.x;  
    // seed new enemies TAB RENDER
    if (tick % enemySeedFrameInterval === 0 && ship.active && inv.hydrogenDisplayed) {
      const enemy1 = new Enemy("Hydrogen", 15, "white");
      enemies.push(enemy1);
      //console.log({ enemySeedFrameInterval, speedMultiplier });
    }
	// seed new enemies
    if (0.5*tick % enemySeedFrameInterval === 10 && ship.active && inv.carbonDisplayed) {
	  const enemy3 = new Enemy("Carbon", 20, "grey");
	  enemies.push(enemy3);
    }
	// seed new enemies
    if (0.5*tick % enemySeedFrameInterval === 20 && ship.active && inv.oxygenDisplayed) {
	  const enemy2 = new Enemy("Oxygen", 30, "red");
	  enemies.push(enemy2);
    }
	if (0.5*tick % enemySeedFrameInterval === 20 && ship.active && inv.nitrogenDisplayed) {
	  const enemy4 = new Enemy("Nitrogen", 20, "cyan");
	  enemies.push(enemy4);
    }
	if (0.5*tick % enemySeedFrameInterval === 20 && ship.active && inv.sulfurDisplayed) {
	  const enemy4 = new Enemy("Sulfur", 20, "yellow");
	  enemies.push(enemy4);
    }
	
    // background
    ctx.save();
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, stage.width, stage.height);
    ctx.restore();

    // ship movement
    if (ship.left)
    xPos = ship.x -= ship.speed;else
    if (ship.right)
    xPos = ship.x += ship.speed;

    // stage boundaries
    if (gameStarted) {
      if (xPos < 0+inv.menuWidth)
      xPos =  0+inv.menuWidth;else
      if (xPos > stage.width - ship.width)
      xPos = stage.width - ship.width;
    }
	
	//checks win condition
	if (inv.activeMissionNumber == 1){
		//gronk
		if(inv.hydrogen > inv.hydrogenGoal-1 && inv.hydrogenMolecule > inv.hydrogenMoleculeGoal-1){
			console.log("Victory!");
			inv.activeMissionNumber = 0; 
			inv.level1Victory = true; 
			inv.levelSelectColor1 = "green"; 
			inv.showVictoryScreen = true; 
			inv.showLevelSelect = false; 
			updateChemStorage(); 
			restartGame();
			pauseGame(); 
		}
	}
	if (inv.activeMissionNumber == 2){
		if(inv.hydrogen > inv.hydrogenGoal-1 && inv.oxygen > inv.oxygenGoal-1 && inv.water > inv.waterGoal-1){
			console.log("Victory!");
			inv.activeMissionNumber = 0; 
			inv.level2Victory = true; 
			inv.levelSelectColor2 = "green";
			inv.showVictoryScreen = true; 
			inv.showLevelSelect = false; 
			updateChemStorage();
			restartGame();
			pauseGame();  
		}
	}
	if (inv.activeMissionNumber == 3){
		if(inv.hydrogen > inv.hydrogenGoal-1 && inv.carbon > inv.carbonGoal-1 
			&& inv.methane > inv.methaneGoal-1){
			console.log("Victory!");
			inv.activeMissionNumber = 0; 
			inv.level3Victory = true; 
			inv.levelSelectColor3 = "green";
			inv.showVictoryScreen = true; 
			inv.showLevelSelect = false; 
			updateChemStorage();
			restartGame();
			pauseGame();  
		}
	}
	if (inv.activeMissionNumber == 4){
		if(inv.oxygen > inv.oxygenGoal-1 && inv.carbon > inv.carbonGoal-1 && 
			inv.carbonDioxide > inv.carbonDioxideGoal-1){
			console.log("Victory!");
			inv.activeMissionNumber = 0; 
			inv.level4Victory = true; 
			inv.levelSelectColor4 = "green";
			inv.showVictoryScreen = true; 
			inv.showLevelSelect = false; 
			updateChemStorage();
			restartGame();
			pauseGame();  
		}
	}
	if (inv.activeMissionNumber == 5){
		if(inv.hydrogen > inv.hydrogenGoal-1 && inv.oxygen > inv.oxygenGoal-1 && 
			inv.carbon > inv.carbonGoal-1 && inv.carbonDioxide > inv.carbonDioxideGoal-1){
			console.log("Victory!");
			inv.activeMissionNumber = 0; 
			inv.level5Victory = true; 
			inv.levelSelectColor5 = "green";
			inv.showVictoryScreen = true; 
			inv.showLevelSelect = false; 
			updateChemStorage();
			restartGame();
			pauseGame();  
		}
	}
	if (inv.activeMissionNumber == 6){
		if(inv.hydrogen > inv.hydrogenGoal-1 && inv.nitrogen > inv.nitrogenGoal-1 
			&& inv.ammonia > inv.ammoniaGoal-1){
			console.log("Victory!");
			inv.activeMissionNumber = 0;
			inv.level6Victory = true;
			inv.levelSelectColor6 = "green";
			inv.showVictoryScreen = true;
			inv.showLevelSelect = false;
			updateChemStorage();
			restartGame();
			pauseGame();
		}
	}
    // create different types of molecules, if shooting  TAB LASER
    if (ship.active && ship.shooting) {
      if (laserTick === 0 || laserTick % 10 === 0) {
		if (inv.activeAmmo === "Hydrogen" && inv.hydrogen > 0){
			inv.hydrogen -= 1; 
			let laser = new Laser({
			  name: "Hydrogen",
			  color: 'white',
			  radius: 15,
			  x: ship.x + ship.radius +13});
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Oxygen" && inv.oxygen > 0){
			inv.oxygen -= 1; 
			let laser = new Laser({
			  name: "Oxygen",
			  color: 'red',
			  radius: 30,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Hydroxide" && inv.hydroxide > 0){
			inv.hydroxide -= 1; 
			let laser = new Laser({
			  name: "Hydroxide",
			  color: 'orange',
			  radius: 30,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Oxygen Molecule" && inv.oxygenMolecule > 0){
			inv.oxygenMolecule -= 1; 
			let laser = new Laser({
			  name: "Oxygen Molecule",
			  color: 'red',
			  radius: 30,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Hydrogen Molecule" && inv.hydrogenMolecule > 0){
			inv.hydrogenMolecule -= 1; 
			let laser = new Laser({
			  name: "Hydrogen Molecule",
			  color: 'white',
			  radius: 20,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Nitrogen" && inv.hydrogenMolecule > 0){
			inv.hydrogenMolecule -= 1; 
			let laser = new Laser({
			  name: "Nitrogen",
			  color: 'aqua',
			  radius: 25,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Carbon" && inv.hydrogenMolecule > 0){
			inv.hydrogenMolecule -= 1; 
			let laser = new Laser({
			  name: "Carbon",
			  color: 'grey',
			  radius: 20,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Carbyne" && inv.hydrogenMolecule > 0){
			inv.carbyne -= 1; 
			let laser = new Laser({
			  name: "Carbyne",
			  color: 'grey',
			  radius: 20,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Methylene" && inv.hydrogenMolecule > 0){
			inv.methylene -= 1; 
			let laser = new Laser({
			  name: "Methylene",
			  color: 'grey',
			  radius: 20,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
		if (inv.activeAmmo === "Methanide" && inv.hydrogenMolecule > 0){
			inv.methanide -= 1; 
			let laser = new Laser({
			  name: "Methanide",
			  color: 'grey',
			  radius: 20,
			  x: ship.x + ship.radius });		
			lasers.push(laser);
		}
      }
    }

	/*
    // create lasers, if shooting
    if (ship.active && ship.shooting) {
      if (laserTick === 0 || laserTick % 10 === 0) {
        let laser = new Laser({
          color: 'skyblue',
          x: ship.x + ship.radius - 3 });

        lasers.push(laser);
      }
    }
	*/
    drawShip(xPos);

    handleShipCollision();
    handleLaserCollision();

    drawLasers();
    drawEnemies();
	drawHUD();
	drawFeedBack();
	if(inv.paused == true){
		renderPauseMenu();
	}
	if(inv.missionObjectiveShown == true && inv.paused == true){//render mission objective if 
		renderMissionObjective();
	}
    enemyCleanup();
    laserCleanup();

    if (ship.shooting) laserTick++;
    tick++;
  }

  requestAnimationFrame(render);
}

function startGame(e) {
	console.log('starting game');
	dialogue.classList.add('dialogue--hidden');
	hud.classList.remove('hud--hidden');
	e.currentTarget.blur();

	// reset the demo/intro to the actual game settings:
	speedMultiplier = 1;
	enemySeedFrameInterval = 100;
	ship.x = stage.width * .5 - ship.radius - .5 + inv.menuWidth/2;
	ship.y = stage.height - ship.radius - 30;
	ship.active = true;
	enemies = []; lasers = [];
	gameStarted = true;
	pauseGame(); 
}


function onResize() {
  stage.width = window.innerWidth;
  stage.height = window.innerHeight;
}

//starting functions
startBtn.addEventListener('click', startGame);
window.addEventListener('resize', onResize);

document.body.appendChild(stage);
onResize();

// start the ship off-screen:
ship = new Ship({ color: '#ff9d00', x: -100, y: -100 });

// set up some ridiculous enemy speeds for the intro:
speedMultiplier = 6,
enemySeedFrameInterval = 20;

playing = true;
render();