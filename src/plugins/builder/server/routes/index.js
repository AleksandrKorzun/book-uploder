module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/files/:folderName",
    handler: "myController.getFilesFromFolder",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/docs/:folderName",
    handler: "myController.getOne",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/folders",
    handler: "myController.getAllFolders",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/folder",
    handler: "myController.getFolder",
    config: {
      policies: [],
      auth: false,
    },
  },
];
