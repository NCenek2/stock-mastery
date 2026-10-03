import { useContext } from "react";
import {
  LessonContext,
  type UseLessonContextType,
} from "../contexts/LessonContext";

export const useLesson = () => {
  return useContext<UseLessonContextType>(LessonContext);
};
