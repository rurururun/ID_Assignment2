# ID_Assignment2: Guo Heng(S10223608) & Jun Xiong(S10222060) P03

# Github Link
https://github.com/rurururun/ID_Assignment2

# Project Name: Snake & Hunter
This project is a redone snake game made from html css and js. In the game, you will be able to control your snake on a 31x31 board with the goal of gaining the most points which will be featured on the leaderboard. There will be various fruits that have different capabilities to consume with the snake, each affecting the game uniquely. There will also be a hunter present on the board that will kill your snake upon contact that moves in a straight line on the black line visible on the board. When the game ends, your score will be tabulated based on the number of fruits you have consumed. Will you have what it takes to get the top rank on the leaderboard?

# Design Process
This game was designed aiming to be an interesting spin off of the typical snake game where there are now various fruits that give special powers for a set amount of time. It can be used by people who want more variety from the original snake game made in 1976 which is 47 years ago.

# User Stories
As a user, I want to be able to make an account so that I am able to keep track of the high scores to monitor my skill level.
As a user, I want to be able to move my snake around so that I am able to eat the fruits around.
As a user, I want to be able to compare my high score with others so that I know how I fare amongst others who also play the game.
As a user, I want to be able to have powerups in the game so that I have a higher chance of success in the game.
As a user, I want to be able to have music playing in the background so that I can relax while playing the game.

# Features
- Feature 1 - Login (Allow users to continue playing on an account they have already created)
- Feature 2 - Register (Allow users to create a new account that stores their game data)
- Feature 3 - Leaderboard (Allow users to view the top 10 players with the highest score, users can view a global leaderboard or choose to see the leaderboard of a specific country)
- Feature 4 - About Us (Allow users to read an overview of the game such as the benefits of playing the game)
- Feature 5 - Log Out (Allow users to log out of their account if they want to)
- Feature 6 - Play (Allow users to play the game)
- Feature 7 - Key Binds (Allow users to move the snake using the arrow keys, use power ups such as banana (Q) and orange (E), pause/unpause the game (P))
- Feature 8 - Legend (Allow users to read a quick overview of what each icon means and a little more information about the game)
- Feature 9 - Background Music (Helps to immerse users into the game)
- Feature 10 - Sound Effects (Helps to immerse users into the game)
- Feature 11 - Visual Effects (Helps to immerse users into the game)

# Technologies Used
- HTML
- CSS
- JavaScript
- JQuery
- JSON
- AJAX
- RestDB API
- Restcountries API
- Visual Studio Code

# Testing
1. SignUp Form:
i.Click on SignUp button from landing page. This will bring you to the signup form.
ii.Try leaving out any of the information in Username, Password and Country and an error message will appear below the textbox
iii.Clicking on country and typing a letter like "s" will bring up a dropdown list of countries starting with "s" and this works for all letters.
iv.Clicking the submit button creates an account and brings you to main menu if the Username is unique. Otherwise it will show an error message.
v. CLicking the back button brings you back to the landing page


2. Login Page
i. Click on Login from index.html. This will bring you to the login page.
ii.Try leaving out any of the information required in Username and Password and an error message will appear below the textbox.
iii.Clicking the submit button will check if your information is correct according to the database and log the user in, bringing them to the main menu.
iv.Clicking the back button brings you back to the landing page.


3. Snake and Hunter Game
i. Click on the Play button in the main menu. This will bring you to the game itself.
ii.The game page includes the gameboard(31x31), the snake(purple), the hunter(light blue), gray path(hunter's walking path), apples(red) and bananas(yellow) and oranges(orange) and their respective counters, pause symbol(updates when p is pressed to pause the game, shows paused symbol) and an instructions button showing the controls of the game.
iii. A biting sound will occur when an apple is eaten by the snake. For every 10 apples eaten, the hunter's movement speed is increased by 10%. A powerup gaining-like sound will occur when either a banana or orange is eaten. The snake will change colour to yellow when a banana is used which increases its speed by 50% and a different background music will be heard. The hunter will change colour to orange when an orange is used which slows the hunter down by 50%.
iv. Pressing any button to try and move in the opposite direction of the snake's direction will not work and the snake will continue moving in its direction.
v. Moving through the sides of the board will make the snake appear at the other side of the board.
vi.Upon death of the snake, each apple eaten is 1 point, each banana or orange remaining is 10 points and this conversion of points for bananas and oranges is increased by 10% for every 10 apples eaten by the end of the game. The score is tabulated and displayed with the options of OK and cancel.
vii. Click OK to continue to a new game. Click cancel to go back to main menu.
viii. press the esc button to go back to the main menu


4. Leaderboard
i.Click on the leaderboard button in the main menu. This will bring you to the leaderboard page.
ii. The leaderboard page displays the top 10 players with the highest scores, displaying information of the players with the columns Rank, Name(with an image of their country flag next to it) and their score.
iii. Click on country button at the top right of the table. This will display a dropdown list of countries to filter the leaderboard with. Clicking on Singapore will filter to show the top 10 players in Singapore.
iv. Clicking on the back button brings you back to the main menu.


5.About Us page
i. Click on the AboutUs button in the main menu. This brings you to the about us page.
ii. Contains a paragraph describing the game.
iii. Clicking the back button brings you back to the main menu


6.Log out
i. Click the log out button in the main menu. This logs the user out and brings them back to the landing page.
ii. Users have to either log back in or sign up to get back to the main menu.


7.Music 
i. There is music that can be heard in every page.
ii. Soothing music can be heard in every page other than the game page. For the game page, an upbeat song can be heard.

8. Dimensions
The general dimensions for the website includes:
390 x 844
768 x 1024
1024 x 768
1440 x 900
2560 x 1440
But other dimensions also work as well as the site is responsive. The pages will look the same in all dimensions

# Credits
Acknowledgements:
Snake Game: https://youtu.be/QTcIXok9wNY
Sound Trimmer: https://audiotrimmer.com/
Background Remover:https://www.remove.bg/upload


Media:
Jungle Background Image: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fcartoon-jungle&psig=AOvVaw3U-GrdmUiVEqoLOk_7auX3&ust=1676005930108000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLDx2eLWh_0CFQAAAAAdAAAAABBR

Bite Sound Effect:https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=6928

Explosion sound effect:https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Ffree%2Fcartoon-explosion%2F&psig=AOvVaw2oaR0LlSdIJS6djfRwjEAH&ust=1676095488751000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKiY0LGkiv0CFQAAAAAdAAAAABAE
