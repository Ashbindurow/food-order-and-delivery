import { jwtDecode } from "jwt-decode";

export const saveCreds = token => {
  const decoded = jwtDecode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("id", decoded.id);
  localStorage.setItem("role", decoded.role);
};

export const isAuthenticated = () => {
  try {
    const decoded = jwtDecode(localStorage.getItem("token"));
    // console.log(decoded);
    const currentDate = Date.now() / 1000;
    return currentDate < decoded.exp;
  } catch (e) {
    return false;
  }
};

export const checkRole = passingRole => {
  const role = localStorage.getItem("role");
  return role === passingRole;
};
