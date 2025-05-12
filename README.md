## Explanation

There are 2 main pages

## Login

This page will show a form to put the credentials of the user.

There are 3 users already created for this demo.

| Email  | Password |
| ------------- | ------------- |
| william@guatemala502.com|MyPass1234  |
| carlos@guatemala502.com |Walk1234  |
| jessica@exguatemala502ample.com|Sing1234  |

When pressing the Login button, this will ask a JWT to the back-end, if the credentials are ok, it will receive an JWT as a response and it will redirect to the /send-sms page.

## Send SMS page

This page will be show only if the user has been authenticated and the JWT hasn't expired.

It has a form with 3 field: country code (Guatemala and El Salvador for this demo), phone number and message to be send. When pressing the button Submit, it will call the back-end, the back-end will validate the data and if everything is correct it will save the message in the database and show a message that it was send successfully. It also will show the message send in the console.

The logout button will delete the session and will redirect to the login page.

## How to run

After running the back-end, run the front-ent like following

Install the dependencies

```
npm install
```

Run the project

```
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser
