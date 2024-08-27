class useApi {
  static async GetRestaurants(lat, lng) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurants?lat=${lat}&lng=${lng}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data?.data?.cards;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return null;
    }
  }
}

export default useApi
