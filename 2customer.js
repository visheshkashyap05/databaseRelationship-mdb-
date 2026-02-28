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

//definingSchemas
const orderSchema = new Schema({ item: String, price: Number });

const customerSchema = new Schema({
    name: String,
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

//mongooseMiddlewaresToHandleDeletions

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("PRE_MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        let result = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(result, "\nThis data is deleted by POST_MIDDLEWARE!");
    }
});

//creatingModels
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
    //usedToExtractEntireDocumentInsteadOfOnlyFocumentId
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};

// findCustomer();

const addCustomer = async () => {
    let newCustomer = new Customer({
        name: "Vishu",
    });

    let newOrder = new Order({
        item: "Sandwich",
        price: 200,
    });

    newCustomer.orders.push(newOrder);
    
    await newOrder.save();
    await newCustomer.save();

    console.log("Added new customer successfully!.");
};

// addCustomer();

const delCustomer = async () => {
    let data = await Customer.findByIdAndDelete("67473fe6d0a76cd515bd6984");
    console.log(data, "\nData above is deleted!");
};

delCustomer();