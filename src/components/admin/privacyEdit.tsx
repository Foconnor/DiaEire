"use client";
import React, { useEffect, useState } from "react";
import EditButton from "../common/editButton";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function PrivacyEdit() {
  const [title, setTitle] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [savingQuestion, setSavingQuestion] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null);
  const [isNewQuestion, setIsNewQuestion] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    question: "",
    awnser: "",
    points: [""],
  });

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "privacy", "privacyPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setLastUpdated(data.lastUpdated || "");
          setIntro(data.intro || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching privacy page data");
        console.error("Error fetching privacy page data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

  function handleEdit() {
    setIsModalOpen(true);
  }
  function closeModal() {
    if (!saving && !savingQuestion) setIsModalOpen(false);
    if (!saving && !savingQuestion) setIsQuestionModalOpen(false);
    setActiveQuestion(null);
    setQuestionForm({ question: "", awnser: "", points: [""] });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !lastUpdated.trim() || !intro.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "privacy", "privacyPage");
      await updateDoc(docRef, {
        title: title.trim(),
        lastUpdated: lastUpdated.trim(),
        intro: intro.trim(),
      });
      toast.success("privacy page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update privacy page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  const fetchQuestions = async () => {
    setQuestionsLoading(true);
    try {
      const questionColRef = query(
        collection(db, "privacy", "privacyPage", "questions"),
        orderBy("createdAt", "asc")
      );
      const querySnapshot = await getDocs(questionColRef);
      const dropdownArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as {
          question: string;
          awnser: string;
          points: { text: string }[];
        }),
      }));
      setQuestions(dropdownArr);
    } catch (error) {
      toast.error("Error fetching questions");
      console.error("Error fetching questions:", error);
    } finally {
      setQuestionsLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handler for editing a question
  function handleEditQuestion(q: any) {
    setActiveQuestion(q);
    setIsNewQuestion(false);
    setQuestionForm({
      question: q.question || "",
      awnser: q.awnser || "",
      points: q.points || [""], // <-- just use array of strings
    });
    setIsQuestionModalOpen(true);
  }

  function handleAddQuestion() {
    setActiveQuestion(null);
    setIsNewQuestion(true);
    setQuestionForm({ question: "", awnser: "", points: [""] });
    setIsQuestionModalOpen(true);
  }

  // Handler for changing question form fields
  function handleQuestionFormChange(
    field: "question" | "awnser",
    value: string
  ) {
    setQuestionForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleDropdownPointChange(idx: number, value: string) {
    setQuestionForm((prev) => {
      const newPoints = [...prev.points];
      newPoints[idx] = value;
      return { ...prev, points: newPoints };
    });
  }

  function handleAddDropdownPoint() {
    setQuestionForm((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  }

  function handleRemoveDropdownPoint(idx: number) {
    setQuestionForm((prev) => {
      const newPoints = prev.points.filter((_, i) => i !== idx);
      return { ...prev, points: newPoints.length ? newPoints : [""] };
    });
  }

  async function handleDeleteQuestion() {
    if (!activeQuestion) return;
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    setSavingQuestion(true);
    try {
      const dropdownDocRef = doc(
        db,
        "privacy",
        "privacyPage",
        "questions",
        activeQuestion.id
      );
      await deleteDoc(dropdownDocRef);
      toast.success("Question deleted!");
      setIsQuestionModalOpen(false);
      // Refresh questions
      const questionColRef = collection(
        db,
        "privacy",
        "privacyPage",
        "questions"
      );
      const querySnapshot = await getDocs(questionColRef);
      const questionArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as {
          question: string;
          awnser: string;
          points: { text: string }[];
        }),
      }));
      setQuestions(questionArr);
    } catch (error) {
      toast.error("Failed to delete question.");
      console.error("Delete error:", error);
    } finally {
      setSavingQuestion(false);
      setActiveQuestion(null);
      setQuestionForm({ question: "", awnser: "", points: [""] });
    }
  }

  async function handleQuestionSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !questionForm.question.trim() ||
      !questionForm.awnser.trim() ||
      questionForm.points.some((p) => !p.trim())
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSavingQuestion(true);
    try {
      if (isNewQuestion) {
        const questionColRef = collection(
          db,
          "privacy",
          "privacyPage",
          "questions"
        );
        await addDoc(questionColRef, {
          question: questionForm.question.trim(),
          awnser: questionForm.awnser.trim(),
          points: questionForm.points.map((point) => point.trim()), // <-- array of strings
          createdAt: Date.now(),
        });
        toast.success("Question added!");
      } else if (activeQuestion) {
        const dropdownDocRef = doc(
          db,
          "privacy",
          "privacyPage",
          "questions",
          activeQuestion.id
        );
        await updateDoc(dropdownDocRef, {
          question: questionForm.question.trim(),
          awnser: questionForm.awnser.trim(),
          points: questionForm.points.map((point) => point.trim()), // <-- array of strings
        });
        toast.success("Question updated!");
      }
      setIsQuestionModalOpen(false);
      // Refresh questions
      const questionColRef = collection(
        db,
        "privacy",
        "privacyPage",
        "questions"
      );
      const querySnapshot = await getDocs(questionColRef);
      const questionArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as {
          question: string;
          awnser: string;
          points: string[]; // <-- array of strings
        }),
      }));
      setQuestions(questionArr);
    } catch (error) {
      toast.error("Failed to save question.");
      console.error("Save error:", error);
    } finally {
      setSavingQuestion(false);
      setActiveQuestion(null);
      setQuestionForm({ question: "", awnser: "", points: [""] });
      setIsNewQuestion(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Privacy Page</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10">
          <div className="h-6 text-center rounded mb-4 animate-pulse">
            Loading...
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Title :</p>
            <p>{title}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Last Updated :</p>
            <p>{lastUpdated}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Intro :</p>
            <p>{intro}</p>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl">Questions</h3>
              <div className="flex gap-5">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer"
                  onClick={() => {
                    fetchQuestions();
                  }}
                >
                  Fix Order
                </button>
                <button
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer"
                  onClick={handleAddQuestion}
                >
                  Add Question
                </button>
              </div>
            </div>
            {questionLoading ? (
              <div>Loading questions...</div>
            ) : (
              <ul>
                {questions.map((q, i) => (
                  <li
                    key={q.id}
                    className="mb-4 border-b pb-3 border-[var(--line)]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">
                        {i + 1}. {q.question}
                      </span>
                      <button
                        className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3"
                        onClick={() => handleEditQuestion(q)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit
                      </button>
                    </div>
                    <div className="ms-3 mb-2">{q.awnser}</div>
                    <ul className="ml-4 list-disc">
                      {q.points?.map((p: string, idx: number) => (
                        <li key={idx} className="mb-1">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Privacy Page</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Updated <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={lastUpdated}
                  onChange={(e) => setLastUpdated(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Intro <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
      {isQuestionModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={savingQuestion}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {isNewQuestion ? "Add Question" : "Edit Question"}
            </h3>
            <form className="space-y-4" onSubmit={handleQuestionSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={questionForm.question}
                  onChange={(e) =>
                    handleQuestionFormChange("question", e.target.value)
                  }
                  required
                  disabled={savingQuestion}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Awnser <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={questionForm.awnser}
                  onChange={(e) =>
                    handleQuestionFormChange("awnser", e.target.value)
                  }
                  required
                  disabled={savingQuestion}
                />
              </div>
              <p className="block text-sm font-medium mb-1">
                Points <span className="text-red-500">*</span>
              </p>
              {questionForm.points.map((point, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={point}
                    onChange={(e) =>
                      handleDropdownPointChange(idx, e.target.value)
                    }
                    required
                    disabled={savingQuestion}
                  />
                  {questionForm.points.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 font-bold cursor-pointer"
                      onClick={() => handleRemoveDropdownPoint(idx)}
                      disabled={savingQuestion}
                      aria-label="Remove point"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="w-full bg-gray-200 text-gray-700 py-1 rounded font-semibold mb-4 mt-2 cursor-pointer hover:bg-gray-300 transition"
                onClick={handleAddDropdownPoint}
                disabled={savingQuestion}
              >
                Add Point
              </button>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="w-full bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
                >
                  {savingQuestion
                    ? isNewQuestion
                      ? "Adding..."
                      : "Saving..."
                    : isNewQuestion
                    ? "Add"
                    : "Save"}
                </button>
                {!isNewQuestion && (
                  <button
                    type="button"
                    disabled={savingQuestion}
                    className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition cursor-pointer disabled:opacity-60"
                    onClick={handleDeleteQuestion}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivacyEdit;
