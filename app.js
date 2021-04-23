var context;
var shape = new Object();
var board;
var score;
var normalized_score = 0;
var pac_color;
var start_time;
var time_elapsed;
var interval;
// Game vars
var moveupkey;
var movedown;
var moveleft;
var moveright;
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

/* ------------------- Enums ------------------------- */
const board_cell_type = {
	empty_cell: '0',
	food_5_points: '1',
	food_15_points: '3',
	food_20_points: '5',
	Pacman: '2',
	Wall: '4',
};


$(document).ready(function() {
	context = canvas.getContext("2d");
	localStorage.setItem('k','k');

	updateOnChange();
	showPage("welcome");

	// When the user click the X button close the modal
	$(".close").eq(0).on("click", function(e) {
		console.log("hey")
		$("#aboutModal").hide();
	  });
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == $("#myModal")[0]) {
			$("#aboutModal").hide();
		}
	}
	// When the user clicks the Escape button, close the modal.
	$(document).on('keydown', function(event) {
		if (event.key == "Escape") {
			$("#aboutModal").hide();
		}
	});

	/* Validation plugins was used to set up rules for the registreation and login page */
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
				pattern: /[a-zA-Z]/
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
				minLength: "Password must be at least 6 characters",
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
			

		submitHandler:	(form) => {showPage('login')}
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
			submitHandler:	(form) => {showPage('configuration')}
			})
	
	//Start();
});



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
        return false;
    };
},"No such user exists in the system");

validPassword = (passowrd) => {
	if( !(/\d/.test(passowrd)&/[a-z]/i.test(passowrd))){
		return false;
	}
		return true;
}

/* ---------------------------------------*/



/* ----------- Screen switching methods ---------- */
function showPage(page){

	if(page === "game"){
		$(document.body).css( "background", "white" );
	}
	else{
		setBackroundImageForBody("./pictures/back5.jpg")
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

function updateOnChange(){
	$("#up").on("change", function(){
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

}

function limit(element)
{
    var max_chars = 1;

    if(element.value.length > max_chars) {
        element.value = element.value.substr(1, max_chars);
    }
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;


	initGameSettings();

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

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = board_cell_type.Wall;
			} else {
				var randomNum = Math.random();
				// if (randomNum <= (1.0 * food_remain) / cnt) {
				// 	food_remain--;
				// 	board[i][j] = board_cell_type.food_5_points;
				//}
				 if (randomNum < (1.0 * (pacman_remain )) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = board_cell_type.Pacman;
				} else {
					board[i][j] = board_cell_type.empty_cell;
				}
				cnt--;
			}
		}
	}

	placeFoodOnBoard(board)

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
	interval = setInterval(UpdatePosition, 100); //250
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		last_key_pressed = 1;
		return 1;
	}
	if (keysDown[40]) {
		last_key_pressed = 2;
		return 2;
	}
	if (keysDown[37]) {
		last_key_pressed = 3;
		return 3;
	}
	if (keysDown[39]) {
		last_key_pressed = 4;
		return 4;
	}
	return 0;
}

function placeFoodOnBoard(board){
	let number_of_food_5_points = Math.floor(0.6 * total_food);
	let number_of_food_15_points = Math.floor(0.3 * total_food);
	let number_of_food_20_points = Math.floor(0.1 * total_food);
	
	var emptyCell;
	

	while (number_of_food_5_points > 0){
		emptyCell = findRandomEmptyCell(board);

		if (board[emptyCell[0]][emptyCell[1]] == board_cell_type.empty_cell){
			board[emptyCell[0]][emptyCell[1]] = board_cell_type.food_5_points
			number_of_food_5_points--
		}
	}

	while (number_of_food_15_points > 0){
		emptyCell = findRandomEmptyCell(board);

		if (board[emptyCell[0]][emptyCell[1]] == board_cell_type.empty_cell){
			board[emptyCell[0]][emptyCell[1]] = board_cell_type.food_15_points
			number_of_food_15_points--
		}
	}

	
	while (number_of_food_20_points > 0){
		emptyCell = findRandomEmptyCell(board);

		if (board[emptyCell[0]][emptyCell[1]] == board_cell_type.empty_cell){
			board[emptyCell[0]][emptyCell[1]] = board_cell_type.food_20_points
			number_of_food_20_points--
		}
	}
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

function Draw(Direction) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_left;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (Direction == '0')
				Direction = last_key_pressed;
			if (board[i][j] == 2) {				
				if (Direction == '1')
					drawTopPacman(center.x,center.y);
				else if (Direction == '2')
					drawDownPacman(center.x,center.y);
				else if (Direction == '3')
					drawLeftPacman(center.x,center.y);
				else if (Direction == '4')
					drawRightPacman(center.x,center.y);
				

			// if (board[i][j] == board_cell_type.Pacman) {
			// 	drawTopPacman(center.x,center.y);

				// context.beginPath();
				// context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				// context.lineTo(center.x, center.y);
				// context.fillStyle = pac_color; //color
				// context.fill();
				// context.beginPath();
				// context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				// context.fillStyle = "black"; //color
				// context.fill();
			} else if (board[i][j] == board_cell_type.food_5_points) {
				drawFood(center.x,center.y,food_5_points_color, board_cell_type.food_5_points)
				// context.beginPath();
				// context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				// context.fillStyle = "black"; //color
				// context.fill();
 			
			} else if(board[i][j] == board_cell_type.food_15_points){
				drawFood(center.x,center.y,food_15_points_color, board_cell_type.food_15_points)
			
			} else if(board[i][j] == board_cell_type.food_20_points){
				drawFood(center.x,center.y,food_20_points_color, board_cell_type.food_20_points)
			} else if (board[i][j] == board_cell_type.Wall) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;

	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == board_cell_type.food_5_points) {
		score = score + 5;
		normalized_score = normalized_score + 1
	}
	
	else if (board[shape.i][shape.j] == board_cell_type.food_15_points) {
		score = score + 15;
		normalized_score = normalized_score + 1
	}
	
	else if (board[shape.i][shape.j] == board_cell_type.food_20_points) {
		score = score + 20;
		normalized_score  = normalized_score + 1;
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = Math.round((currentTime - start_time) / 1000,0);
	time_left = time_countdown - time_elapsed
	if (time_left <= 10) {
		pac_color = "red";
		$("#lblTime").css("background-color","red")
	}
	else if (normalized_score >= total_food/2) {
		pac_color = "green";
	}

	if (normalized_score == total_food) {
		window.clearInterval(interval);
		$("#lblTime").css("background-color","white")
		window.alert("Game completed");
		showPage("configuration");
	}

	else if (time_left <= 0) {
		window.clearInterval(interval);
		$("#lblTime").css("background-color","white")
		window.alert("Game Over");
		window.alert("Your Score is: " + score)
		showPage("configuration");
	} 
	else {
		Draw(x);
	}
}


function startGame(){
	showPage("game");
	Start();
}
