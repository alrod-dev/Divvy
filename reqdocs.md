<h1 align="center">Divvy</h1>

<h1>Requirements Documentation</h1>


<p>Final Project </br>
	U of U Coding Bootcamp </br>
	Alfredo Rodriguez and Louis LeBohec <br/>
	Divvy Carpool Organizer
</p>

<h4>Requirements List</h4>
<ul>
	<li>Use of React JS</li>
	<li>Use of Node/Express Server</li>
	<li>Use of MySQL/MongoDB Database</li>
	<li>Both GET and POST Routes</li>
	<li>Deployed w/ Heroku</li>
	<li>Minimum Two Technologies not covered in class</li>
	<li>Authentication Functionality</li>
	<li>Polished User Interface</li>
	<li>Folder structure that meets MVC Paradigm</li>
	<li>Good Quality coding standards (indentation, commenting, etc.)</li>
	<li>Use of Labor organization system</li>
</ul>

<h2>App Concept and Market Targeting</h2>
<p>
The Divvy Carpool Organization app was designed with the intention to improve on the weaknesses of other, previously existing carpool organizers. Simply put, other carpool organization apps have very specific intents, such as carpooling to get kids to school, yet no connection to the groups, companies, or schools that would be the connection between the users of the app. The issue with this is that to complete a successful carpool through these apps, you must find someone that shares your destination, who has also taken the initiative to join the same carpooling app, without communicating with this person outside of the app, because that would defeat the purpose of the app. </br></br>

Enter Divvy. Divvy was designed to be marketed to companies or schools to be provided as a service to their employees. On purchase of the software, each employee would be provided with paper or electronic paperwork requiring the information that Divvy needs to help arrange carpools, as well as a consent form. At this point, each employee electing to use the app would have an account created for them by their company. Then, when each user logs in to the app, they would be presented with a list of their coworkers that lives near them, with their addresses plotted out on Google Maps, right in the app. This means that users are able to see their coworkers on a map, with each one's contact information. Thus, the possibility to organize a convenient, time and money saving carpool is right at the user's fingertips.</br></br>

During Development, we also specifically made an effort to have the Divvy WebApp be mobile friendly!
</p>

<h2>Detailed Requirement Fulfilment</h2>
<h4>Handlebars JS</h4>
<h4>React-Materialize JS</h4>
<h4>Node/Express Server</h4>
<h4>MongoDB Database</h4>
<p>For this project, we used MongoDB because of the simple and easily visualized table structure of this database language. Our database comprised of one table containing all of the user info necessary for the app. Our columns included each user's name, email address, phone number, physical address, vehicle of choice, the number of non-driver seats in this vehicle, username, and password. The database was seeded with dummy data for the purpose of demonstration.</p>
</br>

<img src="http://res.cloudinary.com/alrod909/image/upload/v1512193162/schema_pcx5oa.png">
<h6>A screenshot of the schema</h6>

<h4>Both GET and POST Routes</h4>

<p>We used post routes to create and update user information and get routes to fetch and subsequently display user information. Beyond that, REST API routes were instrumental in the use of the Google Maps API that we used to provide users with location data on themselves and their coworkers</p>

<h4>Heroku</h4>

<p>The app is currently posted on heroku. <a href="https://divvy-car-app.herokuapp.com/">Check it out here</a></p>

<h4>Outside Technologies</h4>

<p>Some of the libraries and techonlogies we used included:</p>

<h4>Front-End:</h4>

<ul>
    <li><strong>HTML</strong></li>
    <li><strong>Materialize CSS Framework</strong></li>
    <li><strong>Handlebars-Express Framework</strong></li>
</ul>

<h4>Back-End:</h4>
<ul>
    <li><strong>Google Maps API</strong></li>
    <li><strong>Javascript</strong></li>
    <li><strong>Node JS</strong></li>
    <li><strong>Cloudinary API</strong></li>
    <li><strong>MongoDB</strong></li>
    <li><strong>Materialize JS</strong></li>
    <li><strong>React-Materialize JS</strong></li>
    <li><strong>Node Modules Installed: Express, Passport, Bcrypt, Flash, etc</strong></li>
</ul>

<h4>Authentication</h4>

<p>
When a user is registered, several things happen in succession. Firstly, the password is encrypted using bcrypt.js, and then all the information is stored in the db. The user is then redirected to the login page, and a banner is displayed announcing the user has been successfully registered. </br.
</p>

<h4>Polished UI/UX</h4>

<p>	
Our user interface was heavily influenced by the Google Maps interface, because of the simplicity and ease of use it displays. Our color scheme was chosen for it's soothing cool colors.
</p>

<img src="http://res.cloudinary.com/alrod909/image/upload/v1512193165/userPage_lddm1q.png">
<h6>A screenshot of the main page of the app</h6>

<h4>MVC Folder Structure</h4>

<p>
We designed the folder structure of this app folling MVC Paradigm in order to have a clean, organized, and easy to follow file structure. 
</p>

<img src="http://res.cloudinary.com/alrod909/image/upload/v1512193162/MVC_bahc1u.png" style="height: 200px;">
<h6>A screenshot of our folder structure</h6>

<h4>Coding Standards</h4>
<p>
We made sure to maintain clean, properly indented and thoroughly commented code for ease of communication, and ease of understanding code we had written. We also included commented shells of potential future functionality.
</p>
<img src="http://res.cloudinary.com/alrod909/image/upload/v1512193161/cleanCode_fvxwff.png">
<h6>An example of the indentation and commenting we used throughout the project</h6>
