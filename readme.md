**Advanced Dungeons and Dragons 1e & 2e Character Record Stats Lookups**

**Legal Stuff:**
Dungeons and Dragons and Advanced Dungeons and Dragons are property of Wizards of the Coast.
http://company.wizards.com/

This project is a labor of love and is not affiliated with Wizards of the Coast or any of their partners.

**Dedication**
 Dedicated to the memory of the One and True Dungeon Master, Gary Gygax.

**Contributors:**
 Application design by Russ Bain. (Ron Fenolio helped)
 
 My front end skills are squat. So if you know front end stuff well and want to contribute, message me. 


**Basic Deployment**
Download the zip file. Extract it to wherever you want. Open charSheet.html in a browser.
Set your stats, and click "Display Stats in Console". To view results open your browser console (f12 in chrome).
If you don't see anything, open console settings and check the box next to "preserve log".
Then click "Display Stats in Console" again.

**Introduction**
This app is intended to aid players and Dungeon Masters of Advanced Dungeons and Dragons first 
and second editions to get into their games more quickly and easily. It will not roll dice for you.
You must roll your own cursed dice. Once the dice are rolled this will update your stats 
for you. Of course if you are a serious gamer, you will do it yourself and not rely on the computer
as a crutch. You should be ashamed of yourself you lazy little Halfling. Any Elfen warrior worthy of
carrying a blade could do it from memory!  

**Some Notes on the Code Structure**
I wrote this stuff quite a long time before I actually put it on Github. I did it back when I only knew
Javascript as a sub-language of C and before I knew how to write nice pretty clean code. So while the app
works as intended, it ain't pretty. It's not so much spaghetti code as it is spaghetti with meat sauce 
and feta balls all crammed together and then dropped into a pan to make lasagna code. I was gonna
refactor it, but then the ghost of my father came to me and said "if it ain't broke, don't fix it."
And ghosts are like 8 hit dice, drain levels, and require magic weapons to hit. So for once, I did
what my dad told me. Also dad might actually be a lich. If you know a good cleric please send me a
referral. 

 
 **DOCUMENTATION:**
 
 **BASIC PARTS:**
 In AD&D sometimes the DM needs to base a ruling on a character's
 initial stats prior to any mofifications for age/race/gender
 So we start with TWO characterRecord objects.
 -- One holds the unmodified stats,
 -- The other holds the modified stats
 
 Global Variables are:
 - initialStats
 - modifiedStats
 - gameAdjusters
 - modified by local variable called "jar"
 - as in "put this in the jar"
 - doesn't have  fixed form
 - it is written over multiple times and output
 --   to the console as a new object
 
 
 **PHASES:**
 Script is broken up by Phases, where each phase performs a specific set of tasks
 
 **Phase 0**
 The user interaction fields are generated dynamically and automatically pass the correct value types.
 
 Once fields are generated call the functions in the following order:
 1. tellUserTheyOopsied("reset");
 2. initialStats = getInitialStats();
 3. modifiedStats = initialStats;
 4. modifiedStats = modifyStatsForRace(initialStats);
 5. modifiedStats = modifyStatsForAge(modifiedStats);
 6. getAdjustments(modifiedStats);
 
 
 
 **Phase 1 -**
 -- Instantiates a New CharacterRecord() - which is a constructor that creates an object holding all the stats.
 
 --- Gets the initial stats as entered by the user and validates the data against rules from the Player's Handbook
 
 **Phase 2 -**
 --- Takes the initial stats and modifies them for race and the cumulative effects of age
 
 **Phase 3 -**
 --- Uses the modified stats to look up all the game play adjusters like hit and damage adjusters
 and spell levels, system shock, etc.
 
  Phase 4 - Proposed
 --- Displays all the data screen via HTML so the player can copy it to their paper sheet
 
 Phase 5 - Proposed
 --- Generates a printable sheet which the player can use to copy to their paper sheet
 
 At no time will this generate an entire usable character record sheet.
 There's a reason it's called "pencil n paper"
 Besides, that it's important for player's to know their characters stats
 and most of them won't if they don't copy it by hand





