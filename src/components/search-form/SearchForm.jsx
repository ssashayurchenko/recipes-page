"use client";
import { useState } from "react";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Stack } from "@mui/material";

import data from "/src/api/cuisines.json";

export default function SearchForm() {
  const [cuisineInput, setCuisineInput] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [query, setQuery] = useState("");

  const onCuisineChange = (event, newInputValue) => {
    setCuisineInput(newInputValue);
  };

  const onClearCuisine = () => {
    setCuisineInput("");
  };

  const onSearch = () => {
    console.log({
      query,
      cuisine: cuisineInput,
      maxReadyTime: preparationTime,
    });
  };

  const isNextEnabled = query || cuisineInput || preparationTime;

  return (
  <div className="max-w-md mx-auto p-4">
      <Stack spacing={2}>
        <TextField
          label="Recipe"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Autocomplete
          freeSolo
          options={data}
          inputValue={cuisineInput}
          onInputChange={onCuisineChange}
          ListboxProps={{
            className:
              "max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-md",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cuisine"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                className: "bg-white rounded-md",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {cuisineInput && (
                      <InputAdornment position="end">
                        <IconButton onClick={onClearCuisine}>
                          <ClearIcon className="text-gray-500" />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
            />
          )}
        />

        <TextField
          label="Max preparation time (minutes)"
          variant="outlined"
          type="number"
          fullWidth
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
          inputProps={{ min: 1 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isNextEnabled}
          onClick={onSearch}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
}
