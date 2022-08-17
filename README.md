# [SRT Studio Manager](https://github.com/kieracarman/srt-studio-manager)

by [Kiera Carman](https://kieracarman.com)

## Overview

This project is a web app management platform for a university sound recording technology department.

The scope of this project includes multiple RESTful APIs to manage all of the different data involved, as well as a frontend interface and integration with the university's Active Directory to enable students and faculty to log in with their SSO .edu email address and password.

### Built with

- Node.js
- Express.js
- MongoDB
- Mongoose
- React
- Redux
- Passport.js

## Installation

1. Set up a MongoDB instance, local or remote

2. Create a `.env.local` file according to the `.env.example` file in the root directory, using your MongoDB connection string, desired server port, etc.

3. To install dependencies and run the project:

```
$ cd srt-studio-manager
$ npm install

$ cd client
$ npm install

$ cd ..
$ npm run dev
```