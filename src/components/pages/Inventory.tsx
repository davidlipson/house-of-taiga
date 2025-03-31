import { CircularProgress, Modal, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Form, SearchBar } from "../sections";
import { InventoryBody } from "../sections/InventoryBody";
import { useCreateInventoryItem, useInventory } from "../../api";
import { Button } from "../blocks";
import { colours } from "../../styles";

export const Inventory = () => {
  const [searching, setSearching] = useState(true);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: existingInventory, isFetching } = useInventory({
    searching,
    tags: selectedTags,
    query: searchQuery,
  });

  const { mutate: createInventoryItem } = useCreateInventoryItem();

  useEffect(() => {
    if (!searching) {
      setSearching(false);
    }
  }, [searching]);

  return (
    <Stack
      spacing={2}
      width="100%"
      maxWidth="800px"
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
    >
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Form
          onSubmit={(data) => {
            createInventoryItem({
              brand: data.brand,
              name: data.name,
              quantity:
                data.squares === 0 ? data.custom_squares || 0 : data.squares,
              tags: data.tags,
              colour: data.is_multi_colour ? undefined : data.colour,
              cost: data.cost,
              // image
            });
            setCreateModalOpen(false);
          }}
          isModal={true}
        />
      </Modal>
      <Stack alignItems="flex-end" width={1}>
        <Button
          text={
            <Stack direction="row" alignItems="center" gap={1}>
              <Add />
              New
            </Stack>
          }
          onClick={() => setCreateModalOpen(true)}
          sx={{
            width: "fit-content",
            backgroundColor: colours.green,
          }}
        />
      </Stack>

      <SearchBar
        setSearchQuery={setSearchQuery}
        setSelectedTags={setSelectedTags}
        query={searchQuery}
        tags={selectedTags}
      />
      {isFetching ? (
        <CircularProgress />
      ) : (
        <InventoryBody inventory={existingInventory || []} />
      )}
    </Stack>
  );
};
