// the drop down lists on the HTML are called from here.
// 
window.onload = function(){
	//bind event handlers for the two buttons
	//makeCharacter.js-generateDropDown(elementID, attributeID, arrayList
	generateDropDown("DropDown-Class", "charClass", CharacterClasses);
	generateDropDown("DropDown-Race", "race", Races );
	generateDropDown("DropDown-Alignment", "alignment", Alignments);
	generateDropDown("statSelectStrength", "strength", PlayerStats);
	generateDropDown("statSelectExcStrengthTensPlace", "excStrFirstDigit", d10_Stats);
	generateDropDown("statSelectExcStrengthOnesPlace", "excStrSecondDigit" , d10_Stats);
	generateDropDown("statSelectDexterity", "dexterity", PlayerStats);
	generateDropDown("statSelectConstitution", "constitution", PlayerStats);
	generateDropDown("statSelectIntelligence", "intelligence", PlayerStats);
	generateDropDown("statSelectWisdom", "wisdom", PlayerStats);
	generateDropDown("statSelectCharisma", "charisma", PlayerStats);
	generateDropDown("statSelectComeliness", "comeliness", PlayerStats);


	var saveButton = $("save");
	var loadButton = $("load");
	saveButton.onclick = handleSaveButton;
};




function handleSaveButton(){
			// reset counter to zero to prevent mulitple error alerts
			// when you click the save button, save all the data in the form to a new characterRecord JSON object
			// counter = 0;

tellUserTheyOopsied("reset");


initialStats = getInitialStats();
modifiedStats = initialStats;

console.log("initial stats:");
// console.log(initialStats);
			//once initial stats are gotten and made permanent
			//modify them for race
modifiedStats = modifyStatsForRace(initialStats);
// console.log("RACE modified stats:");
// console.log(modifiedStats);

			// after initialStats is modified for race and instantiates the modifiedStats object
			// send the modified stats BACK to be modified for age

modifiedStats = modifyStatsForAge(modifiedStats);
	
console.log("AGE modified stats:");
console.log(modifiedStats);

getAdjustments(modifiedStats);




// createCharacterRecord();
	console.log("str adjusters " );
	console.log(gameAdjusters.strengthAdjusters);
	console.log("dex adjusters:");
	console.log(gameAdjusters.dexterityAdjusters);

	console.log("con adjusters:");
	console.log(gameAdjusters.constitutionAdjusters);

	console.log("int adjusters:");
	console.log(gameAdjusters.intelligenceAdjusters);

	console.log("wis adjusters:");
	console.log(gameAdjusters.wisdomAdjusters);

	console.log("cha adjusters:");
	console.log(gameAdjusters.charismaAdjusters);


	

    }



