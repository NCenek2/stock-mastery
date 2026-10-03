import { BookOpen, Check, ChevronDown, ChevronRight } from "lucide-react";
import { useLesson } from "../hooks/useLesson";

const CurriculumSidebar = () => {
  const {
    currentLessonIdx,
    modules,
    expandedModules,
    currentModuleIdx,
    toggleModule,
    selectLesson,
  } = useLesson();

  return (
    <div
      className="glass-panel"
      style={{
        width: "320px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
        padding: "20px 0",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid var(--card-border)",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        Curriculum
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflowY: "auto",
          paddingLeft: "20px",
          paddingRight: "10px",
        }}
      >
        {modules.map((m, mIdx) => {
          const isExpanded = expandedModules[mIdx];
          const isActiveModule = mIdx === currentModuleIdx;

          return (
            <div
              key={m.id}
              style={{
                flexShrink: 0,
                border: isActiveModule
                  ? "1px solid rgba(59, 130, 246, 0.3)"
                  : "1px solid transparent",
                borderRadius: "8px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                onClick={() => toggleModule(mIdx)}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: isActiveModule
                    ? "rgba(59, 130, 246, 0.1)"
                    : "transparent",
                  fontWeight: "bold",
                }}
              >
                <span style={{ fontSize: "0.9rem", width: "90%" }}>
                  {m.title}
                </span>
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>

              {isExpanded && (
                <div
                  style={{
                    padding: "8px 0",
                    borderTop: "1px solid var(--card-border)",
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  {m.lessons.map((l: any, lIdx: number) => {
                    const isCurrent =
                      mIdx === currentModuleIdx && lIdx === currentLessonIdx;
                    return (
                      <div
                        key={l.id}
                        onClick={() => selectLesson(mIdx, lIdx)}
                        style={{
                          padding: "10px 16px",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          color: isCurrent ? "white" : "var(--text-secondary)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          background: isCurrent
                            ? "var(--accent-glow)"
                            : "transparent",
                          borderLeft: isCurrent
                            ? "3px solid var(--accent-color)"
                            : "3px solid transparent",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span style={{ minWidth: "16px", marginTop: "2px" }}>
                          {mIdx < currentModuleIdx ||
                          (mIdx === currentModuleIdx &&
                            lIdx < currentLessonIdx) ? (
                            <Check size={14} color="var(--success)" />
                          ) : (
                            <BookOpen
                              size={14}
                              style={{ opacity: isCurrent ? 1 : 0.5 }}
                            />
                          )}
                        </span>
                        <span style={{ lineHeight: 1.3 }}>{l.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurriculumSidebar;
