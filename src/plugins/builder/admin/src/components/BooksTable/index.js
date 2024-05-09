// @ts-nocheck
import React from "react";
import {
  Typography,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  BaseCheckbox,
  Tbody,
} from "@strapi/design-system";
import BooksRow from "./BooksRow";

const BooksTable = ({ mediaFolders, publishedBooks }) => {
  const currentBook = (name) => {
    return publishedBooks.find((book) => book.attributes.title === name);
  };

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
