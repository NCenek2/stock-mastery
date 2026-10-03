import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import type { ChildrenType } from "../types/ChildrenType";
export type TurnState = {};

const useLessonContext = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [interactiveAns, setInteractiveAns] = useState("");
  const [interactiveFB, setInteractiveFB] = useState("");
  const [expandedModules, setExpandedModules] = useState<{
    [key: number]: boolean;
  }>({ 0: true });
  const contentRef = useRef<HTMLDivElement>(null);

  const currentModule = modules[currentModuleIdx];
  const currentLesson = currentModule?.lessons[currentLessonIdx];

  // Helper func to navigate between lessons
  const nextLesson = () => {
    if (currentLessonIdx < currentModule.lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1);
    } else if (currentModuleIdx < modules.length - 1) {
      setCurrentModuleIdx(currentModuleIdx + 1);
      setCurrentLessonIdx(0);
      setExpandedModules((prev) => ({ ...prev, [currentModuleIdx + 1]: true }));
    }
  };

  const prevLesson = () => {
    if (currentLessonIdx > 0) {
      setCurrentLessonIdx(currentLessonIdx - 1);
    } else if (currentModuleIdx > 0) {
      const pModIdx = currentModuleIdx - 1;
      setCurrentModuleIdx(pModIdx);
      setCurrentLessonIdx(modules[pModIdx].lessons.length - 1);
      setExpandedModules((prev) => ({ ...prev, [pModIdx]: true }));
    }
  };

  const selectLesson = (mIdx: number, lIdx: number) => {
    setCurrentModuleIdx(mIdx);
    setCurrentLessonIdx(lIdx);
    setInteractiveAns("");
    setInteractiveFB("");
  };

  const toggleModule = (mIdx: number) => {
    setExpandedModules((prev) => ({ ...prev, [mIdx]: !prev[mIdx] }));
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentModuleIdx, currentLessonIdx]);

  return {
    modules,
    setModules,
    currentModuleIdx,
    setCurrentModuleIdx,
    currentLessonIdx,
    setCurrentLessonIdx,
    interactiveAns,
    setInteractiveAns,
    interactiveFB,
    setInteractiveFB,
    expandedModules,
    setExpandedModules,
    contentRef,
    currentModule,
    currentLesson,
    prevLesson,
    nextLesson,
    selectLesson,
    toggleModule,
  };
};

export type UseLessonContextType = ReturnType<typeof useLessonContext>;

const initContextState: UseLessonContextType = {
  modules: [],
  setModules: () => {},
  currentModuleIdx: 0,
  setCurrentModuleIdx: () => {},
  currentLessonIdx: 0,
  setCurrentLessonIdx: () => {},
  interactiveAns: "",
  setInteractiveAns: () => {},
  interactiveFB: "",
  setInteractiveFB: () => {},
  expandedModules: { 0: true },
  setExpandedModules: () => {},
  contentRef: {
    current: null,
  },
  currentModule: null,
  currentLesson: null,
  prevLesson: () => {},
  nextLesson: () => {},
  selectLesson: () => {},
  toggleModule: () => {},
};

export const LessonContext =
  createContext<UseLessonContextType>(initContextState);

export const LessonProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <LessonContext.Provider value={useLessonContext()}>
      {children}
    </LessonContext.Provider>
  );
};
