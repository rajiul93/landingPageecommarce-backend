import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.error(err);

  // MongoDB Duplicate Key Error Handle
  if (err.code && err.code === 11000) {
    const duplicateKey = Object.keys(err.keyValue)[0];
    const duplicateValue = err.keyValue[duplicateKey];
    const message = `Duplicate '${duplicateKey}': '${duplicateValue}'. Please use a different value.`;

    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Default generic error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err?.message || 'Something went wrong!',
  });
};

export default globalErrorHandler;
