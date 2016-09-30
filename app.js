var loading = true; //used for spinner
var playersService = new PlayersService(ready);

function ready(){
    loading = false; //done loading
    $('#loading').hide();
    $('#roster').text = playersService.givePlayers();
}