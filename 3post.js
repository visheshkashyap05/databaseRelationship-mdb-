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

const userSchema = new Schema({ username: String, email: String });

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//     let user1 = await User.findOne({ username: "vishu" });

//     let post2 = new Post({ content: "Greetings", likes: 8 });

//     post2.user = user1._id;

//     await post2.save();
// };

// addData();

const getData = async () => {
    const result = await Post.find({}).populate("user", "username");
    console.log(result);
};

getData();