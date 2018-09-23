**Refactor**

**First Task**
Get it working with just a JS function call


**Structural Changes**
The original version holds all the character info in once gigantic object 
and passes that object to every function that modifies anything.

Change it so that only the relevant data is sent for validation.

Have it store data in some kind of DB wheter it is a proper one or just file system.


**ES6**
Change top level vars to consts



**General JS**
Change all function declaration to var or const style







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
    

