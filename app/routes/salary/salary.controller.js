const salaryModel = require("../../models/salary-model"); //Import the salary model
const employModel = require("../../models/employ-model"); //Import the employ model
const { totalSalaryData, salaryListData } = require("../../utils/commonUtils"); //Import the Common Utils

//GET method route
module.exports.salaryList = async (request, response) => {
  try {
    const checkType = request.params.type;
    let _tempData = [];
    if (checkType === "id") {
      const checkId = { _id: request.params.value };
      const user = await salaryModel.findById(checkId);
      if (user) {
        let salaryData = JSON.parse(JSON.stringify(user));
        const employeeList = await employModel.findById(user.employee_id);
        let employeeData = JSON.parse(JSON.stringify(employeeList));
        let merged_Data = Object.assign({}, employeeData, salaryData);
        _tempData.push(merged_Data);
        response.send({
          message: "Successfull Response",
          statusCode: response.statusCode,
          data: _tempData,
        });
      } else {
        response.status(404).send({
          message: "Invalid Id",
          statusCode: response.statusCode,
        });
      }
    } else if (checkType === "date") {
      const checkData = request.params.value.includes("-");
      if (checkData) {
        const result = request.params.value.substr(5);
        const user = await salaryModel.find({ salary_month: result });
        salaryListData(request, response, _tempData, user); // use of common util function salaryListData
      } else {
        const user = await salaryModel.find({
          salary_month: request.params.value,
        });
        salaryListData(request, response, _tempData, user); // use of common util function salaryListData
      }
    } else {
      response.status(400).send({
        message: "Invalid Type Enter Valid Type for 'id' and 'date",
        statusCode: response.statusCode,
      });
    }
  } catch (error) {
    response.status(500).send({
      statusCode: response.statusCode,
      data: error,
    });
  }
};

//Post method route
module.exports.addSalary = async (request, response) => {
  try {
    const checkId = await employModel.findOne({
      _id: request.body.employee_id,
    });

    if (!checkId) {
      return response.status(404).send({
        message: "Data Not Found",
        statusCode: response.statusCode,
      });
    }
    const checkData = {
      employee_id: request.body.employee_id,
      salary_month: request.body.salary_month,
    };
    const salaryRecord = await salaryModel.find(checkData);
    let paid_salary = salaryRecord.reduce(
      (total_paid_salary, all_paid_salary) => {
        return (total_paid_salary += all_paid_salary.paid_salary);
      },
      0
    );
    const employeeData = await employModel.findOne({
      _id: request.body.employee_id,
    });
    if (salaryRecord && salaryRecord.length) {
      let total_paid_salary = paid_salary;
      let total_left_salary = employeeData.salary - total_paid_salary;
      totalSalaryData(request, response, total_left_salary); // use of common util function totalSalaryData
    } else {
      let total_paid_salary = 0;
      let total_left_salary = employeeData.salary - total_paid_salary;
      totalSalaryData(request, response, total_left_salary); // use of common util function totalSalaryData
    }
  } catch (error) {
    response.status(500).send({
      statusCode: response.statusCode,
      data: error,
    });
  }
};
