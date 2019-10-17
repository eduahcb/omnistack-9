const mongoose = require('mongoose');

module.exports = () => {

    mongoose.connect("mongodb://localhost/omnistack-9", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}