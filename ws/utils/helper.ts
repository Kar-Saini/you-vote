const CHARACTERS = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

export function generateId(len: number) {
  let id = "";

  for (let i = 0; i < len; i++) {
    const charPosition = Math.floor(Math.random() * 52);
    id += CHARACTERS[charPosition];
  }
  return id;
}
