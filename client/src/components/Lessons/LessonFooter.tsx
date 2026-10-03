import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLesson } from "../../hooks/useLesson";

const LessonFooter = () => {
  const {
    currentModuleIdx,
    currentLessonIdx,
    modules,
    interactiveFB,
    currentModule,
    currentLesson,
    prevLesson,
    nextLesson,
  } = useLesson();

  const isAtStart = currentModuleIdx === 0 && currentLessonIdx === 0;
  const isAtEnd =
    currentModuleIdx === modules.length - 1 &&
    currentLessonIdx === currentModule.lessons.length - 1;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid var(--card-border)",
        paddingTop: "25px",
        marginTop: "auto",
      }}
    >
      <button
        className="btn btn-secondary"
        onClick={prevLesson}
        disabled={isAtStart}
        style={{
          opacity: isAtStart ? 0.3 : 1,
          cursor: isAtStart ? "not-allowed" : "pointer",
        }}
      >
        <ArrowLeft size={18} /> Previous
      </button>

      {(() => {
        const isInteractiveCorrect =
          !currentLesson.interactive || interactiveFB.includes("Correct");
        const canProceed = isInteractiveCorrect;
        const isButtonDisabled = isAtEnd || !canProceed;

        return (
          <div style={{ textAlign: "right" }}>
            {!canProceed && !isAtEnd && (
              <p
                style={{
                  color: "var(--danger)",
                  fontSize: "0.85rem",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Complete the 'Apply Your Knowledge' problem to proceed.
              </p>
            )}
            <button
              className="btn btn-primary"
              onClick={nextLesson}
              disabled={isButtonDisabled}
              style={{
                opacity: isButtonDisabled ? 0.3 : 1,
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                padding: "12px 30px",
              }}
            >
              Next <ArrowRight size={18} />
            </button>
          </div>
        );
      })()}
    </div>
  );
};

export default LessonFooter;
