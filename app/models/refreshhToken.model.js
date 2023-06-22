const mongoose = require("mongoose");
const config = require("../config/auth.config");
const {v4: uuidv4} = require('uuid');

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},
expiryDate: Date,
});

RefreshTokenSchema.static.createToke = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
    );
        let _toke = uuidv4();

        let _obeject = new this({
            token: _toke,
            user: user._id,
            expiryDate: expiredAt.getTime()
        });

        console.log(_obeject)
};

RefreshTokenSchema.static.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshToken;



