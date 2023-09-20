import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      alt="Avatar"
      src="/images/placeholder.png"
      height="30"
      width="30"
      className="rounded-full object-cover"
    />
  );
};

export default Avatar;
