//
// calculator.js
// Created by: Kiarash Khodabakhshi
// Student ID: 301203001
// Date Created: September 25th, 2019
// Date Last Modified: September 27th, 2019
//
// The application will allow users to choose to produce
// a calculated “Mean of grade” or “Weighted grades”
// The result is displayed under the “Result” label in the
// browser. As well, the Percentage column 
// (the percentage of the corresponding activity) is updated
// as the user is typing the into the “Grade” Column.
//
// Additional features implemented include:
// Pressing 'r' to refresh the browser page
// and 'q' to quit the application and close the browser
//

// press ‘r’ to refresh the page
document.addEventListener('keyup', function(key){
    if(key.keyCode == 82)
        document.location.reload();
});

// press ‘q’ to quit the application (closes the browser page)
document.addEventListener('keyup', function(key){
    if(key.keyCode == 81)
        window.close();
});

function isPos(value){
	return (Math.sign(value) == 1);
}

function isNonNeg(value){
	return (Math.sign(value) == 0 || isPos(value));
}

function zeroLength(value){
	return (value.length == 0);
}

function percCalc(gradeVal, totalVal, percentOut){
	if(isNonNeg(gradeVal) && !zeroLength(gradeVal) && isPos(totalVal)){
		percentOut.value = (gradeVal/totalVal * 100).toFixed(1) + "%";
 		if (percentOut.hidden == true)
 			percentOut.hidden = false;
	}
	else
		if(percentOut.hidden == false)
			percentOut.hidden = true;
}

var act1 = {grade:document.querySelector("#Grade1"),
			perc:document.querySelector("#Perc1"),
			total:document.querySelector("#Total1"),
			weight:document.querySelector("#Weight1")};

var act2 = {grade:document.querySelector("#Grade2"),
			perc:document.querySelector("#Perc2"),
			total:document.querySelector("#Total2"),
			weight:document.querySelector("#Weight2")};

var act3 = {grade:document.querySelector("#Grade3"),
			perc:document.querySelector("#Perc3"),
			total:document.querySelector("#Total3"),
			weight:document.querySelector("#Weight3")};

var act4 = {grade:document.querySelector("#Grade4"),
			perc:document.querySelector("#Perc4"),
			total:document.querySelector("#Total4"),
			weight:document.querySelector("#Weight4")};

// Calculate and update percentages for each activity (Live!)
act1.grade.onkeyup = function(){percCalc(act1.grade.value, act1.total.value, act1.perc)};
act1.total.onkeyup = function(){percCalc(act1.grade.value, act1.total.value, act1.perc)};

act2.grade.onkeyup = function(){percCalc(act2.grade.value, act2.total.value, act2.perc)};
act2.total.onkeyup = function(){percCalc(act2.grade.value, act2.total.value, act2.perc)};

act3.grade.onkeyup = function(){percCalc(act3.grade.value, act3.total.value, act3.perc)};
act3.total.onkeyup = function(){percCalc(act3.grade.value, act3.total.value, act3.perc)};

act4.grade.onkeyup = function(){percCalc(act4.grade.value, act4.total.value, act4.perc)};
act4.total.onkeyup = function(){percCalc(act4.grade.value, act4.total.value, act4.perc)};



var meanButton = document.querySelector("#Mean");
var weightedButton = document.querySelector("#Weighted");



// Calculate mean of grades for all activities
function meanCalc(){
	var sum=0.00; var count=0;

	var activities=[];
	activities.push(act1, act2, act3, act4);

	for (var i=0; i<activities.length; i++){
		if(activities[i].perc.hidden == false) {
			sum+=activities[i].grade.value/activities[i].total.value;
			count++;
		}
	}

	if (count!=0)
		document.querySelector("#finalOutput").value=(sum/count * 100).toFixed(2) + "/100";
	else
		document.querySelector("#finalOutput").value="NaN";

	document.querySelector("#finalOutput").hidden=false;
}

meanButton.onclick = function(){meanCalc()};



// Calculate weighted average for all activities
function weightedCalc(){
	var weightedSum=0.00;
	var count=0;

	var activities=[];
	activities.push(act1, act2, act3, act4);

	for (var i=0; i<activities.length; i++){
		if(isNonNeg(activities[i].weight.value) &&
		!zeroLength(activities[i].weight.value) &&
		activities[i].perc.hidden == false) {
			weightedSum+=(activities[i].grade.value/activities[i].total.value)*activities[i].weight.value;
			count+=(activities[i].weight.value*1);
		}
	}

	if (count!=0)
		document.querySelector("#finalOutput").value=(weightedSum/count * 100).toFixed(2) + "/100";
	else
		document.querySelector("#finalOutput").value="NaN";

	document.querySelector("#finalOutput").hidden=false;
}

weightedButton.onclick = function(){weightedCalc()};
