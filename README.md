Sebastian Breve-Sanchez

2/12/24

Task Tracker

This website's purpose is to keep track of tasks that are created by the user.

2/12/24 pt 1: Created absolute basics for layout and display elements. 2/12/24 pt 2: I got the creation of the tasks and local storage to work, but I was unable to have the setting to modify the cards. 2/12/24 pt 3: Made the tasks appear and disappear without page reload. 
2/12/24 pt 4: After school I made the options for the tasks work, however after one use all of the toggles semi-deactivate. From what I can tell, flowbite adds an eventListener to these buttons on first load, but when they are rewritten through the JS they lose that eventListener. The problem is I can't add that event manually because I didn't personally make it, so I don't know what to do. I concocted a half-solution where I force the modal to appear on button click, but trying to leave it opens the actual modal that can then be closed.