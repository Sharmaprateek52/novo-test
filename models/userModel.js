const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
        user_id: { type: String, },
        name: { type: String, },
        latlong: {
            type: { type: String, trim: true },
            coordinates: [],
        },
    },
    {
        timestamps: true,
        versionKey: false
    });
UserSchema.index({ latlong: "2dsphere" });


const User = mongoose.model("User", UserSchema);
module.exports = User;