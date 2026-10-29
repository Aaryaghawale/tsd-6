import { useState } from "react";
import "./App.css";

const students = [
  {
    name: "Aarya Ghawale",
    rollNo: "101",
    course: "BCA",
    year: "First Year",
    email: "aarav@example.com",
    color: "blue",
    quote: "Small steps every day lead to big results."
  },
  {
    name: "harsh Patil",
    rollNo: "102",
    course: "B.Sc. Computer Science",
    year: "Second Year",
    email: "priya@example.com",
    color: "pink",
    quote: "Dream bigger, work harder."
  },
  {
    name: "Rahul Verma",
    rollNo: "103",
    course: "B.Tech",
    year: "Third Year",
    email: "rahul@example.com",
    color: "green",
    quote: "Better skills, brighter future."
  },
  {
    name: "Sneha Joshi",
    rollNo: "104",
    course: "B.Sc. Biotechnology",
    year: "Second Year",
    email: "sneha@example.com",
    color: "purple",
    quote: "Good things take time."
  },
  {
    name: "Aditya Rao",
    rollNo: "105",
    course: "B.Com",
    year: "Final Year",
    email: "aditya@example.com",
    color: "orange",
    quote: "Focus today, achieve tomorrow."
  },
  {
    name: "Neha Singh",
    rollNo: "106",
    course: "B.Tech (AI & ML)",
    year: "Third Year",
    email: "neha@example.com",
    color: "teal",
    quote: "Keep going, you're doing great!"
  }
];

const extraNames = [
  "Ishita Deshmukh", "Rohan Kulkarni", "Ananya Shah",
  "Karan Mehta", "Pooja More", "Vivek Nair",
  "Kavya Reddy", "Arjun Malhotra", "Meera Joshi",
  "Siddharth Jain", "Riya Kapoor", "Omkar Pawar",
  "Tanvi Gupta", "Yash Thakur", "Sakshi Mishra",
  "Atharva Shinde", "Diya Agarwal", "Manav Soni",
  "Aditi Chavan", "Varun Das", "Simran Kaur",
  "Nikhil Bhosale", "Anjali Desai", "Dev Patel",
  "Mihir Shah", "Shreya Iyer", "Akash Yadav",
  "Sana Khan", "Pranav More", "Ira Kulkarni"
];

const courses = [
  "BCA",
  "B.Tech",
  "B.Com",
  "B.Sc. Computer Science",
  "B.Tech (AI & ML)",
  "B.Sc. Biotechnology"
];

const years = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year"
];

const colors = ["blue", "pink", "green", "purple", "orange", "teal"];

const extraStudents = extraNames.map((name, index) => ({
  name,
  rollNo: String(107 + index),
  course: courses[index % courses.length],
  year: years[index % years.length],
  email: `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
  color: colors[index % colors.length],
  quote: "Learn something new every day."
}));

const allStudents = [...students, ...extraStudents];

// Reusable clickable student card
function StudentCard({ student, onClick }) {
  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <button
      type="button"
      className={`student-card ${student.color}`}
      onClick={onClick}
      aria-label={`View profile of ${student.name}`}
    >
      <div className="student-top">
        <div className="avatar">{initials}</div>

        <div className="student-heading">
          <h2>{student.name}</h2>
          <span className="year-badge">{student.year}</span>
        </div>
      </div>

      <div className="student-details">
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Year:</strong> {student.year}</p>
      </div>

      <div className="student-quote">"{student.quote}"</div>

      <div className="view-profile">View Full Profile →</div>
    </button>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch =
      `${student.name} ${student.course} ${student.rollNo}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCourse =
      selectedCourse === "All Courses" ||
      student.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  return (
    <div className="app">
      <header className="portal-header">
        <div className="cap-icon">🎓</div>
        <h1>College Student Portal</h1>
        <p className="subtitle">Student Profile Cards</p>
        <p className="tagline">
          Learn • Grow • Build Your Future
        </p>
      </header>

      {selectedStudent ? (
        <section className="profile-details">
          <button
            className="back-button"
            onClick={() => setSelectedStudent(null)}
          >
            ← Back to All Students
          </button>

          <div className={`detail-card ${selectedStudent.color}`}>
            <div className="avatar large-avatar">
              {selectedStudent.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            <h2>{selectedStudent.name}</h2>
            <span className="year-badge">{selectedStudent.year}</span>

            <div className="full-details">
              <p><strong>Roll Number:</strong> {selectedStudent.rollNo}</p>
              <p><strong>Course:</strong> {selectedStudent.course}</p>
              <p><strong>Academic Year:</strong> {selectedStudent.year}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
            </div>

            <p className="student-quote">
              "{selectedStudent.quote}"
            </p>
          </div>
        </section>
      ) : (
        <section className="dashboard">
          <div className="dashboard-info">
            <div>
              <h2>Our Students</h2>
              <p>Discover the learners shaping tomorrow.</p>
            </div>

            <div className="student-count">
              <strong>{filteredStudents.length}</strong>
              <span>
                of {allStudents.length} students
              </span>
            </div>
          </div>

          <div className="filters">
            <input
              className="search-box"
              type="text"
              placeholder="🔍 Search name, course or roll number..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="course-filter"
              value={selectedCourse}
              onChange={(event) => setSelectedCourse(event.target.value)}
            >
              <option>All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="student-container">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentCard
                  key={student.rollNo}
                  student={student}
                  onClick={() => setSelectedStudent(student)}
                />
              ))
            ) : (
              <p className="no-results">
                No students found. Try a different search.
              </p>
            )}
          </div>
        </section>
      )}

      <footer className="footer">
        💙 Together Towards a Brighter Future 💙
      </footer>
    </div>
  );
}

export default App;
