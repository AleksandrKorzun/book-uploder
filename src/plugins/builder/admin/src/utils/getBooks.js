import axios from "axios";

export const getMediaFoldersByPath = async (path) => {
  const token = JSON.parse(sessionStorage.getItem("jwtToken"));

  try {
    const response = await axios.get(
      `${strapi.backendURL}/builder/folder?path=${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching media folders:", error);
    return [];
  }
};
export const getAllMediaFolders = async () => {
  const token = JSON.parse(sessionStorage.getItem("jwtToken"));
  try {
    const response = await axios.get(`${strapi.backendURL}/builder/folders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching media folders:", error);
    return [];
  }
};

export const getAllPublishedBooks = async () => {
  try {
    const response = await axios.get(
      "http://localhost:1337/api/books?populate=*",
      {
        headers: {
          Authorization:
            "Bearer 1ce81a3291501836ac1778b05df8318303918443fa688ded83da48ef10a3ef284c0472d595997f859d72956fc61aaa9265088467c67d2b54e34fc4844b61d00453b5af3b8f6ed7f8f4b2da3ac14782f8dc9769cf30f6940771a0818a30e893a8e949723c7e297fbd1aced45d47c7ba48558841045b91a13676e5089e722d4408",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const getFilesFromFolder = async (path) => {
  const token = JSON.parse(sessionStorage.getItem("jwtToken"));
  try {
    const response = await axios.get(
      `${strapi.backendURL}/builder/files/${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log('res', response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const addNewChapter = async (body) => {
  const token = JSON.parse(sessionStorage.getItem("jwtToken"));
  try {
    const response = await axios.post(
      `${strapi.backendURL}/api/chapters`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
  } catch (error) {
    console.error("Error creating chapter:", error);
    return [];
  }
};
