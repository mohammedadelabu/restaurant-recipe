This is a food recipe management app. This app will help it's users to manage food recipes.

## 1. I Implemented this app using MongoDB

### Setup

1. I used `TypeScript` for the task and build the APIs (endpoints) with `express`
2. I Used and setup the project with `Yarn`

My recipe data structure looks like the following:

```
 {
    title: "Jamaican Jollof Rice",

    meal_type: "breakfast" or "lunch" or "supper" or "snack" ( Hint: use enum ),

    difficulty_level: "Beginner" or "Intermediate" or "Advanced" (Hint: use enum),

    ingredients: [
      {name: "onions", price:"50"},
      {name: "4 cups of rice", price:"3000"},
      ...
    ],

    preparation: "Boil the water for 10mins, rinse the rice, fry the pepper, add salt, maggi and pepper"
}
```

Additional Info:
My database have the following collection

- recipe_collection

  - title
  - meal_type
  - difficulty_level
  - ingredients
  - preparation
  - created_At
  - updated_At

- user_collection
  - email (unique)
  - password
  - fullname
  - created_At
  - updated_At

### The Endpoints I Implemented and tested are the following:

| Method | Endpoint           | Enable a user to:                       |
| :----- | :----------------- | :-------------------------------------- |
| POST   | /user/signup       | Enable user signup                      |
| POST   | /user/login        | Enable user to login                    |
| GET    | /user/logout       | Get all recipes that a user has created |
| GET    | /recipes           | Get all recipes that a user has created |
|        | /recipes/:recipeId | Getting recipe by its id                |
| POST   | /recipes           | To create a recipe                      |
| PUT    | /recipes/:recipeId | To update recipe by id                  |
| DELETE | /recipes/:recipeId | To delete a recipe by id                |

## Clarification
I implemented the following:

-  pagination, with limit of 5 values for each page
-  Authentication and Authorization for users using a middleware function
-  Validation for incoming request using Joi
- Only registered users can access all recipes endpoint
- I used mongoDB-compass for local development

## Test coverage 

- I wrote test to cover my application using supertest
- I tested my database using mongodb-memory-server
- I tested all endpoints (GET, POST, PUT, DELETE)

## Documentation

- I documented my API with postman

## Hosting

- I hosted my application on Heroku
