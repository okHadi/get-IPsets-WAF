A github actions workflow to get IPsets from WAF and display it on a react website by github pages.
## Use it to host your own react website:
### Step 1

Clone the application

### Step 2

Change the "homepage" in package.json using this format:
`"homepage": "https://<username>.github.io/<project>/",`

### Step 3

Add the required AWS secrets

### Step 4

Push the code to your own repo (make sure not to include the original .git folder)

### Step 5
Go to settings > Pages > 
      Source: Deploy from branch
      Branch: gh-pages
      Folder: /root
 And save.

### Note:

The react app shows two tables populated by "dev.json" and "prod.json". Right now, the react app is only populating the tables from "dev.json". Make changes like you see fit, both in the workflow and the react app.

