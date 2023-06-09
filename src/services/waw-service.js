// @ts-nocheck
import axios from "axios";
import { user } from "../stores";

export class wawService {

  constructor(baseUrl) {
    this.baseUrl = "http://localhost:4000";
    console.log(this.baseUrl);
    const visitCredentials = localStorage.visit;
    if (visitCredentials) {
      const savedUser = JSON.parse(visitCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
      });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/authenticate`,
        { email, password }
      );
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
        });
        localStorage.visit = JSON.stringify({
          email: email,
          token: response.data.token,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("visit");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  reload() {
    const visitCredentials = localStorage.visit;
    if (visitCredentials) {
        const savedUser = JSON.parse(visitCredentials);
        user.set({
            email: savedUser.email,
            token: savedUser.token
        });
        axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
}

  async createVisit(visit) {
    try {
      const response = await axios.post(this.baseUrl + "api/counties/" + visit.county + "/visits", visit);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }

  async getAllCounties() {
    try {
      const response = await axios.get(this.baseUrl + "api/counties");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getAllVisits() {
    try {
      const response = await axios.get(this.baseUrl + "api/visits");
      return response.data;
    } catch (error) {
      return [];
    }
  }
};
