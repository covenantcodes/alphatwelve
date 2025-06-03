import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FONTFAMILY, FONTSIZE } from "../utils/font";
import colors from "../utils/colors";
import SearchIcon from "./svgs/search";

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChangeText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.iconContainer}>
        <SearchIcon width={20} height={20} color={colors.gray4} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray3}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.gray,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 4,
    height: 46,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray2,
    paddingVertical: 8,
  },
});

export default SearchBar;
