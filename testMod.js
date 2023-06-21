window.testMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.testMod.runCodeBefore = function() {

  // Counter stuff

  window.loadStatistics = function() {
    let stats = localStorage.getItem('inputCounterMod');
    if(stats === null) {
        stats = {
        visible: false,
        statShown: 'inputs',
        statDurationShown: 'game',
        inputs: {
            game: 0,
            session: 0,
            lifetime: 0
        },
        plays: {
            session: 0,
            lifetime: 0
        }
        };
    } else{
        stats = JSON.parse(stats);
    }
    //Make sure these get reset
    stats.inputs.game = 0;
    stats.inputs.session = 0;
    stats.plays.session = 0;
    if(stats.visible === null) {
        stats.visible =  true;
    }
    return stats;
}
window.stats = window.loadStatistics();
window.saveStatistics = function() {
    if(typeof stats !== 'undefined' &&
    typeof stats.statShown !== 'undefined' &&
    typeof stats.statDurationShown !== 'undefined' &&
    typeof stats.inputs !== 'undefined' &&
    typeof stats.plays !== 'undefined' &&
    typeof stats.inputs.game !== 'undefined' &&
    typeof stats.inputs.session !== 'undefined' &&
    typeof stats.inputs.lifetime !== 'undefined' &&
    typeof stats.plays.session !== 'undefined' &&
    typeof stats.plays.lifetime !== 'undefined' &&
    typeof stats.visible !== 'undefined'
    ) {
        localStorage.setItem('inputCounterMod', JSON.stringify(stats));
    }
}
window.updateCounterDisplay=function() {
    divList.innerHTML = stats[stats.statShown][stats.statDurationShown];
}
window.promptToResetStats=function() {
    let userResponse = prompt('Type DELETE to reset all stats. Cannot be undone');
    if(userResponse === 'DELETE') {
        localStorage.removeItem('inputCounterMod');
        stats = {
          visible: false,
          statShown: 'inputs',
          statDurationShown: 'game',
          inputs: {
              game: 0,
              session: 0,
              lifetime: 0
          },
          plays: {
              session: 0,
              lifetime: 0
          }
          };
        saveStatistics();
        updateCounterDisplay();
        alert('All stats have been reset');
    } else {
        alert('Did not reset all stats');
    }
}
window.promptToEditStatCount=function() {
    let userResponse = prompt(`Change the stat count for "${stats.statShown} - ${stats.statDurationShown}"? This won't change any of the other stats. Current value: ${stats[stats.statShown][stats.statDurationShown]}`, stats[stats.statShown][stats.statDurationShown]);
    userResponse = parseInt(userResponse,10);
    if(isNaN(userResponse)) {
      alert('Invalid - did not change stat count');
    } else {
      stats[stats.statShown][stats.statDurationShown] = userResponse;
      saveStatistics();
      updateCounterDisplay();
      alert(`Changed stat count to ${userResponse}`);
    }
}
window.showSettingsBox=function() {
    const settingsBox = document.getElementById('settings-popup');
    settingsBox.style.display = 'block';
    window.cogOff();
}

window.hideSettingsBox=function() {
    const settingsBox = document.getElementById('settings-popup');
    settingsBox.style.display = 'none';
    window.cogOn();
}

window.getStatIconImageSrc=function() {
    return stats.statShown === 'plays' ? 'https://fonts.gstatic.com/s/i/googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png' : 'https://www.google.com/logos/fnbx/snake_arcade/keys.svg';
}
window.setuphtml=function() {
  const a = new Image();
  a.src = getStatIconImageSrc();
  a.id = 'stat-icon';
  a.width = a.height = 25;
  a.style = 'position:relative;left:475px;top:70px;';


  window.divList = document.createElement('div');
  divList.class = 'counter-num'
  divList.style = 'width:25px;position:relative;left:505px;top:45px;font-size:14px;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;'
  divList.id = 'counter-num'

  document.getElementsByClassName('sEOCsb')[0].appendChild(a);
  document.getElementsByClassName('sEOCsb')[0].appendChild(divList);

  const c = new Image();
  c.src = 'https://i.postimg.cc/02xshYj1/index.png';
  c.width = c.height = 16;
  c.style = 'cursor:pointer;position:relative;left:-10px;top:30px;';
  c.id = 'input-counter-settings';

  const d = document.createElement('div');
  d.id = 'input-counter-settings-container';
  d.style = 'position:absolute;left:465px;top:45px;z-index:10000;';
  document.getElementsByClassName('sEOCsb')[0].appendChild(d);
  const settingsElement = document.querySelector('#input-counter-settings-container');
  settingsElement.appendChild(c);
  

  const settingsBox = document.createElement('div');
  settingsBox.style = 'position:absolute;left:135px;z-index:10000;background-color:#111111;padding:8px;display:none;border-radius:3px;width:200px;';
  settingsBox.id = 'settings-popup';
  settingsBox.innerHTML = `
  <span style="color:white;font-family:Roboto,Arial,sans-serif;">Counter Settings</span><span class="settings-close" style="float:right;cursor:pointer">&times;</span><br>
  <select style="margin:3px;background-color:#111111;color:white;font-family:Roboto,Arial,sans-serif;" id="stat-chooser">
    <option value="inputGame">Game inputs</option>
    <option value="inputSession">Session inputs</option>
    <option value="inputLifetime">Lifetime inputs</option>
    <option value="playsSession">Session resets</option>
    <option value="playsLifetime">Lifetime resets</option>
  </select><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="edit-stat">Edit stat count</button><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="reset-stats">Reset all stats</button><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="toggle-counter">Toggle Counter</button><br>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="time-keeper" jsname="time-keeper">Show TimeKeeper</button>
  <button style="margin:3px;color:white;background-color:#111111;font-family:Roboto,Arial,sans-serif;" id="input-display" jsname="input-display">Show Input Display</button>
  <br>
  <span style="margin:3px;color:white;cursor:pointer;font-family:Roboto,Arial,sans-serif;" class="settings-close">Close</span>
  `;

  settingsElement.appendChild(settingsBox);

  const e = document.createElement('div');
  e.id = 'input-display-container';
  e.style = 'position:absolute;left:170px;top:350px;z-index:10000;display:block';
  document.getElementsByClassName('sEOCsb')[0].appendChild(e);

  const f = document.createElement('div');
  f.id = 'input-display-container';
  f.style = 'position:absolute;left:170px;top:278px;z-index:10000;display:block';
  document.getElementsByClassName('sEOCsb')[0].appendChild(f);

  const InpBox = document.querySelector('#input-display-container');

  const LeftButton = document.createElement('div');
  LeftButton.style ='position:absolute;left:460px;top"450px;z-index:10000;width:200px;';
  LeftButton.innerHTML = '<div id="left-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:12px;padding-right:10px;padding-left:10px;">←</div>'
  InpBox.appendChild(LeftButton);

  const DownButton = document.createElement('div');
  DownButton.style ='position:absolute;left:530px;top"452px;z-index:10000;width:200px;';
  DownButton.innerHTML = '<div id="down-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:10px;padding-top:2px;padding-right:21px;padding-left:21px;">  ↓  </div>'
  InpBox.appendChild(DownButton);

  const RightButton = document.createElement('div');
  RightButton.style ='position:absolute;left:601px;top"550px;z-index:10000;width:200px;';
  RightButton.innerHTML = '<div id="right-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:12px;padding-right:10px;padding-left:10px;">→</div>'
  InpBox.appendChild(RightButton);

  const TopButton = document.createElement('div');
  TopButton.style ='position:relative;left:530px;top"152px;z-index:10000;width:200px;';
  TopButton.innerHTML = '<div id="top-button-id" style="font-size:40px;color:white;display:none;background-color:#4f4f4f;font-family:Roboto,Arial,sans-serif;vertical-align:middle;padding-bottom:10px;padding-top:2px;padding-right:21px;padding-left:21px;">↑</div>'
  f.appendChild(TopButton);

  let settingsToValues = {
    inputs: {
      game: 'inputGame',
      session: 'inputSession',
      lifetime: 'inputLifetime'
    },
    plays: {
      session: 'playsSession',
      lifetime: 'playsLifetime'
    }
  }

  let valuesToSettings = {
    inputGame:{stat: 'inputs',duration: 'game'},
    inputSession:{stat: 'inputs',duration: 'session'},
    inputLifetime:{stat: 'inputs',duration: 'lifetime'},
    playsSession:{stat: 'plays',duration: 'session'},
    playsLifetime:{stat: 'plays',duration: 'lifetime'},
  }

  //preselect based on saved settings
  document.querySelector(`#stat-chooser option[value=${settingsToValues[stats.statShown][stats.statDurationShown]}]`).selected = true;

  //Listeners to hide/show settings box when clickng the cog, or the X
  document.querySelector('#input-counter-settings').addEventListener('click',showSettingsBox);
  const settingsCloseElements = document.getElementsByClassName('settings-close');
  settingsCloseElements[0].addEventListener('click',hideSettingsBox);
  settingsCloseElements[1].addEventListener('click',hideSettingsBox);

  document.getElementById('stat-chooser').onchange = function() {
    stats.statShown = valuesToSettings[this.value].stat;
    stats.statDurationShown = valuesToSettings[this.value].duration;
    document.getElementById('stat-icon').src = getStatIconImageSrc();
    updateCounterDisplay();
  }

  document.getElementById('edit-stat').addEventListener('click',promptToEditStatCount);
  document.getElementById('reset-stats').addEventListener('click',promptToResetStats);
  document.getElementById('toggle-counter').addEventListener('click',toggleCounter);
  document.getElementById('input-display').addEventListener('click',toggleinputDisplay);
  }

  window.cogOff = function(){
    document.getElementById('input-counter-settings').style.display = 'none';
  }

  window.cogOn = function(){
    if(document.getElementById('settings-popup').style.display == 'none'){
      document.getElementById('input-counter-settings').style.display = 'inline';
    }
  }
  window.LightUpInput = function(direction)
  {
    document.getElementById(direction).style.backgroundColor='#999999';
    setTimeout(()=>{
      document.getElementById(direction).style.backgroundColor='#4f4f4f';
    },200);
    
  }

  window.toggleinputDisplay = function(){

   
    console.log("hmmm");
    if(document.getElementById('input-display').innerHTML==='Show Input Display')
    {
    document.getElementById('input-display').innerHTML='Hide Input Display';
    document.getElementById('left-button-id').style.display='inline-block';
    document.getElementById('down-button-id').style.display='inline-block';
    document.getElementById('right-button-id').style.display='inline-block';
    document.getElementById('top-button-id').style.display='inline-block';
    }
    else
    {
      document.getElementById('input-display').innerHTML='Show Input Display';
      document.getElementById('left-button-id').style.display='none';
      document.getElementById('down-button-id').style.display='none';
      document.getElementById('right-button-id').style.display='none';
      document.getElementById('top-button-id').style.display='none';
    }
    
    


  }
  window.toggleCounter = function(){
      stats.visible = !stats.visible;
      if(stats.visible) {
          document.getElementById('stat-icon').style.display = 'inline';
          document.getElementById('counter-num').style.display = 'inherit';
          document.getElementById('toggle-counter').innerHTML = 'Hide counter';
      }
      else {
          document.getElementById('stat-icon').style.display = 'none';
          document.getElementById('counter-num').style.display = 'none';
          document.getElementById('toggle-counter').innerHTML = 'Show counter';
      }
      saveStatistics();
  }

  window.setuphtml();

  if(stats.visible) {
      document.getElementById('stat-icon').style.display = 'inline';
      document.getElementById('counter-num').style.display = 'inherit';
      document.getElementById('toggle-counter').innerHTML = 'Hide counter';
  }
  else {
      document.getElementById('stat-icon').style.display = 'none';
      document.getElementById('counter-num').style.display = 'none';
      document.getElementById('toggle-counter').innerHTML = 'Show counter';
  }

  /*
	storage:
	att-modeStr-count-speed-size : number of attempts of this mode
	25-modeStr-count-speed-size: {time: time of 25 score, date: date of 25 score, att: number of attempts that reached 25 score, sum: total time of all attempts that reached 25 score}
	50, 100 and ALL idem.
	H-modeStr-count-speed-size: {high: highscore of this mode, time: time of the highscore run, date: date of the highscore run, sum: total score of all attempts}
*/
window.timeKeeper = {};
window.timeKeeper.debug = false;
//called on every apple
window.timeKeeper.gotApple = function(time, score){
	if(window.timeKeeper.debug){
		console.log("got Apple %s, %s", time, score);
	}
	window.timeKeeper.lastAppleDate = new Date();
	window.timeKeeper.lastAppleTime = time;
	//save time
	if(score == 25 || score == 50 || score == 100){
    if(window.timeKeeper.debug){
      console.log("Saving PB for %s Ticks, %s Apples", time, score);
    }
		window.timeKeeper.savePB(time, score, window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
	}
}

//called when you get all apples
window.timeKeeper.gotAll = function(time, score){
	if(window.timeKeeper.debug){
		console.log("got All %s, %s", time, score);
	}
	window.timeKeeper.savePB(time, "ALL", window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
}

//called when you're dead, every time.
window.timeKeeper.death = function(time, score){
	if(window.timeKeeper.debug){
		console.log("death %s, %s", time, score);
	}
	if(window.timeKeeper.playing){
		window.timeKeeper.playing = false;
		window.timeKeeper.saveScore(time, score, window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
	}
}

//called when you start gamed d
window.timeKeeper.start = function(){
	if(window.timeKeeper.debug){
		console.log("start");
	}
	window.timeKeeper.playing = true;
	//save current settings
	window.timeKeeper.mode = window.timeKeeper.getCurrentMode();
	window.timeKeeper.count = window.timeKeeper.getCurrentSetting("count");
	window.timeKeeper.speed = window.timeKeeper.getCurrentSetting("speed");
	window.timeKeeper.size = window.timeKeeper.getCurrentSetting("size");
	window.timeKeeper.addAttempt(window.timeKeeper.mode, window.timeKeeper.count, window.timeKeeper.speed, window.timeKeeper.size);
}

window.timeKeeper.getCurrentMode = function(){
	element = "";
	for(i of document.querySelectorAll('img')){
    	if(i.src.includes('random.png')){
        	element = i;
    	}
	}
	counter = -1;
	modeStr = "";
	for(child of element.parentElement.parentElement.parentElement.children){
		counter++;
		if(counter == 0){continue;};
		if(child.firstChild.classList.length > 1 && child.firstChild.children.length > 0){
			modeStr+="1";
		}
		else{
			modeStr+="0";
		}
	}

	let mode = window.timeKeeper.getCurrentSetting("trophy");
	if(mode != document.getElementById("trophy").children.length-1){	//not on blender mode
		modeStr = "";
		for(t = 1; t <= 15; t++){
			if(t == mode){
				modeStr += "1";
			}
			else{
				modeStr += "0";
			}
		}
	}
	return modeStr
}

//get the current setting, name = 'count', 'speed', 'size' or 'trophy'
window.timeKeeper.getCurrentSetting = function(name){
	let getSelectedIndex = function(name){
		let elementList = document.getElementById(name);
		let number = 0;
		let classNames = [];
		let notUnique = "";
		for(element of elementList.children){
			if(classNames.indexOf(element.className) == -1){
				classNames.push(element.className);
			}
			else{
				notUnique = element.className;
				break;
			}
		}
		for(element of elementList.children){
			if(element.className != notUnique){
				return number;
			}
			number++;
		}
		return 0;
	}
	return getSelectedIndex(name);
}

//save highscore
window.timeKeeper.saveScore = function(time, score, mode, count, speed, size){
  if(count > 2 || speed > 2 || size > 2 || typeof window.aimTrainer !== 'undefined' || typeof window.megaWholeSnakeObject !== 'undefined'){
    // More Menu, or Dice, or MouseMode or Level Editor
    return;
  }
	if(typeof(window.timeKeeper.lastAppleDate) == "undefined"){
		window.timeKeeper.lastAppleDate = new Date();
	}
	if(typeof(window.timeKeeper.lastAppleTime) == "undefined"){
		window.timeKeeper.lastAppleTime = time;
	}

	time = Math.floor(time);
	let storage = localStorage.getItem("snake_timeKeeper");
	storage = JSON.parse(storage);
	let name = "H"+"-"+mode+"-"+count+"-"+speed+"-"+size;
	//if undefined, save new high
	if(typeof(storage[name]) == "undefined"){
		storage[name] = {"high":score,"time":window.timeKeeper.lastAppleTime,"date":window.timeKeeper.lastAppleDate,"sum":score};
	}
	else{
		//increase sum
		storage[name].sum += score;
		if(score > storage[name].high || (score == storage[name].high && time < storage[name].time)){
			//save new pb
			storage[name].high = score;
			storage[name].time = window.timeKeeper.lastAppleTime;
			storage[name].date = window.timeKeeper.lastAppleDate;
		}
	}
	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

//save 25, 50, 100 or 'ALL' score
window.timeKeeper.savePB = function(time,score,mode,count,speed,size){

  if(count > 3 || speed > 2 || size > 2 || typeof window.aimTrainer !== 'undefined' || typeof window.megaWholeSnakeObject !== 'undefined'){
    // More Menu, or MouseMode or Level Editor
    return;
  }

	time = Math.floor(time);
	let storage = localStorage.getItem("snake_timeKeeper");
	storage = JSON.parse(storage);
	let name = score.toString()+"-"+mode+"-"+count+"-"+speed+"-"+size;

	//if undefined, save new pb
	if(typeof(storage[name]) == "undefined"){
		storage[name] = {"time":time,"date":new Date(),"att":1,"sum":time};
	}
	else{
		//increase attempt
		if(typeof(storage[name].att) == "undefined"){storage[name].att = 0};
		storage[name].att+=1;
		//increase sum
		if(typeof(storage[name].sum) == "undefined"){storage[name].sum = 0};
		storage[name].sum+=time;
		if(time < storage[name].time){		//only pb when lower time then stored
			storage[name] = {"time":time,"date":new Date(),"att":storage[name].att,"sum":storage[name].sum};
		}
	}

	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

//function to add attempt to localStorage
window.timeKeeper.addAttempt = function(mode, count, speed, size){
	let storage = localStorage.getItem("snake_timeKeeper");
	storage = JSON.parse(storage);
	let name = "att"+"-"+mode+"-"+count+"-"+speed+"-"+size;
	if(typeof(storage[name]) == "undefined"){
		storage[name] = 1;
	}
	else{
		storage[name]+=1;
	}
	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

window.timeKeeper.setAttempts = function(attempts){
	if(isNaN(attempts)){
		console.log(attempts.toString() + " is not a number!");
		return;
	}
	let storage = localStorage.getItem("snake_timeKeeper");
	storage = JSON.parse(storage);
	mode = window.timeKeeper.getCurrentMode()
	count = window.timeKeeper.getCurrentSetting("count");
	speed = window.timeKeeper.getCurrentSetting("speed");
	size = window.timeKeeper.getCurrentSetting("size");
	let name = "att"+"-"+mode+"-"+count+"-"+speed+"-"+size;
	storage[name] = {};
	storage[name] = attempts;
	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

window.timeKeeper.setPB = function(time, score, attempts, average){
	if(isNaN(time)){
		console.log(time.toString() + " is not a number!");
		return;
	}
	if(score != 25 && score != 50 && score != 100 && score != "ALL"){
		console.log(score + " has to be 25, 50, 100 or \"ALL\"!");
		return;
	}
	if(isNaN(attempts)){
		console.log(attempts.toString() + " is not a number!");
		return;
	}
	if(isNaN(average)){
		console.log(average.toString() + " is not a number!");
		return;
	}
	let storage = localStorage.getItem("snake_timeKeeper");
	storage = JSON.parse(storage);
	mode = window.timeKeeper.getCurrentMode()
	count = window.timeKeeper.getCurrentSetting("count");
	speed = window.timeKeeper.getCurrentSetting("speed");
	size = window.timeKeeper.getCurrentSetting("size");
	let name = score.toString()+"-"+mode+"-"+count+"-"+speed+"-"+size;
	storage[name] = {};
	storage[name].time = time;
	storage[name].date = new Date();
	storage[name].att = attempts;
	storage[name].sum = Math.round(average * attempts);
	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

window.timeKeeper.setScore = function(highscore, time, average){
	if(isNaN(highscore)){
		console.log(highscore.toString() + " is not a number!");
		return;
	}
	if(isNaN(time)){
		console.log(time.toString() + " is not a number!");
		return;
	}
	if(isNaN(average)){
		console.log(average.toString() + " is not a number!");
		return;
	}
	let storage = localStorage.getItem("snake_timeKeeper");
	storage = JSON.parse(storage);
	mode = window.timeKeeper.getCurrentMode()
	count = window.timeKeeper.getCurrentSetting("count");
	speed = window.timeKeeper.getCurrentSetting("speed");
	size = window.timeKeeper.getCurrentSetting("size");
	let name = "H"+"-"+mode+"-"+count+"-"+speed+"-"+size;
	storage[name] = {};
	storage[name].high = highscore;
	storage[name].time = time;
	storage[name].date = new Date();
	storage[name].sum = average * storage["att"+"-"+mode+"-"+count+"-"+speed+"-"+size];
	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

//generate storage if it doesn't exist, or import from old file format.
window.timeKeeper.makeStorage = function(){
	let storage = localStorage.getItem("snake_timeKeeper");
	if(storage == null){
		storage = {};
		storage["version"] = 2;

		//try to read version 1 to new storage type
		old_pbs = localStorage.getItem("snake_pbs");
		if(old_pbs != null){
			old_pbs = JSON.parse(old_pbs);
			console.log("Converting local storage to new storage type");
			for(mode = 0; mode < 11; mode++){
				modeStr = "000000000000000".split("");
				if(mode != 0){
					modeStr[mode-1] = '1';
				}
				modeStr = modeStr.join('');

				for(count = 0; count < 3; count++){
					for(speed = 0; speed < 3; speed++){
						for(size = 0; size < 3; size++){
							for(let score of ["25","50","100","ALL","att"]){
								let name = score+"-"+mode+"-"+count+"-"+speed+"-"+size;
								if(typeof(old_pbs[name]) != "undefined"){
									console.log(name, old_pbs[name]);
									newName = score+"-"+modeStr+"-"+count+"-"+speed+"-"+size;
									storage[newName] = old_pbs[name];
								}

							}
						}
					}
				}
			}
		}
	}
	else{
		storage = JSON.parse(storage);
	}
	if(storage["version"] != 2){
		alert("Something went wrong with you localStorage!");
	}
	localStorage.setItem("snake_timeKeeper",JSON.stringify(storage));
}

window.timeKeeper.dialogActive = false;

//generate and show the dialog
window.timeKeeper.showDialog = function(){
	//make dialog
  window.timeKeeper.dialogActive = true;
  document.getElementById('time-keeper').innerHTML = 'Hide TimeKeeper';

	dialog = document.createElement("dialog");
	dialog.setAttribute("open","");
	dialog.setAttribute("id","timeKeeperDialog");

	let count = window.timeKeeper.getCurrentSetting("count");
	let speed = window.timeKeeper.getCurrentSetting("speed");
	let size = window.timeKeeper.getCurrentSetting("size");
	let modeStr = window.timeKeeper.getCurrentMode("size");
	//change modeStr to gamemode
	counter = 0
	var gamemode = "";
	for(t of modeStr){
		if(t == 1){

			switch(counter){
				case 0: gamemode += "Wall, "; break;
				case 1: gamemode += "Portal, "; break;
				case 2: gamemode += "Cheese, "; break;
				case 3: gamemode += "Infinity, "; break;
				case 4: gamemode += "Twin, "; break;
				case 5: gamemode += "Winged, "; break;
				case 6: gamemode += "YinYang, "; break;
				case 7: gamemode += "Key, "; break;
				case 8: gamemode += "Sokoban, "; break;
				case 9: gamemode += "Poison, "; break;
				case 10: gamemode += "Dimension, "; break;
        case 11: gamemode += "Minesweeper, "; break;
				case 12: gamemode += "Statue, "; break;
				case 13: gamemode += "Light, "; break;
				case 14: gamemode += "Peaceful, "; break;
				default: gamemode += "Unknown, "; break;
			}
		}
		counter++;
	}
	if(gamemode == ""){
		gamemode = "Classic, ";
	}
	gamemode = gamemode.substring(0, gamemode.lastIndexOf(","));

	//add level information
	bold = document.createElement('strong');
  textnode = document.createTextNode("TimeKeeper");
  bold.style = 'color:white;font-family:Arial;'
  //textnode.style = 'color:white;font-family:Arial;'
  bold.appendChild(textnode);
  //buttonClose.style = 'color:white;background:black'; font-family:roboto;
  dialog.appendChild(bold);
	dialog.appendChild(document.createElement("br"));
	dialog.appendChild(document.createTextNode("Mode: "+gamemode));
	dialog.appendChild(document.createElement("br"));
	switch(count){
		case 0: dialog.appendChild(document.createTextNode("1 Apple, ")); break;
		case 1: dialog.appendChild(document.createTextNode("3 Apples,")); break;
    case 2: dialog.appendChild(document.createTextNode("5 Apples, ")); break;
    case 3: dialog.appendChild(document.createTextNode("Dice count, ")); break;
		default: dialog.appendChild(document.createTextNode("MoreMenu Apples, ")); break;
	}
	switch(speed){
		case 0: dialog.appendChild(document.createTextNode("Normal speed, ")); break;
		case 1: dialog.appendChild(document.createTextNode("Fast speed, ")); break;
		case 2: dialog.appendChild(document.createTextNode("Slow speed, ")); break;
    default: dialog.appendChild(document.createTextNode("MoreMenu speed, ")); break;

	}
	switch(size){
		case 0: dialog.appendChild(document.createTextNode("Normal size")); break;
		case 1: dialog.appendChild(document.createTextNode("Small size")); break;
		case 2: dialog.appendChild(document.createTextNode("Large size")); break;
    default: dialog.appendChild(document.createTextNode("MoreMenu size")); break;
	}
  //dialog.style = 'color:white;font-family:Arial;'\

	//add stats
	dialog.appendChild(document.createElement("br"));
	dialog.appendChild(document.createElement("br"));
	storage = JSON.parse(localStorage["snake_timeKeeper"]);
	let totalAttempts = 0;

	for(let score of ["att", "25","50","100","ALL", "H"]){
		let name = score+"-"+modeStr+"-"+count+"-"+speed+"-"+size;
		if(typeof(storage[name]) != "undefined"){

			bold = document.createElement('strong');
			switch(score){
				case "25": bold.appendChild(document.createTextNode("25 Apples:")); break;
				case "50": bold.appendChild(document.createTextNode("50 Apples:")); break;
				case "100": bold.appendChild(document.createTextNode("100 Apples:")); break;
				case "ALL": bold.appendChild(document.createTextNode("All Apples:")); break;
				case "att": bold.appendChild(document.createTextNode("Total Attempts: ")); break;
				case "H": bold.appendChild(document.createTextNode("Highscore: ")); break;
				default: break;
			}
			dialog.appendChild(bold);

			if(score == "att"){
				totalAttempts = storage[name];
				dialog.appendChild(document.createTextNode(totalAttempts));
				dialog.appendChild(document.createElement("br"));
			}
			else if(score == "H"){
				dialog.appendChild(document.createTextNode(storage[name].high));
			}

			dialog.appendChild(document.createElement("br"));

			if(score == "att")
				continue;

			minutes = Math.floor(storage[name].time/60000);
			seconds = Math.floor((storage[name].time-minutes*60000)/1000);
			mseconds = storage[name].time-minutes*60000-seconds*1000;
			if(minutes.toString().length < 2){minutes = "0"+minutes.toString()}
			if(seconds.toString().length < 2){seconds = "0"+seconds.toString()}
			while(mseconds.toString().length < 3){mseconds = "0"+mseconds.toString()}
			if(score != "H"){
				dialog.appendChild(document.createTextNode("Best Time: "+minutes+":"+seconds+":"+mseconds));
				dialog.appendChild(document.createElement("br"));
				dialog.appendChild(document.createTextNode("Achieved on: "+new Date(storage[name].date).toString()));
				dialog.appendChild(document.createElement("br"));
			}
			else{
				dialog.appendChild(document.createTextNode("Duration: "+minutes+":"+seconds+":"+mseconds));
				dialog.appendChild(document.createElement("br"));
				dialog.appendChild(document.createTextNode("Achieved on: "+new Date(storage[name].date).toString()));
				dialog.appendChild(document.createElement("br"));
				dialog.appendChild(document.createTextNode("Average score: "+(Math.round(100 * (storage[name].sum/totalAttempts)) /100).toString()));
				dialog.appendChild(document.createElement("br"));
			}
			if(storage[name].att != undefined && storage[name].sum != undefined){
				let time = Math.floor(storage[name].sum/storage[name].att);
				minutes = Math.floor(time/60000);
				seconds = Math.floor((time-minutes*60000)/1000);
				mseconds = time-minutes*60000-seconds*1000;
				if(minutes.toString().length < 2){minutes = "0"+minutes.toString()}
				if(seconds.toString().length < 2){seconds = "0"+seconds.toString()}
				while(mseconds.toString().length < 3){mseconds = "0"+mseconds.toString()}
				dialog.appendChild(document.createTextNode("Attempts to this point: "+storage[name].att));
				dialog.appendChild(document.createElement("br"));
				dialog.appendChild(document.createTextNode("Average: "+minutes+":"+seconds+":"+mseconds));
				dialog.appendChild(document.createElement("br"));
			}
			dialog.appendChild(document.createElement("br"));
		}
	}

	//buttonClose
	dialog.appendChild(document.createElement("br"));
	buttonClose = document.createElement("button");
	buttonClose.appendChild(document.createTextNode("Close"));
	buttonClose.addEventListener("click", (e)=>{
    window.timeKeeper.toggleDialog();
  });
  buttonClose.style = 'color:white;background:black';
	dialog.appendChild(buttonClose);

	//buttonExport
	buttonExport = document.createElement("button");
	buttonExport.appendChild(document.createTextNode("Export"));
	buttonExport.addEventListener("click", function(){
		download("timeKeeper - "+new Date().toString()+".txt", "To import: open snake -> open console -> paste the following:\nlocalStorage[\"snake_timeKeeper\"]='"+localStorage["snake_timeKeeper"]+"'");
	});
	//dialog.appendChild(buttonExport); // Disabled export button, I don't want this.

	//add dialog
	div = document.querySelector("body");
	dialog.setAttribute("style","z-index:9999;top:-50px;right:-50px;bottom:-50px;left:-50px;background:black;color:white;font-family:Arial;");

	div.insertBefore(dialog, div.firstChild)
	};



  //Function to find the snake code, and apply changes.
window.timeKeeper.setup = function(){
	//just make storage, this used to also alter snake code
	window.timeKeeper.makeStorage();
	return;
}

  console.log("Enabling TimeKeeper")
  window.timeKeeper.setup();

  window.timeKeeper.hideDialog = function(){
		//remove dialog when click on ok
		child = document.getElementById("timeKeeperDialog");
		child.parentElement.removeChild(child);
    window.timeKeeper.dialogActive = false;
    document.getElementById('time-keeper').innerHTML = 'Show TimeKeeper';

	}

  window.timeKeeper.toggleDialog = function(){
    if(window.timeKeeper.dialogActive){
      window.timeKeeper.hideDialog();
    }
    else {
      window.timeKeeper.showDialog();
    }
  }

  tempID = "time-keeper"; // Inspect element on Timer and take jsname from it
  document.querySelector("button[jsname^=\""+tempID+"\"]").addEventListener("click",(e)=>{
    window.timeKeeper.toggleDialog();
  });
  TimerID = "yddQF"; // Inspect element on Timer and take jsname from it
  document.querySelector("div[jsname^=\""+TimerID+"\"]").addEventListener("click",(e)=>{
		window.timeKeeper.toggleDialog();
	});



 
 

};
  


////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.testMod.alterSnakeCode = function(code) {
// TimeKeeper stuff start
  //change stepfunction to run gotApple(), gotAll() and death()

  function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  func_regex = new RegExp(/[a-zA-Z0-9_$.]{1,40}=function\(\)[^\\]{1,1000}RIGHT":0[^\\]*?=function/)
	let func = code.match(/[a-zA-Z0-9_$.]{1,40}=function\(\)[^\\]{1,1000}RIGHT":0[^\\]*?=function/)[0];
  StartOfNext = func.substring(func.lastIndexOf(";"),func.length);
	func = func.substring(0,func.lastIndexOf(";"));
  //console.log(StartOfNext);

	let modeFunc = func.match(/1}\);[^%]{0,10}/)[0];
	modeFunc = modeFunc.substring(modeFunc.indexOf("(")+1,modeFunc.lastIndexOf("("));
	//scoreFunc = func.match(/25\!\=\=this.[a-zA-Z0-9$]{1,4}/)[0]; // Need to figure this out
  scoreFuncVar = func.match(/25\=\=\=[a-zA-Z0-9$]{1,4}/)[0].split('=')[3]; // Assuming he wanted just the "this.score"
  scoreFunc = func.match(`${scoreFuncVar}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1]
  //console.log(scoreFunc)
	//scoreFunc = scoreFunc.substring(scoreFunc.indexOf("this."),scoreFunc.size);
	//timeFunc = func.match(/this.[a-zA-Z0-9$]{1,6}\*this.[a-zA-Z0-9$]{1,6}/)[0];
  // Now has weird vars that obfuscate, it's "this.ticks" * "this.{1,4}"
  timeFunc = func.match(/\([a-zA-Z0-9$]{1,6}\*[a-zA-Z0-9$]{1,6}\)/)[0];
  ticksVar = timeFunc.split('(')[1].split("*")[0];
  tickLengthVar = timeFunc.split("*")[1].split(')')[0];
  realTicks=func.match(`${ticksVar}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1];
  realTickLength=func.match(`${escapeRegex(tickLengthVar)}=this.[a-zA-Z0-9$]{1,6}`)[0].split('=')[1];
  realTimeFunc = `${realTicks}*${realTickLength}`;
  timeFunc=realTimeFunc;
  //console.log(timeFunc)
	//ownFuncIndex = func.indexOf(func.match(/!1}\);\([^%]{0,10}/)[0])+5; // No idea how this ever worked
	ownFunc = "window.timeKeeper.gotApple(Math.floor("+timeFunc+"),"+scoreFunc+");"
	//func = func.slice(0, ownFuncIndex) + ownFunc + func.slice(ownFuncIndex); // Cool but no, just going to insert before the if 25 50 100 instead
  if25_regex = new RegExp(/if\(25===/)
  ownFuncIndex = func.indexOf(func.match(if25_regex)[0]);
  func = func.slice(0, ownFuncIndex) + ownFunc + func.slice(ownFuncIndex);
  //console.log(func);



	//change all apples to run gotAll()
	func = func.slice(0,func.indexOf("WIN.play()")+11)+"window.timeKeeper.gotAll(Math.floor("+timeFunc+"),"+scoreFunc+"),"+func.slice(func.indexOf("WIN.play()")+11);

	death = func.match(/if\(this.[a-zA-Z0-9$]{1,4}\|\|this.[a-zA-Z0-9$]{1,4}\)/)[0];
	death = death.slice(death.indexOf("(")+1,death.indexOf("|"));
	func = func.slice(0,func.indexOf("{")+1) + "if("+death+"){window.timeKeeper.death(Math.floor("+timeFunc+"),"+scoreFunc+");}" + func.slice(func.indexOf("{")+1)
	//eval(func)

  code = code.assertReplace(func_regex, func + StartOfNext);

  //console.log(code)

	//change start function to run gameStart() - The "start" here fails, but this section is required for the code to work

  func_regex = new RegExp(/[a-zA-Z0-9_$]{1,6}=function\(a,b\){if\(!\(a.[a-zA-Z0-9$]{1,4}[^\\]*?=function/)
	func = code.match(/[a-zA-Z0-9_$]{1,6}=function\(a,b\){if\(!\(a.[a-zA-Z0-9$]{1,4}[^\\]*?=function/)[0];
  StartOfNext = func.substring(func.lastIndexOf(";"),func.length);
	func = func.substring(0, func.lastIndexOf(";"));
	step = timeFunc.substring(0,timeFunc.indexOf("*"));
	step = "a"+step.slice(step.indexOf("."));

	func = func.slice(0,func.indexOf("{")+1)+"if("+step+"==0){window.timeKeeper.start();}"+func.slice(func.indexOf("{")+1);
	//eval(func)
  //code = code.assertReplace(func_regex, func + StartOfNext);

  //add eventhandler to click on time
	//let id = code.match(/function\(a\){if\(\!a.[a-zA-Z0-9]{1,4}&&[^"]*?"[^"]*?"/)[0];
	//id = id.substring(id.indexOf("\"")+1, id.lastIndexOf("\""));
  //let id = code.match(/"[^"]{1,9}"[^"]{1,200}"00:00:000/)[0]; // Whatever this crap gives is the wrong thing sadly
	//window.TimerID = id.substring(1, id.indexOf("\"",2));
	//document.querySelector("div[jsname^=\""+id+"\"]").addEventListener("click",(e)=>{
	//	window.timeKeeper.showDialog();
	//});

  // TimeKeeper stuff end
  //console.log(code)
  // Counter stuff

  console.log("Enabling Counter")

  reset_regex = new RegExp(/;this\.reset\(\)/)
  counter_reset_code = `;stats.inputs.game = 0;
  window.timeKeeper.playing = false;
  window.cogOn();
  stats.plays.session++;
  stats.plays.lifetime++;
  saveStatistics();
  updateCounterDisplay();this.reset();`

  code = code.assertReplace(reset_regex, counter_reset_code);

  //console.log(code)

  //input_counter_regex = new RegExp(/=function\(a,b\){if\(/) // Without TimeKeeper it's /=function\(a,b\){if\(!/
  //debugger
  input_counter_regex = new RegExp(/=function\(a,b\){if\(!\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}/)
  input_counter_code_end = code.match(input_counter_regex)[0].split('{')[1]
  input_counter_code =`=function\(a,b\){
      if(b !== a.direction) {
        
          if(!window.timeKeeper.playing)
          {
            window.timeKeeper.start();
            window.timeKeeper.playing = true;
            //debugger
          }
          window.cogOff();
          
          stats.inputs.game++;
          stats.inputs.session++;
          stats.inputs.lifetime++;
          stats.statShown === 'inputs' && updateCounterDisplay();
        }
        if(b === "RIGHT") {
         
          window.LightUpInput("right-button-id");
          
        }
        if(b === "LEFT")
        {
          window.LightUpInput("left-button-id");
          
        }
        if(b === "UP")
        {
          window.LightUpInput("top-button-id");
        }
        if(b === "DOWN")
        {
          window.LightUpInput("down-button-id");
        }
  ${input_counter_code_end}`
  code = code.assertReplace(input_counter_regex, input_counter_code);

  stop_regex = new RegExp(/stop=function\(a\){/)
  save_stats_code = `stop=function(a){window.cogOn();saveStatistics();`

  code = code.assertReplace(stop_regex, save_stats_code);

  // Counter things done here

  return code;
}

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.testMod.runCodeAfter = function() {

  let modIndicator = document.createElement('div');
  modIndicator.style='position:absolute;font-family:roboto;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = 'Pipi mod';
  if(window.loaded_code){
    modIndicator.textContent = 'Pudding Mod - Google Test Version';
  }
  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);

}