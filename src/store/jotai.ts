import { atom } from "jotai";



const initialJotaiUsers = [
  { id: 1, phone: "+998 90 000 00 01", city: "Tashkent" },
  { id: 2, phone: "+998 90 000 00 02", city: "Samarkand" },
  { id: 3, phone: "+998 90 000 00 03", city: "Bukhara" },
  { id: 4, phone: "+998 90 000 00 04", city: "Karshi" },
  { id: 5, phone: "+998 90 000 00 05", city: "Fergana" },
  { id: 6, phone: "+998 90 000 00 06", city: "Namangan" },
  { id: 7, phone: "+998 90 000 00 07", city: "Andijon" },
  { id: 8, phone: "+998 90 000 00 08", city: "Urgench" },
];

export const dataJotai = atom(initialJotaiUsers);

// Write-only action atoms (same style as Redux / Zustand actions)
export const addUserJ = atom(null, (get, set, user) => {
  set(dataJotai, [user, ...get(dataJotai)]);
});

export const deleteUserJ = atom(null, (get, set, id) => {
  set(dataJotai, get(dataJotai).filter((el) => el.id !== id));
});

export const editUserJ = atom(null, (get, set, user) => {
  set(
    dataJotai,
    get(dataJotai).map((el) => (el.id === user.id ? { ...el, ...user } : el)),
  );
});
