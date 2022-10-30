const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {
     console.log("Connected successfully to server");

     Dishes.create({
          name: "Chapo",
          description: "test"
     })
          .then((dish) => {
               console.log(dish);
               return Dishes.findByIdAndUpdate(dish._id, { $set: { description: "Updated test" } }, { new: true }).exec();
          })
          .then((dish) => {
               console.log(dish);

               dish.comments.push({
                    rating: 5,
                    comment: "I'm getting a sinking feeling",
                    author: "Ivan Maguaya"
               });
               return dish.save();
          })
          .then((dish) =>  {
               console.log(dish);
               return Dishes.remove({})// ;lremove all dishes from db
          })
          .then(() => {
               return mongoose.connection.close();
          })
          .catch((err) => {
               console.log(err);
          })
});