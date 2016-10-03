var loading = true; //used for spinner
var playersService = new PlayersService(ready);
var textSearch = false; //trigger to run array through text search

//when playersService is done loading
function ready(){
    loading = false; //done loading
    $('#loading').hide();

}
//called by page input to run search depending on input
function searchPlayers() {
    pos = document.getElementById('select-pos').value;
    team = document.getElementById('select-team').value;
    //clear search box for now bc its not functioning with these
    //team and position selectors
    document.getElementById('search-name').value = '';
    console.log('searching...');
    var teamArr = playersService.getPlayers(pos, team);
    updateOptions(pos, team);
    drawRoster(teamArr);
}

function searchText(searchText) {
    var out = [];
    out = playersService.searchPlayers(searchText);
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

//takes filtered array and draws to page
function drawRoster(arr) {
    var template = '';
    for (i=0; i < arr.length; i++) {
        player = arr[i];
        //this code will go to div #roster
        //currently in own row with .col-xs-12
        template += `<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="card player-card">
                            <div class="card-img-top img-responsive">
                                <img src="${player.photo}" class="player-img">
                            </div>
                            <div class="card-block player-info">
                                <h4 class="card-title">${player.fullname}</h4>
                                <h6 class="card-subtitle">${player.position}, #${player.jersey}</h6>
                                <p>${player.pro_team}</p>
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
