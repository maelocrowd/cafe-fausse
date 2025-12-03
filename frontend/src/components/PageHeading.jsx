/**
 * PageHeading.jsx
 *
 * Component for displaying a page heading with an eyebrow, title, and description.
 * - Displays an optional eyebrow text, a main title, and an optional description.
 * - Can also include optional child components for additional content.
 *
 * Usage: <PageHeading eyebrow="Page Title" title="Main Title" description="Page description" />
 */
const PageHeading = ({ eyebrow, title, description, children }) => {
  return (
    <header className="page-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h1>{title}</h1>}
      {description && <p className="lead">{description}</p>}
      {children}
    </header>
  )
}

export default PageHeading

