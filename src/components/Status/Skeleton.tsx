const Skeleton: React.FC<any> = () => {
  return (
    <div className="skeleton-card">
      <header className="row">
        <div className="skeleton-avatar"></div>

        <div className="skeleton-author"></div>
      </header>

      <main className="skeleton-image"></main>

      <footer className="skeleton-footer"></footer>
    </div>
  );
};

export default Skeleton;
