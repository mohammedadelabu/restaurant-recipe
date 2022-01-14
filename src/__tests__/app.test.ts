import supertest from 'supertest';
import app from "../app";


let token: string;
let recipeIds: string;

let loginData = {
    fullname: "dev zack",
    email: "zack@gmail.com",
    password: "123456"
}


describe("POST/signup",()=>{
    it("return status code 201",async()=>{
        const res=await supertest(app)
        .post("/api/auth/register")
        .send(loginData)
        expect(res.statusCode).toEqual(201)
    })

    test("login", async () => {
      const response = await supertest(app)
        .post("/api/auth/login")
        .send({ fullname: loginData.fullname, email: loginData.email,  password: loginData.password });
      token = response.body.accessToken;
      // console.log( token);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("You are logged in");
  });
})

describe("recipes", () => {
const recipeData = {
    title: "Jamaican Jollof Rice",
    meal_type: "lunch",
    difficulty_level: "Intermediate",
    ingredients: [
        {
            name: "onions",
            price: "50"
        },
        {
            name: "4 cups of rice",
            price: "3000"
        },
        {
            name: "10 satchets of Knorr",
            price: "2500"
        }
    ],
    preparation: "Boil the water for 10mins, rinse the rice, fry the pepper, add salt, maggi and pepper"
  };

  test("create recipe", async () => { 
    const response = await supertest(app)
      .post("/api/recipes")
      .set("token", `Bearer ${token}`)
      .send(recipeData);
      // console.log(response.body)
      recipeIds = response.body.savedRecipe._id;
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("A recipe has been created");

  });

  test("get all recipes", async () => {

      const response = await supertest(app)
        .get("/api/recipes/all/data")
        .set("token", `Bearer ${token}`);
      expect(response.status).toBe(200);
  });
  
  test("get all paginated recipes", async () => {
      const response = await supertest(app)
        .get("/api/recipes/data/4")
        .set("token", `Bearer ${token}`);        
      expect(response.status).toBe(200);
  });

  test("get a recipe", async () => {
      const response = await supertest(app)
        .get(`/api/recipes/${recipeIds}`)
        .set("token", `Bearer ${token}`);
      expect(response.status).toBe(200);
  });

  test("update a recipe", async () => {
    const response = await supertest(app)
      .put(`/api/recipes/${recipeIds}`)
      .set("token", `Bearer ${token}`)
      .send(recipeData);
    expect(response.status).toBe(200);

  });

  test("delete a recipe", async () => {
    const response = await supertest(app)
      .delete(`/api/recipes/${recipeIds}`)
      .set("token", `Bearer ${token}`);
    expect(response.status).toBe(200);

});

})

