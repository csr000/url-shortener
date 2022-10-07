import mongoose from "mongoose";

mongoose.connect(process.env.dbURL as string);
