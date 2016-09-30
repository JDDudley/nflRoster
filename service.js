var PlayersService = function(callback) {
    var playersData = [];

    function loadPlayersData(){
        //check for localstorage of dataset
        var localData = localStorage.getItem('playerData');
        if (localData) {
            playerData = JSON.parse(localData);
            return callback();
            //short circuit if local data found
        }
        var url = "http://bcw-getter.herokuapp.com/?url="
        var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(url2);
        $.getJSON(apiUrl, function(data) {
            debugger
            playersData = data.body;
            console.log('Player Data Ready');
            console.log('Writing Player Data to localStorage');
            localStorage.setItem('playersData', JSON.stringify(playersData));
            console.log('Finished Writing Player Data to localStorage');
            callback();
        });
    }

    this.givePlayers = function() {
        return playersData;
    }

    this.getPlayersByTeam = function(teamName) {
        playersData.filter(function(player) {
            if (player.team == teamName) {
                return true;
            }
        })
    }

    this.getPlayersByPosition = function(position) {
        playersData.filter(function(player) {
            if(player.position == position) {
                return true;
            }
        })
    }

    // this.writePlayers = function() {
    //     var template = '';
    //     for (i=0; i < playersData.length; i++) {
    //         template += `<div class="col-xs-12 col-sm-6 col-sm-4 col-sm-3">
    //                         <div class="card">
    //                             <div class="card-img-top img-responsive player-img">
    //                                 <img src="${}">
    //                             </div>
    //                             <div class="card-block">
    //                                 <h4 class="card-title">Player Name</h4>
    //                                 <h6 class="card-subtitle">Position, #</h6>
    //                             </div>
    //                         </div>
    //                     </div>`;

    //     }
    // }

    loadPlayersData(); //call this function when we create new service
}
