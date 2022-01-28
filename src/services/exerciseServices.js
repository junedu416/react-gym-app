import gymApi from "../config/api";

//get all exercises from backend
export const getAllExercises = async () => {
  try {
    const response = await gymApi.get("/exercises");
    console.log("Get All Default Exercises", response);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getExerciseById = async (id) => {
  try {
    const response = await gymApi.get(`/exercises/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};
