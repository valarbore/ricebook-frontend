export function getDateFormatMimnute(time) {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
}

export function getDateFormatDay(time) {
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `;
}
