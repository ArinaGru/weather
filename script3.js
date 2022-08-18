const now = new Date();
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = days[now.getDay()];
const hours = now.getHours();
const min = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
const date = document.querySelector(".date");
date.textContent = `${day} ${hours}:${min}`;
