import * as recordService from "../services/record.service.js";

const getScopeUserId = (user) => (user?.role === "admin" ? undefined : user?._id);

export const create = async (req, res) => {
  try {
    const record = await recordService.createRecord(req.body, req.user._id);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await recordService.getRecords(
      req.query,
      getScopeUserId(req.user)
    );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id, getScopeUserId(req.user));

    res.json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const record = await recordService.updateRecord(
      req.params.id,
      req.body
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({ success: true, data: record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await recordService.deleteRecord(
      req.params.id,
      getScopeUserId(req.user)
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Record deleted",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};