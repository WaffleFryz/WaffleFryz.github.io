const spin = new Audio('357_spin1.wav')

function fetchJson(file_name) {
	fetch(file_name)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();  
		})
		.then(data => console.log(data))  
		.catch(error => console.error('Failed to fetch data:', error)); 
}

const jsonData = fetchJson('cssource.json')
var fullCTList = jsonData.generic.concat(jsonData.ct_only)
var fullTList = jsonData.generic.concat(jsonData.t_only)
var multiTeamList = jsonData.multi_team

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
