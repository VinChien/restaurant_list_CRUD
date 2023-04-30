# My Restaurant List
## Introduction
Keep track of your own restaurant listings where you can browse restaurants, view details, and even link to a map.
## Function
- View all restaurants.
- Browse restaurant details.
- Search for a specific restaurant.
- Add restaurant.
- Edit restaurant.
- Delete restaurant.
## START
1. Make sure you have installed `node.js` and `npm`.
2. Clone the project locally.
3. After opening locally, enter the folder through the terminal and enter : `npm install`
4. You can create an env file in the project, directly copy the .env.example file, and modify SKIP to your own
   ```
   MONGODB_ENV=mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/restaurant-list?retryWrites=true&w=majority
   FACEBOOK_ID=<應用程式編號>
   FACEBOOK_SECRET=<應用程式密鑰>
   ```
5. import torrent file
   ```
   npm run seed
   ```
6. Stop using : `ctrl + c`
7. Once installed, go ahead and type : `npm run dev`
8. If you see this line of information, it means that it is running smoothly. Open your browser and enter the following URL : \
`Listening on http://localhost:3000`


## account secret

### first user
    email: user1@example.com
    password: 12345678
### second user 
    email: user2@example.com
    password: 12345678
