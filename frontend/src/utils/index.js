import { jwtDecode } from "jwt-decode";

export const saveCreds = token => {
  const decoded = jwtDecode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("id", decoded.id);
  localStorage.setItem("role", decoded.role);
};
