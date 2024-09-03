const joi = require("joi");

const AddBlogValidator = joi.object({
  title: joi.string().required(),
  description: joi.string().max(255).trim(),
  author: joi.string(),
  state: joi.string(),
  readCount: joi.number().default(Date.now),
  readingTime: joi.number().default(Date.now),
  tags: joi.array().items(joi.string()),
  body: joi.string(),
  timeStamp: joi.number().default(Date.now),
});

const UpdateBlogValidator = joi.object({
  title: joi.string().optional(),
  description: joi.string().max(255).trim(),
  author: joi.string(),
  state: joi.string(),
  readCount: joi.number().default(Date.now),
  readingTime: joi.number().default(Date.now),
  tags: joi.array().items(joi.string()),
  body: joi.string(),
  timeStamp: joi.number().default(Date.now),
});

async function AddBlogValidationMW(req, res, next) {
  const BlogPayload = req.body;

  try {
    await AddBlogValidator.validateAsync(BlogPayload);
    next();
  } catch (error) {
    next({ message: error.details[0].message, status: 400 });
  }
}

async function UpdateBlogValidationMW(req, res, next) {
  const BlogPayload = req.body;

  try {
    await UpdateBlogValidator.validateAsync(BlogPayload);
    next();
  } catch (error) {
    next({ message: error.details[0].message, status: 400 });
  }
}

module.exports = {
  AddBlogValidationMW,
  UpdateBlogValidationMW,
};
