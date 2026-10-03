import { BookOpen } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { useLesson } from "../../hooks/useLesson";
import LessonFooter from "./LessonFooter";

const exampleData = [
  { name: "Day 1", price: 100 },
  { name: "Day 2", price: 105 },
  { name: "Day 3", price: 102 },
  { name: "Day 4", price: 110 },
  { name: "Day 5", price: 108 },
  { name: "Day 6", price: 115 },
  { name: "Day 7", price: 120 },
];

const LessonMain = () => {
  const {
    contentRef,
    currentModule,
    currentLessonIdx,
    currentModuleIdx,
    currentLesson,
    interactiveAns,
    interactiveFB,
    setInteractiveAns,
    setInteractiveFB,
  } = useLesson();

  return (
    <div
      ref={contentRef}
      className="glass-panel"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        position: "relative",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          borderBottom: "1px solid var(--card-border)",
          paddingBottom: "25px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "var(--accent-glow)",
            padding: "16px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
          }}
        >
          <BookOpen color="white" size={36} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "var(--accent-color)",
                fontWeight: "bold",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {currentModule.title}
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
              Lesson {currentLessonIdx + 1} of {currentModule.lessons.length}
            </p>
          </div>
          <h2 style={{ fontSize: "2.5rem", lineHeight: 1.2, marginTop: "8px" }}>
            {currentLesson.title}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "8px",
              fontSize: "1.1rem",
            }}
          >
            {currentLesson.description}
          </p>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
            fontSize: "1.15rem",
            marginBottom: "40px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {currentLesson.content}
        </div>

        {currentModuleIdx === 0 && currentLessonIdx === 0 && (
          <div
            style={{
              padding: "24px",
              background: "rgba(59, 130, 246, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>
              Example: Compounding Growth
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                marginBottom: "15px",
              }}
            >
              Observe this sample chart. Think of this as your slice of the
              pizza growing continuously over days.
            </p>
            <div style={{ height: "200px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={exampleData}>
                  <defs>
                    <linearGradient id="colorEx" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    wrapperStyle={{ outline: "none" }}
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "none",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorEx)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {currentLesson.title === "Equity StyleMaps" && (
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h4 style={{ marginBottom: "15px" }}>The Morningstar Style Box</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 100px 100px",
                gridTemplateRows: "100px 100px 100px",
                gap: "4px",
                background: "rgba(0,0,0,0.5)",
                border: "2px solid rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  background: "rgba(139, 92, 246, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Large Value
              </div>
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Large Blend
              </div>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Large Growth
              </div>
              <div
                style={{
                  background: "rgba(139, 92, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                }}
              >
                Mid Value
              </div>
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                }}
              >
                Mid Blend
              </div>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                }}
              >
                Mid Growth
              </div>
              <div
                style={{
                  background: "rgba(139, 92, 246, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                Small Value
              </div>
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                Small Blend
              </div>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                Small Growth
              </div>
            </div>
          </div>
        )}

        {currentLesson.interactive &&
          (() => {
            const quiz = JSON.parse(currentLesson.interactive);
            return (
              <div
                className="animate-fade-in"
                style={{
                  padding: "24px",
                  background: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "12px",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  marginBottom: "30px",
                }}
              >
                <h4 style={{ marginBottom: "10px", color: "#c4b5fd" }}>
                  Apply Your Knowledge
                </h4>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--text-primary)",
                    marginBottom: "15px",
                  }}
                >
                  {quiz.question}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {quiz.prefix && (
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {quiz.prefix}
                    </span>
                  )}
                  <input
                    type="number"
                    value={interactiveAns}
                    onChange={(e) => setInteractiveAns(e.target.value)}
                    style={{
                      width: "150px",
                      background: "rgba(0,0,0,0.5)",
                      borderColor: "rgba(139, 92, 246, 0.3)",
                    }}
                    placeholder="Your answer"
                  />
                  <button
                    className="btn btn-primary"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
                    }}
                    onClick={() => {
                      if (parseFloat(interactiveAns) === quiz.answer) {
                        setInteractiveFB(
                          "Correct! Excellent job applying the concept.",
                        );
                      } else {
                        setInteractiveFB("Not quite right. Try recalculating!");
                      }
                    }}
                  >
                    Check Answer
                  </button>
                </div>
                {interactiveFB && (
                  <p
                    className="animate-fade-in"
                    style={{
                      marginTop: "15px",
                      color: interactiveFB.includes("Correct")
                        ? "var(--success)"
                        : "var(--danger)",
                      fontWeight: "bold",
                    }}
                  >
                    {interactiveFB}
                  </p>
                )}
              </div>
            );
          })()}
      </div>
      <LessonFooter />
    </div>
  );
};

export default LessonMain;
