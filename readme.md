**Advanced Dungeons and Dragons 1e & 2e Character Record Stats Lookups**

**Legal Stuff:**
Dungeons and Dragons and Advanced Dungeons and Dragons are property of Wizards of the Coast.
http://company.wizards.com/

This project is a labor of love and is not affiliated with Wizards of the Coast or any of their partners.


**Contributors:**
My front end skills are squat. So if you know front end stuff well and want to contribute, message me. 


**Basic Deployment**
Download the zip file. Extract it to wherever you want. Open charSheet.html in a browser.
Set your stats, and click "save". To view results open your browser console (f12 in chrome).
If you don't see anything, open console settings and check the box next to "preserve log".
Then click save again.

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
    

