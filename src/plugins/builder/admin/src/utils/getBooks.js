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
      `${strapi.backendURL}/api/books?populate=*`,
      {
        headers: {
          // Authorization: `Bearer add8109f5b2092d0d292be34cf69bed7ce93fdaec5bb4dbd3c8bd119ffcc4319e8772355dd681762d189f4b8d1ba78011b180916da929086c22e9fc1b341693b5402897669494791e79a9a2351f9809807f5140e7f2470a656e22a7d6a30a9bbc747c5123db6103322a884a2955e5898436575d81908a564472a06eb86a513ef`,
          Authorization:
            "Bearer 36f2ae66c496112c79967521e8c18a010c6ba9b6983e1e6037ff91c2595738da0706d13340c43f563627fd4d9b719b4d4ad67aaf6893f0732da9d674e846dab076efe3319681c88c8ce5b2f2ec6c1c951da3404701ac725f241f03f367a0d5ecad0185e3b5e7d070dab65d941c948175d0c3a5393254d83555c10916a11062f2",
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
          Authorization: `Bearer 36f2ae66c496112c79967521e8c18a010c6ba9b6983e1e6037ff91c2595738da0706d13340c43f563627fd4d9b719b4d4ad67aaf6893f0732da9d674e846dab076efe3319681c88c8ce5b2f2ec6c1c951da3404701ac725f241f03f367a0d5ecad0185e3b5e7d070dab65d941c948175d0c3a5393254d83555c10916a11062f2`,
          // Authorization: `Bearer add8109f5b2092d0d292be34cf69bed7ce93fdaec5bb4dbd3c8bd119ffcc4319e8772355dd681762d189f4b8d1ba78011b180916da929086c22e9fc1b341693b5402897669494791e79a9a2351f9809807f5140e7f2470a656e22a7d6a30a9bbc747c5123db6103322a884a2955e5898436575d81908a564472a06eb86a513ef`,
        },
      }
    );
    console.log("response", response);
  } catch (error) {
    console.error("Error creating chapter:", error);
    return [];
  }
};
