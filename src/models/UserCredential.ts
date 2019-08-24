import * as mongoose from 'mongoose';

const UserCredentialSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    createdAt: String
}, {
    collection: 'user_credential',
    timestamps: true
})

module.exports = mongoose.model('UserCredential', UserCredentialSchema);