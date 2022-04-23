const employModel = require("../models/employ-model"); //Import the employ model
const salaryModel = require("../models/salary-model"); //Import the salary model

//common function use of totalSalaryData
module.exports.totalSalaryData = async (
  request,
  response,
  total_left_salary
) => {
  const user = new salaryModel(request.body);
  if (total_left_salary < request.body.paid_salary) {
    response.status(404).send({
      message: `You Can't Pay More than ${total_left_salary} Salary`,
      statusCode: response.statusCode,
    });
  } else {
    const addSalaryData = await user.save();
    response.send({
      message: "Successfull Response",
      statusCode: response.statusCode,
      data: addSalaryData,
    });
  }
};

//common function use of salaryListData
module.exports.salaryListData = async (request, response, _tempData, user) => {
  if (user && user.length) {
    for (i = 0; i < user.length; i++) {
      const employeeList = await employModel.findById(user[i].employee_id);
      let employeeData = JSON.parse(JSON.stringify(employeeList));
      let salaryData = JSON.parse(JSON.stringify(user[i]));
      const merged_object = Object.assign({}, employeeData, salaryData);
      _tempData.push(merged_object);
    }
    response.send({
      message: "Successfull Response",
      statusCode: response.statusCode,
      data: _tempData,
    });
  } else {
    response.status(404).send({
      message: "Data Not Found",
      statusCode: response.statusCode,
    });
  }
};
