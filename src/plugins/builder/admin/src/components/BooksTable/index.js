// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Typography, Table, Thead, Tr, Th, Tbody } from "@strapi/design-system";
import BooksRow from "./BooksRow";
import {
  getAllPublishedBooks,
  getMediaFoldersByPath,
} from "../../utils/getBooks";

const BooksTable = ({ allBooksFolders }) => {
  const [mediaFolders, setMediaFolders] = useState([]);
  const [publishedBooks, setPublishedBooks] = useState([]);
  const currentBook = (name) => {
    return publishedBooks.find((book) => book.attributes.title === name);
  };
  console.log("publishedBooks", publishedBooks);
  useEffect(() => {
    getAllPublishedBooks().then((books) =>
      setPublishedBooks(books?.data || [])
    );
    if (allBooksFolders.length) {
      const booksPath = allBooksFolders?.find(
        ({ name }) => name === "books"
      )?.path;
      getMediaFoldersByPath(booksPath).then((folders) =>
        setMediaFolders(folders?.folders)
      );
    }
  }, [allBooksFolders]);

  console.log("publishedBooks", publishedBooks);
  return (
    <Table
      colCount={6}
      rowCount={mediaFolders?.length}
      style={{ whiteSpace: "wrap" }}
    >
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Book Folder Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma"> Published Chapters</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Localizations</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Status</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Action</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {mediaFolders?.length &&
          mediaFolders.map((folder) => (
            <BooksRow folder={folder} book={currentBook(folder.name)} />
          ))}
      </Tbody>
    </Table>
  );
};

export default BooksTable;
