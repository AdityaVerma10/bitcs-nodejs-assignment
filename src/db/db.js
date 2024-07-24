import sqlite3 from "sqlite3"

export const db = new sqlite3.Database(':memory:',((err)=>{
  if(err) console.log(err)
  else console.log("DB Connected....")
}));

db.serialize(()=>{
  db.run(`CREATE TABLE cats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    breed TEXT NOT NULL
  )`);

 const cats = [
    {
      "id": 1,
      "name": "Whiskers",
      "age": 2,
      "breed": "Siamese"
    },
    {
      "id": 2,
      "name": "Mittens",
      "age": 3,
      "breed": "Maine Coon"
    },
    {
      "id": 3,
      "name": "Shadow",
      "age": 4,
      "breed": "Bengal"
    },
    {
      "id": 4,
      "name": "Luna",
      "age": 1,
      "breed": "Persian"
    },
    {
      "id": 5,
      "name": "Simba",
      "age": 5,
      "breed": "Abyssinian"
    },
    {
      "id": 6,
      "name": "Oreo",
      "age": 2,
      "breed": "Ragdoll"
    },
    {
      "id": 7,
      "name": "Bella",
      "age": 3,
      "breed": "Scottish Fold"
    },
    {
      "id": 8,
      "name": "Chloe",
      "age": 4,
      "breed": "Sphynx"
    },
    {
      "id": 9,
      "name": "Tiger",
      "age": 5,
      "breed": "Birman"
    },
    {
      "id": 10,
      "name": "Coco",
      "age": 1,
      "breed": "British Shorthair"
    },
    {
      "id": 11,
      "name": "Sassy",
      "age": 2,
      "breed": "Russian Blue"
    },
    {
      "id": 12,
      "name": "Boots",
      "age": 3,
      "breed": "American Shorthair"
    },
    {
      "id": 13,
      "name": "Smokey",
      "age": 4,
      "breed": "Norwegian Forest"
    },
    {
      "id": 14,
      "name": "Ginger",
      "age": 5,
      "breed": "Chartreux"
    },
    {
      "id": 15,
      "name": "Midnight",
      "age": 1,
      "breed": "Turkish Angora"
    },
    {
      "id": 16,
      "name": "Patches",
      "age": 2,
      "breed": "Japanese Bobtail"
    },
    {
      "id": 17,
      "name": "Pumpkin",
      "age": 3,
      "breed": "Devon Rex"
    },
    {
      "id": 18,
      "name": "Snowball",
      "age": 4,
      "breed": "Burmese"
    },
    {
      "id": 19,
      "name": "Tom",
      "age": 5,
      "breed": "Egyptian Mau"
    },
    {
      "id": 20,
      "name": "Garfield",
      "age": 1,
      "breed": "Ocicat"
    }
  ]

  const query = db.prepare("INSERT INTO CATS(name, age, breed) VALUES (?,?,?)");

  cats.map((cat)=>{
    query.run(cat.name,cat.age,cat.breed);
  })

  query.finalize();

})
