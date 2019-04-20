const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {type:String, require:true},
    username: {type:String, require:true},
    password: {type:String, require:true},
    message: {type:String}

});

UserSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function(hashedPassword){
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
