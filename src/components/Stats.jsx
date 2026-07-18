import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Stats() {
  const db = getFirestore();

  const [stats, setStats] = useState({
    students: 0,
    stories: 0,
    approved: 0,
    faculty: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const users = await getDocs(collection(db, "users"));
    const stories = await getDocs(collection(db, "stories"));

    let studentCount = 0;
    let facultyCount = 0;
    let approvedCount = 0;

    users.forEach((doc) => {
      const user = doc.data();

      if (user.role === "student") studentCount++;

      if (user.role === "faculty") facultyCount++;
    });

    stories.forEach((doc) => {
      const story = doc.data();

      if (story.status === "approved") approvedCount++;
    });

    setStats({
      students: studentCount,
      faculty: facultyCount,
      stories: stories.size,
      approved: approvedCount,
    });
  };

  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            CampusPulse in Numbers
          </h2>

          <p className="text-muted">
            Live statistics from our platform
          </p>

        </div>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 text-center h-100">
              <div className="card-body">
                <h1 className="text-primary">
                  {stats.students}
                </h1>
                <p className="mb-0">Students</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 text-center h-100">
              <div className="card-body">
                <h1 className="text-success">
                  {stats.stories}
                </h1>
                <p className="mb-0">Stories</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 text-center h-100">
              <div className="card-body">
                <h1 className="text-warning">
                  {stats.approved}
                </h1>
                <p className="mb-0">Approved</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 text-center h-100">
              <div className="card-body">
                <h1 className="text-danger">
                  {stats.faculty}
                </h1>
                <p className="mb-0">Faculty</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Stats;