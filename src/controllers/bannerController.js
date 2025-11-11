import Banner from "../models/Banner.js";


export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({
      status: "active",
      $or: [
        { startDate: { $lte: new Date() } },
        { startDate: null }
      ],
      $or: [
        { endDate: { $gte: new Date() } },
        { endDate: null }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy banner" });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title, description, imageUrl, link, position, status, startDate, endDate } = req.body;

    // Kiểm tra trường bắt buộc
    if (!imageUrl) {
      return res.status(400).json({ message: "imageUrl là bắt buộc" });
    }

    const newBanner = new Banner({
      title,
      description,
      imageUrl,
      link,
      position,
      status: status || "active",
      startDate,
      endDate
    });

    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo banner" });
  }
};