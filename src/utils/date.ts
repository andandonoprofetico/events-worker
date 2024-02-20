import { add, format, getDay, subDays, getDate, isBefore } from 'date-fns';

export const dayToAbbrev = {
  0: 'Dom',
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sab',
};

export const formatDate = (date: Date, design: string) => {
  return format(date, design);
};

export const subDay = (date: Date, day: number) => {
  return subDays(date, day);
};

export const addInDate = (date: Date, duration: Duration) => {
  return add(date, duration);
};

export const getDayOfWeek = (date: Date) => {
  return getDay(date);
};

export const getDateNumber = (date: Date) => {
  return getDate(date);
};

export const isBeforeDate = (date: Date, dateCompare: Date) => {
  return isBefore(date, dateCompare);
};
