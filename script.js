const spin = new Audio('357_spin1.wav')
let jsonData;
let fullCTList;
let fullTList;
// let multiTeamList;
let pistolList;
let pistolSecondaryList;

function fetchJson(file_name) {
	fetch(file_name)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();  
		})
		.then(data => {
			jsonData = data
			fullCTList = jsonData.generic.concat(jsonData.ct_only)
			fullTList = jsonData.generic.concat(jsonData.t_only)
			// multiTeamList = jsonData.multi_team
			pistolList = jsonData.pistol
			pistolSecondaryList = jsonData.generic.filter((obj) => obj.can_pistol)
		})
		.catch(error => console.error('Failed to fetch data:', error)); 
}

fetchJson('cssource.json')

function roll(stratArray) {
    // let originalLength = stratArray.length
    // if (document.getElementById("enableMultiTeam").value == 1) {
    //     stratArray = stratArray.concat(multiTeamList)
    // }

    var index = Math.floor(Math.random() * stratArray.length)
    let selectedStrat = stratArray[index];

    document.getElementById("strat-title").textContent = selectedStrat.name;
    document.getElementById("strat-desc").textContent = selectedStrat.desc;

	var history = document.getElementById("history");
	history.textContent += selectedStrat.name + " - " + selectedStrat.desc + "\n";

	stratArray.splice(index, 1)
	
	document.getElementById("strat-title-2").style.display = "hide"
	document.getElementById("strat-desc-2").style.display = "hide"

    // if(index >= originalLength) {
    //     document.getElementById("bothTeamAlert").style.display = "block"
    // }else {
    //     document.getElementById("bothTeamAlert").style.display = "none"
    // }

    // spin.play()
}

function rollSecondary() {

    var index = Math.floor(Math.random() * pistolSecondaryList.length)
    let selectedStrat = pistolSecondaryList[index];

    document.getElementById("strat-title-2").textContent = selectedStrat.name;
    document.getElementById("strat-desc-2").textContent = selectedStrat.desc;

	var history = document.getElementById("history");
	history.textContent += "AND " + selectedStrat.name + " - " + selectedStrat.desc + "\n";
	
	document.getElementById("strat-title-2").style.display = "block"
	document.getElementById("strat-desc-2").style.display = "block"
}

//		{"name" : "FitnessGram Pacer Test", "desc" : "T's go to A. If they get a kill go to B and vise versa. Repeat until bomb is being planted"}
//
//	"multi_team": [
// 		{"name" : "Retake practice", "desc" : "T announce where they're planting while CT's can post up outside of site; no shooting until bomb is planted"},
// 		{"name" : "Track & Field", "desc" : "Both teams race from A to B. You're only allowed to shoot once you reach B. Grenades allowed during race. (Umamusme OST optional) https://www.youtube.com/watch?v=8UC6AQyRoc8"}
//	]

function rollCTStrat() {
    roll(fullCTList)
}

function rollTStrat() {
    roll(fullTList)
}

function rollPistolStrat() {
    roll(pistolList)
	rollSecondary(pistolSecondaryList)
}

function search() {
	let input = document.getElementById("searchbar").value
	input = input.toLowerCase();
	let fullList = jsonData.generic.concat(jsonData.ct_only).concat(jsonData.t_only).concat(pistolList)
	for (i = 0;i < fullList.length; i++) {
		if(fullList[i].name.toLowerCase().includes(input)) {
			document.getElementById("strat-title").textContent = fullList[i].name;
			document.getElementById("strat-desc").textContent = fullList[i].desc;
			return;
		}
	}
	document.getElementById("strat-title").textContent = "!NONE FOUND!";
	document.getElementById("strat-desc").textContent = "idk what to tell you. sorry";
}

function resetStrats() {
	fetchJson('cssource.json')
	document.getElementById("strat-title").textContent = "!STRATS RESET!";
	document.getElementById("strat-desc").textContent = "Strats reset!";
	document.getElementById("history").textContent = "";
}