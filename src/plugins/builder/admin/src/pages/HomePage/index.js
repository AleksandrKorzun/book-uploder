// @ts-nocheck
import React, { useEffect, useState } from "react";
import { getAllMediaFolders } from "../../utils/getBooks";
import { Box, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import BooksTable from "../../components/BooksTable";

const HomePage = () => {
  const [allBooksFolders, setAllBooksFolders] = useState([]);

  useEffect(() => {
    getAllMediaFolders().then((folder) => setAllBooksFolders(folder));
  }, []);

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout title="Books Builder" />
      </Box>
      <ContentLayout>
        <BooksTable allBooksFolders={allBooksFolders} />
      </ContentLayout>
    </div>
  );
};

export default HomePage;
