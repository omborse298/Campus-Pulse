function CategoryCard({ item }) {
  if (!item) return null;

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center transition-card">
      {/* Icon centered above text */}
      <div className={`mb-3 text-${item.color || 'primary'}`} style={{ fontSize: "2.5rem" }}>
        {item.icon}
      </div>
      
      {/* Title */}
      <h5 className="fw-bold text-dark mt-2">{item.title}</h5>
    </div>
  );
}

export default CategoryCard;