import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        uname: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
)

export default userSchema