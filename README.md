A github actions workflow to get IPsets from WAF and display it on a react website by github pages.

### Note: The current workflow first adds the ip to a s3 bucket along a description to show on the react website. For previous version, which only worked with WAF, check the legacy branch.

## Use it to host your own react website:

### Step 1

Clone the application

### Step 2

Change the "homepage" in package.json using this format:
`"homepage": "https://<username>.github.io/<project>/",`
Where the project is the name of your repo.

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

The react app shows two tables populated by "dev.json", which has two IPSets, Blocked and Whitelisted. You need to make changes to the workflow file (i.e name of the IPsets) and the react app (i.e the number of tables) to make it work for you.


