

function checkColor(RowId,ColId) {
	
	return $('table').find('tr').eq(RowId).find('td').eq(ColId).find('button').css('background-color');
}


function searchlastgray(ColId) {
	
	var row;
	for (row=5; row >= 0; row--) {
		var colour = checkColor(row,ColId);
		if(colour === 'rgb(128, 128, 128)')
		{	
			return row;
		}
	}
	return row;
}

function fillcolor(RowId,ColId,Color) {
	$('table').find('tr').eq(RowId).find('td').eq(ColId).find('button').css('background-color',Color);
}


function operation(col,Color) {

	var lastrow = searchlastgray(col);
	if(lastrow == -1)
		$('#msg').text("Column filled try another column.");
	else
		fillcolor(lastrow,col,Color);
}


function wincheck(one,two,three,four) {
	
	return (one === two && two === three && three === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


function rowCheck() {
	for(var row = 5; row >=0 ;row-- )
	{
		for (var col = 0; col < 4; col++) {
			var check = wincheck(checkColor(row,col),checkColor(row,col+1),checkColor(row,col+2),checkColor(row,col+3));
			
			if(check === true){	
				console.log(row +", " +col);
				return true;
			}
			else
				continue;
		}
	}
}

function colCheck() {
	for (var col= 0; col < 7; col++) {
		for(var row = 0;row < 3; row++){
			var check = wincheck(checkColor(row,col),checkColor(row+1,col),checkColor(row+2,col),checkColor(row+3,col));
			
			if(check === true){	
				console.log(row +", " +col);
				return true;
			}
			else
				continue;
		}
	}
}

function diagonalCheck() {
	for (var row = 0; row < 6; row++) {
		for(var col =0; col < 7 ;col++){
			var lefttoright = wincheck(checkColor(row,col),checkColor(row+1,col+1),checkColor(row+2,col+2),checkColor(row+3,col+3)); 
			var righttoleft = wincheck(checkColor(row,col),checkColor(row+1,col-1),checkColor(row+2,col-2),checkColor(row+3,col-3));

			if(lefttoright === true || righttoleft === true){	
				console.log(row +", " +col);
				return true;
			}
			else
				continue;
		}
	}
}


function finalWinCheck() {
	
	return (rowCheck() || colCheck() || diagonalCheck());
}



var start = prompt("Do you want to Play the game (Yes/No)?"); 

if( start === "Yes" || start === 'yes')
{
	var playerone = prompt("Enter the name for player one. You will be red");
	var playertwo = prompt("Enter the name for player two. You will be blue");

	var playeroneColor = 'rgb(199, 45, 22)';
	var playertwoColor = 'rgb(34, 22, 201)';
	var turn = playerone; 
	$('#msg').text(turn + ": Take your chance..");
	
	$("td button").click(function () {
		var col = $(this).closest('td').index();
		if (turn === playerone) {
			$('#msg').text(playertwo + ": Take your chance..");
			operation(col,playeroneColor);
			if (finalWinCheck()===true)
			{
				$('h1').text(playerone + " Congrats! You won the game.");
				$('h2').fadeOut('fast');
				$('h3').fadeOut('fast');

			}
			turn = playertwo;
		} else {
			$('#msg').text(playerone + ": Take your chance..");
			operation(col,playertwoColor);
			if (finalWinCheck() === true)
			{
				$('h1').text(playertwo + " Congrats! You won the game.");
				$('h2').fadeOut('fast');
				$('h3').fadeOut('fast');
			}
			turn = playerone;
		}
	});
	

}
