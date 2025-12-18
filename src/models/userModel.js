import mongoosePkg from 'mongoose';
const { Schema, model } = mongoosePkg;

import bcryptPkg from 'bcryptjs';
const { hash, compare } = bcryptPkg;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    roles: {
        type: [String],
        default: ['user'],
    },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
export default User;