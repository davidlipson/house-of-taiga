import { Stack, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button, Dropdown, Input } from "../../blocks";
import { useTags } from "../../../api";

export const SearchBar = ({
  setSearchQuery,
  setSelectedTags,
  query,
  tags,
}: {
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  query: string;
  tags: string[];
}) => {
  const { data: existingTags } = useTags();
  const [localQuery, setLocalQuery] = useState(query);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
      setIsDebouncing(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setIsDebouncing(false);
    };
  }, [localQuery, setSearchQuery]);

  return (
    <Stack width={1} spacing={2} alignItems="center">
      <Stack width={1} position="relative">
        <Input
          placeholder="Search name or brand"
          value={localQuery}
          onChange={(value) => {
            setLocalQuery(value);
          }}
        />
        {isDebouncing && (
          <CircularProgress
            size={20}
            sx={{
              position: "absolute",
              right: 12,
              top: "30%",
              transform: "translateY(-50%)",
              color: "grey.500",
            }}
          />
        )}
      </Stack>
      <Stack width={1}>
        <Dropdown
          options={existingTags?.map((tag) => tag.name) || []}
          multiple
          placeholder="Select tags"
          value={tags}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setSelectedTags(value);
            } else {
              setSelectedTags(value ? [value] : []);
            }
          }}
        />
      </Stack>
    </Stack>
  );
};
