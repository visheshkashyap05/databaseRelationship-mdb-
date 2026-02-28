const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => {
        console.log("Connection Successful!");
    })
    .catch((err) => console.log(err));

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/mongoRelationDemo");
}

//definingUserSchema.
const userSchema = new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model("user", userSchema);

//addingDataIntoDb.
const addUsers = async () => {
    let user1 = new User({
        username: "ghost",
        addresses: [
            {
                location: "193, Shiv Mandir, UK",
                city: "Dheradun",
            },
        ],
    });

    user1.addresses.push({ location: "Vill. Dholakpur", city: "Mumbai" });
    let result = await user1.save();
    console.log(result);
};

addUsers();