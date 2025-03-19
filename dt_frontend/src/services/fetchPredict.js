import axios from "axios";

const fetchPrediction = async (formData) => {
    try {
      const response = await axios.post(
        "https://edutlasdeveloper.pythonanywhere.com/predictDt",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error al obtener la predicción:", error);
      return null;
    }
  };

export default fetchPrediction;