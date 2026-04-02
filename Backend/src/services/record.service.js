import Record from "../models/record.model.js";

export const createRecord = async (data, userId) => {
  return await Record.create({ ...data, userId });
};

export const getRecords = async (query, userId) => {
  const { type, category, startDate, endDate, page = 1, limit = 10 } = query;

  let filter = { userId, isDeleted: false };

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const skip = (page - 1) * limit;

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Record.countDocuments(filter);

  return {
    records,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

export const getRecordById = async (id, userId) => {
  return await Record.findOne({ _id: id, userId, isDeleted: false });
};

export const updateRecord = async (id, data) => {
  console.log("Updating ID:", id);

  const updated = await Record.findByIdAndUpdate(
    id,
    data,
    { returnDocument: "after" }
  );

  console.log("Updated Result:", updated);

  return updated;
};

export const deleteRecord = async (id, userId) => {
  await Record.findOneAndUpdate(
    { _id: id, userId, isDeleted: false },
    { isDeleted: true }
  );
};