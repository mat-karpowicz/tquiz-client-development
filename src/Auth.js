const authHelpers = {
  checkIfAuth: async () => {
    const auth = await fetch("https://tquiz-server.herokuapp.com/auth/auth", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("points", data.userResponse.rank);
          localStorage.setItem("created", data.userResponse.created_at);
          return true;
        } else {
          return false;
        }
      });
    return auth;
  },

  logout: async () => {
    const logoutResponse = await fetch(
      "https://tquiz-server.herokuapp.com/auth/logout",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.logout) {
          return true;
        }
        return false;
      });
    return logoutResponse;
  },

  register: async ({ name, password, passwordConfirm }) => {
    try {
      if (password.localeCompare(passwordConfirm) === 0) {
        const user = { name, password };

        const registerResponse = await fetch(
          "https://tquiz-server.herokuapp.com/auth/register ",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        )
          .then((response) => response.json())
          .then((data) => data);

        if (registerResponse.error)
          return { error: true, message: registerResponse.message };
        return registerResponse;
      } else {
        return {
          error: true,
          message: "Passwords are not the same",
        };
      }
    } catch (error) {
      return error;
    }
  },

  login: async (givenUser) => {
    const loginResponse = await fetch(
      "https://tquiz-server.herokuapp.com/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(givenUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return { error: true, message: error.message };
      });
    return loginResponse;
  },

  saveUser: async (points) => {
    const pointsBody = { points };

    fetch("https://tquiz-server.herokuapp.com/auth/save", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pointsBody),
    }).then((response) => response.json());
  },
};

export default authHelpers;
