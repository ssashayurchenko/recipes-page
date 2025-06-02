"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Autocomplete,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";

import data from "/src/api/cuisines.json";

export default function SearchForm() {
  const router = useRouter();
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
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (cuisineInput) params.append("cuisine", cuisineInput);
    if (preparationTime) params.append("maxReadyTime", preparationTime);

    router.push(`/recipes?${params.toString()}`);
  };

  const isNextEnabled = query || cuisineInput || preparationTime;

  return (
    <div className="w-full">
      <Stack spacing={3}>
        <TextField
          label="Recipe"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{ className: "bg-white rounded-md shadow-sm" }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderColor: "#D97706",
              "&:hover fieldset": { borderColor: "#B45309", boxShadow: "none" },
              "&.Mui-focused fieldset": {
                borderColor: "#92400E",
                boxShadow: "none",
              },
            },
          }}
        />

        <Autocomplete
          freeSolo
          options={data}
          inputValue={cuisineInput}
          onInputChange={onCuisineChange}
          ListboxProps={{
            className:
              "max-h-60 overflow-auto bg-white border border-yellow-300 rounded-md shadow-md",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cuisine"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                className: "bg-white rounded-md shadow-sm",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search style={{ color: "#D97706" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {cuisineInput && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={onClearCuisine}
                          size="small"
                          aria-label="clear cuisine"
                        >
                          <ClearIcon
                            style={{ color: "#B45309" }}
                            className="hover:text-yellow-700 transition-colors"
                          />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "#D97706",
                  "&:hover fieldset": {
                    borderColor: "#B45309",
                    boxShadow: "none",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#92400E",
                    boxShadow: "none",
                  },
                },
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
          InputProps={{ className: "bg-white rounded-md shadow-sm" }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderColor: "#D97706",
              "&:hover fieldset": { borderColor: "#B45309", boxShadow: "none" },
              "&.Mui-focused fieldset": {
                borderColor: "#92400E",
                boxShadow: "none",
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          disabled={!isNextEnabled}
          onClick={onSearch}
          sx={{
            backgroundColor: isNextEnabled ? "#D97706" : "gray",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: isNextEnabled ? "#92400E" : "gray",
              boxShadow: "none",
            },
            transition: "all 0.3s ease",
          }}
        >
          Next
        </Button>
      </Stack>
    </div>
  );
}
