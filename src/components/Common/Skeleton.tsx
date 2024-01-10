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


const ImageSkeleton: React.FC<any> = () => {
  return (
    <div className="skeleton-image lazy-image"></div>
  );
};
export { Skeleton, ImageSkeleton } 
