export type TElem = {
  id: number;
  value: string;
};

export type TData = {
  tower: TElem[];
  floor: TElem[];
  room: TElem[];
};

export const data = {
  tower: [
    { id: 0, value: "А" },
    { id: 1, value: "Б" },
  ],
  floor: [
    { id: 0, value: "3" },
    { id: 1, value: "4" },
    { id: 2, value: "5" },
    { id: 3, value: "6" },
    { id: 4, value: "7" },
    { id: 5, value: "8" },
    { id: 6, value: "9" },
    { id: 7, value: "10" },
    { id: 8, value: "11" },
    { id: 9, value: "12" },
    { id: 10, value: "13" },
    { id: 11, value: "14" },
    { id: 12, value: "15" },
    { id: 13, value: "16" },
    { id: 14, value: "17" },
    { id: 15, value: "18" },
    { id: 16, value: "19" },
    { id: 17, value: "20" },
    { id: 18, value: "21" },
    { id: 19, value: "22" },
    { id: 20, value: "23" },
    { id: 21, value: "24" },
    { id: 22, value: "25" },
    { id: 23, value: "26" },
    { id: 24, value: "27" },
  ],
  room: [
    { id: 0, value: "Переговорная №1" },
    { id: 1, value: "Переговорная №2" },
    { id: 2, value: "Переговорная №3" },
    { id: 3, value: "Переговорная №4" },
    { id: 4, value: "Переговорная №5" },
    { id: 5, value: "Переговорная №6" },
    { id: 6, value: "Переговорная №7" },
    { id: 7, value: "Переговорная №8" },
    { id: 8, value: "Переговорная №9" },
    { id: 9, value: "Переговорная №10" },
  ],
};
