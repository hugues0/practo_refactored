module.exports = class Response {
  static response(res, statusCode, mess, data, error = false) {
    if (error) {
      return res.status(statusCode).json({
        status: statusCode,
        error: data,
      });
    }
    return res.status(statusCode).json({
      status: statusCode,
      message: mess,
      data,
    });
  }

  static errorResponse(res,msg,status){
    return res.status(status).json({
      status,
      error:msg,
    })
  }

  static successResponse(res,status,msg,data){
    return res.status(status).json({
      status,
      message: msg,
      data,
    })
  }
};
// export default Responding;
