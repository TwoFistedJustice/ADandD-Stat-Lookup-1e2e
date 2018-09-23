/*

	Magic Constants!

 */

// PlayerStats array is used to create the drop down lists on the HTML page
// Thus we never need to check that the user makes a valid entry  because valid is
// the only option.
var PlayerStats = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
// d-Whatevah_Stats array can be used to simulate any dice results by index reference
// or you can just use the array for the given die you want
var dWhatevah_Stats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var d4_Stats = [1, 2, 3, 4];
var d6_Stats = [1, 2, 3, 4, 5, 6];
var d8_Stats = [1, 2, 3, 4, 5, 6, 7, 8];
var d10_Stats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var d12_Stats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var d20_Stats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


//used for generating error messages when a rolled character fails to meet minimum requirements for race or class
//index 0 holds a null to simplify iteration versus arrays that hold an identifier at index 0
var statNames = [	
					null,
					"Strength",
					"Dexterity",
					"Constitution",
					"Intelligence",
					"Wisdom",
					"Charisma",
					"Comeliness"
				];


// Races array is used to create the drop down lists on the HTML page
// Thus we never need to check that the user enters a valid class because valid is
// the only option.
var Races = [
				"Dwarf",
				"Elf",
				"Gnome",
				"Half Elf",
				"Half Orc",
				"Halfling",
				"Human"
			];


// Alignments array is used to create the drop down lists on the HTML page
// Thus we never need to check that the user makes a valid entry  because valid is
// the only option.
// It is also used to check that the PC has an alignment allowed for the chosen class
var Alignments = [
					"Chaotic Evil",
					"Chaotic Good",
					"Chaotic Neutral",
					"Lawful Evil",
					"Lawful Good",
					"Lawful Neutral",
					"Neutral Evil",
					"Neutral Good",
					"True Neutral"
				];


// CharacterClasses array is used to create the drop down lists on the HTML page
// Thus we never need to check that the user makes a valid entry  because valid is
// the only option.
var CharacterClasses = [
						"Assassin",
						"Barbarian",
						"Cavalier",
						"Cleric",
						"Druid",
						"Fighter",
						"Illusionist",
						"Magic User",
						"Monk",
						"Paladin",
						"Ranger",
						"Thief"
						];


// Superclass names drawn from Second Edition to allow greater flexibility
//to be used whenever a class category is needed,
//especially useful for fighter strength mods
var SuperClasses = [
					[
					"Warrior",
					"Barbarian",
					"Cavalier",
					"Fighter",
					"Paladin",
					"Ranger"
					],
					[
					"Rogue",
					"Thief",
					"Assassin",
					"Spy"
					],
					[
					"Wizard",
					"Magic User",
					"Illusionist"
					],
					[
					"Priest",
					"Cleric",
					"Druid"
					],
				   ];



// ClassAlignments array is used for rapid iteration to check
// that PC's class and alignment combination is allowed by the rules.
// Index 0 is the class, and the rest are allowed alignments
var ClassAlignments = [
						[
							"Assassin",
							"Chaotic Evil",
							"Lawful Evil",
							"Neutral Evil"
						],
						[
							"Barbarian",
							"Chaotic Evil",
							"Chaotic Good",
							"Chaotic Neutral",
							"Neutral Evil",
							"Neutral Good",
							"True Neutral"
						],
						[
							"Cavalier",
							"Chaotic Good",
							"Neutral Good",
							"Lawful Good"
						],
						[
							"Cleric",
							"Any"
						],
						[
							"Druid",
							"True Neutral"
						],
						[
							"Fighter",
							"Any"
						],
						[
							"Illusionist",
							"Any"
						],
						[
							"Magic User",
							"Any"
						],
						[
							"Monk",
							"Lawful Evil",
							"Lawful Good",
							"Lawful Neutral"
						],
						[
							"Paladin",
							"Lawful Good"
						],
						[
							"Ranger",
							"Chaotic Good",
							"Neutral Good",
							"Lawful Good"
						],
						[
							"Thief",
							"Chaotic Evil",
							"Chaotic Neutral",
							"Lawful Evil",
							"Lawful Neutral",
							"Neutral Evil",
							"True Neutral"
						]
						];



// RacialClassRestrictions array is used for rapid iteration to check
// that PC's class is allowed by the rules.
// Index 0 is the race, and the rest are allowed classes
var RacialClassRestrictions = [
								[
								"Dwarf",
								"Assassin",
								"Cleric",
								"Fighter",
								"Thief"
								],
								[
								"Elf",
								"Assassin",
								"Cavalier",
								"Cleric",
								"Druid",
								"Fighter",
								"Magic User",
								"Ranger",
								"Thief"
								],
								[
								"Gnome",
								"Assassin",
								"Cleric",
								"Fighter",
								"Illusionist",
								"Thief"
								],
					 			[
					 			"Half Elf",
								"Assassin",
								"Cavalier",
								"Cleric",
								"Druid",
								"Fighter",
								"Magic User",
								"Ranger",
								"Thief"
								],
								[
								"Halfling",		
								"Cleric",
								"Druid",
								"Fighter",
								"Thief"
								],
								[
								"Half Orc",
								"Assassin",
								"Cleric",
								"Fighter",
								"Thief"
								]
							];



// Used to check class ability minimums
var ClassAbilityMinimums = [
								["Assassin", 12, 12, 5, 11, 5, 0, 0],
								["Barbarian", 15, 14, 15, 0, 0, 5, 0],
								["Cavalier", 15, 15, 15, 10, 10, 5, 0],
								["Cleric", 0, 0, 5, 0, 9, 5, 0],
								["Druid", 0, 5, 5, 0, 12, 15, 0],
								["Fighter", 9, 5, 7, 0, 5, 5, 0],
								["Illusionist", 0, 16, 0, 15, 5, 5, 0],
								["Magic User", 0, 6, 5, 9, 5, 5, 0],
								["Monk", 15, 15, 11, 0, 15, 5, 0],
								["Paladin", 12, 5, 9, 9, 13, 17, 0],
								["Ranger", 13, 5, 14, 13, 14, 5, 0],
								["Thief", 0, 9, 5, 0, 0, 5, 0]
							];

// Used to check class ability maximums
var ClassAbilityMaximums= [
								["Assassin", 25, 25, 25, 25, 25, 25, 25],
								["Barbarian", 25, 25, 25, 25, 16, 25, 25],
								["Cavalier", 25, 25, 25, 25, 25, 25, 25],
								["Cleric", 25, 25, 25, 25, 25, 25, 25],
								["Druid", 25, 25, 25, 25, 25, 25, 25],
								["Fighter", 25, 25, 25, 25, 25, 25, 25],
								["Illusionist", 25, 25, 25, 25, 25, 25, 25],
								["Magic User", 25, 25, 25, 25, 25, 25, 25],
								["Monk", 25, 25, 25, 25, 25, 25, 25],
								["Paladin", 25, 25, 25, 25, 25, 25, 25],
								["Ranger", 25, 25, 25, 25, 25, 25, 25],
								["Thief", 25, 25, 25, 25, 25, 25, 25]
							];


// Used to check race ability minimums
var RaceAbilityMinimums = [
									["Dwarf", 8, 3, 11, 3, 3, 3, 0],
									["Elf",3, 6, 7, 8, 3, 8, 0],
									["Gnome", 6, 3, 8, 6, 3, 3, 0],
									["Half Elf",3, 6, 6, 4, 3, 3, 0],
									["Half Orc", 6, 3, 13, 3, 3, 3, 0],
									["Halfling", 7, 7, 10, 6, 3, 3, 0]
								];



// Used to check race ability maximums
var RaceAbilityMaximums = [
									["Dwarf", 18, 17, 18, 18, 18, 17, 18],
									["Elf", 18, 18, 18, 18, 18, 18, 18],
									["Gnome", 18, 18, 18, 18, 18, 18, 18],
									["Half Elf", 18, 18, 18, 18, 18, 18, 18],
									["Half Orc", 18, 17,19, 17, 14, 12, 18],
									["Halfling", 18, 18, 18, 18, 17, 18, 18]
								];

var AgeCategories = [
						["Dwarf",
						["Young Adult", 35, 50],
						["Mature", 51, 150],
						["Middle Aged", 151,  250],
						["Old", 251, 350],
						["Venerable", 351, 450]
						],

						["Elf",
						["Young Adult", 100, 175],
						["Mature", 176, 550],
						["Middle Aged", 551, 875],
						["Old", 876, 1200],
						["Venerable", 1201, 1600]
						],

						["Gnome",
						["Young Adult", 50, 90],
						["Mature", 91, 300],
						["Middle Aged", 301, 450],
						["Old", 451, 600],
						["Venerable", 601, 750]
						],

						["Half Elf",
						["Young Adult", 24, 40 ],
						["Mature", 41, 100],
						["Middle Aged", 101, 175],
						["Old", 176, 250],
						["Venerable", 251, 325]
						],

						["Half Orc",
						["Young Adult", 12, 15 ],
						["Mature", 16, 30],
						["Middle Aged", 31, 45],
						["Old", 46, 60],
						["Venerable", 61, 80]
						],


						["Halfling",
						["Young Adult", 22, 33],
						["Mature", 34, 68],
						["Middle Aged", 69, 101],
						["Old", 102, 144],
						["Venerable", 145, 199]
						],

						["Human",
						["Young Adult", 14, 20],
						["Mature", 21, 40],
						["Middle Aged", 41, 60],
						["Old", 61, 90],
						["Venerable", 91, 120]
						],
					];  //END AGE CATEGORIES TABLE

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

			CHANGE NEEDED: 

		
************************
**************************************
*******************************************************************************
*******************************************************************************
*******************************************************************************/
/*
	AGE TABLES

	["Age category", upper bound, lower bound]
	iterate through based on race, if > [1] && < [2] then [0]
	
 */


//RaceAbilityModifiers array
//order of array members is
// race, str, dex, con, int, wis, cha, com

var RaceAbilityModifiers = [
									["Dwarf", 0, 0, 1, 0, 0, -1, -1],
									["Elf", 0, 1, -1, 0, 0, 0, 2],
									["Gnome", 0, 0, 0, 1, -1, 0, -1],
									["Half Elf", 0, 0, 0, 0, 0, 0, 1],
									["Half Orc", 1, 1, 0, 0, 0, -2, -3],
									["Halfling", -1, 1, 0, 0, 0, 0, 0],
									["Human", 0, 0, 0, 0, 0, 0, 0]
								];

//AgeAbilityModifiers array
//order of array members is 
// ageCategory, str, dex, con, int, wis, cha, com

var AgeAbilityModifiers = [
									["Young Adult", 0, 0, 1, 0, -1, 0, 0],
									["Mature", 1, 0, 0, 0, 1, 0, 0],
									["Middle Aged", -1, 0, -1, 1, 1, 0, -1],
									["Old", -2, -2, -1, 0, 1, 0, -1],
									["Venerable", -1, -1, -1, 1, 1, 0, -2]
						   ];




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


			CHANGE NEEDED: 
			

************************
**************************************
*******************************************************************************
*******************************************************************************
*******************************************************************************/


/*
	ABILITY TABLES
	Use the pc's stat as the array index. Note that the strength table 
	has an array at 18 for fighter exceptional strength
	
 */

//this is used if something modifies strength to above 18
//  	In regards to strength only, Each plus takes strength to the
//  next category of exceptional strength. Thus: 
// 											 18 + 1 = 18/01
// 											 18 + 2 = 18/51 
// 											 ...
// 											 18/00 + 1 = 19
// 
// 
//   "" empty string at index 0 so can use the same function
//    that finds the index for the array at 18 strength.
var ExeptionalStrengthCategories = ["", "01", "51", "76", "91", "00",];


//to reference an array member, use the ability score as the array index : array[abilityScore]
//since there is no ZERO ablity score, array[0] is always null
//each STAT.property.length should be 26
//
//STRENGTH.property[18] is an array of length 6, representing exceptional strength for fighters. 
//STRENGTH.property[18[0]] is used for 18 strength
var STRENGTH = {
				hitAdj: [null, -5, -3, -3, -2, -2, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, [1, 1, 2, 2, 2, 3], 3, 3, 4, 4, 5, 6, 7],
				damAdj: [null, -4, -2, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, [2, 3, 3, 4, 5, 6], 7, 8, 9, 10, 11, 12, 14],
				wtAllowanceLbs: [null, 1, 1, 5, 10, 10, 20, 20, 35, 35, 40, 40, 45, 45, 55, 55, 70, 85, [110, 135, 160, 185, 235, 335], 485, 535, 635, 785, 935, 1235, 1535],
				wtAllowanceGp: [null, -490, -480, -350, -250, -250, -150, -150, 0, 0, 0, 0, 100, 100, 200, 200, 350, 500, [750, 1000, 1250, 1500, 2000, 3000], 4350, 4850, 5850, 7350, 8850, 11850, 14850],
				maxPress: [null, 3, 5, 10, 25, 25, 55, 55, 90, 90, 115, 115, 140, 140, 170, 170, 195, 220, [255, 280, 305, 330, 380, 480], 640, 700, 810, 970, 1130, 1440, 1750],
				openStuckDoorsD20: [null, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, [11, 12, 13, 14, 15, 16], 16, 17, 17, 18, 18, 19, 19],
				openLockedDoorD20: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 3, 6], 8, 10, 12, 14, 16, 17, 18],
				bbLg: [null, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 4, 4, 7, 7, 10, 13, [16, 20, 25, 30, 35, 40], 50, 60, 70, 80, 90, 95, 99]
};




// if you want to automate thief adjustments start here
var DEXTERITY = {
					reactionMissileAdj: [null, -6, -4, -3, -2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5],
					defensiveAdj: [null, 5, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -2, -3, -4, -4, -4, -5, -5, -5, -6],
					// pickPockets: [null, ],
					// openLocks: [null, ],
					// findRemoveTraps: [null, ],
					// moveSilent: [null, ],
					// hideInShadows: [null, ]
				};

var CONSTITUTION = {
					hpAdj: [null, -3, -2, -2, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
					hpAdjFighters: [null, -3, -2, -2, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 7],
					sysShock: [null, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 88, 90, 95, 97, 99, 99, 99, 99, 99, 99, 99, 100],
					resurrection: [null, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 92, 04, 96, 98, 100, 100, 100, 100, 100, 100, 100, 100],
					poisonSave: [null, -2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
					regeneration: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1/6 turns", "1/5 turns", "1/4 turns", "1/3 turns", "1/2 turns", "1/1 turn"]
				  };

var INTELLIGENCE = {
					numLang: [null, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20],
					spellLevel: [null, 0, 0, 0, 0, 0, 0, 0, 0, "4th", "5th", "5th", "6th", "6th", "7th", "7th", "8th", "8th", "9th", "9th", "9th", "9th", "9th", "9th", "9th", "9th"],
					learnSpell: [null, 0, 0, 0, 0, 0, 0, 0, 0, 35, 40, 45, 50, 55, 60, 65, 70, 75, 85, 95, 96, 97, 98, 99, 100, 100],
					maxSpellNum: [null, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 7, 9, 9, 11, 11, 14, 18, "all", "all", "all", "all", "all", "all", "all"],
					illusionImmune: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1st-level", "2nd-level", "3rd-level", "4th-level", "5th-level", "6th-level", "7th-level"]
				  };

var WISDOM = {
				magicDefneseAdj: [null, -6, -4, -3, -2, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4],
				bonusSpells: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1st", "1st", "2nd", "2nd", "3rd", "4th", "1st, 3rd", "2nd, 4th", "3rd, 5th", "4th, 5th", "1st, 6th ", "5th, 6th", "6th, 7th"],
				chanceFail: [null, 80, 60, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		     };

var CHARISMA = {
					maxHenchmen: [null, 0,1,1,1,2,2,3,3,4,4,4,5,5,6,7,8,10,15,20,25,30,35,40,45,50],
					loyaltyBase: [null, -8, -7, -6, -5,-4,-3,-2,-1, 0, 0, 0, 0, 0,1,3,4,6,8,10, 12,14,16,18,20,20],
					reactionAdj: [null,-7, -6, -5,-4,-3,-2,-1, 0, 0, 0, 0, 0,1,2,3,5,6,7,8,9,10,11,12,13,14]
				  };

var gameAdjusters = {

					strengthAdjusters:     {
											hitAdj: null,
											damAdj: null,
											wtAllowanceLbs: null,
											wtAllowanceGp: null, 
											maxPress: null,
											openStuckDoorsD20: null,
											openLockedDoorD20: null,
											bbLg: null
									   	   },

					dexterityAdjusters:   {

											reactionMissileAdj: null,
											defensiveAdj: null
									
											},

					constitutionAdjusters: {
												hpAdj: null,
												hpAdjFighters: null,
												sysShock: null,
												resurrection: null,
												poisonSave: null,
												regeneration: null
											  },

					intelligenceAdjusters:   {
												numLang: null,
												spellLevel: null,
												learnSpell: null,
												maxSpellNum: null,
												illusionImmune: null
										    },

					 wisdomAdjusters:       {
												magicDefneseAdj: null,
												bonusSpells: null,
												chanceFail: null
						   				     },

					 charismaAdjusters:      {
												maxHenchmen: null,
												loyaltyBase: null,
												reactionAdj: null
											  }


};
