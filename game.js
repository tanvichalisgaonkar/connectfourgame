

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
			turn = playertwo;
		} else {
			$('#msg').text(playerone + ": Take your chance..");
			operation(col,playertwoColor);
			turn = playerone;
		}
	});
	

}
