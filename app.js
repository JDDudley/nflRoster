var loading = true; //used for spinner
var playersService = new PlayersService(ready);
var textSearch = false; //trigger to run array through text search
var myRosterHidden = true; //hide roster until player added
var userName = '';

//when playersService is done loading
function ready(){
    loading = false; //done loading
    $('#loading').hide();
    $('#my-roster').hide();
    $('#my-roster-title').hide();
    $('#results-title').hide();
    // var myRoster = playersService.getMyRoster();
    // console.log(myRoster);
    // console.log(myRoster.length);
    // if (myRoster.length > 0) {
    //     $('#my-roster').show();
    //     $('#my-roster-title').show();
    // }
}

function checkCurrentRoster() {
    var myRoster = playersService.getMyRoster();
    console.log(myRoster.length);
    if (myRoster.length > 0) {
        showMyRoster();
        drawMyRoster(myRoster);
    }
}

checkCurrentRoster();

function loadData() {
    var userName = prompt('What\'s your first name?');
    var myRoster = playersService.getUsersData(userName);
    console.log(myRoster);
    drawMyRoster(myRoster);
}

function saveData() {
    var userName = prompt('What\'s your first name?');
    console.log('writing to save object...');
    var myRoster = playersService.getMyRoster();
    var usersData = playersService.saveUsersData(userName, myRoster);
    console.log(usersData);
}

//called by page input to run search depending on input
function searchPlayers() {
    var pos = document.getElementById('select-pos').value;
    var team = document.getElementById('select-team').value;
    //clear search box for now bc its not functioning with these
    //team and position selectors
    document.getElementById('search-name').value = '';
    console.log('searching...');
    var teamArr = playersService.getPlayers(pos, team);
    updateOptions(pos, team);
    if (myRosterHidden == false) {
        hideMyRoster();
    }
    if (teamArr.length > 0) {
        $('#results-title').show();
    }
    drawRoster(teamArr);
}

function searchText(searchText) {
    var out = [];
    out = playersService.searchPlayers(searchText);
    if (myRosterHidden == false) {
        hideMyRoster();
    }
    if (out.length > 0) {
        $('#results-title').show();
    }
    drawRoster(out);
}

//once a dropdown is used, top option 'SELECT...' is replaced with 'ALL...'
//keep to prevent whole roster from loading unless desired
function updateOptions(pos, team) {
    if (pos != 'null') {
        document.getElementById('select-pos').options[0].text = 'ALL POSITIONS';
    }
    if (team != 'null') {
        document.getElementById('select-team').options[0].text = 'ALL TEAMS';
    }
}

//function below still works correctly but has been replaced by
//searchPlayers universal array puller
function searchPosition(selectedPos) {
    if (selectedPos != 'null') {
        var posArr = playersService.getPlayersByPosition(selectedPos);
        drawRoster(posArr);
        document.getElementById('select-team').value
    }
}

//user roster add, delete, show/hide, draw
function addToRoster(playerToAdd) {
    var myRoster = playersService.addToRoster(playerToAdd);
    showMyRoster();
    drawMyRoster(myRoster);
    playersService.saveUserData();
}

function showMyRoster() {
    myRosterHidden = false;
    $('#my-roster').show();
    $('#my-roster-title').show();
    document.getElementById('roster-toggle').className = "glyphicon glyphicon-triangle-bottom";
}

function hideMyRoster() {
    myRosterHidden = true;
    $('#my-roster').hide();
    document.getElementById('roster-toggle').className = "glyphicon glyphicon-triangle-right";
}

function toggleMyRoster() {
    if (myRosterHidden == true) {
        $('#my-roster').show();
        myRosterHidden = false;
        document.getElementById('roster-toggle').className = "glyphicon glyphicon-triangle-bottom";
    } else {
        $('#my-roster').hide();
        myRosterHidden = true;
        document.getElementById('roster-toggle').className = "glyphicon glyphicon-triangle-right";
    }
}

function removeFromRoster(playerToRemove) {
    var myRoster = playersService.removeFromRoster(playerToRemove);
    if (myRoster.length == 0) {
        hideMyRoster();
    }
    drawMyRoster(myRoster);
    playersService.saveUserData();
}

function drawMyRoster(myRoster) {
    var template = '';
    for (i=0; i < myRoster.length; i++) {
        player = myRoster[i];
        template += `<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="card player-card">
                            <div class="player-controls container-fluid">
                                <div class="row">
                                    <div class="col-xs-6 add-player">
                                    </div>
                                    <div class="col-xs-6 remove-player">
                                        <span class="glyphicon glyphicon-remove" onclick="removeFromRoster(${player.id})"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-img-top img-responsive">
                                <img src="${player.photo}" class="player-img">
                            </div>
                            <div class="card-block player-info">
                                <h4 class="card-title">${player.fullname}</h4>
                                <h6 class="card-subtitle">${player.pos}, #${player.jersey}</h6>
                                <p>${player.team}</p>
                            </div>
                        </div>
                    </div>`;

    }
    $('#my-roster').html(template);
}

//takes filtered array and draws to page
function drawRoster(arr) {
    var template = '';
    for (i=0; i < arr.length; i++) {
        player = arr[i];
        //this code will go to div #roster
        //currently in own row with .col-xs-12
        template += `<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="card player-card">
                            <div class="player-controls container-fluid">
                                <div class="row">
                                    <div class="col-xs-6 add-player">
                                        <span class="glyphicon glyphicon-plus" onclick="addToRoster(${player.id})"></span>
                                    </div>
                                    <div class="col-xs-6 remove-player">
                                    </div>
                                </div>
                            </div>
                            <div class="card-img-top img-responsive">
                                <img src="${player.photo}" class="player-img">
                            </div>
                            <div class="card-block player-info">
                                <h4 class="card-title">${player.fullname}</h4>
                                <h6 class="card-subtitle">${player.pos}, #${player.jersey}</h6>
                                <p>${player.team}</p>
                            </div>
                        </div>
                    </div>`;

    }
    $('#roster').html(template);
    return template;
}

//was used for search buttons

// $('#search-team').on('click',function () {
//     var team = $('#select-team :selected').value;
//     console.log($('#select-team').value);
//     var teamArr = playersService.getPlayersByTeam(team);
//     console.log(team);
//     console.log(teamArr);
// });

// $('#search-pos').on('click', function() {
//     var pos = $('#select-pos :selected').value;
//     $('#roster').html(pos);
//     var posArr = playersService.getPlayersByPosition(pos);
//     console.log(pos);
//     // drawRoster(teamArr);
// });
