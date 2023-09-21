"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  bold?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, bold }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-4 text-gray-700 hover:bg-neutral-100
    tracking-wide ${bold ? "font-bold" : ""}`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
