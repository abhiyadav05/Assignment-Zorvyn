import Record from "../models/record.model.js";

const buildMatch = (userId) =>
  userId ? { userId, isDeleted: false } : { isDeleted: false };

export const getSummary = async (userId) => {
  const result = await Record.aggregate([
    {
      $match: buildMatch(userId),
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
  };
};


// categorywise 

export const getCategoryWise = async (userId) => {
  return await Record.aggregate([
    {
      $match: buildMatch(userId),
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);
};

// Monthly Trends

export const getTrends = async (userId) => {
  return await Record.aggregate([
    {
      $match: buildMatch(userId),
    },
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id": 1 },
    },
  ]);
};

// Recent Transactions

export const getRecent = async (userId) => {
  return await Record.find(buildMatch(userId))
    .sort({ createdAt: -1 })
    .limit(5);
};