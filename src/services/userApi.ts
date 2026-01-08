import type { User, CreateUserDto, UpdateUserDto } from "../types/user";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const STORAGE_KEY = "users_data";

// Генерируем мок-данные на основе JSONPlaceholder
const generateMockUsers = (): User[] => {
  const names = [
    { first: "Иван", last: "Иванов" },
    { first: "Мария", last: "Петрова" },
    { first: "Алексей", last: "Сидоров" },
    { first: "Елена", last: "Козлова" },
    { first: "Дмитрий", last: "Смирнов" },
    { first: "Анна", last: "Волкова" },
    { first: "Сергей", last: "Лебедев" },
    { first: "Ольга", last: "Новикова" },
    { first: "Павел", last: "Морозов" },
    { first: "Татьяна", last: "Федорова" },
  ];

  const skillsOptions = [
    ["JavaScript", "React", "TypeScript"],
    ["Python", "Django", "PostgreSQL"],
    ["Java", "Spring", "MySQL"],
    ["C#", ".NET", "SQL Server"],
    ["Go", "Docker", "Kubernetes"],
    ["PHP", "Laravel", "MySQL"],
    ["Ruby", "Rails", "PostgreSQL"],
    ["Swift", "iOS", "Core Data"],
    ["Kotlin", "Android", "Room"],
    ["Vue.js", "Node.js", "MongoDB"],
  ];

  return names.map((name, index) => ({
    id: index + 1,
    firstName: name.first,
    lastName: name.last,
    email: `user${index + 1}@example.com`,
    skills: skillsOptions[index] || ["HTML", "CSS"],
    registrationDate: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
};

// Инициализация данных
const initializeUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const mockUsers = generateMockUsers();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
  return mockUsers;
};

// Получить всех пользователей
export const getUsers = async (): Promise<User[]> => {
  // Имитация задержки API
  await new Promise((resolve) => setTimeout(resolve, 500));
  return initializeUsers();
};

// Получить пользователя по ID
export const getUserById = async (id: number): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const users = initializeUsers();
  return users.find((user) => user.id === id) || null;
};

// Создать пользователя
export const createUser = async (data: CreateUserDto): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const users = initializeUsers();
  const newUser: User = {
    id: Math.max(...users.map((u) => u.id), 0) + 1,
    ...data,
    registrationDate: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return newUser;
};

// Обновить пользователя
export const updateUser = async (
  id: number,
  data: UpdateUserDto
): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const users = initializeUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  const updatedUser: User = {
    ...users[index],
    ...data,
  };
  users[index] = updatedUser;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return updatedUser;
};

// Удалить пользователя
export const deleteUser = async (id: number): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const users = initializeUsers();
  const filtered = users.filter((user) => user.id !== id);
  if (filtered.length === users.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

