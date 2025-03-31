import axios from "./http-common";

class AuthService {
  async login(user) {
    const response = await axios.post("/users/auth", {
      email: user.email,
      password: user.password,
    });

    if (response.data && response.data.token && response.data.userId) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  }

  logout() {
    sessionStorage.removeItem("user");
  }
}

export default new AuthService();
