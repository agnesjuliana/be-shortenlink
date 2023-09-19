function buildResponse(data, responseStatus = true, responseMessage = null) {
  const status = responseStatus ? 'success' : 'error' 
  const message = responseStatus ? responseMessage : {error: responseMessage}
  return {
    status,
    message,
    data,
  };
}

function handleError(err, req, res, next) {
  console.error(err); // Log the error for debugging purposes

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(
    buildResponse(null, false, message)
  );
}

module.exports = {
  buildResponse,
  handleError
};
