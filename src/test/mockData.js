const mockData = {
  userComplete: {
    username: "niyonsenga@gmail.com",
    password: "18700000",
  },
  userWithId: {
    id: 2,
    username: "niyonsenga@gmail.com",
    password: "18700000",
  },
  userNoUsername: {
    username: "",
    password: "1870000",
  },
  userNoPassword: {
    username: "manisha@gmail.com",
    password: "",
  },
  userAlreadyExist: {
    username: "hugues@gmail.com",
    password: "18700",
  },
  userInvalidUsername: {
    username: "hugues",
    password: "187000",
  },
  userInvalidPassword: {
    username: "emmanuel@gmail.com",
    password: "12",
  },
  userInvalidCredentialsPassword: {
    username: "niyonsenga@gmail.com",
    password: "1780000",
  },
  userInvalidCredentialsEmail: {
    username: "niyo@gmail.com",
    password: "18700000",
  },
  studentComplete: {
    name: "Niyonsenga Jeezy",
  },
  studentEmpty: {
    name: "",
  },
  studentInvalid: {
    name: "ew",
  },
  updatedStudent: {
    name: "Ntwari Hugues",
  },
};

export default mockData;