var context;
var shape = new Object();
var board;
var score;
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
var time_countdown;
var monster_quantity;
var color1;
var color2;
var color3;




$(document).ready(function() {
	context = canvas.getContext("2d");
	localStorage.setItem('k','k');

	updateOnChange();
	showPage("welcome");

	// When the user click the X button close the modal
	$(".close").eq(0).on("click", function(e) {
		console.log("hey")
		$("#myModal").hide();
	  });
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == $("#myModal")[0]) {
			$("#myModal").hide();
		}
	}
	// When the user clicks the Escape button, close the modal.
	$(document).on('keydown', function(event) {
		if (event.key == "Escape") {
			$("#myModal").hide();
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
	if(page === "about"){
		$(document.body).css( "background", "white" );
	}

	else if(page === "about"){
		$(document.body).css( "background", "gray" );
	}
	else{
		setBackroundImageForBody("./pictures/back5.jpg")
	}

	hideDivs();
    $('#' + page).show();
}

setBackroundImageForBody = (picture_path) => {
		$(document.body).css( "background-image", "url(" + picture_path + ")");
		$(document.body).css("background-repeat","round");
		$(document.body).css("background-attachment", "fixed");
		$(document.body).css("background-size", "cover");
}

function hideDivs(){
	$("#time").hide();
	$("#welcome").hide();
	$("#score").hide();
	$("#game").hide();
	$("#registration").hide();
	$("#configuration").hide();
	$("#login").hide();

}

function displayAboutModalScreen(){ 
	$("#aboutModal").show()
}

/* ----------- --- ---------- */



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
// function validateEmail(email) {
// 	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(String(email).toLowerCase());
// }

// function checkRegisteration(){
// 	var username_val = $.trim($('#username').val());
// 	var password_val = $.trim($('#password').val());
// 	var fullname_val = $.trim($('#fullname').val());
// 	var email_val = $.trim($('#email').val());
// 	var birthdate_val = $.trim($('#birthdate').val());

// 	if(!username_val){
// 	  alert('Please Enter Your Username');
// 	  return false;
// 	}
// 	if(!password_val){
// 		alert('Please Enter Your Password');
// 		return false;
// 	}
// 	else if(password_val.length < 6){
// 		alert('Your Password Must Be Atleast 6 Characters');
// 		return false;
// 	}
// 	else if( !(/\d/.test(password_val)&/[a-z]/i.test(password_val))){
// 		alert('Your Password Must Contain Both Numbers And Letters');
// 		return false;
// 	}
// 	if(!fullname_val){
// 		alert('Please Enter Your Full Name');
// 		return false;
// 	}
// 	else if(/\d/.test(fullname_val)){
// 		alert('Full Name Cannot Contain Numbers');
// 		return false;
// 	}
// 	if(!email_val){
// 		alert('Please Enter Your Email');
// 		return false;
// 	}
// 	else if(!validateEmail(email_val)){
// 		alert('Please Enter A Valid Email Address');
// 		return false;
// 	}

// 	if(!birthdate_val){
// 		alert('Please Enter Your Birthdate');
// 		return false;
// 	}
// 	else{
// 	  alert('Thank You For Registering!');
// 	  localStorage.setItem(username_val,password_val);
// 	  return true;
// 	}
// }



// function checklogin(){
// 	var username_val = $.trim($('#username_login').val());
// 	var password_val = $.trim($('#password_login').val());


// 	var user_password = localStorage.getItem(username_val);
// 	if(user_password == null){
// 	  alert('Username Does Not Exist');
// 	  return false;
// 	}
// 	else if(user_password != password_val){
// 		alert('Incorrect Password');
// 		return false;
// 	}
// 	else{
// 		alert('Welcome Back '+ username_val+'!');
// 		return true;
// 	}
// }

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

}

function startGame(){

	showPage("game");
	Start();

}

function initGameSettings(){
	moveup = $.trim($('#up').val());
	movedown = $.trim($('#down').val());
	moveleft = $.trim($('#left').val());
	moveright = $.trim($('#right').val());
	food_remain = $.trim($('#ball_quantity').val());
	time_countdown = $.trim($('#time_quantity').val());
	monster_quantity = $.trim($('#monster_quantity').val());

	color1 = $.trim($('#color1').val());
	color2 = $.trim($('#color2').val());
	color3 = $.trim($('#color3').val());

	// $(document).keydown(function(event){
		
	// })
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
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
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
	interval = setInterval(UpdatePosition, 250);
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
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
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
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
