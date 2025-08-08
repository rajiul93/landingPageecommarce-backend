import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
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

  // Custom check: যদি বডি মিসিং হয় (validation error বা অন্যত্র)
  // এখানে ধরে নিচ্ছি তুমি validation middleware থেকে err.message দিয়ে পাঠাও
  if (
    err.message &&
    (err.message.toLowerCase().includes('body') || err.message.toLowerCase().includes('missing'))
  ) {
    return res.status(400).json({
      success: false,
      message: 'Body data missing',
    });
  }

  // Default generic error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err?.message || 'Something went wrong!',
  });
};

export default globalErrorHandler;


