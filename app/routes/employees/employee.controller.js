const employModel = require("../../models/employ-model"); //Import the employ model
const fs = require("fs");

//GET method route
module.exports.getEmployeeData = async (request, response) => {
  try {
    const checkId = request.params.id ? { _id: request.params.id } : {};
    const user = await employModel.find(checkId);
    if (user && user.length) {
      return response.send({
        message: "Successfull Response",
        statusCode: response.statusCode,
        data: user,
      });
    } else {
      return response.status(404).send({
        message: "Data Not Found",
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
module.exports.createEmployeeData = async (request, response) => {
  try {
    const employeeList = await employModel.findOne({
      employee_code: request.body.employee_code,
    });
    if (employeeList == null || !employeeList.employee_code) {
      let user = new employModel(request.body);
      user.employee_code = request.body.employee_code;
      if (request.files.profile_photo == null) {
        const employeeData = await user.save();
        response.send({
          message: "Successfull Response",
          statusCode: response.statusCode,
          data: employeeData,
        });
      } else {
        const profilePhotoData = request.files.profile_photo[0];
        const profile_photo_path = `data/${user.id}/ProfilePhoto/${profilePhotoData.originalname}`;
        user.profile_photo = profile_photo_path;
        await fs.promises
          .mkdir(`data/${user.id}/ProfilePhoto/`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        {
          await fs.writeFile(
            `data/${user.id}/ProfilePhoto/${profilePhotoData.originalname}`,
            profilePhotoData.buffer,
            function (err) {
              if (err) throw err;
            }
          );
        }
        const aadharcardPhotoData = request.files.aadharCard_photo[0];
        const aadharCard_photo_path = `data/${user.id}/Document/${aadharcardPhotoData.originalname}`;
        user.aadharCard_photo = aadharCard_photo_path;
        await fs.promises
          .mkdir(`data/${user.id}/Document/`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        {
          await fs.writeFile(
            `data/${user.id}/Document/${aadharcardPhotoData.originalname}`,
            aadharcardPhotoData.buffer,
            function (err) {
              if (err) throw err;
            }
          );
        }

        const pancardPhotoData = request.files.panCard_photo[0];
        const panCard_photo_path = `data/${user.id}/Document/${pancardPhotoData.originalname}`;
        user.panCard_photo = panCard_photo_path;
        await fs.promises
          .mkdir(`data/${user.id}/Document/`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        {
          await fs.writeFile(
            `data/${user.id}/Document/${pancardPhotoData.originalname}`,
            pancardPhotoData.buffer,
            function (err) {
              if (err) throw err;
            }
          );
        }

        const employeeData = await user.save();
        response.send({
          message: "Successfull Response",
          statusCode: response.statusCode,
          data: employeeData,
        });
      }
    } else {
      response.status(400).send({
        message: "Please Enter Unique Employee Code",
      });
    }
  } catch (error) {
    response.status(500).send({
      data: error,
    });
  }
};

module.exports.getEmployeeList = async (request, response) => {
  try {
    let startDate = new Date(request.body.from_date).getTime();
    let endDate = new Date(request.body.to_date).getTime();
    let employeeList = {
      $or: [
        {
          form_entry_date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          process_date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          trial_start_date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          trial_end_date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          employee_start_date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          rejected_date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      ],
    };
    const stautsObj = {
      SELECTED: request.body.status_selected,
      PENDING: request.body.status_pending,
      REJECTED: request.body.status_rejected,
      PROCESSING: request.body.status_processing,
      INTRIAL: request.body.status_in_trial,
    };
    let statusValue = Object.values(stautsObj);
    let _tempData = [];
    statusValue.filter((data, index) => {
      if (data === true) {
        _tempData.push(index);
      }
    });
    const checkStatusValue = _tempData.map(
      (data) => Object.keys(stautsObj)[data]
    );
    if (
      startDate &&
      endDate &&
      (request.body.status_selected ||
        request.body.status_pending ||
        request.body.status_processing ||
        request.body.status_rejected ||
        request.body.status_in_trial)
    ) {
      const employeeRecord = await employModel.find(employeeList);
      if (employeeRecord && employeeRecord.length) {
        const employeeListData = checkStatusValue.map((item) =>
          employeeRecord.filter((data) => data.status === item)
        );
        const employeeData = employeeListData.flat(1);
        response.send({
          message: "Successfull Response",
          statusCode: response.statusCode,
          data: employeeData,
        });
      } else {
        response.send({
          message: "Record Not Found",
          statusCode: response.statusCode,
          data: [],
        });
      }
    } else if (
      request.body.status_selected ||
      request.body.status_pending ||
      request.body.status_processing ||
      request.body.status_rejected ||
      request.body.status_in_trial
    ) {
      const employeeData = await employModel.find({
        status: { $in: checkStatusValue },
      });
      if (employeeData && employeeData.length) {
        response.send({
          message: "Successfull Response",
          statusCode: response.statusCode,
          data: employeeData,
        });
      } else {
        response.send({
          message: "Record Not Found",
          statusCode: response.statusCode,
          data: [],
        });
      }
    } else {
      response.send({
        message: "Record Not Found",
        statusCode: response.statusCode,
        data: [],
      });
    }
  } catch (error) {
    response.status(500).send({
      data: error,
    });
  }
};

//Put method route
module.exports.updateEmployeeData = async (request, response) => {
  try {
    const _id = request.params.id;
    const result = await employModel.findByIdAndUpdate({ _id }, request.body, {
      new: true,
    });
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
module.exports.deleteEmployeeData = async (request, response) => {
  try {
    const _id = request.params.id;
    const result = await employModel.findByIdAndDelete({ _id });
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
