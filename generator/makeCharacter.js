//Global Variables
// Include all the URL for the json
var $ = function(id) {return document.getElementById(id);};

// set in getInitialStats(), called from handleSaveButton() --new CharacterRecord();
var initialStats = null;

// first used in Phase 2
// will be inititalStats modified for race and age
var modifiedStats = null;  // initialStats modified for PC age and race

//the set of adjusters derived from the ability tables in the Player's Handbook
//Derived in Phase 3  from the modifiedStats object
// will be an instance of the gameAdjusters() constructor in Phase 3
var gameAdjusters = null;

// if more than zero, error message won't do alert.
// prevents multiple alerts per save.
// resets to zero every time the save-button is clicked.



function createCharacterRecord(){
  //reset counter to zero to prevent mulitple error alerts
  //per character save. Checked in tellUserTheyOopsied()
  counter = 0;
  //when you click the save button, save all the data in the form
  //                         to a new characterRecord JSON object
  initialStats = getInitialStats();
  modifiedStats = getInitialStats();
  
  console.log("initial stats:");
  console.log(initialStats);
  //once initial stats are gotten and made permanent
  //                           modify them for race
  
  console.log("RACE modified stats:");
  console.log(modifiedStats);
  
  // after initialStats is modified for race and instantiates
  // the modifiedStats object send the modified stats
  //                       BACK to be modified for age
  
  modifiedStats = modifyStatsForAge(modifiedStats);
  
  createCharacterRecord();
  console.log("AGE modified stats:");
  console.log(modifiedStats);
  
  getAdjustments(modifiedStats);
  
}


// This sets a private counter that keeps track of the number of errors
// and ensures that no more than one alert is generated to the user no matter
// how many errors are made

var countErrorMessages = function(){
  var counter = null;
  
  // returns a getter/setter object to the calling function
  return {
    // gets the counter and increments it
    // ++ has to precede counter or the alert will fire twice
    getCounter:	function(){ return ++counter;},
    // resets the counter to 0 to start over
    setCounter: function(){ return (counter = 0);}
  };
}();


//error message to let the user know they made an error
//the counter prevents multiple alerts per save because only one is necessary
//to reset counter to zero pass in the string "reset"
//this is done every time the save button is clicked

function tellUserTheyOopsied(reset){
  var timeKeeper = countErrorMessages;
  var counter = null;
  
  if(reset === "reset"){
    counter = timeKeeper.setCounter();
  } else {
    //count the number of errors to limit the alerts to one
    counter = timeKeeper.getCounter();
    //alert the user if there is a problem
    if(counter === 1){
      alert("Something is wrong. Open the console (f12) to see the specific error.");
    } //END COUNTER CONDITIONAL
  } //END ELSE
}//END FUNCTION

/*
		Constructors - these return objects, even though they look like void functions
 */

//Character Record Constructor

function CharacterRecord(firstName, familyName, race, sex, age, charClass, alignment, str, con, dex, int, wis, cha, coml, excStr)  {
  //constructor for a character record
  //v v strings v v
  this.firstName = firstName;
  this.familyName = familyName;
  this.race = race;
  this.sex = sex;
  this.age = age;
  this.charClass = charClass;
  this.alignment = alignment;
  //v v numbers v v
  this.strength = null;
  this.constitution = con;
  this.dexterity = dex;
  this.intelligence = int;
  this.wisdom = wis;
  this.charisma = cha;
  this.comeliness = coml;
  //expects a string % value from 01 to 00, where 00 is equal to 100
  this.excStr = excStr;
  //ageCategory will be null until modified in phase2
  this.ageCategory = null;
  this.superClass = null;
  
  this.rolledStrength = null;
  this.rolledDexterity = null;
}


/*
		Basic functions related to the creation of the character

 */

// getInitialStats()
// - HTML DEPENDENT
// - creates a new CharacterRecord() called "initialStats"
// - parses input values to proper types
// - generates console messages
// - calls getAgeCategory(initialStats);
// - returns initialStats

//Get the stats player entered on the HTML form
function getInitialStats(){
  var initialStats = new CharacterRecord();
  var gender = null;
  var radios = document.getElementsByName("gender");
  
  //each of these must be true to return this object
  var raceClassRequirementsMet = null;  //set by checkRacialClassRestrictions()
  var alignmentClassRequirementMet = null;   // set by checkClassAlignmentRestrictions()
  var classMinimumsMet = null;    // set by checkStatRequirements(, , "class", "min")
  var raceMinimumsMet = null;		// set by checkStatRequirements(, , "race" "min")
  var classMaximumsMet = null;	// set by checkStatRequirements(, , "class", "max")
  var raceMaximumsMet = null;		// set by checkStatRequirements(, , "race" "max")
  
  
  
  for(var i = 0; i < radios.length; i++){
    if(radios[i].checked)
      gender = radios[i].value;
  }
  
  initialStats.firstName = $("firstName").value;
  initialStats.familyName = $("familyName").value;
  initialStats.race = $("race").value;
  initialStats.age = parseInt($("age").value);
  initialStats.sex = gender;
  initialStats.charClass = $("charClass").value;
  initialStats.alignment = $("alignment").value;
  
  // rolled stats don't get changed once set
  // they are for bookkeeping purposes long term, number of allowed resurrections and such
  initialStats.rolledStrength = parseInt($("strength").value);
  initialStats.rolledDexterity = parseInt($("dexterity").value);
  initialStats.rolledConstitution = parseInt($("constitution").value);
  initialStats.rolledIntelligence = parseInt($("intelligence").value);
  initialStats.rolledWisdom = parseInt($("wisdom").value);
  initialStats.rolledCharisma = parseInt($("charisma").value);
  initialStats.rolledComeliness = parseInt($("comeliness").value);
  
  // these are the modifiable stats
  initialStats.strength =parseInt($("strength").value);
  initialStats.dexterity = parseInt($("dexterity").value);
  initialStats.constitution = parseInt($("constitution").value);
  initialStats.intelligence= parseInt($("intelligence").value);
  initialStats.wisdom = parseInt($("wisdom").value);
  initialStats.charisma =  parseInt($("charisma").value);
  initialStats.comeliness =  parseInt($("comeliness").value);
  
  //this is going to need an error handler for null
  
  initialStats.excStr = getExceptionalStrength();
  initialStats.superClass = getSuperclass(initialStats.charClass);
  
  
  
  // call the data validation functions
  // set a bunch of booleans
  // each must be true for the character to be valid
  raceClassRequirementsMet = checkRacialClassRestrictions(initialStats);
  alignmentClassRequirementMet = checkClassAlignmentRestrictions(initialStats);
  raceMinimumsMet = checkStatRequirements(initialStats, RaceAbilityMinimums, "race", "min");
  raceMaximumsMet = checkStatRequirements(initialStats, RaceAbilityMaximums, "race", "max");
  classMinimumsMet = checkStatRequirements(initialStats, ClassAbilityMinimums, "class", "min");
  classMaximumsMet = checkStatRequirements(initialStats, ClassAbilityMaximums, "class", "max");
  
  var name = initialStats.firstName + " " + initialStats.familyName;
  
  if(raceClassRequirementsMet){
    console.log("A " + initialStats.race + " can be " + initialStats.charClass);}
  
  if(alignmentClassRequirementMet){
    console.log(name + "'s alignment works with " + initialStats.charClass);}
  
  if(raceMinimumsMet){
    console.log(name + " meets minimum ability requirements for " + initialStats.race);}
  if(raceMaximumsMet){
    console.log(name + " meets maximum ability requirements for " + initialStats.race);}
  if(classMinimumsMet){
    console.log(name + " meets minimum ability requirements for " + initialStats.charClass);}
  
  if(classMaximumsMet){
    console.log(name + " meets maximum ability requirements for " + initialStats.charClass);}
  
  initialStats = getAgeCategory(initialStats);
  //If all initial requirements are met for race and class, proceed.
  if(raceClassRequirementsMet && raceMinimumsMet && raceMaximumsMet && classMinimumsMet && classMaximumsMet){
    
    return initialStats;
  }
}

/*

			DATA VALIDATION
			to check if users entries violate the rules of character creation
			in the Player's Handbook

			Note: As long as you use the html generators to make data entry drop downs
			there is no need to check that the user enters valid types.
 */

//check if data entered by player meets minimums as specified in Player's Handbook
// If it does, return true, if it does not return false.
// log user errors to console - alert player to hit f12 and open the console to view errors
// CharacterRecord expects the initial stats object
//
// arrayRules expects an array of stats (length = 8) where index 0 holds a string, and the rest are numbers
// that equal strength, dexterity, constitution, intelligence, wisdom, charisma, comeliness
// and are used to compare player stats versus minimums and maximums as determined by game rules
// in that order - just like the 2e character record sheet
//
//  classOrRace expects a string: "class" or "race"
//  enter the one you want to check against


function checkStatRequirements(characterRecord, arrayRules, classOrRace, minOrMax){
  var pc = characterRecord;
  
  //arrayOfStats is compared to arrayRules
  // index 0 holds a null to simplify iteration against class or race arrays which hold a string at index 0
  var arrayOfStats = [null, pc.strength, pc.dexterity, pc.constitution, pc.intelligence, pc.wisdom, pc.charisma, pc.comeliness];
  
  //set requirementBool to false if at least one stat fails to meet minimum requirements
  var requirementBool = true;
  
  //thingtoCheck will be set to either "class" or any other string entered as the third argument
  var thingToCheck = null;
  if (classOrRace === "class"){
    thingToCheck = characterRecord.charClass;
  } else {
    thingToCheck = characterRecord.race;
  } // END CLASS OR RACE CONDITIONAL
  
  //set to true if comparing minimums, false if comparing maximums
  //"min" sets it to true, any other value sets it to false
  var minMaxBool = null;
  if(minOrMax === "min"){
    minMaxBool = true;
  }else{
    minMaxBool = false;
  } //END MIN MAX CONDITIONAL
  
  for(i = 0; i < arrayRules.length; i++){
    //check character against the first item in the array, which holds either a class or race name
    if(thingToCheck === arrayRules[i][0]){
      for(j = 1; j < arrayRules[i].length; j++){
        //check that each stat meest the minimum requirement
        // log which stats fail
        if(minMaxBool){
          if(arrayOfStats[j] < arrayRules[i][j]){
            console.error("\n***\n" + "Character's " + statNames[j] + " is too low for "  + thingToCheck + "\n***\n");
            requirementBool	 = false;
          } //END MIN STATS CONDITIONAL
        } //END minMaxBool IF
        else{
          if(arrayOfStats[j] > arrayRules[i][j]){
            console.error("\n***\n" + "Character's " + statNames[j] + " is too high for "  + thingToCheck + "\n***\n");
            requirementBool	 = false;
          }//END MAX STATS CONDITIONAL
        } //END minMaxBool ELSE
      } // END J LOOP
    } //END CLASS OR RACE CONDITIONAL
  } //END I LOOP
  if(!requirementBool	){
    tellUserTheyOopsied();
  } else {
    return requirementBool	;
  }// END ERROR NOTIFICATION CONDITIONAL
}  //	END checkStatRequirements()



//Checks character race verus character class restriction table
function checkRacialClassRestrictions(characterRecord){
  var pc = characterRecord;
  if(pc.race === "Human"){
    return true;
  }
  
  for(i = 0; i < RacialClassRestrictions.length; i++){
    if(pc.race === RacialClassRestrictions[i][0]){
      //set j to 1 so it ignores the race at index 0
      for(var j = 1; j < RacialClassRestrictions[i].length; j++){
        if(pc.charClass === RacialClassRestrictions[i][j]){
          return true;
        }//END CLASS CONDITIONAL
      }//	END J LOOP
    } //END RACE CONDITIONAL
  } //END I LOOP
  console.error("\n***\n" + pc.Race + " cannot be " + pc.charClass +
    " :-/\nChoose either a different race or a different class.\n***\n");
  tellUserTheyOopsied();
  return false;
  
}//END FUNCTION


//characterRecord is the intialStats object
// function returns a bool
function checkClassAlignmentRestrictions(characterRecord){
  var pc = characterRecord;
  //set and return as true if alignment is allowed for class
  var requirementBool = false;
  
  for(var i = 0; i < ClassAlignments.length; i++){
    //if any alignment is allowed return true
    if(pc.charClass === ClassAlignments[i][0] && ClassAlignments[i][1] === "Any"){
      requirementBool = true;
      return requirementBool;
    } else if (pc.charClass === ClassAlignments[i][0]){
      for(var j = 1; j < ClassAlignments.length; j++){
        if(pc.alignment === ClassAlignments[i][j]){
          requirementBool = true;
          return requirementBool;
        }//END ALIGNMENT CONDITIONAL
      }//END J LOOP
    }//END CLASS CONDITIONAL
  } //END I LOOP

//if nothing is true, return false
  console.error("\n***\n" + pc.charClass + " cannot be " + pc.alignment + ". Choose another alignment.\n***\n");
  tellUserTheyOopsied();
  return requirementBool;
  
}// END FUNCTION


// getAgeCategory()
//     - accepts a characterRecord object
//     - called once by getInitialStats()
//     - Assigns age category based on age
//     - ageCategory is added to characterRecord- string
//     - returns characterRecord object to getInitialStats()
// called during initial stat creation
// Assigns age category based on age
// I tried to make a function of the constructor but it didn't work
// pass in the initialStats object and then returns it
// THIS DOESN'T WORK FOR HALF ORCS!!!!! - ARRRGGH!
// fixed! the conditional needed to have an or-equal-to bc half orc fell right on the boundary
function getAgeCategory(characterRecord){
  var pc = characterRecord;
  var name = pc.firstName + " " + pc.familyName;
  
  for(var i = 0; i < AgeCategories.length; i++){
    if(pc.race === AgeCategories[i][0]){
      //Check to see if the age entered is either too young or too old
      if(pc.age < AgeCategories[i][1][1]){
        console.error("\n***\n" + name + " is too young to embark on such a dangerous journey.\n***\n");
        tellUserTheyOopsied();
        break;
      } else if(pc.age > AgeCategories[i][5][2]){
        console.error("\n***\n" + name + " is too old to embark on such a dangerous journey.\n***\n");
        tellUserTheyOopsied();
        break;
      }//END BABY-AGE AND OLD-AGE CONDITIONAL
      
      for(var j = 1; j < AgeCategories[i].length; j++){
        if(pc.age >= AgeCategories[i][j][1] && pc.age <= AgeCategories[i][j][2])
          pc.ageCategory = AgeCategories[i][j][0];
      }//END J LOOP
      
      break;
    }//END RACE CONDITIONAL
  }//END I LOOP
  return pc;
}  //END FUNCTION


//needs to iterate through the whole array till a match is found
//then superclass is index 0
//save it to string and return the string
function getSuperclass(subClass){//characterRecord){
  // var pc = characterRecord;
  var superDuperClass = null;
  console.warn(" sub-class " + subClass);
  
  for(var i = 0; i < SuperClasses.length; i++){
    for(j = 0; j < SuperClasses[i].length; j++){
      if(subClass === SuperClasses[i][j]){
        superDuperClass = SuperClasses[i][0];
        break;
      }
    }
  }
  return superDuperClass;
}


// getExceptionalStrength() is paired with getExceptionalStrengthIndex()
//  this function needs to return a string which looks like a numeric value
//  where the lowest value runs from "00" through "99"
//  Yes you could just return that long value without the var
//  but this is easier to understand what's going on
function getExceptionalStrength(){
  var excStrValue = ("" + $("excStrFirstDigit").value + $("excStrSecondDigit").value);
  
  return excStrValue;
}

//takes a characterRecord object
//returns an index used to look up a strength stat on an array of length 6
//used as the index for either:
//								the array at STRENGTH[18]
//								ExeptionalStrengthCategories[]

function getExceptionalStrengthIndex(characterRecord){
  var index = null;
  var pc = characterRecord;
  
  if(pc.excStr === ""){
    //pass this in order to control which stat is read from the arrays at STRENGTH.prop[18]
    index = 0;
//looks up the stats from the arrays at STRENGTH.prop[18]
  } else if (pc.excStr >= 1 && pc.excStr <= 50){
    index = 1;
  } else if (pc.excStr >= 51 && pc.excStr <= 75){
    index = 2;
  }else if (pc.excStr >= 76 && pc.excStr <= 90){
    index = 3;
  }else if (pc.excStr >= 91 && pc.excStr <= 99){
    index = 4;
  }else if (pc.excStr === "00" || pc.excStr === "100"){
    index = 5;
  }
  return index;
}


/*
		HTML Generators

 */

//Generates drop down list on HTML on page load
//this prevents the user from entering incorrect data
//elementID is the string ID of the <div> where the list will go
//attributeID is the string ID to be set on the list
//arrayList expects an array of strings and holds the data used to populate the list (usually PlayerStats)
function generateDropDown(elementID, attributeID, arrayList){
  var div = $(elementID);
  var dropDown = document.createElement("select");
  dropDown.setAttribute("id", attributeID);
  dropDown.setAttribute("class", "dropDown col-xs-2");
  div.appendChild(dropDown);
  
     // the for loop counting UP puts the FIRST index entry at the top (i.e. 3 - 18)
  // for(var i = 0; i < arrayList.length; i++){
  // the for loop counting DOWN puts the LAST index entry at the top (i.e. 18 - 3)
  // Many characters will have at least one score of 18, few will ever have a score of 3
  for(var i = arrayList.length -1; i > -1; i--){
    //creates the options in the drop down list- no limit on length
    var optionValue = document.createElement("option");
    optionValue.setAttribute("value", arrayList[i]);
    optionValue.innerHTML = arrayList[i];
    dropDown.appendChild(optionValue);
  }
}

/*******************************************************************************
 *******************************************************************************
 *******************************************************************************
 **************************************
 ************************
 
 
 PHASE 2
 Once initial stats are validated, create a new object to hold the soon to be modified stats.
 
 Initial stats will be modified
 -- Race
 -- Age (by race)
 
 
 ************************
 **************************************
 *******************************************************************************
 *******************************************************************************
 *******************************************************************************/

// called by clicking the save button
//takes the intital stats object and returns the modified stats
//changes stats based on the age category of the race
//
function modifyStatsForRace(characterRecord){
  var pc = characterRecord;
  var raceIndex = null;
  //if pc has 18 strength and is a sub class of Warrior, generate exceptional strength
  if(pc.strength >= 18 && pc.superClass === "Warrior"){
    pc = modifyStrengthOf18_RACE(pc);
  } else{
    for(var i = 0; i < RaceAbilityModifiers.length; i++){
      //set the race index
      if(pc.race === RaceAbilityModifiers[i][0]){
        raceIndex = i;
        break;
      }
      
    } //END I LOOP
    //modify stats based on the pc's race
    pc.strength += RaceAbilityModifiers[raceIndex][1];
    pc.dexterity += RaceAbilityModifiers[raceIndex][2];
    pc.constitution += RaceAbilityModifiers[raceIndex][3];
    pc.intelligence += RaceAbilityModifiers[raceIndex][4];
    pc.wisdom += RaceAbilityModifiers[raceIndex][5];
    pc.charisma += RaceAbilityModifiers[raceIndex][6];
    // if strength has been modified to go above 18, set it back to 18
    if(pc.strength > 18){
      pc.strength = 18;
    }
  } //END ELSE
  return pc;
}


//add the cumulative effects of age to the initial stats.
//this is meant to be done on the initial stats every time the PC ages
function modifyStatsForAge(characterRecord){
  var pc = characterRecord;
  var categoryIndex = null;
  var cumulativeStrengthModifier = 0;
  //if pc has 18 strength call special function
  
  //iterate through the array to find the index of the matching category
  //use that index to set the limit on the addition for loop
  for(var i = 0; i < AgeAbilityModifiers.length; i++){
    if(pc.ageCategory === AgeAbilityModifiers[i][0]){
      categoryIndex = i;
      break;
    }
  } //END I LOOP
  //add up the cumulative effects of age
  for(var j = 0; j <= categoryIndex; j++){
    // console.log("category: " + AgeAbilityModifiers[j][0]);
    //add up all the strength modifiers
    cumulativeStrengthModifier += AgeAbilityModifiers[j][1];
    pc.dexterity += AgeAbilityModifiers[j][2];
    pc.constitution += AgeAbilityModifiers[j][3];
    pc.intelligence += AgeAbilityModifiers[j][4];
    pc.wisdom += AgeAbilityModifiers[j][5];
    pc.charisma += AgeAbilityModifiers[j][6];
  }  //END J LOOP
  
  // if strength has been modified to go above 18, set it back to 18
  pc = modifyStrength_AGE(pc, cumulativeStrengthModifier);
  return pc;
}


//TIRED IS STUPID
//pass in a character record and the cumulative effects of age on strength
// return the character record
// modifies a pc's strength based on age
// If pc is a sub-class of fighter, strength can go over 18
// otherwise strength can be at most 18
function modifyStrength_AGE(characterRecord, cumulativeStrengthModifier) {
  var pc = characterRecord;
  var index = getExceptionalStrengthIndex(pc);
  
  for(var i = 0; i < AgeAbilityModifiers.length; i++){
    
    if(pc.superClass === "Warrior"){
      if(pc.ageCategory === AgeAbilityModifiers[i][0]){
        //add the modifier to the index - array[1] because that is strength
        index += cumulativeStrengthModifier;
        if(index >= 6){
          //if index > 6 that means they went above 18/00 strength to 19 or above (this should never actually happen)
          pc.strength += (index - 5);
          console.warn("index = " + index);
        } else {
          pc.strength = 18;
          pc.excStr = ExeptionalStrengthCategories[index];
        }
      }//END AGE CATEGORY CONDITIONAL
    }//END SUPER CLASS IS FIGHTER CONDITIONAL
  }//END I LOOP
//if pc isn't a sub-class of fighter, disallow strength of greater than 18
  if(pc.superClass != "Warrior"){
    console.warn("super class is " + pc.superClass);
    pc.strength += cumulativeStrengthModifier;
    pc.excStr = "";
    // Disallow strength greater than 18
    if(pc.strength > 18){
      pc.strength = 18;
    } //END DISALLOW 18+ STRENGTH CONDITIONAL
    
  } //END SUPER CLASS NOT FIGHTER CONDITIONAL
  
  return pc;
} //END FUNCTION


//The most strength can go up is 2 (+1 half orc, +1 mature)
//half orc limited to 18/99
//limits are best handled by a separate function that checks and reduces where needed
//
//this does nothing for humans
function modifyStrengthOf18_RACE(characterRecord) {
  // console.log ("modifyStrengthOf18_AGE()");
  var pc = characterRecord;
  var excStrIndex = getExceptionalStrengthIndex(pc);
  var raceIndex = null;
  // console.log("1-- excStrIndex AGE = " + excStrIndex);
  
  for(var i = 0; i < RaceAbilityModifiers.length; i++){
    if(pc.race === RaceAbilityModifiers[i][0]){
      raceIndex = i;
      
      if(pc.superclass === "Warrior"){
        //add the modifier to the excStrIndex - array[1] because that is strength
        excStrIndex += RaceAbilityModifiers[i][1];
        console.warn("2-- excStrIndex  AGE = " + excStrIndex);
        if(excStrIndex >= 6){
          //if excStrIndex > 6 that means they went above 18/00 strength to 19 or above (this should never actually happen)
          pc.strength += (excStrIndex - 5);
        } else {
          pc.strength = 18;
          pc.excStr = ExeptionalStrengthCategories[excStrIndex];
        }
      }
      
    } //END RACE CONDITIONAL
    
  } ///END I LOOP
  
  pc.dexterity += RaceAbilityModifiers[raceIndex][2];
  pc.constitution += RaceAbilityModifiers[raceIndex][3];
  pc.intelligence += RaceAbilityModifiers[raceIndex][4];
  pc.wisdom += RaceAbilityModifiers[raceIndex][5];
  pc.charisma += RaceAbilityModifiers[raceIndex][6];
  
  
  return pc;
}


//pass in a character record, return it
// modifies a pc's strength of 18 based on age
// If pc is a sub-class of fighter, strength can go over 18
// otherwise strength can be at most 18
function modifyStrengthOf18_AGE(characterRecord) {
  var pc = characterRecord;
  var index = getExceptionalStrengthIndex(pc);
  
  for(var i = 0; i < AgeAbilityModifiers.length; i++){
    
    if(pc.superClass === "Warrior"){
      if(pc.ageCategory === AgeAbilityModifiers[i][0]){
        //add the modifier to the index - array[1] because that is strength
        index += AgeAbilityModifiers[i][1];
        if(index >= 6){
          //if index > 6 that means they went above 18/00 strength to 19 or above (this should never actually happen)
          pc.strength += (index - 5);
          console.warn("index = " + index);
        } else {
          pc.strength = 18;
          pc.excStr = ExeptionalStrengthCategories[index];
        }
      }//END AGE CATEGORY CONDITIONAL
    }//END SUPER CLASS CONDITIONAL
    pc.dexterity += AgeAbilityModifiers[i][2];
    pc.constitution += AgeAbilityModifiers[i][3];
    pc.intelligence += AgeAbilityModifiers[i][4];
    pc.wisdom += AgeAbilityModifiers[i][5];
    pc.charisma += AgeAbilityModifiers[i][6];
  }//END I LOOP
  
  return pc;
}


/*******************************************************************************
 *******************************************************************************
 *******************************************************************************
 **************************************
 ************************
 
 
 PHASE 3
 After initial stats are validated
 After a new object is created to hold the soon to be modified stats.
 After stats are modified for race and age
 
 Then added to the new object will be game adjusters based on the modified stats
 adjusters for:
 -- strength
 -- dexterity
 -- constitution
 -- intelligence
 -- wisdom
 -- charisma
 -- comeliness
 
 ************************
 **************************************
 *******************************************************************************
 *******************************************************************************
 *******************************************************************************/


function getStrengthAdjustments (characterRecord){
  // function getStrengthAdjustments (characterRecord){
  console.log("calling getStrengthAdjustments()");
//The STRENGTH array holds an array at each [18] location for exceptional strength
//Hold those in separate variables
  var pc = characterRecord;
  var stat = pc.strength;
  var jar = gameAdjusters.strengthAdjusters;

//index is passed to a function that pulls the info from the arrays at STRENTH.prop[18]
  if(pc.strength === 18){
    //declare index variable
    var index = getExceptionalStrengthIndex(pc);
    // lookupExceptionalStrengthjar(index);
    jar.hitAdj = STRENGTH.hitAdj[18][index];
    jar.damAdj = STRENGTH.damAdj[18][index];
    jar.wtAllowanceLbs = STRENGTH.wtAllowanceLbs[18][index];
    jar.wtAllowanceGp = STRENGTH.wtAllowanceGp[18][index];
    jar.maxPress = STRENGTH.maxPress[18][index];
    jar.openStuckDoorsD20 = STRENGTH.openStuckDoorsD20[18][index];
    jar.openLockedDoorD20 = STRENGTH.openLockedDoorD20[18][index];
    jar.bbLg = STRENGTH.bbLg[18][index];
  }else {
    //if strength is NOT 18, look up the jar from here
    jar.hitAdj =  STRENGTH.hitAdj[stat];
    jar.damAdj = STRENGTH.damAdj[stat];
    jar.wtAllowanceLbs = STRENGTH.wtAllowanceLbs[stat];
    jar.wtAllowanceGp = STRENGTH.wtAllowanceGp[stat];
    jar.maxPress = STRENGTH.maxPress[stat];
    jar.openStuckDoorsD20 = STRENGTH.openStuckDoorsD20[stat];
    jar.openLockedDoorD20 = STRENGTH.openLockedDoorD20[stat];
    jar.bbLg = STRENGTH.bbLg[stat];
  }
  
} //END FUNCTION


function getDexterityAdjustments(characterRecord){
  var pc = characterRecord;
  var stat = pc.dexterity;
  var jar = gameAdjusters.dexterityAdjusters;
  
  // jar.reactionMissileAdj = DEXTERITY.reactionMissileAdj[pc.dexterity];
  // jar.defensiveAdj = DEXTERITY.defensiveAdj[pc.dexterity];
  
  jar.reactionMissileAdj = DEXTERITY.reactionMissileAdj[stat];
  jar.defensiveAdj = DEXTERITY.defensiveAdj[stat];
  
}//END FUNCTION

function getConstitutionAdjustments(characterRecord){
  var pc = characterRecord;
  var stat = pc.constitution;
  var jar = gameAdjusters.constitutionAdjusters;
  
  
  jar.hpAdjFighters = CONSTITUTION.hpAdjFighters[stat];
  jar.sysShock = CONSTITUTION.sysShock[stat];
  jar.resurrection = CONSTITUTION.resurrection[stat];
  jar.poisonSave = CONSTITUTION.poisonSave[stat];
  jar.regeneration = CONSTITUTION.regeneration[stat];
  
}//END FUNCTION

function getIntelligenceAdjustments(characterRecord){
  var pc = characterRecord;
  var stat = pc.intelligence;
  var jar = gameAdjusters.intelligenceAdjusters;
  
  
  jar.numLang = INTELLIGENCE.numLang[stat];
  jar.spellLevel = INTELLIGENCE.spellLevel[stat];
  jar.learnSpell = INTELLIGENCE.learnSpell[stat];
  jar.maxSpellNum = INTELLIGENCE.maxSpellNum[stat];
  jar.illusionImmune = INTELLIGENCE.illusionImmune[stat];
  
  
  
}//END FUNCTION

function getWisdomAdjustments(characterRecord){
  var pc = characterRecord;
  var stat = pc.wisdom;
  var jar = gameAdjusters.wisdomAdjusters;
  jar.magicDefneseAdj = WISDOM.magicDefneseAdj[stat];
  jar.bonusSpells = WISDOM.bonusSpells[stat];
  jar.chanceFail = WISDOM.chanceFail[stat];
  
}//END FUNCTION

function getCharimsaAdjustments(characterRecord){
  var pc = characterRecord;
  var stat = pc.charisma;
  var jar = gameAdjusters.charismaAdjusters;
  
  jar.maxHenchmen = CHARISMA.maxHenchmen[stat];
  jar.loyaltyBase = CHARISMA.loyaltyBase[stat];
  jar.reactionAdj = CHARISMA.reactionAdj[stat];
  
}//END FUNCTION



//getAdjustments() calls the functions that fill in the
//game adjustments object
function getAdjustments(characterRecord){
  var pc = characterRecord;
  
  getStrengthAdjustments(pc);
  getDexterityAdjustments(pc);
  getConstitutionAdjustments(pc);
  getIntelligenceAdjustments(pc);
  getWisdomAdjustments((pc));
  getCharimsaAdjustments(pc);
}



/*******************************************************************************
 *******************************************************************************
 *******************************************************************************
 **************************************
 ************************
 
 
 PHASE
 Displays on screen all the characters stats and game adjusters
 
 
 CHANGE NEEDED:
 
 
 ************************
 **************************************
 *******************************************************************************
 *******************************************************************************
 *******************************************************************************/

