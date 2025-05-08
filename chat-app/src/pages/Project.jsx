
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from 'react-router-dom';


axios.defaults.withCredentials = true

const styles = {
  // Layout
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: "#f9fafb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    height: "4rem",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  backButtonHover: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
  },
  backIcon: {
    height: "1rem",
    width: "1rem",
    marginRight: "0.5rem",
  },
  pageTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  navLink: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s",
  },
  navLinkHover: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
  },
  mainContent: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  redirectContainer: {
    textAlign: "center",
    padding: "3rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    maxWidth: "32rem",
    width: "100%",
  },
  redirectTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#111827",
  },
  redirectText: {
    marginBottom: "1.5rem",
    color: "#4b5563",
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.625rem 1.25rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  primaryButtonHover: {
    backgroundColor: "#4338ca",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  loadingSpinner: {
    height: "1.5rem",
    width: "1.5rem",
    margin: "0 auto",
    marginBottom: "1rem",
    animation: "spin 1s linear infinite",
  },
}

function Project() {
const { id } = useParams();
  const navigate = (path) => {
    window.location.href = path
  }
  const [hoveredElement, setHoveredElement] = useState(null)

  // Automatically redirect to requirements page when project is accessed
  useEffect(() => {
    // Optionally fetch project data here if needed
    const fetchProject = async () => {
      try {
        await axios.get(`/projects/${id}`)
        // After confirming the project exists, redirect to requirements
        navigate(`/project/${id}/requirements`)
      } catch (error) {
        console.error("Error fetching project:", error)
        alert("Project not found or you do not have access to it.")
        navigate("/dashboard")
      }
    }

    fetchProject()
  }, [id])

  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.type = "text/css"
    styleTag.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      if (document.head.contains(styleTag)) {
        document.head.removeChild(styleTag)
      }
    }
  }, [])

  // SVG Icons as React components for better integration
  const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={styles.backIcon} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

  const LoadingSpinner = () => (
    <svg style={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              style={
                hoveredElement === "back-btn" ? { ...styles.backButton, ...styles.backButtonHover } : styles.backButton
              }
              onClick={() => navigate("/dashboard")}
              onMouseEnter={() => setHoveredElement("back-btn")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <ArrowLeftIcon />
              Retour au tableau de bord
            </button>
            <h1 style={styles.pageTitle}>Chargement du projet...</h1>
          </div>
          <div style={styles.navLinks}>
            <button
              style={hoveredElement === "settings-btn" ? { ...styles.navLink, ...styles.navLinkHover } : styles.navLink}
              onMouseEnter={() => setHoveredElement("settings-btn")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Paramètres
            </button>
            <button
              style={hoveredElement === "logout-btn" ? { ...styles.navLink, ...styles.navLinkHover } : styles.navLink}
              onClick={async () => {
                try {
                  await axios.post("/logout")
                  window.location.href = "/signin"
                } catch (error) {
                  console.error("Logout failed:", error)
                }
              }}
              onMouseEnter={() => setHoveredElement("logout-btn")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.redirectContainer}>
          <LoadingSpinner />
          <h2 style={styles.redirectTitle}>Redirection en cours...</h2>
          <p style={styles.redirectText}>Vous allez être redirigé vers la page des exigences du projet.</p>
          <button
            style={
              hoveredElement === "requirements-btn"
                ? { ...styles.primaryButton, ...styles.primaryButtonHover }
                : styles.primaryButton
            }
            onClick={() => navigate(`/project/${id}/requirements`)}
            onMouseEnter={() => setHoveredElement("requirements-btn")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            Accéder aux exigences
          </button>
        </div>
      </div>
    </div>
  )
}

export default Project
