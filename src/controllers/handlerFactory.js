const catchAsyncFn = require('../utils/catchAsyncFn');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/appError');

exports.deleteOne = Model => catchAsyncFn(async (req, res, next) => {
  const document = await Model.findByIdAndDelete(req.params.id);
  if (!document) {
    const message = `Can not find document with id: ${req.params.id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful'
  });
})

exports.updateOne = Model => catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  const newDoc = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!newDoc) {
    const message = `Can not find document with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res
    .status(200)
    .json({
      status: 'successful',
      data: newDoc
    });
})

exports.createOne = Model => catchAsyncFn(async (req, res, next) => {
  const newDoc = await Model.create(req.body);
  res
    .status(200)
    .json({
      status: 'successful',
      data: newDoc
    });
});

exports.getOne = (Model, populateOptions) => catchAsyncFn(async (req, res, next) => {
  const id = req.params.id;
  let query = Model.findById(id);
  if (populateOptions) query = query.populate(populateOptions);
  const document = await query;
  if (!document) {
    const message = `Can not find document with id: ${id}`;
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'successful',
    data: document
  })
});

exports.getAll = Model => catchAsyncFn(async (req, res, next) => {

  // To allow nested GET reviews on product
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId};

  const length = await Model.countDocuments();
  const features = new APIFeatures(Model.find(filter), req.query, length)
    .doFilter()
    .doSort()
    .limitField()
    .doPaginate();
  const documents = await features.query;
  res
    .status(200)
    .json({
      status: 'successful',
      length: documents.length,
      data: documents
    })
});