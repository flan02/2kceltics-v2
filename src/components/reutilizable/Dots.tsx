
type DotsProps = {
  className?: string;
};

const Dots = ({ className }: DotsProps) => {
  return (
    <div className={`${className} flex items-end`}>
      {/* Fading dots... */}
      <div className="flex space-x-1">
        <span className="size-4 bg-gray-500 rounded-full animate-dotsFade"></span>
        <span className="size-4 bg-gray-500 rounded-full animate-dotsFade delay-[0.2s]"></span>
        <span className="size-4 bg-gray-500 rounded-full animate-dotsFade delay-[0.4s]"></span>
      </div>
    </div>
  );
};

export default Dots;
