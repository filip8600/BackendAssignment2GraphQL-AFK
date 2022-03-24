Welcome to our GraphQL Hotel system

Build with express, Prisma on PostGreSQL on Docker
ensure docker is running
run ``npm install``
ensure both database and backend is running with  ``npm run start-db`` and  ``npm run start`` 

First time use this command to create database:
run ``npx prisma migrate dev --name init``

Use example queries in "DemoQueries.txt"