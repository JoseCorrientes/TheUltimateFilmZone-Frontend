export const sorter = (favoriteList, favOrderBy, favOrderType) => {
  let favoriteCopy = [...favoriteList];
  if (favOrderBy == 2 && favOrderType == 1) {
    const l = favoriteCopy.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l - 1 - i; j++) {
        if (
          parseInt(favoriteCopy[j].release_date.slice(0, 4)) >
          parseInt(favoriteCopy[j + 1].release_date.slice(0, 4))
        ) {
          [favoriteCopy[j], favoriteCopy[j + 1]] = [
            favoriteCopy[j + 1],
            favoriteCopy[j],
          ];
        }
      }
    }
  }
  if (favOrderBy == 2 && favOrderType == 2) {
    const l = favoriteCopy.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l - 1 - i; j++) {
        if (
          parseInt(favoriteCopy[j].release_date.slice(0, 4)) <
          parseInt(favoriteCopy[j + 1].release_date.slice(0, 4))
        ) {
          [favoriteCopy[j], favoriteCopy[j + 1]] = [
            favoriteCopy[j + 1],
            favoriteCopy[j],
          ];
        }
      }
    }
  }
  if (favOrderBy == 1 && favOrderType == 1) {
    const l = favoriteCopy.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l - 1 - i; j++) {
        if (
          favoriteCopy[j].original_title > favoriteCopy[j + 1].original_title
        ) {
          [favoriteCopy[j], favoriteCopy[j + 1]] = [
            favoriteCopy[j + 1],
            favoriteCopy[j],
          ];
        }
      }
    }
  }
  if (favOrderBy == 1 && favOrderType == 2) {
    const l = favoriteCopy.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l - 1 - i; j++) {
        if (
          favoriteCopy[j].original_title < favoriteCopy[j + 1].original_title
        ) {
          [favoriteCopy[j], favoriteCopy[j + 1]] = [
            favoriteCopy[j + 1],
            favoriteCopy[j],
          ];
        }
      }
    }
  }

  return favoriteCopy;
};
