import {
  BaseCheckbox,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  Loader,
  Status,
  Td,
  Tr,
  Typography,
} from "@strapi/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { addNewChapter, getMediaFoldersByPath } from "../../../utils/getBooks";
import { ExclamationMarkCircle } from "@strapi/icons";

const BooksRow = ({ folder, book }) => {
  const [localFolders, setLocalFolders] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const isPublished = useMemo(() => book && book?.attributes?.chapters, [book]);

  const publishedChapterOrders = useMemo(
    () =>
      book &&
      book?.attributes?.chapters.data.map(
        ({ attributes }) => attributes.chapterOrder
      ),
    [book]
  );

  const localNames = useMemo(
    () => localFolders.map((folder) => folder.name).join(" ,"),
    [localFolders]
  );

  const buildBook = async () => {
    if (!book?.id) return;
    try {
      setLoader(true);
      const allChapters = await Promise.all(
        localFolders.map(
          async (local) =>
            await getMediaFoldersByPath(local.path).then((data) => ({
              lang: data.name,
              files: data.files,
            }))
        )
      );

      const chaptersInBook = allChapters[0].files.length;

      for (let index = 0; index < chaptersInBook; index++) {
        const chapterOrder =
          Number(allChapters[0].files[index].name.split("_")[0]) + 1;

        // if book has chapter with same chapterOrder return
        if (publishedChapterOrders.includes(chapterOrder)) continue;
        const data = { bookId: book?.id, chapterOrder };

        await Promise.all(
          allChapters.map(async ({ lang, files }) => {
            const docUrl = files.find(
              ({ name }) => Number(name.split("_")[0]) + 1 === chapterOrder
            )?.url;
            const response = await fetch(docUrl);
            const text = await response.text();

            data[`doc${lang.toUpperCase()}`] = text.split("\n").map((p) => {
              return {
                type: "paragraph",
                children: [{ type: "text", text: p }],
              };
            });
          })
        );

        await addNewChapter({ data });
      }
    } catch (error) {
      setError(error?.message);
      setIsVisible(true);
      setLoader(false);
    }
    setLoader(false);
  };

  useEffect(() => {
    getMediaFoldersByPath(folder.path).then((book) =>
      setLocalFolders(book.folders)
    );
  }, [folder]);

  return (
    <>
      <Tr key={folder.path}>
        <Td>
          <Typography textColor="neutral800">{folder.id}</Typography>
        </Td>
        <Td>
          <Typography textColor="neutral800">{folder.name}</Typography>
        </Td>
        <Td>{publishedChapterOrders?.join(", ") || 0}</Td>
        <Td>
          <Typography width="20px" overflow="scroll" textColor="neutral800">
            {localNames}
          </Typography>
        </Td>
        <Td>
          <Status
            variant={isPublished ? "success" : "draft"}
            size="S"
            showBullet={false}
          >
            <Typography
              fontWeight="bold"
              textColor={isPublished ? "success700" : "secondary700"}
            >
              {isPublished ? "Published" : "Not Published"}
            </Typography>
          </Status>
        </Td>
        <Td>
          {/* <Button onClick={deleteBook} disabled={!isPublished} size="S" width="100px" variant="danger">Delete</Button> */}
          {loader ? (
            <Loader small>Loading content...</Loader>
          ) : (
            <Button
              onClick={buildBook}
              size="S"
              width="100px"
              variant="success"
            >
              Build
            </Button>
          )}
        </Td>
      </Tr>
      <Dialog
        onClose={() => setIsVisible(false)}
        title="Confirmation"
        isOpen={isVisible}
      >
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">{error}</Typography>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button onClick={() => setIsVisible(false)} variant="tertiary">
              Cancel
            </Button>
          }
        />
      </Dialog>
    </>
  );
};

export default BooksRow;
