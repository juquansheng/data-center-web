const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "admin",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "",
    token: "admin-token",
    menuConfig: [1,2,3,4,5,6],
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "editor",
    avatar: "",
    description:"",
    token: "editor-token",
    menuConfig: [1,2,3],
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "guest",
    avatar: "",
    description:"",
    token: "guest-token",
    menuConfig: [1,2,3],
  },
};

export default {
  login: (config) => {
    const { username } = JSON.parse(config.body);
    const token = tokens[username];
    const userInfo = users[token];
    if (!token) {
      return {
        status: 1,
        message: "User name or password incorrect",
      };
    }
    return {
      status: 0,
      token,
      userInfo,
      
    };
  },
  userInfo: (config) => {
    const token = config.body;
    const userInfo = users[token];
    if (!userInfo) {
      return {
        status: 1,
        message: "get user info failed",
      };
    }
    return {
      status: 0,
      userInfo,
    };
  },
  getUsers: () => {
    return {
      status: 0,
      users: Object.values(users),
    };
  },
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body);
    const token = tokens[id];
    if (token) {
      delete tokens[id];
      delete users[token];
    }
    return {
      status: 0,
    };
  },
  editUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    const token = tokens[id];
    if (token) {
      users[token] = { ...users[token], ...data };
    }
    return {
      status: 0,
    };
  },
  ValidatUserID: (config) => {
    const userID = config.body;
    const token = tokens[userID];
    if (token) {
      return {
        status: 1,
      };
    } else {
      return {
        status: 0
      };
    }
  },
  addUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    tokens[id] = `${id}-token`
    users[`${id}-token`] = {
      ...users["guest-token"],
      ...data
    }
    return {
      status: 0,
    };
  },
  logout: (_) => {
    return {
      status: 0,
      data: "success",
    };
  },
};
