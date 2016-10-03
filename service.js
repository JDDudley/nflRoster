var PlayersService = function(callback) {
    var playersData = [];
    var curPlayers = [];
    var myRoster = [];

    function loadPlayersData(){
        // check for localstorage of dataset
        var localData = localStorage.getItem('playersData');
        if (localData) {
            console.log('Loading player data from localstorage...');
            playersData = JSON.parse(localData);
            return callback();
            //short circuit if local data found
        }
        var url = "https://bcw-getter.herokuapp.com/?url="
        var url2 = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(url2);
        $.getJSON(apiUrl, function(data) {
            playersData = data.body.players;
            console.log('Player Data Ready');
            console.log('Writing Player Data to localStorage');
            localStorage.setItem('playersData', JSON.stringify(playersData));
            console.log('Finished Writing Player Data to localStorage');
            callback();
        });
    }

    this.addToRoster = function(id) {
        for (i=0; i < playersData.length; i++) {
            if (playersData[i].id == id) {
                myRoster.push(playersData[i]);
                return myRoster;
            }
        }
    }

    this.removeFromRoster = function(id) {
        for (i=0; i < myRoster.length; i++) {
            if (myRoster[i].id == id) {
                myRoster.splice(i,1);
                return myRoster;
            }
        }
        
    }

    function cleanPlayersData() {
        //clear if no pro_status
        playersData = playersData.filter(function(player) {
            if (player.pro_status) {
                return true;
            }
        });
        //clear if no jersey number
        playersData = playersData.filter(function(player) {
            if (player.jersey) {
                return true;
            }
        });
        //https swap on photos
        // for (i = 0; i < playersData.length; i++) {
        //     player[i].photo = phayer[i].replace('http','https');
        // }
    }

    function cleanTeamNames() {
        for (i=0; i < playersData.length; i++) {
            switch (playersData[i].pro_team) {
                case 'ARI':
                    playersData[i].team = 'Arizona Cardinals';
                    break;
                case 'ATL':
                    playersData[i].team = 'Atlanta Falcons';
                    break;
                case 'BAL':
                    playersData[i].team = 'Baltimore Colts';
                    break;
                case 'BUF':
                    playersData[i].team = 'Buffalo Bills';
                    break;
                case 'CAR':
                    playersData[i].team = 'Carolina Panthers';
                    break;
                case 'CHI':
                    playersData[i].team = 'Chicago Bears';
                    break;
                case 'CIN':
                    playersData[i].team = 'Cincinatti Bengals';
                    break;
                case 'CLE':
                    playersData[i].team = 'Cleveland Browns';
                    break;
                case 'DAL':
                    playersData[i].team = 'Dallas Cowboys';
                    break;
                case 'DEN':
                    playersData[i].team = 'Denver Broncos';
                    break;
                case 'DET':
                    playersData[i].team = 'Detriot Lions';
                    break;
                case 'GB':
                    playersData[i].team = 'Green Bay Packers';
                    break;
                case 'HOU':
                    playersData[i].team = 'Houstan Texans';
                    break;
                case 'IND':
                    playersData[i].team = 'Indianapolis Colts';
                    break;
                case 'JAC':
                    playersData[i].team = 'Jacksonville Jaguars';
                    break;
                case 'KC':
                    playersData[i].team = 'Kansas City Chiefs';
                    break;
                case 'LAR':
                    playersData[i].team = 'LA Rams';
                    break;
                case 'MIA':
                    playersData[i].team = 'Miami Dolphins';
                    break;
                case 'MIN':
                    playersData[i].team = 'Minnesota Vikings';
                    break;
                case 'NE':
                    playersData[i].team = 'New England Patriots';
                    break;
                case 'NO':
                    playersData[i].team = 'New Orleans Saints';
                    break;
                case 'NYG':
                    playersData[i].team = 'New York Giants';
                    break;
                case 'NYJ':
                    playersData[i].team = 'New York Jets';
                    break;
                case 'OAK':
                    playersData[i].team = 'Oakland Raiders';
                    break;
                case 'PHI':
                    playersData[i].team = 'Philadelphia Eagles';
                    break;
                case 'PIT':
                    playersData[i].team = 'Pittsburgh Steelers';
                    break;
                case 'SD':
                    playersData[i].team = 'San Diego Chargers';
                    break;
                case 'SEA':
                    playersData[i].team = 'Seattle Seahawks';
                    break;
                case 'SF':
                    playersData[i].team = 'San Francisco 49ers';
                    break;
                case 'TB':
                    playersData[i].team = 'Tamba Bay Buccaneers';
                    break;
                case 'TEN':
                    playersData[i].team = 'Tennessee Titans';
                    break;
                case 'WAS':
                    playersData[i].team = 'Washington Redskins';
                    break;
            }

        }
    }

    function cleanPositions() {
        for (i=0; i< playersData.length; i++) {
            switch (playersData[i].position) {
                case 'DB':
                    playersData[i].pos = 'Defensive Back';
                    break;
                case 'DL':
                    playersData[i].pos = 'Defensive Line';
                    break;
                case 'DST':
                    playersData[i].pos = 'Defense & Special Teams';
                    break;
                case 'K':
                    playersData[i].pos = 'Kicker';
                    break;
                case 'LB':
                    playersData[i].pos = 'Linebacker';
                    break;
                case 'QB':
                    playersData[i].pos = 'Quarterback';
                    break;
                case 'RB':
                    playersData[i].pos = 'Running Back';
                    break;
                case 'TE':
                    playersData[i].pos = 'Tight End';
                    break;
                case 'WR':
                    playersData[i].pos = 'Wide Receiver';
                    break;
            }
        }
    }

    this.getPlayersByTeam = function(teamName) {
        var teamPlayers = playersData.filter(function(player) {
            if (player.pro_team == teamName) {
                return true;
            }
        })
        curPlayers = teamPlayers;
        return curPlayers;
    }

    this.getPlayersByPosition = function(position) {
        var posPlayers = playersData.filter(function(player) {
            if(player.position == position) {
                return true;
            }
        })
        curPlayers = posPlayers;
        return curPlayers;
    }

    this.getPlayers = function(position, teamName) {
        var out = [];
        if (position == 'null') {
            out = playersData.filter(function(player) {
                if (player.pro_team == teamName) {
                    return true;
                }
            });
        } else if (teamName == 'null') {
            out = playersData.filter(function(player) {
                if (player.position == position) {
                    return true;
                }
            });
        } else {
            out = playersData.filter(function(player) {
                if (player.position == position && player.pro_team == teamName) {
                    return true;
                }
            });
        }
        curPlayers = out;
        return curPlayers;
    }

    this.searchPlayers = function(searchText) {
        var out = [];
        console.log(searchText);
        if (searchText.length < 1) {
            return;
        }
        var outNum = 0;
        for (var i = 0; i < playersData.length; i++) {
            var totMatch = 0;
            for (var j = 0; j < searchText.length; j++) {
                if (playersData[i].fullname[j] == searchText[j]) {
                    totMatch++;
                }
            }
            if (totMatch == searchText.length) {
                out[outNum] = playersData[i];
                outNum++;
            }
        }
        console.log(out);
        return out;
    }

    this.searchPlayersOLD = function(text) {
        var out = [];
        if (curPlayers.length < 1) {
            curPlayers = playersData;
        }
        for (i = 0; i < curPlayers.length; i++) {
            if (curPlayers[i].fullname.substr(1,text.length) == text) {
                out.push(curPlayers[i]);
            }
        }
        curPlayers = out;
        return curPlayers;
    }


//note: this function used for testing and takes significant load time (3000+ players)
//do not use mistakenly
    function writeAllPlayers() {
        var template = '';
        for (i=0; i < playersData.length; i++) {
            player = playersData[i];
            template += `<div class="col-xs-12 col-sm-6 col-sm-4 col-sm-3">
                            <div class="card">
                                <div class="card-img-top img-responsive player-img">
                                    <img src="${player.photo}">
                                </div>
                                <div class="card-block">
                                    <h4 class="card-title">${player.fullname}</h4>
                                    <h6 class="card-subtitle">${player.position}, ${player.jersey}</h6>
                                    <p>Team: ${player.pro_team}</p>
                                </div>
                            </div>
                        </div>`;

        }
        $('#roster').html(template);
        return template;
    }

//not currently used, loop version of filter currently in use
    this.getByTeam = function(teamName) {
        var teamArr = [];
        teamArr = playersData.filter(function(player) {
            if (player.pro_team == teamName) {
                return true;
            }
        });
        console.log(playersData);
        return teamArr;
    }

    loadPlayersData(); //call this function when we create new service
    cleanPlayersData(); //clean up data
    cleanTeamNames(); //readable team names
    cleanPositions(); //readable positions
}
