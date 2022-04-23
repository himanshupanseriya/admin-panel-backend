const commissionModel = require("../../models/commission-model"); //Import the commission model
const employModel = require("../../models/employ-model"); //Import the employ model

//Get method route
module.exports.getAllCommission = async (request, response) => {
  try {
    // const Checkid = request.params.id;
    const checkId = request.params.id ? { _id: request.params.id } : {};
    const user = await commissionModel.find(checkId);
    let _tempArr = [];
    if (user && user.length) {
      for (let index = 0; index < user.length; index++) {
        const result = await employModel.findById(user[index].employee_id);
        let employeeData = JSON.parse(JSON.stringify(result));
        const ids = user[index];
        let commissionData = JSON.parse(JSON.stringify(ids));
        const merged_object = Object.assign({}, employeeData, commissionData);
        // const merged_object = { ...a, ...b };
        _tempArr.push(merged_object);
      }
    } else {
      return response.status(404).send({
        message: "Data Not Found",
        statusCode: response.statusCode,
      });
    }

    response.send({
      message: "Successfull Response",
      statusCode: response.statusCode,
      data: _tempArr,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: response.statusCode,
      data: error,
    });
  }
};

//Get method route
// module.exports.getAllCommission = async (request, response) => {
//   try {
//     const checkType = request.params.type;
//     let _tempData = [];
//     if (checkType === "id") {
//       const checkId = { _id: request.params.value };
//       const user = await commissionModel.findById(checkId);
//       if (!user) {
//         response.status(404).send({
//           message: "Invalid Id",
//           statusCode: response.statusCode,
//         });
//       } else {
//         let commissionData = JSON.parse(JSON.stringify(user));
//         const employeeList = await employModel.findById(user.employee_id);
//         let employeeData = JSON.parse(JSON.stringify(employeeList));
//         const merged_object = Object.assign({}, employeeData, commissionData);
//         _tempData.push(merged_object);
//         response.send({
//           message: "Successfull Response",
//           statusCode: response.statusCode,
//           data: _tempData,
//         });
//       }
//     } else if (checkType === "date") {
//       const checkDate = { date: request.params.value };
//       const user = await commissionModel.find(checkDate);
//       if (user && user.length) {
//         for (i = 0; i < user.length; i++) {
//           const employeeList = await employModel.findById(user[i].employee_id);
//           let employeeData = JSON.parse(JSON.stringify(employeeList));
//           let commissionData = JSON.parse(JSON.stringify(user[i]));
//           const merged_object = Object.assign({}, employeeData, commissionData);
//           _tempData.push(merged_object);
//         }
//         response.send({
//           message: "Successfull Response",
//           statusCode: response.statusCode,
//           data: _tempData,
//         });
//       } else {
//         response.status(404).send({
//           message: "Data Not Found",
//           statusCode: response.statusCode,
//         });
//       }
//     } else {
//       response.status(400).send({
//         message: "Invalid Type Enter Valid Type for 'id' and 'date",
//         statusCode: response.statusCode,
//       });
//     }
//   } catch (error) {
//     response.status(500).send({
//       statusCode: response.statusCode,
//       data: error,
//     });
//   }
// };

//Post method route
module.exports.addCommission = async (request, response) => {
  try {
    const id = request.body.employee_id;
    const Checkid = await employModel.findById(id);
    if (Checkid) {
      const commission = new commissionModel(request.body);
      const result = await commission.save();
      response.send({
        message: "Successfull Response",
        statusCode: response.statusCode,
        data: result,
      });
    } else {
      response.status(404).send({
        message: "Employeee Not Found",
        statusCode: response.statusCode,
      });
    }
  } catch (error) {
    response.status(500).send({
      statusCode: response.statusCode,
      data: error.message,
    });
  }
};

//Put method route
module.exports.updateCommissionData = async (request, response) => {
  try {
    const _id = request.params.id;
    const result = await commissionModel.findByIdAndUpdate(
      { _id },
      request.body,
      {
        new: true,
      }
    );
    if (!result) {
      return response.status(404).send({
        message: "Data Not Found",
        statusCode: response.statusCode,
      });
    }
    response.send({
      message: "Successfull Response",
      statusCode: response.statusCode,
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: response.statusCode,
      data: error,
    });
  }
};

//Delete method route
module.exports.deleteCommissionData = async (request, response) => {
  try {
    const _id = request.params.id;
    const result = await commissionModel.findByIdAndDelete({ _id });
    if (!result) {
      return response.status(404).send({
        message: "Data Not Found",
        statusCode: response.statusCode,
      });
    }
    response.send({
      message: "Successfull Response",
      statusCode: response.statusCode,
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      statusCode: response.statusCode,
      data: error,
    });
  }
};
