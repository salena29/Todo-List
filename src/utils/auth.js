export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
