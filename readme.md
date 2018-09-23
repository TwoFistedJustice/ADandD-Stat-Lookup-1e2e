**Advanced Dungeons and Dragons 1e & 2e Character Record Stats Lookups**

**Legal Stuff:**
Dungeons and Dragons and Advanced Dungeons and Dragons are property of Wizards of the Coast.
http://company.wizards.com/

This project is a labor of love and is not affiliated with Wizards of the Coast or any of their partners.


**Contributors:**
My front end skills are squat. So if you know front end stuff well and want to contribute, message me. 


**Basic Deployment**
Download the zip file. Extract it to wherever you want. Open charSheet.html in a browser.
Set your stats, and click "Display Stats in Console". To view results open your browser console (f12 in chrome).
If you don't see anything, open console settings and check the box next to "preserve log".
Then click "Display Stats in Console" again.

**Introduction**
This app is intended to aid players and Dungeon Masters of Advanced Dungeons and Dragons first 
and second editions to get into their games more quickly and easily. It will not roll dice for you.
You must roll your own cursed dice. Once the dice are rolled this will track and update your stats 
for you. Of course if you are a serious gamer, you will do it yourself and not rely on the computer
as a crutch. You should be ashamed of yourself you lazy little Halfling. Any real Elfen warrior 
would have the charts memorized already!  


**Overall Goal:**
  Have an easily understandable (code and interface) working app linked to a cloud database. 
  The sourcecode will be publicly available on github and must be structured such that anyone with
  low to intermediate dev skills can deploy and use it on their own domain.
  
  The database should be have a free level so that any DM can set up their own.
  The MVC can be a full blown one like Vue or React or something simpler that I set
  I set up myself, like a quasi static node server.
  
  **Features:**
  It will NOT have a dice roller. That must be done by the player, using actual dice, as the Deities and Demigdods intended.
  It should look up all stats and perform all rule checks.
  It should be able to dump the entire database to a json file on the admin's local machine.
  It should be able to upload the entire json database dump file to a new database. 

**Stage One:**
Move it into its own folder and git repo, upstream to github

**Stage Two:**
Get the lookup data on to Github with a readme.
The readme should link to Wizards of the Coast, and expressly state that Dnd is their trademark.

It should also explain that this is an amalgam of first and second editions.


**Stage Three:**
Work up a functional model running on a database and a MVC framework.

**Stage Three Goals:**
  - The db can be SQL or NOSql, as best fits the overall project goal.
  - It should be able to print a character to screen and paper such that it can be easily
    copied to a the character record sheet of the user's choice.
  - Maybe have two options, one that prints it in an easily copyable format, and one that
    prints it in a usable, if sub-optimal, format to get into the game quickly. Maybe call it
    NPC format or something like that.
    

***Original App Documentation***

 
 Advanced Dungeons & Dragons Character Record Generator
 for First Edition AD&D (with a spattering of Second Edition thrown in)
 
 Advanced Dungeons & Dragons is the intellectual property of Wizards of the Coast
 
 Wizards of the Coast had nothing to do with the development of this application.
 Though I think they are AWESOME!!!!  <--- A little ass kissing never hurts.
 
 Application design by Russ Bain. (Ron Fenolio helped)
 
 Dedicated to the memory of the One and True Dungeon Master, Gary Gygax.
 
 
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


