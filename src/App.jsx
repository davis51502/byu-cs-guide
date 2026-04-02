import { useEffect, useMemo, useState } from "react";

const CS_CLASSES = [
  {
    id: "cs111",
    number: "CS 111",
    name: "Intro to Computer Science",
    description:
      "Introduction to programming and computer science using Python. Develops problem-solving skills and foundational CS concepts.",
    prerequisites: ["None"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs224",
    number: "CS 224",
    name: "Computer Systems",
    description:
      "How hardware and software interact. Covers data representation, assembly language, memory hierarchy, and system-level programming.",
    prerequisites: ["CS 111 or CS 142"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs235",
    number: "CS 235",
    name: "Data Structures",
    description:
      "Design and implementation of fundamental data structures: lists, stacks, queues, trees, and graphs, along with algorithm analysis.",
    prerequisites: ["CS 111 or CS 142"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs236",
    number: "CS 236",
    name: "Discrete Structure",
    description:
      "Logic, sets, relations, functions, combinatorics, and graph theory as they apply to computer science.",
    prerequisites: ["CS 235"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs240",
    number: "CS 240",
    name: "Advanced Software Construction",
    description:
      "Software engineering in Java: design patterns, concurrency, testing, version control, and large-scale project development.",
    prerequisites: ["CS 235"],
    credits: 4,
    requirementType: "Core",
  },
  {
    id: "cs252",
    number: "CS 252",
    name: "Introduction to Computational Theory",
    description:
      "Formal languages, automata, computability, and complexity theory. Theoretical foundations for upper-division CS.",
    prerequisites: ["CS 236"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs260",
    number: "CS 260",
    name: "Web Programming",
    description:
      "Full-stack web development: HTML, CSS, JavaScript, React, Node.js, databases, and deployment of web applications.",
    prerequisites: ["CS 235"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs312",
    number: "CS 312",
    name: "Algorithm Design & Analysis",
    description:
      "Design paradigms (divide-and-conquer, dynamic programming, greedy), correctness proofs, and asymptotic complexity analysis.",
    prerequisites: ["CS 235", "CS 252"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs324",
    number: "CS 324",
    name: "Systems Programming",
    description:
      "Low-level C programming: memory management, file I/O, processes, signals, and inter-process communication.",
    prerequisites: ["CS 224", "CS 235"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs340",
    number: "CS 340",
    name: "Software Design",
    description:
      "Object-oriented design principles, design patterns, UML, refactoring, and team-based software development.",
    prerequisites: ["CS 240"],
    credits: 3,
    requirementType: "Core",
  },
  {
    id: "cs404",
    number: "CS 404",
    name: "Ethics & Computers in Society",
    description:
      "Professional ethics, privacy, intellectual property, security, and the societal impact of computing.",
    prerequisites: ["CS 111"],
    credits: 2,
    requirementType: "Core",
  },
  {
    id: "math112",
    number: "Math 112",
    name: "Calculus 1",
    description:
      "Limits, derivatives, and introductory integration. Required mathematical foundation.",
    prerequisites: ["Math 110 or placement exam"],
    credits: 4,
    requirementType: "Support",
  },
  {
    id: "math213",
    number: "Math 213",
    name: "Elementary Linear Algebra",
    description:
      "Vectors, matrices, linear transformations, and eigenvalues. Essential for ML, graphics, and data science.",
    prerequisites: ["Math 112"],
    credits: 2,
    requirementType: "Support",
  },
  {
    id: "math214",
    number: "Math 214",
    name: "Computational Linear Algebra",
    description:
      "Numerical methods for linear systems, matrix factorizations, and iterative algorithms.",
    prerequisites: ["Math 213 (concurrent ok)"],
    credits: 1,
    requirementType: "Support",
  },
  {
    id: "phscs121",
    number: "Phscs 121",
    name: "Introduction to Newtonian Mechanics",
    description:
      "Kinematics, Newton's laws, energy, and momentum. Develops quantitative problem-solving skills.",
    prerequisites: ["Math 112 (concurrent ok)"],
    credits: 3,
    requirementType: "Support",
  },
  {
    id: "wrtg316",
    number: "Wrtg 316",
    name: "Technical Communication",
    description:
      "Writing for professional and technical contexts: reports, documentation, proposals, and presentations.",
    prerequisites: ["University Writing requirement"],
    credits: 3,
    requirementType: "Support",
  },
  {
    id: "stat121",
    number: "Stat 121",
    name: "Principles of Statistics",
    description:
      "Descriptive statistics, probability, distributions, hypothesis testing, and regression.",
    prerequisites: ["Math 110"],
    credits: 3,
    requirementType: "Support",
    note: "Choose one: Stat 121 / Math 313 / Stat 201",
  },
  {
    id: "math290",
    number: "Math 290",
    name: "Fundamentals of Mathematics",
    description:
      "Proof techniques, logic, sets, relations, and functions. A common choice for students who want proof experience.",
    prerequisites: ["Math 112"],
    credits: 3,
    requirementType: "Support",
    note: "Choose one: Math 290 / Math 113 / Stat 330",
  },
  {
    id: "cs329",
    number: "CS 329",
    name: "QA & DevOps",
    description:
      "Test-driven development, automated testing, CI/CD pipelines, and software quality assurance.",
    prerequisites: ["CS 240"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs330",
    number: "CS 330",
    name: "Concepts of Programming Languages",
    description:
      "Syntax, semantics, and paradigms. Compares functional, logic, and object-oriented languages.",
    prerequisites: ["CS 236", "CS 252"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs345",
    number: "CS 345",
    name: "Operating Systems Design",
    description:
      "Process management, scheduling, memory management, file systems, and concurrency with kernel-level projects.",
    prerequisites: ["CS 324", "CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs355",
    number: "CS 355",
    name: "Graphics and Image Processing",
    description:
      "2D/3D rendering fundamentals, rasterization, image filtering, and visual computing algorithms.",
    prerequisites: ["CS 312", "Math 213"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs356",
    number: "CS 356",
    name: "Advanced Techniques in HCI",
    description:
      "Advanced human-computer interaction: input technologies, evaluation methods, and interface research.",
    prerequisites: ["CS 256 or CS 260"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs393",
    number: "CS 393",
    name: "Collaborative Problem Solving",
    description:
      "Competitive-style algorithmic problems requiring advanced design strategies.",
    prerequisites: ["CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs412",
    number: "CS 412",
    name: "Linear Programming / Convex Optimization",
    description:
      "Linear programming, the simplex method, duality, and convex optimization with applications in CS.",
    prerequisites: ["Math 213", "CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs428",
    number: "CS 428",
    name: "Software Engineering",
    description:
      "Agile and traditional SE processes, requirements engineering, architecture, project management, and team dynamics.",
    prerequisites: ["CS 340"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs431",
    number: "CS 431",
    name: "Algorithmic Languages & Compilers",
    description:
      "Lexing, parsing, semantic analysis, intermediate representation, and code generation. Students build a working compiler.",
    prerequisites: ["CS 330", "CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs450",
    number: "CS 450",
    name: "Computer Vision",
    description:
      "Image formation, feature detection, segmentation, object recognition, and deep learning-based vision systems.",
    prerequisites: ["CS 312", "Math 213"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs452",
    number: "CS 452",
    name: "Database Modeling Concepts",
    description:
      "Relational model, SQL, ER diagrams, normalization, transactions, and an introduction to NoSQL systems.",
    prerequisites: ["CS 235"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs453",
    number: "CS 453",
    name: "Fundamentals of Information Retrieval",
    description:
      "Search engine internals: indexing, ranking algorithms, relevance feedback, and IR system evaluation.",
    prerequisites: ["CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs455",
    number: "CS 455",
    name: "Computer Graphics",
    description:
      "3D rendering pipeline, ray tracing, shading models, and GPU programming with OpenGL/WebGL.",
    prerequisites: ["CS 312", "Math 213"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs456",
    number: "CS 456",
    name: "Mobile and Ubiquitous HCI",
    description:
      "Design and development of mobile and context-aware applications. Covers usability and ubicomp concepts.",
    prerequisites: ["CS 256 or CS 260"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs460",
    number: "CS 460",
    name: "Computer Communications & Networking",
    description:
      "Layered network architecture, TCP/IP, routing protocols, congestion control, and application-layer services.",
    prerequisites: ["CS 324"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs462",
    number: "CS 462",
    name: "Distributed System Design",
    description:
      "Principles of distributed systems: consistency, fault tolerance, replication, and cloud architectures.",
    prerequisites: ["CS 324", "CS 460"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs465",
    number: "CS 465",
    name: "Computer Security",
    description:
      "Cryptography, network security, authentication, access control, and common attack and defense techniques.",
    prerequisites: ["CS 324"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs466",
    number: "CS 466",
    name: "Blockchain Technologies",
    description:
      "Fundamentals of blockchain, consensus protocols, smart contracts, and decentralized applications.",
    prerequisites: ["CS 465"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs470",
    number: "CS 470",
    name: "Introduction to Artificial Intelligence",
    description:
      "Search, constraint satisfaction, knowledge representation, probabilistic reasoning, and ML fundamentals.",
    prerequisites: ["CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs471",
    number: "CS 471",
    name: "Voice Interfaces",
    description:
      "Design and development of voice-based interfaces, speech recognition pipelines, and conversational agents.",
    prerequisites: ["CS 470"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs473",
    number: "CS 473",
    name: "Advanced Machine Learning",
    description:
      "Advanced supervised and unsupervised learning, ensemble methods, model selection, and feature engineering.",
    prerequisites: ["CS 312", "Stat 121 or Math 313"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs474",
    number: "CS 474",
    name: "Deep Learning",
    description:
      "Neural networks, CNNs, RNNs, transformers, and modern deep learning frameworks such as PyTorch.",
    prerequisites: ["CS 473"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs479",
    number: "CS 479",
    name: "Introduction to Machine Translation",
    description:
      "Statistical and neural machine translation, sequence-to-sequence models, and evaluation methods.",
    prerequisites: ["CS 473 or CS 474"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs486",
    number: "CS 486",
    name: "Verification and Validation",
    description:
      "Formal verification methods, model checking, and rigorous software testing and validation techniques.",
    prerequisites: ["CS 252", "CS 340"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs513",
    number: "CS 513",
    name: "Robust Control",
    description:
      "Control theory applied to computing systems: stability, robustness, and feedback-based design.",
    prerequisites: ["Math 213", "CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs575",
    number: "CS 575",
    name: "Introduction to Network Science",
    description:
      "Graph-theoretic models of real-world networks, centrality metrics, community detection, and spreading processes.",
    prerequisites: ["CS 312"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs580",
    number: "CS 580",
    name: "Theory of Predictive Modeling",
    description:
      "Mathematical foundations of statistical learning, PAC learning, VC dimension, and generalization theory.",
    prerequisites: ["CS 312", "Math 313 or Stat 121"],
    credits: 3,
    requirementType: "Elective",
  },
  {
    id: "cs494",
    number: "CS 494",
    name: "Capstone 1",
    description:
      "First semester of the two-semester capstone. Teams define scope, design architecture, and begin building a sponsor project.",
    prerequisites: ["CS 340", "Senior standing"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs495",
    number: "CS 495",
    name: "Capstone 2",
    description:
      "Completion of the capstone project. Emphasis on delivery, testing, and professional presentation.",
    prerequisites: ["CS 494"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs480",
    number: "CS 480",
    name: "Software Engineering Capstone 1",
    description:
      "First semester of the SE-focused capstone. Emphasizes requirements engineering and Agile delivery.",
    prerequisites: ["CS 428", "Senior standing"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs481",
    number: "CS 481",
    name: "Software Engineering Capstone 2",
    description:
      "Continuation of CS 480. Final delivery, retrospective, and handoff of the software product.",
    prerequisites: ["CS 480"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs482",
    number: "CS 482",
    name: "Data Science Capstone 1",
    description:
      "First semester of the data-science-focused capstone. Students tackle a real-world data problem from inception to pipeline.",
    prerequisites: ["CS 473", "Senior standing"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs483",
    number: "CS 483",
    name: "Data Science Capstone 2",
    description:
      "Completion of the data science capstone: model deployment, evaluation, and stakeholder presentation.",
    prerequisites: ["CS 482"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs497",
    number: "CS 497R",
    name: "Undergraduate Research",
    description:
      "Independent research with a faculty mentor resulting in a report or conference submission. Up to 6 credit hours.",
    prerequisites: ["Instructor approval"],
    credits: 3,
    requirementType: "Capstone",
  },
  {
    id: "cs493",
    number: "CS 493R",
    name: "Computing Competitions",
    description:
      "Preparation and participation in ACM ICPC and other competitive programming contests.",
    prerequisites: ["CS 312"],
    credits: 3,
    requirementType: "Capstone",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "classes", label: "Classes" },
  { id: "roadmap", label: "Roadmap" },
  { id: "support", label: "Support" },
];

const GROUPS = ["All", "Core", "Support", "Elective", "Capstone"];
const FOCUS_AREAS = ["All", "Software", "Systems", "AI/Data", "Theory", "UX/Graphics"];

const FOCUS_MAP = {
  Software: new Set(["cs240", "cs260", "cs329", "cs428", "cs452", "cs480", "cs481", "cs494", "cs495"]),
  Systems: new Set(["cs224", "cs324", "cs345", "cs460", "cs462", "cs465", "cs466"]),
  "AI/Data": new Set(["math213", "math214", "stat121", "cs450", "cs470", "cs473", "cs474", "cs479", "cs580", "cs482", "cs483"]),
  Theory: new Set(["cs236", "cs252", "cs312", "cs330", "cs393", "cs412", "cs431", "cs575"]),
  "UX/Graphics": new Set(["cs260", "cs355", "cs356", "cs455", "cs456", "cs471"]),
};

const PATHWAYS = [
  {
    id: "software",
    title: "Software Builder",
    summary: "Best if you want product work, full-stack projects, and team-based development.",
    classes: ["CS 260", "CS 329", "CS 428", "CS 452", "CS 480/481"],
  },
  {
    id: "systems",
    title: "Systems & Security",
    summary: "Best if you like low-level programming, networking, operating systems, and infrastructure.",
    classes: ["CS 324", "CS 345", "CS 460", "CS 462", "CS 465"],
  },
  {
    id: "data",
    title: "AI & Data",
    summary: "Best if you want machine learning, computer vision, or predictive modeling.",
    classes: ["Math 213", "Stat 121", "CS 470", "CS 473", "CS 474", "CS 482/483"],
  },
  {
    id: "creative",
    title: "UX & Visual Computing",
    summary: "Best if you want interaction design, graphics, mobile experiences, or visual systems.",
    classes: ["CS 260", "CS 355", "CS 356", "CS 455", "CS 456"],
  },
];

const ROADMAP_BUILDS = {
  software: {
    title: "Software Builder",
    intro: "Web, product, software engineering",
    semesters: [
      ["CS 111", "Math 112", "Wrtg 316"],
      ["CS 224", "CS 235", "Phscs 121"],
      ["CS 236", "CS 240", "CS 260"],
      ["CS 252", "CS 312", "Math 213"],
      ["CS 324", "CS 340", "CS 329"],
      ["CS 428", "CS 452", "Math 290 or Stat 121"],
      ["CS 480", "CS elective"],
      ["CS 481", "CS 404"],
    ],
  },
  systems: {
    title: "Systems & Security",
    intro: "Infrastructure, low-level, networking, security",
    semesters: [
      ["CS 111", "Math 112", "Wrtg 316"],
      ["CS 224", "CS 235", "Phscs 121"],
      ["CS 236", "CS 240", "CS 252"],
      ["CS 312", "CS 324", "Math 213"],
      ["CS 340", "CS 345", "CS 460"],
      ["CS 462", "CS 465", "Stat 121 or Math 290"],
      ["CS 494", "Advanced systems elective"],
      ["CS 495", "CS 404"],
    ],
  },
  data: {
    title: "AI & Data",
    intro: "Machine learning, vision, modeling",
    semesters: [
      ["CS 111", "Math 112", "Wrtg 316"],
      ["CS 224", "CS 235", "Math 213"],
      ["CS 236", "CS 240", "CS 252"],
      ["CS 312", "CS 260", "Stat 121"],
      ["CS 340", "CS 470", "Math 214"],
      ["CS 473", "CS 450", "Math 290 or support elective"],
      ["CS 482", "CS 474"],
      ["CS 483", "CS 404"],
    ],
  },
  creative: {
    title: "UX & Visual Computing",
    intro: "Interaction, mobile, graphics",
    semesters: [
      ["CS 111", "Math 112", "Wrtg 316"],
      ["CS 224", "CS 235", "Phscs 121"],
      ["CS 236", "CS 240", "CS 260"],
      ["CS 252", "CS 312", "Math 213"],
      ["CS 340", "CS 356", "CS 355"],
      ["CS 455", "CS 456", "Stat 121 or Math 290"],
      ["CS 494", "creative elective"],
      ["CS 495", "CS 404"],
    ],
  },
};

const SUPPORT_ACTIONS = [
  {
    title: "Need class planning help?",
    text: "Use the roadmap page first, then compare options in Classes so you know what opens next.",
  },
  {
    title: "Not sure which electives fit you?",
    text: "Use a focus filter like Software, Systems, or AI/Data to cut the list down fast.",
  },
  {
    title: "Getting ready for registration?",
    text: "Build a first-choice schedule and one backup schedule so prereq or seat issues do not stall you.",
  },
];

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "");
  return NAV_ITEMS.some((item) => item.id === hash) ? hash : "home";
}

function getFocusTags(course) {
  if (course.requirementType === "Support") {
    if (course.id === "stat121" || course.id === "math213" || course.id === "math214") {
      return ["AI/Data"];
    }
    if (course.id === "math290") {
      return ["Theory"];
    }
    return ["Software"];
  }

  return FOCUS_AREAS.filter(
    (focus) => focus !== "All" && FOCUS_MAP[focus]?.has(course.id),
  );
}

function getStage(course) {
  const numericPart = Number.parseInt(course.number.replace(/\D/g, ""), 10);

  if (course.requirementType === "Support") return "Support";
  if (course.requirementType === "Capstone") return "Finish";
  if (numericPart < 200) return "Start";
  if (numericPart < 300) return "Build";
  if (numericPart < 400) return "Choose";
  return "Advance";
}

function navigateTo(page) {
  window.location.hash = page;
}

function matchesFocus(course, focus) {
  if (focus === "All") return true;
  return getFocusTags(course).includes(focus);
}

function extractCourseCodes(text) {
  return text.match(/[A-Za-z]+\s?\d+[A-Za-z]?/g) ?? [];
}

function meetsPrerequisite(prerequisite, completedCourseNumbers) {
  if (prerequisite === "None") return true;
  if (prerequisite.includes("Senior standing")) return false;
  if (prerequisite.includes("Instructor approval")) return false;

  const options = prerequisite.split(" or ").map((option) => option.trim());
  const courseOptions = options
    .flatMap((option) => extractCourseCodes(option))
    .map((code) => code.replace(/\s+/g, " ").trim());

  if (!courseOptions.length) return false;

  return courseOptions.some((code) => completedCourseNumbers.has(code));
}

function isCourseUnlocked(course, completedCourseNumbers) {
  if (completedCourseNumbers.has(course.number)) return false;
  return course.prerequisites.every((prerequisite) =>
    meetsPrerequisite(prerequisite, completedCourseNumbers),
  );
}

function getRecommendationReason(course, activeFocus) {
  if (course.requirementType === "Core") return "Keeps major progress moving";
  if (course.requirementType === "Support") return "Unlocks later course options";
  if (activeFocus !== "All" && getFocusTags(course).includes(activeFocus)) {
    return `Matches ${activeFocus}`;
  }
  if (course.requirementType === "Capstone") return "Best when you are near the finish";
  return "Strong next elective option";
}

function scoreCourse(course, activeFocus) {
  let score = 0;

  if (course.requirementType === "Core") score += 5;
  if (course.requirementType === "Support") score += 3;
  if (course.requirementType === "Elective") score += 2;
  if (activeFocus !== "All" && getFocusTags(course).includes(activeFocus)) score += 4;
  if (course.credits <= 3) score += 1;

  return score;
}

function getRecommendedRoadmap(key) {
  return ROADMAP_BUILDS[key] ?? ROADMAP_BUILDS.software;
}

function getCourseTradeoffs(course) {
  const pros = [];
  const cons = [];
  const focusTags = getFocusTags(course);

  if (course.requirementType === "Core") {
    pros.push("Moves you forward in the major");
  }

  if (course.requirementType === "Elective") {
    pros.push(`Strong fit for ${focusTags[0] ?? "a focused path"}`);
    cons.push("Less urgent than core classes");
  }

  if (course.requirementType === "Capstone") {
    pros.push("Great for portfolio and resume value");
    cons.push("Best later in the major");
  }

  if (course.requirementType === "Support") {
    pros.push("Unlocks later CS options");
    cons.push("Less hands-on CS content");
  }

  if (course.credits >= 4) {
    cons.push("Heavier credit load");
  } else {
    pros.push("More manageable credit load");
  }

  if (course.prerequisites.includes("None")) {
    pros.push("Easy to enter right away");
  } else if (course.prerequisites.length >= 2) {
    cons.push("More prerequisite planning");
  }

  return {
    pros: pros.slice(0, 3),
    cons: cons.slice(0, 3),
  };
}

function CourseCard({ course, isCompared, onToggleCompare }) {
  const [expanded, setExpanded] = useState(false);
  const focusTags = getFocusTags(course);
  const detailsId = `${course.id}-details`;

  return (
    <article className="course-card">
      <button
        className="course-card__button"
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-controls={detailsId}
      >
        <div>
          <p className="course-card__eyebrow">{course.requirementType}</p>
          <h3>{course.number}</h3>
          <p className="course-card__title">{course.name}</p>
        </div>
        <span className="course-card__credits">
          {course.credits} cr
          <span className="course-card__toggle">{expanded ? "Hide" : "Details"}</span>
        </span>
      </button>

      <div className="course-card__meta">
        <span className="pill pill--soft">{getStage(course)}</span>
        {focusTags.slice(0, 2).map((tag) => (
          <span key={tag} className="pill pill--outline">
            {tag}
          </span>
        ))}
      </div>

      <div className="course-card__actions">
        <button
          type="button"
          className={`compare-button ${isCompared ? "is-selected" : ""}`}
          onClick={() => onToggleCompare(course.id)}
          aria-pressed={isCompared}
        >
          {isCompared ? "Added to compare" : "Compare"}
        </button>
      </div>

      {expanded && (
        <div className="course-card__details" id={detailsId}>
          <p>{course.description}</p>
          <p>
            <strong>Prereqs:</strong> {course.prerequisites.join(", ")}
          </p>
          {course.note ? <p className="course-card__note">{course.note}</p> : null}
        </div>
      )}
    </article>
  );
}

function CompareHub({ comparedCourses, onRemoveCourse, onClearCourses }) {
  if (!comparedCourses.length) {
    return (
      <section className="compare-hub compare-hub--empty">
        <div>
          <p className="eyebrow">Compare hub</p>
          <h2>Pick up to 3 classes to compare.</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="compare-hub">
      <div className="compare-hub__header">
        <div>
          <p className="eyebrow">Compare hub</p>
          <h2>Side-by-side tradeoffs</h2>
        </div>
        <button type="button" className="text-button" onClick={onClearCourses}>
          Clear all
        </button>
      </div>

      <div className="compare-grid">
        {comparedCourses.map((course) => {
          const tradeoffs = getCourseTradeoffs(course);

          return (
            <article key={course.id} className="compare-card">
              <div className="compare-card__header">
                <div>
                  <p className="course-card__eyebrow">{course.requirementType}</p>
                  <h3>{course.number}</h3>
                  <p className="course-card__title">{course.name}</p>
                </div>
                <button
                  type="button"
                  className="compare-card__remove"
                  onClick={() => onRemoveCourse(course.id)}
                  aria-label={`Remove ${course.number} from comparison`}
                >
                  Remove
                </button>
              </div>

              <div className="compare-card__stats">
                <span className="pill pill--soft">{course.credits} cr</span>
                <span className="pill pill--outline">{getStage(course)}</span>
              </div>

              <div className="compare-card__section">
                <p className="compare-card__label">Pros</p>
                <ul>
                  {tradeoffs.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="compare-card__section">
                <p className="compare-card__label">Cons</p>
                <ul>
                  {tradeoffs.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function NextStepPlanner({
  completedCourseIds,
  onToggleCompleted,
  onClearCompleted,
  recommendedCourses,
  activeFocus,
}) {
  const completedNumbers = new Set(
    completedCourseIds
      .map((id) => CS_CLASSES.find((course) => course.id === id)?.number)
      .filter(Boolean),
  );

  const courseGroups = [
    {
      label: "Core",
      courses: CS_CLASSES.filter((course) => course.requirementType === "Core"),
    },
    {
      label: "Support",
      courses: CS_CLASSES.filter((course) => course.requirementType === "Support"),
    },
  ];

  return (
    <section className="planner-hub">
      <div className="planner-hub__header">
        <div>
          <p className="eyebrow">Next step planner</p>
          <h2>Mark what you’ve done. See what opens next.</h2>
        </div>
        <button type="button" className="text-button" onClick={onClearCompleted}>
          Clear completed
        </button>
      </div>

        <div className="planner-layout">
          <div className="planner-picks">
            {courseGroups.map((group) => (
              <div key={group.label} className="planner-group">
                <p className="filter-row__label">{group.label}</p>
                <div className="planner-chip-row">
                  {group.courses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      className={`chip ${completedCourseIds.includes(course.id) ? "is-selected" : ""}`}
                      onClick={() => onToggleCompleted(course.id)}
                      aria-pressed={completedCourseIds.includes(course.id)}
                    >
                      {course.number}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        <div className="planner-results">
          <div className="planner-results__header">
            <p className="filter-row__label">Recommended next</p>
            <span>{recommendedCourses.length} shown</span>
          </div>

          {recommendedCourses.length ? (
            <div className="planner-results__list">
              {recommendedCourses.map((course) => (
                <article key={course.id} className="planner-card">
                  <div>
                    <p className="course-card__eyebrow">{course.requirementType}</p>
                    <h3>{course.number}</h3>
                    <p className="course-card__title">{course.name}</p>
                  </div>
                  <div className="planner-card__meta">
                    <span className="pill pill--soft">{getRecommendationReason(course, activeFocus)}</span>
                    <span className="pill pill--outline">{course.credits} cr</span>
                  </div>
                  <p className="planner-card__prereq">
                    Prereqs met: {course.prerequisites.join(", ")}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state empty-state--small">
              <h2>No next classes yet</h2>
              <p>Mark a few completed courses to unlock recommendations.</p>
            </div>
          )}

          {completedNumbers.size ? (
            <p className="planner-results__hint">Showing courses unlocked by your completed list.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Shell({ activePage, onNavigate, children }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="topbar">
        <button
          className="topbar__brand"
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Go to home page"
        >
          <span className="topbar__mark">BYU</span>
          <div>
            <p>CS Guide</p>
          </div>
        </button>

        <nav className="topbar__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${activePage === item.id ? "is-active" : ""}`}
              onClick={() => onNavigate(item.id)}
              aria-current={activePage === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="page-wrap" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <section className="page page--home">
      <div className="hero-card">
        <div className="hero-card__copy">
          <p className="eyebrow">Final version</p>
          <h1>Choose classes with less guessing.</h1>
          <div className="hero-card__actions">
            <button type="button" className="button button--primary" onClick={() => onNavigate("classes")}>
              Explore classes
            </button>
            <button type="button" className="button button--secondary" onClick={() => onNavigate("roadmap")}>
              See the roadmap
            </button>
          </div>
        </div>

        <div className="hero-card__panel">
          <p className="hero-card__panel-label">Quick start</p>
          <div className="hero-stat">
            <strong>11</strong>
            <span>core courses to finish</span>
          </div>
          <div className="hero-stat">
            <strong>21</strong>
            <span>elective credits to shape your focus</span>
          </div>
          <div className="hero-stat">
            <strong>4</strong>
            <span>simple pages instead of one long scroll</span>
          </div>
        </div>
      </div>

      <div className="home-grid">
        <button type="button" className="feature-card" onClick={() => onNavigate("classes")}>
          <p className="feature-card__label">Classes</p>
          <h2>Filter by what fits you</h2>
          
          <span className="feature-card__action">Go to classes</span>
        </button>

        <button type="button" className="feature-card" onClick={() => onNavigate("roadmap")}>
          <p className="feature-card__label">Roadmap</p>
          <h2>See the flow clearly</h2>
          
          <span className="feature-card__action">Open roadmap</span>
        </button>

        <button type="button" className="feature-card" onClick={() => onNavigate("support")}>
          <p className="feature-card__label">Support</p>
          <h2>Get unstuck quickly</h2>
          
          <span className="feature-card__action">View support</span>
        </button>
      </div>
    </section>
  );
}

function ClassesPage() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All");
  const [focus, setFocus] = useState("All");
  const [comparedCourseIds, setComparedCourseIds] = useState([]);
  const [completedCourseIds, setCompletedCourseIds] = useState(["cs111", "cs235"]);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return CS_CLASSES.filter((course) => {
      const matchesQuery =
        !query ||
        course.number.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      const matchesGroup = group === "All" || course.requirementType === group;

      return matchesQuery && matchesGroup && matchesFocus(course, focus);
    });
  }, [focus, group, search]);

  const groupedCourses = useMemo(
    () =>
      GROUPS.filter((entry) => entry !== "All").map((entry) => ({
        label: entry,
        courses: filteredCourses.filter((course) => course.requirementType === entry),
      })),
    [filteredCourses],
  );

  const comparedCourses = useMemo(
    () => comparedCourseIds.map((id) => CS_CLASSES.find((course) => course.id === id)).filter(Boolean),
    [comparedCourseIds],
  );

  const recommendedCourses = useMemo(() => {
    const completedCourseNumbers = new Set(
      completedCourseIds
        .map((id) => CS_CLASSES.find((course) => course.id === id)?.number)
        .filter(Boolean),
    );

    return CS_CLASSES
      .filter((course) => isCourseUnlocked(course, completedCourseNumbers))
      .filter((course) => focus === "All" || matchesFocus(course, focus) || course.requirementType !== "Elective")
      .sort((left, right) => scoreCourse(right, focus) - scoreCourse(left, focus))
      .slice(0, 6);
  }, [completedCourseIds, focus]);

  const toggleCompareCourse = (courseId) => {
    setComparedCourseIds((current) => {
      if (current.includes(courseId)) {
        return current.filter((id) => id !== courseId);
      }

      return [...current.slice(-2), courseId];
    });
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Classes</p>
          <h1>Find the classes that fit your path.</h1>
          <p>
            Start broad, then narrow by requirement type or by the kind of work you want to do most.
          </p>
        </div>
        <div className="page-header__stat">
          <strong>{filteredCourses.length}</strong>
          <span>matching courses</span>
        </div>
      </div>

      <div className="finder-panel">
        <div className="finder-panel__header">
          <h2>Course finder</h2>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSearch("");
              setGroup("All");
              setFocus("All");
            }}
          >
            Clear filters
          </button>
        </div>
        <label className="search-field">
          <span>Search courses</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="CS260, CS240, CS465, CS474..."
          />
        </label>

        <div className="filter-row">
          <div>
            <p className="filter-row__label" id="requirement-filter-label">Requirement</p>
            <div className="chip-row" role="group" aria-labelledby="requirement-filter-label">
              {GROUPS.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  className={`chip ${group === entry ? "is-selected" : ""}`}
                  onClick={() => setGroup(entry)}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="filter-row__label" id="focus-filter-label">Focus</p>
            <div className="chip-row" role="group" aria-labelledby="focus-filter-label">
              {FOCUS_AREAS.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  className={`chip ${focus === entry ? "is-selected" : ""}`}
                  onClick={() => setFocus(entry)}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

   

      <NextStepPlanner
        completedCourseIds={completedCourseIds}
        onToggleCompleted={(courseId) =>
          setCompletedCourseIds((current) =>
            current.includes(courseId)
              ? current.filter((id) => id !== courseId)
              : [...current, courseId],
          )
        }
        onClearCompleted={() => setCompletedCourseIds([])}
        recommendedCourses={recommendedCourses}
        activeFocus={focus}
      />

      <CompareHub
        comparedCourses={comparedCourses}
        onRemoveCourse={(courseId) =>
          setComparedCourseIds((current) => current.filter((id) => id !== courseId))
        }
        onClearCourses={() => setComparedCourseIds([])}
      />

      <div className="course-sections">
        {groupedCourses.map(({ label, courses }) =>
          courses.length ? (
            <section key={label} className="course-group">
              <div className="course-group__header">
                <h2>{label}</h2>
                <span>{courses.length} shown</span>
              </div>
              <div className="course-grid">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isCompared={comparedCourseIds.includes(course.id)}
                    onToggleCompare={toggleCompareCourse}
                  />
                ))}
              </div>
            </section>
          ) : null,
        )}
      </div>

      {!filteredCourses.length ? (
        <div className="empty-state">
          <h2>No matches right now</h2>
          <p>Try clearing one filter or searching with a broader topic.</p>
        </div>
      ) : null}
    </section>
  );
}

function RoadmapPage({ onNavigate }) {
  const [selectedRoadmap, setSelectedRoadmap] = useState("software");
  const roadmap = getRecommendedRoadmap(selectedRoadmap);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Roadmap</p>
          <h1>Start. Build. Choose. Finish.</h1>
        </div>
      </div>

      <div className="timeline timeline--compact">
        <article className="timeline-card">
          <p className="timeline-card__step">01</p>
          <h2>Start</h2>
          <p className="timeline-card__courses">CS 111 • CS 224 • CS 235</p>
        </article>

        <article className="timeline-card">
          <p className="timeline-card__step">02</p>
          <h2>Build</h2>
          <p className="timeline-card__courses">CS 236 • CS 240 • CS 252 • CS 260 • CS 312 • CS 324 • CS 340</p>
        </article>

        <article className="timeline-card">
          <p className="timeline-card__step">03</p>
          <h2>Choose</h2>
          <p className="timeline-card__courses">Software • Systems • AI/Data • UX/Graphics</p>
        </article>

        <article className="timeline-card">
          <p className="timeline-card__step">04</p>
          <h2>Finish</h2>
          <p className="timeline-card__courses">CS 494/495 • CS 480/481 • CS 482/483 • CS 497R</p>
        </article>
      </div>

      <section className="roadmap-builder">
        <div className="roadmap-builder__header">
          <div>
            <p className="eyebrow">Build your roadmap</p>
            <h2>Pick a path.</h2>
          </div>
          <button type="button" className="button button--secondary" onClick={() => onNavigate("classes")}>
            Compare classes
          </button>
        </div>

        <div className="roadmap-builder__controls" role="group" aria-label="Roadmap options">
          {PATHWAYS.map((path) => (
            <button
              key={path.id}
              type="button"
              className={`roadmap-choice ${selectedRoadmap === path.id ? "is-selected" : ""}`}
              onClick={() => setSelectedRoadmap(path.id)}
            >
              <span className="roadmap-choice__title">{path.title}</span>
              <span className="roadmap-choice__summary">{path.summary}</span>
            </button>
          ))}
        </div>

        <div className="roadmap-plan">
          <div className="roadmap-plan__intro">
            <p className="roadmap-plan__eyebrow">{roadmap.title}</p>
            <h3>{roadmap.intro}</h3>
          </div>

          <div className="semester-grid">
            {roadmap.semesters.map((semester, index) => (
              <article key={`${selectedRoadmap}-${index + 1}`} className="semester-card">
                <p className="semester-card__label">Semester {index + 1}</p>
                <ul className="semester-card__list">
                  {semester.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pathway-grid">
        {PATHWAYS.map((path) => (
          <article key={path.id} className="pathway-card">
            <p className="pathway-card__label">{path.title}</p>
            <div className="tag-row">
              {path.classes.map((entry) => (
                <span key={entry} className="pill pill--soft">
                  {entry}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="cta-banner">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Use the filters to compare paths side by side.</h2>
        </div>
        <button type="button" className="button button--primary" onClick={() => onNavigate("classes")}>
          Open classes page
        </button>
      </div>
    </section>
  );
}

function SupportPage() {
  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Support</p>
          <h1>Only the support info students actually need.</h1>
          <p>
            This final version keeps this page short on purpose so the site stays focused on decision-making, not filler content.
          </p>
        </div>
      </div>

      <div className="support-grid">
        {SUPPORT_ACTIONS.map((action) => (
          <article key={action.title} className="support-card">
            <h2>{action.title}</h2>
            <p>{action.text}</p>
          </article>
        ))}
      </div>

      <div className="support-grid support-grid--secondary">
        <article className="support-card support-card--dark">
          <p className="support-card__label">Checklist</p>
          <h2>Before registration</h2>
          <p>Know your next core, one elective direction, and one backup option.</p>
        </article>

        <article className="support-card">
          <p className="support-card__label">Best use of this site</p>
          <h2>Home → Roadmap → Classes</h2>
          <p>That flow keeps the navigation concise and makes the class choices much easier to understand.</p>
        </article>
      </div>
    </section>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash());

    window.addEventListener("hashchange", handleHashChange);

    if (!window.location.hash) {
      navigateTo("home");
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    navigateTo(page);
  };

  return (
    <Shell activePage={activePage} onNavigate={handleNavigate}>
      {activePage === "home" ? <HomePage onNavigate={handleNavigate} /> : null}
      {activePage === "classes" ? <ClassesPage /> : null}
      {activePage === "roadmap" ? <RoadmapPage onNavigate={handleNavigate} /> : null}
      {activePage === "support" ? <SupportPage /> : null}
    </Shell>
  );
}
