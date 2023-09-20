interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  large?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  large,
}) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <div
        className={`${
          large ? "text-3xl font-semibold" : "text-2xl font-semibold"
        }`}
      >
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-1">{subtitle}</div>
    </div>
  );
};

export default Heading;
