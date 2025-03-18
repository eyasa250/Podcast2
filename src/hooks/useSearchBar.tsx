import { useState } from "react";
import { SearchBar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSearchBar = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const SearchBarComponent = (
    <SearchBar
      placeholder="Find in episodes"
      onChangeText={setSearch}
      value={search}
      lightTheme
      round
      containerStyle={{
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        marginHorizontal: 10,
        marginTop: insets.top + 20,
      }}
      inputContainerStyle={{
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
      }}
    />
  );

  return { search, SearchBarComponent };
};
