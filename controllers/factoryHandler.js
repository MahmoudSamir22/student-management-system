const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createOne = (Model, ModelName = "") =>
  asyncHandler(async (req, res, next) => {
    if (ModelName === "Task") {
      req.body.instructor = req.user._id;
    }
    const document = await Model.create(req.body);
    await document.save();
    res.status(201).json({ status: "Success", data: user });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doucmentCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate(doucmentCount)
      .filtering()
      .limitFields()
      .sort();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ paginationResult, result: documents.length, data: documents });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(
        new ApiError(`There is no document with this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ status: "Success", data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`There is no document with this id ${req.params.id}`, 404)
      );
    }
    await document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(
        new ApiError(`There is no document with this id ${req.params.id}`, 404)
      );
    }
    res.status(204).json();
  });
