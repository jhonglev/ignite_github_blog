import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDistanceDateToNowAsString = (date: string) => {
  return `Há ${formatDistanceToNow(new Date(date), {
    locale: ptBR,
    addSuffix: false,
  })}`;
};
