"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      const imageUrl = result.info.secure_url;
      onChange([...value, imageUrl]); // Thêm imageUrl vào mảng value và cập nhật onChange
    },
    [onChange, value]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="q2as2ovo"
      options={{ maxFiles: 5 }}
    >
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open();
        }
        return (
          <div>
            {value.length === 0 && (
              <div
                onClick={handleOnClick}
                className="flex flex-col justify-center items-center cursor-pointer
            hover:opacity-70 transition
            border-2 border-dashed p-5 border-neutral-300 
            mb-2
            "
              >
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {value &&
                value.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer hover:opacity-70 transition
        border-2 border-dashed p-20 border-neutral-300"
                  >
                    <Image
                      alt={`Upload ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      src={imageUrl}
                    />
                  </div>
                ))}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
