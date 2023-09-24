"use client";

import { sr } from "date-fns/locale";
import Image from "next/image";
import Modal2 from "./Modal2";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal2 isOpen={isOpen} onClose={onClose} large>
      <div className="h-80 w-80">
        <Image alt="Image" className="object-cover" fill src={src} />
      </div>
    </Modal2>
  );
};

export default ImageModal;
