# <div align="center"> Anonymous </div>

# Table of Contents
1. [ Problem Statement ](#problemstatement)
2. [ Solution ](#solution)
3. [ Directory Flow ](#structure)
4. [ Working ](#working)
5. [ Tech Stack Used ](#tech_stack)
6. [ Future Initiatives ](#future_initiatives)
7. [ External Lins ](#links)

<a name="problemstatement"></a>
# Problem Statement
Sometimes people require to anonymously post their feeling/emotions. People want to vent out their feelings without letting people know about them.

<a name="solution"></a>
# Solution
Anonymous is the best solution for this, it does not require any gmail, phone number to create id's, so it is completely anonymous and users can create a post same as Reddit and post them globally.

<a name="structure"></a>
# Directory Flow
```
Anonymous
|--- backend
|    |--- middleware 
|    |     |--- fetchuser.js
|    |--- models
|    |     |--- Posts.js
|    |     |--- Users.js
|    |--- routes
|    |     |--- auth.js
|    |     |--- posts.js
|    |--- index.js
|    |--- db.js

|--- Frontend
|    |--- public
|    |    |--- index.html
|    |--- src
|    |    |--- App.js
|    |    |--- components
|    |    |     |--- Static
|    |    |     |     |--- All static css and js files
|    |    |     |--- Accounts.js
|    |    |     |--- Allposts.js
|    |    |     |--- Createpost.js
|    |    |     |--- Home.js
|    |    |     |--- Individual.js
|    |    |     |--- Login.js
|    |    |     |--- Navbar.js
|    |    |     |--- Signup.js
|    |    |     |--- User.js
```


<a name="working"></a>
# Working

<a name="tech_stack"></a>
# Tech Stack Used
--> Node JS Libraries
```
npm install bcryptjs
```
```
npm install body-parser
```
```
npm install cors
```
```
npm install dotenv
```
```
npm install express
```
```
npm install express-validator
```
```
npm install jsonwebtoken
```
```
npm install mongoose
```
--> React JS Libraries
```
npm install 
```

<a name="future_initiatives"></a>
# Future Initiatives

<a name="links"></a>
# External Links
