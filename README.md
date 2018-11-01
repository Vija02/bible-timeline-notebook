# OverRise Web

OverRise is a web app that allows user to make bible notes using a timeline view.  

This repo holds the web frontend of OverRise.  
The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  
Click [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for the most recent guide of CRA

Look at the server for this project [here](https://github.com/OverRiseApp/overrise-server)

## Get started
1. `yarn`
2. `yarn start`

## Deploying through Docker
1. `docker run -p 80:3000 overrise/overrise-web`

## Development 
1. `docker build -t overrise/overrise-web .`
2. `docker push overrise/overrise-web`
