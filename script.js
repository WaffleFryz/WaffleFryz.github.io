const spin = new Audio('357_spin1.wav')

const text = '{ "generic": [' +
        '{"name" : "Knife Round", "desc" : "Knife only. No grenades."},' +
        '{"name" : "Grenadier", "desc" : "Buy as many nades as possible. Must use all first before knifing."},' +
        '{"name" : "Hero Rifler", "desc" : "Only the topfrag can buy a gun other than pistols. If they can\'t buy one, donate one."},' +
        '{"name" : "He\'s lit!", "desc" : "You must say \'he\'s lit\' whenever you see or hit an enemy"},' +
        '{"name" : "Heavy Mag", "desc" : "Can only move with 50% mag"},' +
        '{"name" : "2 at Banana", "desc" : "All callouts are banana"},' +
        '{"name" : "Homerun ", "desc" : "You must run back to spawn upon kill"},' +
        '{"name" : "hacks.com", "desc" : "You must type something like \'hacks.com\' upon kill"},' +
        '{"name" : "The Mechanic", "desc" : "Only the bottom fragger is allowed to reload guns; they cannot shoot until they are the last one alive; Swap mechanic if they die early"},' +
        '{"name" : "Moonwalking ", "desc" : "You can only move by holding S"},' +
        '{"name" : "Shitcaller", "desc" : "Team leader hides in the spawn/toilet and calls shots; when they are last alive they can leave toilet"},' +
        '{"name" : "Crabwalk Dualies", "desc" : "You must be cosntantly crouchwalking with Dual Berettas"},' +
        '{"name" : "DOOM ", "desc" : "You can only move with W and S"},' +
        '{"name" : "Deathball", "desc" : "Entire team moves closely together"},' +
        '{"name" : "Flock o birds", "desc" : "Entire team walks together and scatter when shot at; regroup when quiet"},' +
        '{"name" : "Tag team", "desc" : "One player from your team is chosen to leave spawn; when they die choose another player"},' +
        '{"name" : "I\'ve been hit!", "desc" : "Say something like \'I\'ve been hit!\' anytime you take damage"},' +
        '{"name" : "Art Break", "desc" : "Draw a smiley face or dick at spawn before leaving"},' +
        '{"name" : "Flying Scoutsman", "desc" : "Buy the Scout (SSG-08). You can only shoot while in the air"},' +
        '{"name" : "Juan Deag", "desc" : "You must only use the Desert Eagle"},' +
        '{"name" : "Piloting school ", "desc" : "Invert mouse"},' +
        '{"name" : "Counter Strike on Ice", "desc" : "Cannot stop/crouch/walk unless planting/defusing. Feel free to do a 360 jump whenever appropriate"},' +
        '{"name" : "Non-Fungible Guns", "desc" : "Every player on their team has to buy a unique mid-tier gun"},' +
        '{"name" : "Marching Fire", "desc" : "Buy Negev and hold M1 the entire round"},' +
        '{"name" : "Expensive Fake Flash", "desc" : "You must fake flash with your primary when rounding a corner"},' +
        '{"name" : "Stress-induced Blindness", "desc" : "Last player alive must close their eyes/turn off their monitor. Team can direct them"},' +
        '{"name" : "Honorbound", "desc" : "When pulling out a pistol/knife, you must get a kill before switching"},' +
        '{"name" : "Leapfrog", "desc" : "You must leapfrog with a teammate to move unless you\'re the last alive/alone"},' +
        '{"name" : "MLG Compliation", "desc" : "Do a 360 when you encounter an enemy"},' +
        '{"name" : "Hotline Miami", "desc" : "You must use the gun of the enemy you just killed"},' +
        '{"name" : "Onamanapia", "desc" : "Mute your game and imitate the sounds"},' +
        '{"name" : "Randomizer", "desc" : "Generate a number 2-4, then another number 1-5. Press those in the buy menu"}' +
    '],' +
    '"ct_only": [' +
        '{"name" : "Ninja Clan", "desc" : "Entire team must attempt to ninja defuse. Silenced guns, knife and util only"}' +
    '],' +
    '"t_only": [' +
        '{"name" : "P90 Rush B", "desc" : "сука блять"},' +
        '{"name" : "FitnessGram Pacer Test", "desc" : "T\'s go to A. If they get a kill go to B and vise versa. Repeat until bomb is being planted"}' +
    '],' +
    '"multi_team": [' +
        '{"name" : "Hide & Seek", "desc" : "T\'s have to kill all the CT\'s; CT\'s are only allowed to have USP/P2000; No planting allowed"},' +
        '{"name" : "Retake practice", "desc" : "T announce where they\'re planting while CT\'s can post up outside of site; no shooting until bomb is planted"},' +
        '{"name" : "Track & Field", "desc" : "Both teams race from A to B. You\'re only allowed to shoot once you reach B. Grenades allowed during race. (Umamusme OST optional)\\nhttps://www.youtube.com/watch?v=8UC6AQyRoc8"}' +
    ']}';

var jsonData = JSON.parse(text);
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

    spin.play()
}

function rollCTStrat() {
    roll(fullCTList)
}

function rollTStrat() {
    roll(fullTList)
}