const spin = new Audio('357_spin1.wav')
let jsonData;
let fullCTList;
let fullTList;
let multiTeamList;
let pistolList;

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
			multiTeamList = jsonData.multi_team
			pistolList = jsonData.pistol
		})
		.catch(error => console.error('Failed to fetch data:', error)); 
}

fetchJson('cssource.json')

function roll(stratArray) {
    let originalLength = stratArray.length
    if (document.getElementById("enableMultiTeam").value == 1) {
        stratArray = stratArray.concat(multiTeamList)
    }

    var index = Math.floor(Math.random() * stratArray.length)
    let selectedStrat = stratArray[index];

    document.getElementById("strat-title").textContent = selectedStrat.name;
    document.getElementById("strat-desc").textContent = selectedStrat.desc;

    if(index >= originalLength) {
        document.getElementById("bothTeamAlert").style.display = "block"
    }else {
        document.getElementById("bothTeamAlert").style.display = "none"
    }

    // spin.play()
}

function rollCTStrat() {
    roll(fullCTList)
}

function rollTStrat() {
    roll(fullTList)
}

function rollPistolStrat() {
    roll(pistolList)
}

var input = document.getElementById("searchbar");
input.addEventListener("keypress", function(event) {
	if(event.key === "Enter") {
		event.preventDefault();
		document.getElementById("searchbutton").click();
	}
});

function search() {
	let input = document.getElementById('searchbar').value
	input = input.toLowerCase();
	let fullList = jsonData.generic.concat(jsonData.ct_only).concat(jsonData.t_only).concat(jsonData.multi_team).concat(pistolList)
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
