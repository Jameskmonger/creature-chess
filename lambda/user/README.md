# User service

This is a Serverless project to handle the User service functions

- GET `/user/current` to get the current user (based on token)
- PATCH `/user/current` to update the current user nickname/pass (based on token)

## Setup

Run `yarn` to install dependencies

## Deploying

Run `yarn deploy:live` to deploy to Live (needs AWS auth)

## Local dev

Run `yarn dev` to run Serverless Offline.
