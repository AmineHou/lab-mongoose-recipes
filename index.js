const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    //Start of async function for synchronicity between CRUD ops
    (async function allCrud() {
      try {
        // ITERATION 2
        let crudOp = await Recipe.create({
          "title": "Mango-Peach Smoothie",
          "level": "Easy Peasy",
          "ingredients": [
            "1 peach",
            "1 mango",
            "1/2 cup vanilla soy milk",
            "1/2 cup orange juice"
          ],
          "cuisine": "International",
          "dishType": "drink",
          "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F414770.jpg&w=596&h=399&c=sc&poi=face&q=85",
          "duration": 10,
          "creator": "Ocultica"
        })
          .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
          .catch(error => console.log('An error happened while saving a new recipe:', error));

        // ITERATION 3
        crudOp = await Recipe.insertMany(data)
          .then(recipes => recipes.forEach((recipe) => console.log('The recipes are saved and their titles are: ', recipe.title)))
          .catch(error => console.log('An error happened while saving a new recipes:', error));

        //ITERATION 4
        const query = { title: 'Rigatoni alla Genovese' }
        crudOp = await Recipe.findOneAndUpdate(query, { duration: 100 })
          .then(console.log('update success'))
          .catch(error => console.log('update failed', error))

        // ITERATION 5
        crudOp = await Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(console.log('delete success'))
          .catch(error => console.log('delete failed', error))

        //ITERATION 6
        crudOp = await mongoose.connection.close()
          .then(console.log('disconnected'))
          .catch(error => console.log('error disconnecting', error))

      } catch (err) {
        (console.log(err))
      }
    })()
    //End and Execution of the async function

  })

  .catch(error => {
    console.error('error connecting to the database', error);
  });