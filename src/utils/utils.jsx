export const fetchWithErrors = async (url, rejectWithValue) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "Ошибка запроса.");
      }
  
      const data = await response.json();
  
      if (data.Error === "Movie not found!") {
        throw new Error("Фильм не найден.");
      } else if (data.Error === "Too many results.") {
        throw new Error("Слишком много результатов.");
      }
  
      return data;
    } catch (e) {
      return rejectWithValue(e.message || "Произошла ошибка сети.");
    }
  };