const employModel = require("../../models/employ-model"); //Import the employ model
const fs = require("fs");

//Post method route
module.exports.createEmployeeData = async (request, response) => {
  try {
    const employeeList = await employModel.findOne({
      employee_code: request.body.employee_code,
    });
    if (employeeList == null || !employeeList.employee_code) {
      let user = new employModel(request.body);
      user.profile_photo = "";
      user.aadharCard_photo = "";
      user.panCard_photo = "";
      user.employee_code = request.body.employee_code;
      if (
        request.files.profile_photo !== undefined ||
        request.files.aadharCard_photo !== undefined ||
        request.files.panCard_photo !== undefined
      ) {
        if (request.files.profile_photo !== undefined) {
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
            await fs.promises.writeFile(
              `data/${user.id}/ProfilePhoto/${profilePhotoData.originalname}`,
              profilePhotoData.buffer,
              function (err) {
                if (err) throw err;
              }
            );
          }
        }
        if (request.files.aadharCard_photo !== undefined) {
          const aadharcardPhotoData = request.files.aadharCard_photo[0];
          const aadharCard_photo_path = `data/${user.id}/Document/AadharCard/${aadharcardPhotoData.originalname}`;
          user.aadharCard_photo = aadharCard_photo_path;
          await fs.promises
            .mkdir(`data/${user.id}/Document/AadharCard/`, {
              recursive: true,
            })
            .catch((error) => {
              console.error("caught exception : ", error.message);
            });
          {
            await fs.promises.writeFile(
              `data/${user.id}/Document/AadharCard/${aadharcardPhotoData.originalname}`,
              aadharcardPhotoData.buffer,
              function (err) {
                if (err) throw err;
              }
            );
          }
        }
        if (request.files.panCard_photo !== undefined) {
          const pancardPhotoData = request.files.panCard_photo[0];
          const panCard_photo_path = `data/${user.id}/Document/PanCard/${pancardPhotoData.originalname}`;
          user.panCard_photo = panCard_photo_path;
          await fs.promises
            .mkdir(`data/${user.id}/Document/PanCard/`, {
              recursive: true,
            })
            .catch((error) => {
              console.error("caught exception : ", error.message);
            });
          {
            await fs.promises.writeFile(
              `data/${user.id}/Document/PanCard/${pancardPhotoData.originalname}`,
              pancardPhotoData.buffer,
              function (err) {
                if (err) throw err;
              }
            );
          }
        }
        const employeeData = await user.save();
        response.send({
          message: "Successfull Response",
          statusCode: response.statusCode,
          data: employeeData,
        });
      } else {
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

// POST method using GET getEmployeeListData
module.exports.getEmployeeData = async (request, response) => {
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
    let profile_photo_path = "";
    let aadharCard_photo_path = "";
    let panCard_photo_path = "";
    if (
      request.files.profile_photo !== undefined ||
      request.files.aadharCard_photo !== undefined ||
      request.files.panCard_photo !== undefined
    ) {
      if (request.files.profile_photo !== undefined) {
        await fs.promises
          .rm(`data/${_id}/ProfilePhoto`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        const profilePhotoData = request.files.profile_photo[0];
        profile_photo_path = `data/${_id}/ProfilePhoto/${profilePhotoData.originalname}`;
        await fs.promises
          .mkdir(`data/${_id}/ProfilePhoto/`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        {
          await fs.promises.writeFile(
            `data/${_id}/ProfilePhoto/${profilePhotoData.originalname}`,
            profilePhotoData.buffer,
            function (err) {
              if (err) throw err;
            }
          );
        }
      }

      if (request.files.aadharCard_photo !== undefined) {
        await fs.promises
          .rm(`data/${_id}/Document/AadharCard`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        const aadharcardPhotoData = request.files.aadharCard_photo[0];
        aadharCard_photo_path = `data/${_id}/Document/AadharCard/${aadharcardPhotoData.originalname}`;
        await fs.promises
          .mkdir(`data/${_id}/Document/AadharCard/`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        {
          await fs.promises.writeFile(
            `data/${_id}/Document/AadharCard/${aadharcardPhotoData.originalname}`,
            aadharcardPhotoData.buffer,
            function (err) {
              if (err) throw err;
            }
          );
        }
      }

      if (request.files.panCard_photo !== undefined) {
        await fs.promises
          .rm(`data/${_id}/Document/PanCard`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        const pancardPhotoData = request.files.panCard_photo[0];
        panCard_photo_path = `data/${_id}/Document/PanCard/${pancardPhotoData.originalname}`;
        await fs.promises
          .mkdir(`data/${_id}/Document/PanCard/`, {
            recursive: true,
          })
          .catch((error) => {
            console.error("caught exception : ", error.message);
          });
        {
          await fs.promises.writeFile(
            `data/${_id}/Document/PanCard/${pancardPhotoData.originalname}`,
            pancardPhotoData.buffer,
            function (err) {
              if (err) throw err;
            }
          );
        }
      }

      const changeEmployeeData = await employModel.findByIdAndUpdate(
        { _id },
        {
          $set: request.body,
          profile_photo: profile_photo_path,
          aadharCard_photo: aadharCard_photo_path,
          panCard_photo: panCard_photo_path,
        },
        {
          new: true,
        }
      );
      if (!changeEmployeeData) {
        return response.status(404).send({
          message: "Invalid Id",
        });
      }

      response.send({
        message: "Successfull Response",
        statusCode: response.statusCode,
        data: changeEmployeeData,
      });
    } else {
      const changeEmployeeData = await employModel.findByIdAndUpdate(
        { _id },
        request.body,
        {
          new: true,
        }
      );
      if (!changeEmployeeData) {
        return response.status(404).send({
          message: "Invalid Id",
        });
      }
      response.send({
        message: "Successfull Response",
        statusCode: response.statusCode,
        data: changeEmployeeData,
      });
    }
  } catch (error) {
    response.status(500).send({
      data: error.message,
    });
  }
};

//Delete method route
module.exports.deleteEmployeeData = async (request, response) => {
  try {
    const _id = request.params.id;
    const removeEmployeeData = await employModel.findByIdAndDelete({ _id });
    if (!removeEmployeeData) {
      return response.status(404).send({
        message: "Invalid Id",
      });
    }
    await fs.promises
      .rm(`data/${_id}`, {
        recursive: true,
      })
      .catch((error) => {
        console.error("caught exception : ", error.message);
      });
    response.send({
      message: "Successfull Response",
      statusCode: response.statusCode,
      data: removeEmployeeData,
    });
  } catch (error) {
    response.status(500).send({
      data: error,
    });
  }
};
