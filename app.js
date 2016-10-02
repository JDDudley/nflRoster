var loading = true; //used for spinner
var playersService = new PlayersService(ready);

function ready(){
    loading = false; //done loading
    $('#loading').hide();

}

function searchPlayers() {
    pos = document.getElementById('select-pos').value;
    team = document.getElementById('select-team').value;
    var teamArr = playersService.getPlayers(pos, team);
    drawRoster(teamArr);
}

function searchPosition(selectedPos) {
    if (selectedPos != 'null') {
        var posArr = playersService.getPlayersByPosition(selectedPos);
        drawRoster(posArr);
        document.getElementById('select-team').value
    }
}

function drawRoster(arr) {
    var template = '';
    for (i=0; i < arr.length; i++) {
        player = arr[i];
        template += `<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="card player-card">
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
