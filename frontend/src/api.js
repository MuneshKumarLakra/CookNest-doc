export const getFoods = async () => {
  const res = await fetch("http://localhost:5000/api/foods");
  return res.json();
};