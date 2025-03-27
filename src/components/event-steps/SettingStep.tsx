import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { FaImage } from "react-icons/fa";
import { FormData } from "../../types/event";

interface PrivacySettingsProps {
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface PrivacyOptionType {
  value: FormData["privacy"];
  label: string;
  description: string;
}

interface ImageUploaderProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

// Main Component
const SettingStep: React.FC<{
  formData: FormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData, handleInputChange, setFormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>

      <PrivacySettings
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <div>
        <label className="block text-gray-700 mb-2">Event Image</label>
        <ImageUploader
          image={formData.image}
          onImageChange={(file) =>
            setFormData((prev) => ({ ...prev, image: file }))
          }
        />
      </div>
    </div>
  );
};

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  formData,
  handleInputChange,
}) => {
  const privacyOptions: PrivacyOptionType[] = [
    {
      value: "public",
      label: "Public",
      description: "Event is visible to everyone and anyone can register",
    },
    {
      value: "private",
      label: "Private",
      description: "Event is visible only to invitees",
    },
    {
      value: "unlisted",
      label: "Unlisted",
      description: "Event is visible only to those with the link",
    },
  ];

  return (
    <div>
      <label className="block text-gray-700 mb-2">Event Privacy*</label>
      <div className="space-y-3">
        {privacyOptions.map((option) => (
          <PrivacyOption
            key={option.value}
            option={option}
            selected={formData.privacy === option.value}
            onChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  );
};

const PrivacyOption: React.FC<{
  option: PrivacyOptionType;
  selected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ option, selected, onChange }) => (
  <label
    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-colors ${
      selected
        ? "border-pink-500 bg-pink-50"
        : "border-gray-300 hover:border-gray-400"
    }`}
  >
    <input
      type="radio"
      name="privacy"
      value={option.value}
      checked={selected}
      onChange={onChange}
      className="hidden"
    />
    <div className="flex items-center">
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
          selected ? "border-pink-500" : "border-gray-400"
        }`}
      >
        {selected && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
      </div>
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-600">{option.description}</div>
      </div>
    </div>
  </label>
);

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  onImageChange,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 transition-colors ${
        dragActive ? "border-pink-500 bg-pink-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Event preview"
          className="max-h-48 rounded-lg mb-4 object-cover"
        />
      ) : (
        <>
          <FaImage className="text-4xl text-gray-400 mb-2" />
          <div className="text-sm text-gray-600 mb-3">
            Drag and drop image here or click to upload
          </div>
        </>
      )}

      <button
        type="button"
        className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
      >
        {image ? "Change Image" : "Upload Image"}
      </button>
    </div>
  );
};

export default SettingStep;
