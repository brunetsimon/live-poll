## Useful links
The app: https://votingapp-46f38.firebaseapp.com/

## What are we building?
We are building an app where users can give feedback to a question and the aggregated result will be displayed on a graph.  

## What are the requirements?
* The user shall be able to select a poll using a poll ID. 
* The user shall be able to vote for that specific poll ID.
* The user shall have 4 options to vote which corresponds to feelings from “Love” to “Hate”.
* The meeting organizer shall be able to select a poll using a poll ID.
* A graph showing the current poll result shall be displayed to the meeting organizer.
* The graph shall show “live” results and have one row/column for each feelings.

## What language is used to build the app?
To allow the app to run across multiple device we will use a [“Progressive Web App” instead of a “Native App”](https://medium.com/one-more-thing-studio/native-react-native-or-pwa-what-should-i-choose-e63f18732b5e). 
This means that the app is nothing more than a website which can be access by an URL.

Like any other websites, the app will be built using HTML, CSS and Javascript. 
But to make it feel more like a “real app” (no page reload, …) we will be using the Javascript library [React.js](https://reactjs.org/) develop by Facebook.
To save us lot of time we will also use a CSS library [material-ui](https://material-ui.com/) which provides already made component to make our app look good.


## App structure
![App structure](https://preview.ibb.co/crrz2f/live-voting.jpg)

## How to edit a file with my changes?

1. Navigate to the file to edit and click on the pen on the top right.
2. Edit your changes. 
3. Under the file you change there is a form with the title "Commit changes". 
4. Fill-in a title and a description of your changes. 
5. Select "Create a new branch for this commit".
6. Push Commit changes.
7. This creates a branch which is independent of the main app.
8. Wait for the test on CircleCI to pass.
9. Contact someone to review your code
10. You are done !
