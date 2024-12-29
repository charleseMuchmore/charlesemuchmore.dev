## Site colors

3A1078

4E31AA

3795BD - blueish

F7F7F8 - offwhite


# Steps for creating website with Backend and Frontend 

## Local Environment (Github):
* create local project folder
* clone GitHub repo on local machine 
    * git clone https://github.com//yourname//reponame folder-name
* navigate to this new folder, for the sake of these instructions, this is your main project folder

## Backend:
* in your main project folder, make a new folder called backend 
* navigate to folder 
* ```npm init -y```
* ```npm install express```
* add new file to backend called "index.js"
* add the following code: 
```
const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```
* to run the server: ```node index.js```

## Frontend:
* navigate back to main project directory
* ```npx create-react-app frontend```
* navigate to this new folder called "frontend"
* ```npm install axios```
* add the following to App.js:
```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(response => setMessage(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
```
* delete "reportWebVitals.js"
* delete "import reportWebVitals from './reportWebVitals';" from index.js
* also delete the "reportWebVitals()" function call from the end of the "index.js" file.
* run ```npm install```
* to run the frontend: ```npm start```

## Github
* navigate back to the main project folder
* git add, commit, push everything

---------------------------------------------------------

## Serverside
* connect to vps (ssh username@your-vps-ip-address)
* run the following commands:
	* ```sudo apt update```
	* ```sudo apt upgrade -y```
	* ```sudo apt install -y nodejs npm git nginx```
* verify installations: 
	* ```node - v```
	* ```npm -v``` 
	* ```git -v```
	* ```nginx -v```
* ```mkdir var```
* ```cd var```
-```mkdir www```
-```cd www```
-sudo git clone https://github.com/username/your-repo.git your-project
-cd your-project

## Backend Setup:
* navigate to your project's backend folder
* ```npm install```
* build or start your backend* dont do
* install pm2 globally: ```sudo npm install -g pm2```
* to start server with pm2:
	* pm2 start <entrypoint> (ex index.js)
	* ```pm2 save``` 
	* ```pm2 startup```


## Frontend Setup:
* navigate to frontend folder
* ```npm install```
* ```npm build```

## Configure Nginx:
* open nginx config file:
	* sudo nano /etc/nginx/sites-available/your-site
	* paste the following config:
```
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or VPS IP

    # Serve the React app
    location / {
        root /var/www/your-project/frontend/build;
        index index.html index.htm;
        try_files $uri /index.html;
    }

    # Proxy API requests to the Node.js backend
    location /api/ {
        proxy_pass http://localhost:5000/;  # Replace 5000 with your backend port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
* press ctrl+X
* ctrl+M
* renable the configuration and restart nginx:
	* sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
	* ```sudo nginx -t```  (Test for syntax errors)
	* ```sudo systemctl restart nginx```

## Other Setup:

### Open firewall ports:
* ```sudo ufw allow OpenSSH```
* ```sudo ufw allow "Nginx Full"```
* ```sudo ufw enable```


### Point your domain:
* If you have a domain name, update its DNS A record to point to your VPS IP address.

### Set up SSL with Let's Encrypt:
* install certbot
	* ```sudo apt install certbot python3-certbot-nginx```
* run certbot to generate and install an ssl certificate 
* sudo certbot --nginx -d your-domain.com -d www.your-domain.com
* follow the prompts and certbot will set up https automatically

### Test:
* visit your vps ip or domain name in a browser
(find your ip by typing ```hostname -I``` in Ubuntu ssh term)
* react frontend should load
* requests to /api/ should proxy to your node.js backend




__Instructions on how to update coming soon...__

# Further Notes...

__Note:__ Research on CICD - GitHub Actions?
https://www.youtube.com/watch?v=a5qkPEod9ng
(this guy uses docker but the workflow walkthrough and explainations of stuff like GitHub secrets are helpful.)

__Note:__ Nodemailer:
This module is cool. I have set up the backend with mock data, next step is to set up front end and get it to send real form data to the backend for emailing.

Will want to look into node body-parser module to help parse the form data into something that will play nicely with nodemailer.

Will also want to install the node cors package since the frontend and backend are seperate.
	
I have a chatgpt session open that has a lot of good code for this. https://chatgpt.com/c/675fc72d-d57c-800a-9f54-554929f8f068

Update:

Currently the issue is with authentication. It looks like username and password isn't enough. I am reading the documentation now
https://www.nodemailer.com/smtp/oauth2/
But it may be worth changing my authentication method to OAuth2

Consider looking into email engine?

Okay so, apparently Nodemailer cannot send emails from another person's email, which makes sense. Here is the article that put me on to this tidbit: https://stackoverflow.com/questions/69221631/nodemailer-error-recipient-command-failed-553-5-7-1-sender-address-rejected

However, for my purposes that's fine. I can just send emails to myself in the backend, and add the sender's email from the form as a replyTo option. This solution is just fine for form responses.

__Note:__ Testing:
I need to develop tests for this site. This will require looking into the current testing framework documentation, and developing test for existing features. Currently the email form submission is the only feature worth testing.

## Next Steps
* Improve UI
    * Style the form. ✅
    * Add colors for success/fail form submission message.
    * Once submitted, the page should change from a form with stuff in it to a page with a success message and maybe links to other parts of the website.
    * conduct any other UI improvements desired.
* Clean up Code
    * Add .env for frontend too
    * Remove unused code
    * abstract and clean up as neccesary
* Research for Production
    * study what the current production setup is, document it
    * consider improvements, including test servers?
    * document existing and desired setup, create steps to move towards desired setup and workflow
* Move to Production 
    * Once steps are lined out, begin pushing a working production build with the new contact form feature.