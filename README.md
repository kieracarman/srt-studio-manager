# [SRT Studio Manager](https://github.com/kieracarman/srt-studio-manager)

by [Kiera Carman](https://kieracarman.com)

## Overview

This project is a web app management platform for a university sound recording technology department.

The scope of this project includes a tRPC/Prisma/MySQL backend to manage all of the different types of data involved, as well as a React.js frontend interface wrapped up in a neat little Next.js package. It also integrates with the university's Azure Active Directory to enable students and faculty to log in with their SSO .edu email address and password.

### Built with

- Next.js
- tRPC
- Prisma
- Tailwind
- NextAuth

## Installation

1. Set up a MySQL instance, local or remote

2. Create a `.env.local` file according to the `.env.example` file in the root directory

3. To install dependencies and run the project:

```
$ cd srt-studio-manager
$ npm install
$ npx prisma db push
$ npm run dev
```
