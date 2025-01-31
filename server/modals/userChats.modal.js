import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatsSchema = new Schema({
    partner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    messages: [
        {
            userMessage: {
                type: String,
                required: true,
                trim: true,
              },
            aiResponse: {
                type: String,
                required: true,
                trim: true,
              },
              timestamps: {
                userSentAt: {
                  type: Date,
                  default: Date.now,
                },
                aiRespondedAt: {
                  type: Date,
                },
              },
        }
      ],
      timestamps: true,
});

const UserChats = mongoose.model("UserChat", chatsSchema);

export default UserChats;
