var isCounting = false;
var isPaused = false;
var isSettingSchedule;
var hours = 0;
var minutes = 0;
var seconds = 0;
var action;
var videoLink;
let lastLink = '';
var hoursDisplay = document.getElementById("hours");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var scheduleTimeInput;
var scheduleTime;
var scheduleTimeDisplay;
var timeRem;
let sevenMin = 420000;
let strWindowFeatures = "menubar=yes, location=yes, resizable=yes, scrollbars=yes, status=yes";

var urls = {
	1:"https://www.youtube.com/watch?v=Z9CstDydhiM",
	2:"https://www.youtube.com/watch?v=EYtVWLm0om8",
	3:"https://www.youtube.com/watch?v=iiMurowoaxY",
	4:"https://www.youtube.com/watch?v=m9Im0h5FNR4",
	5:"https://www.youtube.com/watch?v=0svSyjHOyFY",
	6:"https://www.youtube.com/watch?v=tFhefdKkfKg",
	7:"https://www.youtube.com/watch?v=yj7VnhE0wjQ",
	8:"https://www.youtube.com/watch?v=Tp_WgYLTgFQ",
	9:"https://www.youtube.com/watch?v=887lax8LDDg",
	10:"https://www.youtube.com/watch?v=_8WSncYS0U0",
	11:"https://www.youtube.com/watch?v=MWDbYS_t3rE",
	12:"https://www.youtube.com/watch?v=FGGaU-iT0Tc",
	13:"https://www.youtube.com/watch?v=TdilRwHQMlQ",
	14:"https://www.youtube.com/watch?v=GP60Ygot8Mk",
	15:"https://www.youtube.com/watch?v=anzIMcsHyDw",
	16:"https://www.youtube.com/watch?v=zCLAxVXaMIc",
	17:"https://www.youtube.com/watch?v=IYhxDGls63E",
	18:"https://www.youtube.com/watch?v=abWLZDTCvjM"
};

document.getElementById("startreset").onclick = function() {
	if (isCounting) {
		//var isSure = confirm("Are you sure you want to reset?");
		isPaused = !isPaused;
		//if (isSure) {

		if(isPaused){
			stopCountdown();
			document.getElementById("startreset").innerHTML = "Resume";
		} else {
			startCountdown();
			document.getElementById("startreset").innerHTML = "Pause";
		}
		// 	location.reload();
		// 	// toggleClass("startreset", "reset_btn");
		// 	// toggleClass("startreset", "start_margin");
		// 	show("pause_btn");
		// 	hide("endTimeDiv");
		// }
		
	} else {
		var timeVal;

		if (scheduleTime > 0) {
			scheduleTime = scheduleTime;
			isSettingSchedule = false;
		} else {
			if(!scheduleTime){
				isSettingSchedule = confirm("First, set schedule");
				scheduleTimeInput = Math.abs(prompt("Enter total study time in hours", 0));
				scheduleTime = (scheduleTimeInput !== 0) ? ((scheduleTimeInput * 60) * 60) : 0;
			}
			
				if(isSettingSchedule && scheduleTimeInput != 0){

					scheduleTimeDisplay = document.createElement('h2');
					scheduleTimeDisplay.style = "padding-top: 10px";
					document.getElementById("sDisplay").appendChild(scheduleTimeDisplay);

					timeRem = document.createElement('p');
					document.getElementById("sDisplay").appendChild(timeRem);

					document.getElementById("linksTitle").style.top = "150px";
					document.getElementById("linkContainer").style.top = "200px";
					document.getElementById("timerSection").style.top = "400px";
					document.getElementById("linkRefreshBtn").style.top = "650px";
					document.getElementById("clearAllBtn").style.top = "650px";
				}

		}
			

		do{
			let time = '20:00';
			timeVal = prompt("Enter incremental time in 'mm:ss' format", time);
			if(timeVal == null){
				alert("You didn't enter a time.");
				return;
			} else {
				var re = /\:/g;
				timeVal = Number.parseInt(timeVal.replace(re, ""));
				if(timeVal < 1){
					alert("number must be greater than 0!!");
				}
			}
			
		} while(timeVal < 1);
		
		timeVal = timeVal.toString();
		if(timeVal.length > 4){
			if(timeVal.length == 6){
				hours = Number.parseInt(timeVal.substring(0, 2));
				minutes = Number.parseInt(timeVal.substring(2, 4));
				seconds = Number.parseInt(timeVal.substring(4));
			} else {
				hours = Number.parseInt(timeVal.substring(0, 1));
				minutes = Number.parseInt(timeVal.substring(1, 3));
				seconds = Number.parseInt(timeVal.substring(3));
			}
		}
		else if(timeVal.length > 2){
			if(timeVal.length == 4){
				hours = 0;
				minutes = Number.parseInt(timeVal.substring(0, 2));
				seconds = Number.parseInt(timeVal.substring(2));
			} else {
				hours = 0;
				minutes = Number.parseInt(timeVal.substring(0, 1));
				seconds = Number.parseInt(timeVal.substring(1));
			}
		}
		else {
			hours = 0;
			minutes = 0;
			seconds = Number.parseInt(timeVal);
		}

		if(typeof videoLink !== 'undefined') {
			lastLink = videoLink;
		}

		videoLink = prompt("Enter URL(enter through if no URL is desired)", lastLink) ||  generateRandomURL();

		document.getElementById("startreset").innerHTML = "Pause";
		

		// seconds === 0 ? seconds = 60 && minutes -= 1 : seconds = seconds;
		if(seconds === 0){
			if(minutes === 0){
				hours--;
				minutes = 59;
				seconds = 60;
			} else {
				seconds = 60;
				minutes--;
			}
		}

		isCounting = true;

		startCountdown();
		// toggleClass("startreset", "reset_btn");
		// toggleClass("startreset", "start_margin");
		hide("endTimeDiv");
		
	}
}

function startCountdown(){
	secondaryCountdown = setInterval(function(){

		if(scheduleTime){
			startTimeRemainingCountdown();
		}
		
		seconds -= 1;
		hours < 10 ? hoursDisplay.innerHTML = "0" + hours : hoursDisplay.innerHTML = hours;
		
		minutes < 10 ? minutesDisplay.innerHTML = "0" + minutes : minutesDisplay.innerHTML = minutes;
		
		seconds < 10 ? secondsDisplay.innerHTML = "0" + seconds : secondsDisplay.innerHTML = seconds;
		
		if(minutes != 0 && seconds === 0){
			minutes -= 1;
			seconds = 60;
		} else if (hours != 0 && minutes === 0 && seconds === 0){
			hours -= 1;
			minutes = 59;
			seconds = 60;
		} else if(hours === 0 && minutes === 0 && seconds === 0){
			stopCountdown();
			// var songURL = generateRandomURL();
			
            let vid = window.open(videoLink, "YOUTUBE_WindowName", strWindowFeatures);
            
			isCounting = false;

			if(scheduleTime > 0){
                document.getElementById("startreset").innerHTML = "Continue";

                setTimeout(function() {
                    vid.close();
                    alert("BACK TO WORK!");
                }, sevenMin);
			} else {
				document.getElementById("startreset").innerHTML = "Start Timer";
				
                show('endTimeDiv');
			}
		} else {
			isCounting = isCounting;
		}
	}, 1000);
	
}

function startTimeRemainingCountdown(){
	let displayedHour = Math.trunc((scheduleTime / 60) / 60);
	let displayedMinute = Math.trunc(((scheduleTime / 60) / 60 - displayedHour) * 60);
	scheduleTime--;

	if(scheduleTimeInput > 1) {
		scheduleTimeDisplay.innerHTML =`Study schedule has been set for ${scheduleTimeInput} hours`;
	} else {
		scheduleTimeDisplay.innerHTML =`Study schedule has been set for ${scheduleTimeInput} hour`;
	}
	
	
	if( displayedHour > 0) {
		if(displayedHour == 1) {
			timeRem.innerHTML =`Time remaining: ${displayedHour} hour ${displayedMinute} minutes`;
		} else {
			timeRem.innerHTML =`Time remaining: ${displayedHour} hour(s) ${displayedMinute} minutes`;
		}
	} else {
		timeRem.innerHTML =`Time remaining: ${displayedMinute} minutes`;
	}
	
	
	if(scheduleTime === 0){
		stopCountdown();
		window.open(videoLink, "YOUTUBE_WindowName", strWindowFeatures);
        show('endTimeDiv');
	}
}

function stopCountdown(){
    clearInterval(secondaryCountdown);
}

function show(id){
	document.getElementById(id).style.display="inline-block";
}

function hide(id){
	document.getElementById(id).style.display="none";
}

function toggleClass(id, cls){
	document.getElementById(id).classList.toggle(cls);
}

//KEEP FOR RANDOM SONG GENERATION

function generateRandomURL(){
	var randomNum = Math.round(Math.random() * 17) + 1;
	return urls[randomNum];
}