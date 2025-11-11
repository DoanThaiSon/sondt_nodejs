import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    imageUrl: { type: String, required: true },
    link: { type: String },
    position: { type: String },
    status: { type: String, default: "active" },
    startDate: { type: Date },
    endDate: { type: Date }
}, { timestamps: true });
const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;

