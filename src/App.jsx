import { useState, useMemo } from "react";

// ============================================================
// DATA MODEL
// Source: BYU 2023-2024 CS BS Catalog (catalog23byu.coursedog.com)
// and BYU Learning Outcomes (learningoutcomes.byu.edu)
//
// To reorganize the hierarchy, change `requirementType` on any
// course object — the components require zero changes.
// ============================================================

const CS_CLASSES = [

  // ── REQUIREMENT 1: CORE CS COURSES (all 11 required) ──────

  {
    id: "cs111", number: "CS 111", name: "Intro to Computer Science",
    description: "Introduction to programming and computer science using Python. Develops problem-solving skills and foundational CS concepts.",
    prerequisites: ["None"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs224", number: "CS 224", name: "Computer Systems",
    description: "How hardware and software interact. Covers data representation, assembly language, memory hierarchy, and system-level programming.",
    prerequisites: ["CS 111 or CS 142"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs235", number: "CS 235", name: "Data Structures",
    description: "Design and implementation of fundamental data structures: lists, stacks, queues, trees, and graphs, along with algorithm analysis.",
    prerequisites: ["CS 111 or CS 142"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs236", number: "CS 236", name: "Discrete Structure",
    description: "Logic, sets, relations, functions, combinatorics, and graph theory as they apply to computer science.",
    prerequisites: ["CS 235"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs240", number: "CS 240", name: "Advanced Software Construction",
    description: "Software engineering in Java: design patterns, concurrency, testing, version control, and large-scale project development.",
    prerequisites: ["CS 235"], credits: 4, requirementType: "Core",
  },
  {
    id: "cs252", number: "CS 252", name: "Introduction to Computational Theory",
    description: "Formal languages, automata, computability, and complexity theory. Theoretical foundations for upper-division CS.",
    prerequisites: ["CS 236"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs260", number: "CS 260", name: "Web Programming",
    description: "Full-stack web development: HTML, CSS, JavaScript, React, Node.js, databases, and deployment of web applications.",
    prerequisites: ["CS 235"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs312", number: "CS 312", name: "Algorithm Design & Analysis",
    description: "Design paradigms (divide-and-conquer, dynamic programming, greedy), correctness proofs, and asymptotic complexity analysis.",
    prerequisites: ["CS 235", "CS 252"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs324", number: "CS 324", name: "Systems Programming",
    description: "Low-level C programming: memory management, file I/O, processes, signals, and inter-process communication.",
    prerequisites: ["CS 224", "CS 235"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs340", number: "CS 340", name: "Software Design",
    description: "Object-oriented design principles, design patterns, UML, refactoring, and team-based software development.",
    prerequisites: ["CS 240"], credits: 3, requirementType: "Core",
  },
  {
    id: "cs404", number: "CS 404", name: "Ethics & Computers in Society",
    description: "Professional ethics, privacy, intellectual property, security, and the societal impact of computing.",
    prerequisites: ["CS 111"], credits: 2, requirementType: "Core",
  },

  // ── REQUIREMENTS 2-4: SUPPORT COURSES ─────────────────────

  {
    id: "math112", number: "Math 112", name: "Calculus 1",
    description: "Limits, derivatives, and introductory integration. Required mathematical foundation.",
    prerequisites: ["Math 110 or placement exam"], credits: 4, requirementType: "Support: Math / Science",
  },
  {
    id: "math213", number: "Math 213", name: "Elementary Linear Algebra",
    description: "Vectors, matrices, linear transformations, and eigenvalues. Essential for ML, graphics, and data science.",
    prerequisites: ["Math 112"], credits: 2, requirementType: "Support: Math / Science",
  },
  {
    id: "math214", number: "Math 214", name: "Computational Linear Algebra",
    description: "Numerical methods for linear systems, matrix factorizations, and iterative algorithms.",
    prerequisites: ["Math 213 (concurrent ok)"], credits: 1, requirementType: "Support: Math / Science",
  },
  {
    id: "phscs121", number: "Phscs 121", name: "Introduction to Newtonian Mechanics",
    description: "Kinematics, Newton's laws, energy, and momentum. Develops quantitative problem-solving skills.",
    prerequisites: ["Math 112 (concurrent ok)"], credits: 3, requirementType: "Support: Math / Science",
  },
  {
    id: "wrtg316", number: "Wrtg 316", name: "Technical Communication",
    description: "Writing for professional and technical contexts: reports, documentation, proposals, and presentations.",
    prerequisites: ["University Writing requirement"], credits: 3, requirementType: "Support: Math / Science",
  },
  {
    id: "stat121", number: "Stat 121", name: "Principles of Statistics",
    description: "Descriptive statistics, probability, distributions, hypothesis testing, and regression.",
    prerequisites: ["Math 110"], credits: 3, requirementType: "Support: Math / Science",
    note: "Choose one: Stat 121 / Math 313 (Probability Theory) / Stat 201 (Stats for Engineers)",
  },
  {
    id: "math290", number: "Math 290", name: "Fundamentals of Mathematics",
    description: "Proof techniques, logic, sets, relations, and functions. A common choice for CS students who want proof experience.",
    prerequisites: ["Math 112"], credits: 3, requirementType: "Support: Math / Science",
    note: "Choose one: Math 290 / Math 113 (Calculus 2) / Stat 330 (Stat Modeling for Data Science)",
  },

  // ── REQUIREMENT 5 OPTION 5.1: CS ELECTIVES ────────────────

  {
    id: "cs329", number: "CS 329", name: "QA & DevOps",
    description: "Test-driven development, automated testing, CI/CD pipelines, and software quality assurance.",
    prerequisites: ["CS 240"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs330", number: "CS 330", name: "Concepts of Programming Languages",
    description: "Syntax, semantics, and paradigms. Compares functional, logic, and object-oriented languages.",
    prerequisites: ["CS 236", "CS 252"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs345", number: "CS 345", name: "Operating Systems Design",
    description: "Process management, scheduling, memory management, file systems, and concurrency with kernel-level projects.",
    prerequisites: ["CS 324", "CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs355", number: "CS 355", name: "Graphics and Image Processing",
    description: "2D/3D rendering fundamentals, rasterization, image filtering, and visual computing algorithms.",
    prerequisites: ["CS 312", "Math 213"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs356", number: "CS 356", name: "Advanced Techniques in HCI",
    description: "Advanced human-computer interaction: input technologies, evaluation methods, and interface research.",
    prerequisites: ["CS 256 or CS 260"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs393", number: "CS 393", name: "Collaborative Problem Solving",
    description: "Competitive-style algorithmic problems requiring advanced design strategies.",
    prerequisites: ["CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs412", number: "CS 412", name: "Linear Programming / Convex Optimization",
    description: "Linear programming, the simplex method, duality, and convex optimization with applications in CS.",
    prerequisites: ["Math 213", "CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs428", number: "CS 428", name: "Software Engineering",
    description: "Agile and traditional SE processes, requirements engineering, architecture, project management, and team dynamics.",
    prerequisites: ["CS 340"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs431", number: "CS 431", name: "Algorithmic Languages & Compilers",
    description: "Lexing, parsing, semantic analysis, intermediate representation, and code generation. Students build a working compiler.",
    prerequisites: ["CS 330", "CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs450", number: "CS 450", name: "Computer Vision",
    description: "Image formation, feature detection, segmentation, object recognition, and deep learning-based vision systems.",
    prerequisites: ["CS 312", "Math 213"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs452", number: "CS 452", name: "Database Modeling Concepts",
    description: "Relational model, SQL, ER diagrams, normalization, transactions, and an introduction to NoSQL systems.",
    prerequisites: ["CS 235"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs453", number: "CS 453", name: "Fundamentals of Information Retrieval",
    description: "Search engine internals: indexing, ranking algorithms, relevance feedback, and IR system evaluation.",
    prerequisites: ["CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs455", number: "CS 455", name: "Computer Graphics",
    description: "3D rendering pipeline, ray tracing, shading models, and GPU programming with OpenGL/WebGL.",
    prerequisites: ["CS 312", "Math 213"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs456", number: "CS 456", name: "Mobile and Ubiquitous HCI",
    description: "Design and development of mobile and context-aware applications. Covers usability and ubicomp concepts.",
    prerequisites: ["CS 256 or CS 260"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs460", number: "CS 460", name: "Computer Communications & Networking",
    description: "Layered network architecture, TCP/IP, routing protocols, congestion control, and application-layer services.",
    prerequisites: ["CS 324"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs462", number: "CS 462", name: "Distributed System Design",
    description: "Principles of distributed systems: consistency, fault tolerance, replication, and cloud architectures.",
    prerequisites: ["CS 324", "CS 460"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs465", number: "CS 465", name: "Computer Security",
    description: "Cryptography, network security, authentication, access control, and common attack and defense techniques.",
    prerequisites: ["CS 324"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs466", number: "CS 466", name: "Blockchain Technologies",
    description: "Fundamentals of blockchain, consensus protocols, smart contracts, and decentralized applications.",
    prerequisites: ["CS 465"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs470", number: "CS 470", name: "Introduction to Artificial Intelligence",
    description: "Search, constraint satisfaction, knowledge representation, probabilistic reasoning, and ML fundamentals.",
    prerequisites: ["CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs471", number: "CS 471", name: "Voice Interfaces",
    description: "Design and development of voice-based interfaces, speech recognition pipelines, and conversational agents.",
    prerequisites: ["CS 470"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs473", number: "CS 473", name: "Advanced Machine Learning",
    description: "Advanced supervised and unsupervised learning, ensemble methods, model selection, and feature engineering.",
    prerequisites: ["CS 312", "Stat 121 or Math 313"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs474", number: "CS 474", name: "Deep Learning",
    description: "Neural networks, CNNs, RNNs, transformers, and modern deep learning frameworks such as PyTorch.",
    prerequisites: ["CS 473"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs479", number: "CS 479", name: "Introduction to Machine Translation",
    description: "Statistical and neural machine translation, sequence-to-sequence models, and evaluation methods.",
    prerequisites: ["CS 473 or CS 474"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs486", number: "CS 486", name: "Verification and Validation",
    description: "Formal verification methods, model checking, and rigorous software testing and validation techniques.",
    prerequisites: ["CS 252", "CS 340"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs513", number: "CS 513", name: "Robust Control",
    description: "Control theory applied to computing systems: stability, robustness, and feedback-based design.",
    prerequisites: ["Math 213", "CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs575", number: "CS 575", name: "Introduction to Network Science",
    description: "Graph-theoretic models of real-world networks, centrality metrics, community detection, and spreading processes.",
    prerequisites: ["CS 312"], credits: 3, requirementType: "CS Elective",
  },
  {
    id: "cs580", number: "CS 580", name: "Theory of Predictive Modeling",
    description: "Mathematical foundations of statistical learning, PAC learning, VC dimension, and generalization theory.",
    prerequisites: ["CS 312", "Math 313 or Stat 121"], credits: 3, requirementType: "CS Elective",
  },

  // ── REQUIREMENT 5 OPTION 5.4: CAPSTONE / RESEARCH ─────────

  {
    id: "cs494", number: "CS 494", name: "Capstone 1",
    description: "First semester of the two-semester capstone. Teams define scope, design architecture, and begin building a sponsor project.",
    prerequisites: ["CS 340", "Senior standing"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs495", number: "CS 495", name: "Capstone 2",
    description: "Completion of the capstone project. Emphasis on delivery, testing, and professional presentation.",
    prerequisites: ["CS 494"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs480", number: "CS 480", name: "Software Engineering Capstone 1",
    description: "First semester of the SE-focused capstone. Emphasizes requirements engineering and Agile delivery.",
    prerequisites: ["CS 428", "Senior standing"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs481", number: "CS 481", name: "Software Engineering Capstone 2",
    description: "Continuation of CS 480. Final delivery, retrospective, and handoff of the software product.",
    prerequisites: ["CS 480"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs482", number: "CS 482", name: "Data Science Capstone 1",
    description: "First semester of the data-science-focused capstone. Students tackle a real-world data problem from inception to pipeline.",
    prerequisites: ["CS 473", "Senior standing"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs483", number: "CS 483", name: "Data Science Capstone 2",
    description: "Completion of the data science capstone: model deployment, evaluation, and stakeholder presentation.",
    prerequisites: ["CS 482"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs497", number: "CS 497R", name: "Undergraduate Research",
    description: "Independent research with a faculty mentor resulting in a report or conference submission. Up to 6 credit hours.",
    prerequisites: ["Instructor approval"], credits: 3, requirementType: "Capstone / Research",
  },
  {
    id: "cs493", number: "CS 493R", name: "Computing Competitions",
    description: "Preparation and participation in ACM ICPC and other competitive programming contests.",
    prerequisites: ["CS 312"], credits: 3, requirementType: "Capstone / Research",
  },
];

// ============================================================
// HELPERS
// ============================================================

const CATEGORY_ORDER = [
  "Core",
  "CS Elective",
  "Support: Math / Science",
  "Capstone / Research",
];

const CATEGORY_NOTES = {
  "Core": "All 11 courses required",
  "CS Elective": "21 credit hours required total (mix from catalog options)",
  "Support: Math / Science": "Calculus 1, Linear Algebra x2, Physics, Tech Writing required + one stats pick + one math elective",
  "Capstone / Research": "Choose one two-semester capstone track or research option",
};

function getCategories(classes) {
  const found = new Set(classes.map((c) => c.requirementType));
  return CATEGORY_ORDER.filter((cat) => found.has(cat));
}

// ============================================================
// COMPONENT: ClassCard
// ============================================================
function ClassCard({ course }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: "10px 14px", marginBottom: 8, background: "#fff" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 8 }}
        onClick={() => setExpanded((p) => !p)}
      >
        <span style={{ fontWeight: "bold", fontSize: 14 }}>{course.number} — {course.name}</span>
        <span style={{ fontSize: 12, color: "#666", whiteSpace: "nowrap" }}>{course.credits} cr  {expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6 }}>
          <p style={{ margin: "4px 0" }}>{course.description}</p>
          <p style={{ margin: "6px 0 0", color: "#444" }}>
            <strong>Prerequisites:</strong> {course.prerequisites.join(", ")}
          </p>
          {course.note && (
            <p style={{ margin: "6px 0 0", color: "#777", fontStyle: "italic", fontSize: 12 }}>
              Note: {course.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// COMPONENT: CategorySection
// ============================================================
function CategorySection({ title, courses }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <section style={{ marginBottom: 20 }}>
      <h2
        onClick={() => setCollapsed((p) => !p)}
        style={{ cursor: "pointer", background: "#1a1a2e", color: "#fff", padding: "8px 14px", borderRadius: 4, fontSize: 15, display: "flex", justifyContent: "space-between", alignItems: "baseline", userSelect: "none", margin: 0 }}
      >
        <span>{title}</span>
        <span style={{ fontWeight: "normal", fontSize: 12 }}>{courses.length} course{courses.length !== 1 ? "s" : ""}  {collapsed ? "▼" : "▲"}</span>
      </h2>
      {CATEGORY_NOTES[title] && (
        <p style={{ margin: "4px 0 8px", fontSize: 12, color: "#555", fontStyle: "italic" }}>
          {CATEGORY_NOTES[title]}
        </p>
      )}
      {!collapsed && (
        <div>{courses.map((c) => <ClassCard key={c.id} course={c} />)}</div>
      )}
    </section>
  );
}

// ============================================================
// COMPONENT: App
// ============================================================
export default function App() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return CS_CLASSES;
    return CS_CLASSES.filter(
      (c) => c.number.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [search]);

  const categories = getCategories(filtered);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px", fontFamily: "Georgia, serif" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>BYU CS Class Guide</h1>
        <p style={{ color: "#555", margin: "4px 0 0", fontSize: 13 }}>
          2023-2024 BS in Computer Science requirements. Click any course to expand details.
        </p>
      </header>
      <input
        type="text"
        placeholder="Search by number, name, or topic..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px 12px", fontSize: 14, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box", marginBottom: 16 }}
      />
      {categories.length === 0 && <p style={{ color: "#777" }}>No courses match "{search}".</p>}
      {categories.map((cat) => (
        <CategorySection key={cat} title={cat} courses={filtered.filter((c) => c.requirementType === cat)} />
      ))}
    </div>
  );
}
