var context;
var pictures_path = "./pictures/"
var hearts_path = pictures_path + "hearts/"
var pacman = new Object();
var coin = new Object();
pacman.hearts = 5;
pacman.eaten = false;
var heart = new Object();
var ghost1 = new Object();
var ghost2 = new Object();
var ghost3 = new Object();
var ghost4 = new Object();
var board_corners = new Object();
var ill_color = false;
var first_time = 0;
var illToGreen = false;
board_corners.corner = {
	1: [0,0],
	2: [0,9],
	3: [9,0],
	4: [9,9]
}
var board;
var empty_cell_array;
var score;
var normalized_score = 0;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var ghost_interval;
var coin_interval;
// Game vars
var moveup_code = 38;
var movedown_code = 40;
var moveleft_code = 37;
var moveright_code = 39;

var moveup = "ArrowUp";
var movedown = "ArrowDown";
var moveleft = "ArrowLeft";
var moveright = "ArrowRight";
var player;
var food_remain;
var total_food;
var time_countdown;
var time_left;
var monster_quantity;
var color1;
var color2;
var color3;
var last_key_pressed = 4;

var food_5_points_color;
var food_15_points_color;
var food_20_points_color;
var music_player;
/* ------------------- Enums ------------------------- */
const board_cell_type = {
	empty_cell: 0,
	food_5_points: 1,
	food_15_points: 2,
	food_20_points: 3,
	Pacman: 4,
	Wall: 5,
	Heart: 6,
	coin:7,
	ghost1: 10,
	ghost2: 11,
	ghost3: 12,
	ghost4: 13

};

var ghost_arr = [ghost1, ghost2,ghost3,ghost4]



$(document).ready(function() {
	context = canvas.getContext("2d");
	localStorage.setItem('k','k');

	updateOnChange();
	showPage("welcome");

	// When the user click the X button close the modal
	$(".close").eq(0).on("click", function(e) {
		$("#aboutModal").hide();
	  });
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == $("#aboutModal")[0]) {
			$("#aboutModal").hide();
		}
	}
	// When the user clicks the Escape button, close the modal.
	$(document).on('keydown', function(event) {
		if (event.key == "Escape") {
			$("#aboutModal").hide();
		}
	});

	/* Validation plugins was used to set up rules for the registreation, configuration and login page */
	$('#reg_form').validate({
		
		rules:{
			username:{
				required:true,
				validUser: true
			},
			password: {
				required:true,
				minlength: 6,
				validPassword: true,
			},
			fullname:{
				required:true,
				pattern: /^[a-zA-z]+$/
			},
			email:{
				required:true,
				pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			},
			birthdate:{
				required:true
			}
		},
		messages:{
			username:{
				required:"Please Enter A Username",
			},
			password:{ 
				required:"Please Enter A Password",
				minlength: "Password must be at least 6 characters",
			},
			fullname:{
				required:"Please Enter A Name",
				pattern: "Fullname can't contain numbers"
			} ,
			email:{
				required: "Please Enter An Email Address",
				pattern: "Please Enter A Valid Email Address"
			},
			birthdate: "Please Enter A Birthdate"
				
		},
			

		submitHandler:	(form) => {
			let user = $("#username").val();
			let password = $("#password").val();
			localStorage.setItem(user, password)
			alert("You were sucessfully registered")
			showPage('login')}
		})
	

		$('#login_form').validate({
		
			rules:{
				username:{
					required:true,
					isRegistered: true
				},
				password: {
					required:true,
					isPassowrdCorrect: true
				},	
			},
			messages:{
				username:{
					required:"Please enter a username",
					validUser: "No such username is listed in the system"
					
				},
				password: {
					required: "Please enter password",
				}
			},
			submitHandler:	(form) => {showPage('configuration')}})

			$('#configuration_form').validate({
		
				rules:{
					quantity:{
						required:true,
						validFoodQuantity: true
					},
					duration:{
						required:true,
						validGameDuration: true
					},
					monsters:{
						validMonstersAmount: true
					}
	
				},
				submitHandler:	(form) => {}
				})
	
});


function addUser(){

}

/* ----------- Validation Methods ----------------------------*/

$.validator.addMethod("validPassword", function(value, element){

    if( !(/\d/.test(value)&/[a-z]/i.test(value))){
        return false;
    } else {
        return true;
    };
},"Password must contain at least one letter and one number");



$.validator.addMethod("isPassowrdCorrect", function(value, element){

	var username_val = $.trim($('#username_login').val());
	var user_password = localStorage.getItem(username_val);
	if(user_password != value){
		return false;
	}
	else{
		return true;
	}
},"Wrong Password");

$.validator.addMethod("validUser", function(value, element){
	var user = localStorage.getItem(value)

    if( user == null){
        return true;
    } else {
        return false;
    };
},"A user with the same username already exists in the system");

$.validator.addMethod("isRegistered", function(value, element){
	var user = localStorage.getItem(value)

    if( user != null){
        return true;
    } else {
		//alert("Username does not exist")
        return false;
    };
},"No such user exists in the system");



$.validator.addMethod("validFoodQuantity", function(value, element){

    if( value<50 || value >90 ){
        return false;
    } else {
        return true;
    };
},"Food quantity should be between 50 and 90");

$.validator.addMethod("validGameDuration", function(value, element){

    if( value<60){
        return false;
    } else {
        return true;
    };
},"Game duration should be at least 60 seconds");

$.validator.addMethod("validMonstersAmount", function(value, element){

    if( value<1 || value > 4){
        return false;
    } else {
        return true;
    };
},"There should be between 1 to 4 monsters");

validPassword = (passowrd) => {
	if( !(/\d/.test(passowrd)&/[a-z]/i.test(passowrd))){
		return false;
	}
		return true;
}


/* ---------------------------------------*/

function passwordCorrect(){
	var username_val = $.trim($('#username_login').val());
	var user_password = localStorage.getItem(username_val);
	if(user_password != value){
		return false;
	}
	else{
		return true;
	}
}

/* ----------- Screen switching methods ---------- */
function showPage(page){
	resetGame();
	if(page === "game"){
		$(document.body).css( "background", "white" );
		$(document.body).css( "overflow-y", "clip" ); // Remove the scrollbar during game time

	}

	else{
		setBackroundImageForBody("./pictures/back5.jpg")
		$(document.body).css( "overflow-y", "" );

	}

	hideDivs();
    $('#' + page).show();
	if(page == 'game'){
		$('#game_score_time_live').show();
	}
}

setBackroundImageForBody = (picture_path) => {
		$(document.body).css( "background-image", "url(" + picture_path + ")");
		$(document.body).css("background-repeat","round");
		$(document.body).css("background-attachment", "fixed");
		$(document.body).css("background-size", "cover");
}

function hideDivs(){
	$("#welcome").hide();
	$("#game_score_time_live").hide();
	$("#game").hide();
	$("#registration").hide();
	$("#configuration").hide();
	$("#login").hide();

}

function displayAboutModalScreen(){ 
	$("#aboutModal").show()
}

/* -------------------------- */


/* ----------Random Functions------------ */
function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(){
	return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
}

function RandomConfig(){
	$('#ball_quantity').val(randomInteger(50,90));
	$('#time_quantity').val(randomInteger(60,600));
	$('#monster_quantity').val(randomInteger(1,4));
	$('#color1').val(randomColor());
	$('#color2').val(randomColor());
	$('#color3').val(randomColor());
}
/* ------------------------------------------ */

function getKeyValue(event){
	event_code = event.keyCode;
	if(event_code == 38)
		return "ArrowUp";
	else if(event_code == 40)
		return "ArrowDown";
	else if(event_code == 37)
		return "ArrowLeft";
	else if(event_code == 39)
		return "ArrowRight";

}

function removeValueFromEmptyArray(value){

	empty_cell_array = empty_cell_array.filter(function(element){
		return element[0] != value[0] || element[1] != value[1]
	})
}

function compareCellArrays(cell1, cell2){
	if(cell1.length != 2 || cell2.length != 2)
		return false;
	else if(cell1[0] == cell2[0] && cell1[1] == cell2[1])
		return true;
	else 
		return false;
}

function updateOnChange(){
	$( "#up" ).keydown(function( event ) {
		moveup = getKeyValue(event);
		$("#up").val(moveup);
	})
	$( "#down" ).keydown(function( event ) {
		movedown = getKeyValue(event);
		$("#down").val(movedown);
	})
	$( "#left" ).keydown(function( event ) {
		moveleft = getKeyValue(event);
		$("#left").val(moveleft);
	})
	$( "#right" ).keydown(function( event ) {
		moveright = getKeyValue(event);
		$("#right").val(moveright);
	})

	
	$("#username_login").on("change" , function(){
		player = $("#username_login").val();
		$("#User").val(player);
	})

	$("#up").on("change" , function(){
		moveup = $("#up").val();
		$("#MoveUp").val(moveup);
	})
	$("#down").on("change", function(){
		movedown = $("#down").val();
		$("#MoveDown").val(movedown);
	})
	$("#left").on("change", function(){
		moveleft = $("#left").val();
		$("#MoveLeft").val(moveleft);
	})
	$("#right").on("change", function(){
		moveright = $("#right").val();
		$("#MoveRight").val(moveright);
	})

	$("#ball_quantity").on("change", function(){
		food_remain = $("#ball_quantity").val();
		$("#BallNumber").val(food_remain);
	})

	$("#time_quantity").on("change", function(){
		time_countdown = $("#time_quantity").val();
		$("#TimeLeft").val(time_countdown);
	})

	$("#monster_quantity").on("change", function(){
		monster_quantity = $("#monster_quantity").val();
		$("#Monsters").val(monster_quantity);
	})

	$("#color1").on("change", function(){
		food_5_points_color = $("#color1").val();
		$("#5pointballscolor").val(food_5_points_color);
	})

	$("#color2").on("change", function(){
		food_15_points_color = $("#color2").val();
		$("#15pointballscolor").val(food_15_points_color);
	})

	$("#color3").on("change", function(){
		food_20_points_color = $("#color3").val();
		$("#20pointballscolor").val(food_20_points_color);
	})

}

function updateUpKey(event, element) {
	moveup_code = event.keyCode;
	limit(element);
}

function updateDownKey(event,element) {
	movedown_code = event.keyCode;
	limit(element);
}

function updateLeftKey(event,element) {
	moveleft_code = event.keyCode;
	limit(element);
}

function updateRightKey(event,element) {
	moveright_code = event.keyCode;
	limit(element);
}

function initGameSettings(){
	moveup = $.trim($('#up').val());
	movedown = $.trim($('#down').val());
	moveleft = $.trim($('#left').val());
	moveright = $.trim($('#right').val());
	food_remain = $.trim($('#ball_quantity').val());
	total_food = food_remain;
	time_countdown = $.trim($('#time_quantity').val());
	monster_quantity = $.trim($('#monster_quantity').val());

	food_5_points_color = $.trim($('#color1').val());
	food_15_points_color = $.trim($('#color2').val());
	food_20_points_color = $.trim($('#color3').val());

	$("#lives_bar").attr("src","./pictures/hearts/5hearts.png");
}

function limit(element)
{
    var max_chars = 1;
	if(element.value != "ArrowUp" && element.value != "ArrowDown" && element.value != "ArrowLeft" && element.value != "ArrowRight"){
		if(element.value.length > max_chars) {
			element.value = element.value.substr(1, max_chars);
		}
	}
}

function Start() {
	board = new Array();
	empty_cell_array = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;

	initGameSettings();
	$("#User").val(player);

	$("#MoveUp").val(moveup);
	$("#MoveDown").val(movedown);
	$("#MoveLeft").val(moveleft);
	$("#MoveRight").val(moveright);

	$("#BallNumber").val(food_remain);
	$("#TimeLeft").val(time_countdown);
	$("#Monsters").val(monster_quantity);

	$("#5pointballscolor").val(food_5_points_color);
	$("#15pointballscolor").val(food_15_points_color);
	$("#20pointballscolor").val(food_20_points_color);

	$("#5pointballs").val(Math.round(food_remain*0.6));
	$("#15pointballs").val(Math.round(food_remain*0.3));
	$("#20pointballs").val(Math.round(food_remain*0.1));

	var pacman_remain = 1;
	start_time = new Date();
/***********************************init game*************************** */

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		for (var j = 0; j < 10; j++) {
	
				board[i][j] = board_cell_type.empty_cell;
				empty_cell_array.push([i,j])
				cnt--;
		}

	}
	
	placeWallsOnBoard(board);
	placeCoinOnBoard(board);
	placeGhostOnBoard(board, monster_quantity);
	placePacmanOnBoard(board);
	placeHeartsOnBoard(board);
	placeFoodOnBoard(board);

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 180); 
	ghost_interval = setInterval(UpdateGhostPosition, 550); 
	coin_interval = setInterval(UpdateCoinPosition, 550); 
}

function findRandomEmptyCell(board) {
	let random_cell = randomInteger(0,empty_cell_array.length-1);
	let cell = empty_cell_array.splice(random_cell,1);
	return cell[0];
}

function GetKeyPressed() {
	if(keysDown[moveup_code]){
	// if (keysDown[38]) {
		last_key_pressed = 1;
		return 1;
	}
	if(keysDown[movedown_code]){
	// if (keysDown[40]) {
		last_key_pressed = 2;
		return 2;
	}
	if(keysDown[moveleft_code]){
	// if (keysDown[37]) {
		last_key_pressed = 3;
		return 3;
	}
	if(keysDown[moveright_code]){
	// if (keysDown[39]) {
		last_key_pressed = 4;
		return 4;
	}
	return 0;
}
/* ------------ Place Objects On Board Methods -------------- */

function placeWallsOnBoard(board){
	
	//max ghosts = 4 , max food = 90 , hearts = 2, pacman = 1, coin = 1 -- > min space = 2
	let max_walls = 100 - 4 - total_food - monster_quantity
	let max_in = Math.min(12,max_walls);
	let num_of_walls = randomInteger(2,max_in); // 2 -- 45(depending on input)
	let k=0;
	while(k<num_of_walls) {
		let wall_cell = findRandomEmptyCell(board);
		//do not place walls at corners
		if(!compareCellArrays(wall_cell,board_corners.corner[1]) && !compareCellArrays(wall_cell,board_corners.corner[2]) &&
			!compareCellArrays(wall_cell,board_corners.corner[3]) && !compareCellArrays(wall_cell,board_corners.corner[4]) 
			&& !compareCellArrays(wall_cell,[5,5])){

				board[wall_cell[0]][wall_cell[1]] = board_cell_type.Wall;
				k++;
		}
	}
}
function placePacmanOnBoard(board){
	let empty_cell = findRandomEmptyCell(board)
	board[empty_cell[0]][empty_cell[1]] = board_cell_type.Pacman
	pacman.i = empty_cell[0];
	pacman.j = empty_cell[1];
}

function placeHeartsOnBoard(board){
	let empty_cell = findRandomEmptyCell(board)
	board[empty_cell[0]][empty_cell[1]] = board_cell_type.Heart

	empty_cell = findRandomEmptyCell(board)
	board[empty_cell[0]][empty_cell[1]] = board_cell_type.Heart

}

function placeGhostOnBoard(board,ghost_count){
	let chosen_corner;
	
	for (var i = 1; i <= ghost_count; i++) {
		chosen_corner = board_corners.corner[i]
		board[chosen_corner[0]][chosen_corner[1]] = i+9;
		ghost_arr[i-1].x = chosen_corner[0];
		ghost_arr[i-1].y = chosen_corner[1];
		ghost_arr[i-1].type = i+9;
		//check the last item was not "eaten" by the ghost
		ghost_arr[i-1].lastCellValue = board_cell_type.empty_cell;
		removeValueFromEmptyArray(chosen_corner)
	}
}

function placeCoinOnBoard(board){
	board[5][5] = board_cell_type.coin;
	coin.x = 5;
	coin.y = 5;
	coin.lastCellValue = board_cell_type.empty_cell;
	removeValueFromEmptyArray([5,5]);
}

function updateLife(){

	if (pacman.eaten)
		pacman.hearts--;

	else
		pacman.hearts++;

	// In case that was the last live - show 1 heart to the user before the game over message
	if(pacman.hearts <= 0)
		$("#lives_bar").attr("src",hearts_path + "1hearts.png");

	// In case the pacman has full life don't increase the life bar	
	else if(pacman.hearts > 5)
		$("#lives_bar").attr("src",hearts_path + "5hearts.png");

	else	
		$("#lives_bar").attr("src",hearts_path + pacman.hearts + "hearts.png");
}


function pacmanWasEaten(board){
	pacman.eaten = true;
	updateLife();
	pac_color = "lightblue";
	ill_color = true;
	for (var i = 1; i <= monster_quantity; i++) {
		ghostX = ghost_arr[i-1].x
		ghostY = ghost_arr[i-1].y
		board[ghostX][ghostY] = ghost_arr[i-1].lastCellValue;
	}
	board[pacman.i][pacman.j] = board_cell_type.empty_cell;
	empty_cell_array.push([pacman.i,pacman.j])
	placeGhostOnBoard(board,monster_quantity);
	placePacmanOnBoard(board);
}

function placeFoodOnBoard(board){

	let number_of_food_5_points = Math.floor(0.6 * total_food);
	let number_of_food_15_points = Math.floor(0.3 * total_food);
	let number_of_food_20_points = Math.floor(0.1 * total_food);

	// Sometimes if the total food is not a rounded number (20, 50 etc) the sum of the food could be 1 values less than the total food
	if (number_of_food_5_points + number_of_food_15_points + number_of_food_20_points != total_food){
		number_of_food_5_points = number_of_food_5_points + (total_food - (number_of_food_5_points + number_of_food_15_points + number_of_food_20_points))
	}
	let number_of_food = total_food
	let random_number;

	while( number_of_food > 0){
		let random_empty_cell = findRandomEmptyCell(board);
		let i = random_empty_cell[0];
		let j = random_empty_cell[1];
		if(number_of_food > 0){
			random_number = Math.random()

			// 10% of the random values will corresponds to the 10% of 20 points food
			if (random_number < 0.1 & number_of_food_20_points > 0){
				board[i][j] = board_cell_type.food_20_points
				number_of_food_20_points--;
			}
			// 30% of the random values will corresponds to the 30% of 15 points food
			else if(random_number >= 0.1 & random_number < 0.4 & number_of_food_15_points > 0){
				board[i][j] = board_cell_type.food_15_points
				number_of_food_15_points--;
			}
			// 60% of the random values will corresponds to the 60% of 5 points food
			else if(number_of_food_5_points > 0){
				board[i][j] = board_cell_type.food_5_points
				number_of_food_5_points--;
			}
			else if(number_of_food_15_points > 0){
				board[i][j] = board_cell_type.food_15_points
				number_of_food_15_points--;
			}
			else if(number_of_food_20_points > 0){
				board[i][j] = board_cell_type.food_20_points
				number_of_food_20_points--;
			}

			number_of_food = number_of_food_5_points + number_of_food_15_points + number_of_food_20_points;
		}
	}
}
/* --------------------------------------------------------------------- */

/* --------------------------- Move Methods ------------------------------- */

function moveGhost(board, ghost){

	let moved = true;
	board[ghost.x][ghost.y] = ghost.lastCellValue;
	if(ghost.x != pacman.i){
		if(ghost.x < pacman.i && validMove(board,ghost.x+1,ghost.y))
			ghost.x++;
		else if(ghost.x > pacman.i && validMove(board,ghost.x-1,ghost.y))
			ghost.x--;
		else
			moved = false;
	}

	if(!moved || ghost.x == pacman.i && ghost.y != pacman.j){
		if(ghost.y < pacman.j && validMove(board,ghost.x,ghost.y+1))
			ghost.y++;
		else if(ghost.y > pacman.j && validMove(board,ghost.x,ghost.y-1))
			ghost.y--;
		else
			moved = false;
	}	
	
	if(!moved){
		//cannot go according to the chase plan because of wall on either side
		// check all possible directions
		let ranDirection = randomInteger(1,4);
		if(ranDirection == 1 && validMove(board,ghost.x-1,ghost.y))
			ghost.x--;
		else if(ranDirection == 2 && validMove(board,ghost.x+1,ghost.y))
			ghost.x++;
		else if(ranDirection == 3 &&validMove(board,ghost.x,ghost.y-1))
			ghost.y--;
		else if(ranDirection == 4 &&validMove(board,ghost.x,ghost.y+1))
			ghost.y++;
	}

	if(ghost.x == pacman.i && ghost.y == pacman.j){
		if(ghost == ghost1 || ghost == ghost3)
			score-=10;
		else if (ghost == ghost2)
			score-=20;
		else if(ghost == ghost4){
			score-=20;
			pacman.hearts--;
		}
		board[ghost.x][ghost.y] = board_cell_type.pacman;
		pacmanWasEaten(board);
	}
	else{
		if(board[ghost.x][ghost.y] == board_cell_type.coin)
			ghost.lastCellValue = coin.lastCellValue;
		else
			ghost.lastCellValue = board[ghost.x][ghost.y];
		board[ghost.x][ghost.y] = ghost.type;
	}

}

function moveCoin(board, coin){
	let saw_ghost = false;
	board[coin.x][coin.y] = coin.lastCellValue
	let ranDirection = randomInteger(1,4);
	let moved = false;
	if(ranDirection == 1 && validMove(board,coin.x-1,coin.y)){
		coin.x--;
		moved = true;
	}
	else if(ranDirection == 2 && validMove(board,coin.x+1,coin.y)){
		coin.x++;
		moved = true;
	}
	else if(ranDirection == 3 &&validMove(board,coin.x,coin.y-1)){
		coin.y--;
		moved = true;
	}
	else if(ranDirection == 4 &&validMove(board,coin.x,coin.y+1)){
		coin.y++;
		moved = true;
	}
	
	if(coin.x == pacman.i && coin.y == pacman.j){
		score+=50;
		board[coin.x][coin.y] = board_cell_type.pacman;
		placeCoinOnBoard(board);
	}
	else if(moved){
		// coin.lastCellValue = board[coin.x][coin.y];
		
		for (let i = 0; i < ghost_arr.length; i++) {
			if(board[coin.x][coin.y] == ghost_arr[i].type){
				coin.lastCellValue = ghost_arr[i].lastCellValue;
				saw_ghost = true;
				break;
			}
		}
		if(!saw_ghost)
			coin.lastCellValue = board[coin.x][coin.y];

		board[coin.x][coin.y] = board_cell_type.coin;

	}
	else if (!moved){
		board[coin.x][coin.y] = board_cell_type.coin;
	}
}


/* ------------------------- Draw Methods ------------------------------ */

function drawHeart(fromx, fromy,lw=30,hlen=30) {

	var x = fromx;
	var y = fromy;
	var width = lw ;
	var height = hlen;
	
	context.beginPath();
	var topCurveHeight = height * 0.3;
	context.moveTo(x, y + topCurveHeight);

	// top left curve
	context.bezierCurveTo(
	  x, y, 
	  x - width / 2, y, 
	  x - width / 2, y + topCurveHeight
	);
  
	// bottom left curve
	context.bezierCurveTo(
	  x - width / 2, y + (height + topCurveHeight) / 2, 
	  x, y + (height + topCurveHeight) / 2, 
	  x, y + height
	);
  
	// bottom right curve
	context.bezierCurveTo(
	  x, y + (height + topCurveHeight) / 2, 
	  x + width / 2, y + (height + topCurveHeight) / 2, 
	  x + width / 2, y + topCurveHeight
	);
  
	// top right curve
	context.bezierCurveTo(
	  x + width / 2, y, 
	  x, y, 
	  x, y + topCurveHeight
	);
  
	context.fillStyle = "red";
	context.fill();
  
  }


function drawRightPacman(x,y){
	context.beginPath();
	context.arc(x, y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
	context.lineTo(x, y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(x + 5, y - 15, 5, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawLeftPacman(x,y){
	context.beginPath();
	context.arc(x, y, 30, 1.15 * Math.PI , 0.85 * Math.PI); // half circle
	context.lineTo(x, y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(x - 5, y - 15, 5,2 * Math.PI, 0); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawTopPacman(x,y){
	context.beginPath();
	context.arc(x, y, 30, 1.70 * Math.PI , 1.30 * Math.PI); // half circle
	context.lineTo(x, y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(x - 12, y , 5,2 * Math.PI, 0); // circle
	context.fillStyle = "black"; //color	
	context.fill();
}

function drawDownPacman(x,y){
	context.beginPath();
	context.arc(x, y, 30, 0.65 * Math.PI , 0.35 * Math.PI); // half circle
	context.lineTo(x, y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(x + 12, y , 5,2 * Math.PI, 0); // circle
	context.fillStyle = "black"; //color
	context.fill();
}

function drawCoin(x,y){
	context.beginPath();
	context.arc(x, y, 30, 0 * Math.PI , 2 * Math.PI); //circle
	context.lineTo(x, y);
	context.fillStyle = "gold"; //color
	context.fill();
	context.beginPath();
	context.arc(x , y , 20 ,0  * Math.PI, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color
	context.fill();

	context.beginPath();
	context.arc(x , y , 20 ,0  * Math.PI, 2 * Math.PI); // circle
	context.strokeStyle = "black"; //color
	context.stroke();

	context.beginPath();
	context.arc(x , y , 30 ,0  * Math.PI, 2 * Math.PI); // circle
	context.strokeStyle = "black"; //color
	context.stroke();
}

function drawGhost(center, i,j){
	let scary_ghost = false;
	if(board[i][j]== board_cell_type.ghost1 || board[i][j]==board_cell_type.ghost2 || board[i][j]==board_cell_type.ghost3 || board[i][j]==board_cell_type.ghost4){
		context.beginPath();
		if(board[i][j]==board_cell_type.ghost1)
			context.fillStyle = "red";
		if(board[i][j]==board_cell_type.ghost2)
			context.fillStyle = randomColor();
		if(board[i][j]==board_cell_type.ghost3)
			context.fillStyle = "blue";
		if(board[i][j]==board_cell_type.ghost4){
			context.fillStyle = randomColor();
			scary_ghost = true;
		}
		context.arc(center.x , center.y, 20, 1*Math.PI, 2* Math.PI);
		context.lineTo(center.x+20, center.y+15);
		context.arc(center.x + 20 / 4 + 10, center.y + 15, 20 * 0.25, 0, Math.PI);
		context.arc(center.x + 20 / 4  , center.y + 15, 20 * 0.25, 0, Math.PI);
		context.arc(center.x + 20 / 4 -  10, center.y + 15, 20 * 0.25, 0, Math.PI);
		context.arc(center.x + 20 / 4 -20, center.y + 15, 20 * 0.25, 0, Math.PI);
		context.closePath();
		context.fill();
		context.strokeStyle = "black";
		context.stroke();

		context.beginPath();
		context.fillStyle = "white"; 
		context.arc(center.x + 10, center.y -5, 5, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.arc(center.x - 10, center.y -5, 5, 0, 2 * Math.PI);
		context.fill();

		context.beginPath();
		context.fillStyle = "black";
		context.arc(center.x + 10, center.y -5, 3, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.arc(center.x - 10, center.y -5, 3, 0, 2 * Math.PI);
		context.fill();

		if(scary_ghost){
			context.beginPath();
			context.fillStyle = "white";
			context.arc(center.x, center.y + 8, 8, 0, 2* Math.PI);
			context.fill();
			context.strokeStyle = "black";
			context.stroke();
		}
	}
}

function drawFood(x,y,color, type){
	if (type == board_cell_type.food_5_points){
		context.beginPath();
		context.arc(x, y, 5, 0, 2 * Math.PI); // circle
		context.fillStyle = color; //color
		context.fill()
	}
	else if (type == board_cell_type.food_15_points){
		context.beginPath();
		context.arc(x, y, 10, 0, 2 * Math.PI); // circle
		context.fillStyle = color; //color
		context.fill();
	}
	else{
		context.beginPath();
		context.arc(x, y, 15, 0, 2 * Math.PI); // circle
		context.fillStyle = color; //color
		context.fill();
	}
}

function drawWall(x,y){
	context.beginPath();
	context.rect(x-30, y-30 , 60, 60);
	context.fillStyle = "black"; //color
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = "blue";
	context.stroke();
}

/* ---------------------------------------------------------------------------------- */
function Draw(Direction) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_left;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			drawGhost(center,i,j);
			if (Direction == '0')
				Direction = last_key_pressed;
			if (board[i][j] == board_cell_type.Pacman) {				
				if (Direction == '1')
					drawTopPacman(center.x,center.y);
				else if (Direction == '2')
					drawDownPacman(center.x,center.y);
				else if (Direction == '3')
					drawLeftPacman(center.x,center.y);
				else if (Direction == '4')
					drawRightPacman(center.x,center.y);
				//change pacman color back to yellow if was eaten and some time has passed
				if(ill_color && first_time == 3){
					if(illToGreen)
						pac_color = "green"
					else
						pac_color = "yellow"
					ill_color = false;
					first_time = 0;
				}
				else if(ill_color && first_time < 3)
					first_time +=1;
			} 
			else if(board[i][j] == board_cell_type.coin)
				drawCoin(center.x,center.y);
			else if(board[i][j] == board_cell_type.Heart)
				drawHeart(center.x,center.y) 
			
			else if (board[i][j] == board_cell_type.food_5_points) {
				drawFood(center.x,center.y,food_5_points_color, board_cell_type.food_5_points)
 			
			} else if(board[i][j] == board_cell_type.food_15_points){
				drawFood(center.x,center.y,food_15_points_color, board_cell_type.food_15_points)
			
			} else if(board[i][j] == board_cell_type.food_20_points){
				drawFood(center.x,center.y,food_20_points_color, board_cell_type.food_20_points)
			} else if (board[i][j] == board_cell_type.Wall) {
				//drawWall(center.x , center.y )
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}

		}
	}
}


/* ------------------------------ Update Position Methods ----------------------------------- */
function validMove(board,x,y){
	if(x < 0 || x >9 || y<0 || y>9)
		return false;
	else if(board[x][y] == board_cell_type.Wall)
		return false;
	else if(board[x][y] == board_cell_type.ghost1 || board[x][y] == board_cell_type.ghost2
		 || board[x][y] == board_cell_type.ghost3 ||board[x][y] == board_cell_type.ghost4 )
		 return false;
	return true;
}

function UpdateGhostPosition(){
	for (var k = 0; k < monster_quantity; k++) {
		moveGhost(board,ghost_arr[k]);
	}
}

function UpdateCoinPosition(){
	moveCoin(board,coin)
}

function UpdatePosition() {
	board[pacman.i][pacman.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (validMove(board,pacman.i,pacman.j-1)){
			pacman.j--;
		}
	}
	if (x == 2) {
		if (validMove(board,pacman.i,pacman.j+1)){
			pacman.j++;
		}
	}
	if (x == 3) {
		if (validMove(board,pacman.i-1,pacman.j)){
			pacman.i--;
		}
	}
	if (x == 4) {
		if (validMove(board,pacman.i+1,pacman.j)){
			pacman.i++;
		}
	}
	if (board[pacman.i][pacman.j] == board_cell_type.food_5_points) {
		empty_cell_array.push([pacman.i,pacman.j])
		score = score + 5;
		normalized_score = normalized_score + 1
	}
	
	else if (board[pacman.i][pacman.j] == board_cell_type.food_15_points) {
		empty_cell_array.push([pacman.i,pacman.j])
		score = score + 15;
		normalized_score = normalized_score + 1
	}
	
	else if (board[pacman.i][pacman.j] == board_cell_type.food_20_points) {
		empty_cell_array.push([pacman.i,pacman.j])
		score = score + 20;
		normalized_score  = normalized_score + 1;
	}
	else if (board[pacman.i][pacman.j] == board_cell_type.Heart) {
		empty_cell_array.push([pacman.i,pacman.j])
		pacman.eaten = false;
		updateLife()
	}
	board[pacman.i][pacman.j] = board_cell_type.Pacman;
	var currentTime = new Date();
	time_elapsed = Math.round((currentTime - start_time) / 1000,0);
	time_left = time_countdown - time_elapsed
	if (time_left <= 10) {
		pac_color = "red";
		$("#lblTime").css("background-color","red")
	}

	else if (normalized_score >= total_food/2) {
		if(ill_color)
			illToGreen = true;
		else
			pac_color = "green";
	}
	// eat last food
	if (normalized_score  ==  total_food) {
		normalized_score +=1
		Draw(x);
	}

	else if (normalized_score  >  total_food) {
		$("#lblTime").css("background-color","white")
		window.alert("Your Score is: " + score)
		window.alert("Winner!!!");
		resetGame();
		showPage("configuration");
	}

	else if (time_left < 0) {
		$("#lblTime").css("background-color","white")
		window.alert("Your Score is: " + score)
		if(score < 100)
			window.alert("You are better than "+ score+" points!");
		else
			window.alert("Winner!!!");
		resetGame();
		showPage("configuration");
	}
	else if(pacman.hearts <= 0){
		$("#lblTime").css("background-color","white")
		window.alert("Your Score is: " + score)
		window.alert("Loser!");
		resetGame();
		showPage("configuration");
	}
	else {
		Draw(x);
	}
}

/* --------------------------------------------------------------------------------------- */

function checkConfiguration(){

	let flag = true;
	let moves = [moveup, movedown, moveleft, moveright];
	for (var i = 0; i < moves.length; i++) {
		for (var j = i+1; j < moves.length; j++) {
			if(moves[i] == moves[j]){
				flag = false;
				alert("Please Choose Different Controls For Each Move")
				break;
			}
		}
		if(!flag)	
			break;
	}
	if(flag)
		startGame();
}

function startGame(){
	showPage("game");
	resetGame();
	playAudio();
	Start();
}

function resetGame(){
	window.clearInterval(interval);
	window.clearInterval(ghost_interval);
	window.clearInterval(coin_interval);
	pauseAudio();
	board = null
	lblScore.value = 0;
	score = 0;
	normalized_score = 0;
	lblTime.value = time_countdown;
	pacman.hearts = 5
	illToGreen = false;
	$("#lblTime").css("background-color","white")
}

/*************************************** MUSIC ********************************8 */ 

function playAudio() {
	document.getElementById("game_sounds").play();
	document.getElementById("game_sounds").vol = 0.05;

  }
  
  function pauseAudio() {
	document.getElementById("game_sounds").pause();
  }
function newGameKey(){
	resetGame();
	showPage("configuration");
}
