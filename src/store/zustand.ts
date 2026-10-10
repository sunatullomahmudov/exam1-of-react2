import { create } from "zustand";

export type UserZ = {
  id: number;
  name: string;
  image: string;
};

type ZustandState = {
  dataZ: UserZ[];
  deleteUserZ: (id: number) => void;
  addUserZ: (user: UserZ) => void;
  editUserZ: (user: UserZ) => void;
};

export const useZustand = create<ZustandState>((set) => ({
  dataZ: [
    {
      id: 1,
      name: "Muhammad",
      image: "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "Jurabek",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAjDQ80mUWopbjiKrAOpxJIErLkSqwmnJpdJRn5MhnKA&s=10",
    },
    {
      id: 3,
      name: "Abdullo",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAPkV_TfGSRFvb-FaYmVrR79W28GwW6yjedVgOlZsCg&s=10",
    },
    {
      id: 4,
      name: "Ali",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAPkV_TfGSRFvb-FaYmVrR79W28GwW6yjedVgOlZsCg&s=10",
    },
    {
      id: 5,
      name: "Jurabek",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOiQmW8-kBapGU1Z_BCnK49sL-XXV4u643lXgPmPjVyg&s=10",
    },
    {
      id: 6,
      name: "Abdullo",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      id: 7,
      name: "Jurabek",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      id: 8,
      name: "Abdullo",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
  ],
  deleteUserZ: (id) =>
    set((state) => ({
      dataZ: state.dataZ.filter((el) => el.id !== id),
    })),
  addUserZ: (user) =>
    set((state) => ({
      dataZ: [user, ...state.dataZ],
    })),
  editUserZ: (user) =>
    set((state) => ({
      dataZ: state.dataZ.map((el) =>
        el.id === user.id ? { ...el, ...user } : el,
      ),
    })),

}));
