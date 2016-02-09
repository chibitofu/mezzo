##[MEZZO](https://mezzo-travel.herokuapp.com/)

![mezzo_logo](http://i.imgur.com/oBK1gLx.png?1)

----------
Dynamic travel magazine app built with Angular, Node.js, Angular Material, and Express. Uses Instagram, Expedia, Google Maps, Google Places, IBM Alchemy, Wikipedia, and Open Weather APIs.

Created by: Erin Moon

Heroku Link [Mezzo](https://mezzo-travel.herokuapp.com/)

----

###App Features
* Takes your travel destination and dates to return personalized travel information.
* Creates an events pages using Expedias Things to do API, and the input city. With detailed descriptions.
* Gathers photos using Instagrams API. Based on tag being the input city with no spaces. <small>(No filtering for NSFW cotnent)</small>.
* Uses IBM Alchemy API to find news articles about the input city, and displays links to read the full article.
* Calling Google Places, generates A list of restaurants in the input city, filtered by rating, and a 50,000 meter radius.
* Calling Google Places, generates A list of hotels in the input city, filtered by rating, and a 50,000 meter radius.
* Using the Wikipedia api, generates an information page about the input city.
* Gathers current weather information with Open Weathers API. Uses the input city and country as parameters.
* Creates an interactive city map using Googles Map API.
* If no data is put into travel information form. It will default to Tokyo Japan.

----

###Technology Used
Angular, Node.js, Express, Angular-Material, Javascript.

####API's Used
Expedia Things To Do  
IBM Alchemy  
Instagram  
Google Places  
Google Maps  
Wikipedia  
Open Weather  

----
###How to install
1. Fork and download files from github to your desktop.
2. Navigate to local directory of project in terminal, and run "NPM install". To download all the relevant node modules.
3. Run "nodemon" in terminal to start up your local server.
4.  Navigate to "http://localhost:3000" in your browser to see the site.
5. Input city, country, start date and end date. Hit the create button.
6. Have fun!
(You may need to change the file paths in the  app/client/services.js file, if you are not on https. Alter the "https://mezzo-travel.herokuapp.com/api/COMPANY-NAME" to "http://localhost:3000/api/COMPANY-NAME".)

-----

###Current Known Bugs
* IBM Watson api only has 24 calls a day. So if the rate limit is met, it will default to a test output file.
* Instagram photos have a lot of spam, and NSFW content. Would like to experiment with end points to limit this effect.
* Currently able to hit create button while required inputs are not filled out.
* Dialog windows give errors when closing.
