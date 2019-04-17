<div style="display: flex; flex-direction: column; align-items: center;">
  
  ![](public/favicon.ico)
  
  <h2 style="font-size: 3em; margin: 0px;">OverRise</h2>
</div>

OverRise is a website that aims to **help you read the Bible**.  
Visit the site [here!](https://overrise.co.uk)

Any Suggestions or Feedback, please create an issue or [contact me](https://overrise.co.uk/contact-me), Thank you!


# Development
This repo holds the web frontend of OverRise and was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started). 

Look at the server code powering this project [here](https://github.com/OverRiseApp/overrise-server)

## Get started
Clone this repo, then:
1. `yarn`
2. `yarn start`

> Alternatively, use `npm` instead of `yarn`.

### Backend
In addition to this, you'll need to run [overrise-server](https://github.com/OverRiseApp/overrise-server). The steps required to run it can be found [in the repo](https://github.com/OverRiseApp/overrise-server).

## Environment Variables
By default, the environment variables on development shouldn't need to be changed. However, you can create `.env.local` or any combination found [here](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) to override the variables as necessary.  

The full list of required variables can be found in `.env.production`.  
Do not modify the variables in this file as those will be replaced by the production server before serving to user.

Refer to `.env.development` to see what kind of variable is expected.
> When adding new environment variables, add a new entry to both `.env.production` and `.env.development`

## Docker
You can build and push the docker image using the following command:
1. `docker build -t overrise/overrise-web .`
2. `docker push overrise/overrise-web`

```
docker build -t overrise/overrise-web . && docker push overrise/overrise-web
```

# Production

## Deploying through Docker
Here's a sample `docker-compose.yml` file.
```yml
version: '2'
services:
  ...
  overrise-web:
    image: overrise/overrise-web
    container_name: "overrise_web"
    restart: always
    ports:
     - '80:80'
    environment:
     - REACT_APP_GRAPHQL_ENDPOINT=http://api.overrise.co.uk/api/graphql
     - REACT_APP_API_ENDPOINT=http://api.overrise.co.uk/api
     - REACT_APP_SENTRY_DSN=
  ...
```