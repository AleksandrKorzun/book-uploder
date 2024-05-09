// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  getAllMediaFolders,
  getAllPublishedBooks,
  getMediaFoldersByPath,
} from "../../utils/getBooks";
import { Box, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import BooksTable from "../../components/BooksTable";

const HomePage = () => {
  const [mediaFolders, setMediaFolders] = useState([]);
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [booksPath, setBooksPath] = useState("");

  useEffect(() => {
    getAllMediaFolders()
      .then((folder) => folder.find(({ name }) => name === "books"))
      .then((folder) => setBooksPath(folder.path));
    getAllPublishedBooks().then((books) => setPublishedBooks(books.data));
    if (booksPath) {
      getMediaFoldersByPath(booksPath).then((folders) =>
        setMediaFolders(folders.folders)
      );
    }
  }, [booksPath]);

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout title="Books Builder" />
      </Box>
      <ContentLayout>
        <BooksTable
          mediaFolders={mediaFolders}
          publishedBooks={publishedBooks}
        />
      </ContentLayout>
    </div>
  );
};

export default HomePage;
