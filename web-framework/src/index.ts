// Import the User class from the model module so it can be created and used here.
import { User } from "./models/User";

// Create a User and pass in the initial data expected by the UserProps interface.
// The constructor requires an object containing both a name string and an age number.
const user = new User ({name: "Robin",  age: 40 })

user.set({age: 9999})

// Test the get() method with each valid UserProps key.
// Because get() uses keyof UserProps, only existing property names such as
// "name" and "age" can be passed here.
console.log(user.get("name"));
console.log(user.get("age"));

