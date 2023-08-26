# Auth0 Setup (optional)

You can optionally configure Auth0 to manage users and authentication.

You will need to set up an Auth0 tenant and store some environment variables.

- Set up a [machine to machine app](https://auth0.com/docs/applications/set-up-an-application/register-machine-to-machine-applications)

  The app needs the following permissions:

  - `client_credentials` (under Advanced Settings -> OAuth)

  This is used by the backends

  - Store the **client id** in environment variable `AUTH0_MACHINE_TO_MACHINE_CLIENT_ID`
  - Store the **client secret** in environment variable `AUTH0_MANAGEMENT_CLIENT_SECRET`

- Set up a [single page app](https://auth0.com/docs/applications/set-up-an-application/register-single-page-app)

  This is used by the frontend

  There are some steps that you need to take on the Auth0 config for this:

  - Set `Allowed Callback URLs` = "http://localhost"
  - Set `Allowed Web Origins` = "http://localhost"

  Then, set the following environment variables

  - **domain** as `AUTH0_DOMAIN`
  - **client id** as `AUTH0_SPA_CLIENT_ID`
