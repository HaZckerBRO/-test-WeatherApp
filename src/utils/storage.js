export const storage = (item) => {
  if (item) {
    const itemJSON = JSON.stringify(item);
    return localStorage.setItem('storage', itemJSON)
  }
  return JSON.parse(localStorage.getItem('storage'))
};