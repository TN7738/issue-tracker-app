const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(
        "mongodb+srv://fehal40363:TfkGqL9TfrvqTsQ5@cluster0.rlxklyo.mongodb.net/issues_db?retryWrites=true&w=majority"
    );

    console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
