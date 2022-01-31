import gymApi from "../config/api";

export const postReport = async (formData) => {
  try {
    const response = await gymApi.post("/reports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getAllReports = async () => {
  try {
    const response = await gymApi.get("/reports");
    console.log("get reports:", response.data);
    return response.data;
  } catch (e) {
    console.log("get all reports error:", e);
    throw e;
  }
};

export const editReport = async (id, reportObj) => {
  try {
    const response = await gymApi.put(`/reports/${id}`, reportObj);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
