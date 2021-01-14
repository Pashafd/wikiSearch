// // Import of a JavaScript module
// // Импорт модуля JavaScript
import {
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
  clearPushListener,
} from "./js/searchBar.js";
import {
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
  deleteSearchResults,
} from "./js/searchResults.js";
import { retrieveSearchResults, gerSearchTerm } from "./js/dataFunction.js";

// Импорт стилей
import "./styles/index.scss";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();

  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);

  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submiteTheSearch);
};

const submiteTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  //процес поиска
  procesTheSearch();
  setSearchFocus();
};

const procesTheSearch = async () => {
  clearStatsLine();
  const searchTerm = gerSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray); // строим результаты поиска
  setStatsLine(resultArray.length);
};
