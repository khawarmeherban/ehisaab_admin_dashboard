import localStorage  from "./LocalStorageService";
const LocalStorageService = localStorage.getService();

export const validateToken = () => {
  const token = LocalStorageService.getAccessToken();
  
  if (token) return true;
  return false;
};
// console.log("hello", token)

// export const omitTypeOff = data => {
//   const omitTypename = (key, value) =>
//     key === "__typename" ? undefined : value;
//   const parsedData = JSON.parse(JSON.stringify(data), omitTypename);
//   return parsedData;
// };