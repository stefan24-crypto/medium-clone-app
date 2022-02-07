interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 w-full h-screen z-10 bg-black/50 cursor-pointer"
    ></div>
  );
};

export default Overlay;
