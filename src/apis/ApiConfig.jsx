class useApi {
  static async GetRestaurants(lat, lng) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/swiggy/home?lat=${lat}&lng=${lng}`
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
  static async GetRestaurantWieseMenu(lat, lng,resId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/swiggy/restaurant/menu?lat=${lat}&lng=${lng}&id=${resId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const {data} = await response?.json();
      return data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return null;
    }
  }
}

export default useApi
