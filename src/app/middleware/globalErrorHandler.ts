import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // MongoDB Duplicate Key Error Handle
  if (err.code && err.code === 11000) {
    const duplicateKey = Object.keys(err.keyValue)[0];
    const duplicateValue = err.keyValue[duplicateKey];
    const message = `Duplicate '${duplicateKey}': '${duplicateValue}'. Please use a different value.`;

    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message,
    });
  }

  // Body missing / validation error (custom check)
  if (
    err.message &&
    (err.message.toLowerCase().includes('body') || err.message.toLowerCase().includes('missing'))
  ) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Body data missing',
    });
  }

  // Default generic error handler
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default globalErrorHandler;
