const CNN_API_URL = "http://192.168.1.205:8001/predict-shape";// api url for cnn api on server port 8001

export const sendPathsToCNNserver = async (paths) => {
// this asynchronous function would handle posting data to CNN FastAPI server
  try {
    const response = await fetch(CNN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths })
    });
    return await response.json();// this returns the prediction made by the model
  } catch (err) {
    console.error("There was an error during API communication link:", err);
    return null;
  }
};