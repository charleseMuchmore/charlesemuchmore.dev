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

__Note:__ Research on web form mailing - Nodemailer
I'd like to look more into this module.
	
__Note:__ Nodemailer
When creating a transporter: 
```
let transporter = nodemailer.createTransport(options[, defaults])
```
You can specify in the defaults if you want to set the same "from" address for every message. Likewise, in my use case, I would want to set the same "too" address for every message, to route all the messages from the webpage to me. 

A helpful article with code snippets (snippet below too): https://mailtrap.io/blog/sending-emails-with-nodemailer/

```
// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: '1a2b3c4d5e6f7g',
    pass: '1a2b3c4d5e6f7g',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'someone@email.com',
  to: 'myaddress@email.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(‘Error:’ error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
```

Use this snippet to verify that the server is ready to receive connections I think: 
```
// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
```
Be aware though that this call only tests connection and authentication, but it does not check if the service allows you to use a specific envelope “From” address or not.

Need to look into ethereal and understand if it could be useful for me.