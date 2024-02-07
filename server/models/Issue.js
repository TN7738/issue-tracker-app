const mongoose = require("mongoose");

const IssueModel = new mongoose.Schema({
    status: { type: String },
    owner: { type: String },
    effort: { type: Number },
    created: { type: Date },
    due: { type: Date },
    title: { type: String },
});

module.exports = mongoose.model("Issue", IssueModel);
