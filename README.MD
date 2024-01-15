# Parallax Assignment

The task is to use this API and build a web app that allows a user, user1@example.com, to execute currency exchanges. The app should allow the user to quote, execute, and examine historical orders. The project was built using **_Node/React_**.

## Getting Started

To run the project locally, follow the instructions below.

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org)

- Clone the repository to your local machine.

### Backend

1. Navigate to the project directory.
2. Navigate to server folder

```shell
cd server
```

3. Install the server dependencies:

```shell
yarn
```

4. Run the server:

```shell
yarn start
```

The server will run on port http://localhost:3001

## Frontend

1. Open a new terminal
2. Navigate to frontend folder

```shell
cd client
```

3. Install the client dependencies:

```shell
yarn
```

4. Run the client:

```shell
yarn start
```

This will start the app and open it in your default browser. If it doesn't open automatically, you can visit http://localhost:3000 in your browser.

## Observations

- At the end I remove the `.env` file from `.gitignore` so I don't add extra steps for who's reviewing the code but that's something I would never do in real projects.

- `userId` is hardcoded on some of the requests as the login implementation wasn't build it.
