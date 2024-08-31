import React, {
  ChangeEvent,
  Children,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import UploadLayout from '../layouts/UploadLayout';
import { useMutation } from '@apollo/client';
import UploadError from '../components/UploadError';
import { FiUploadCloud } from 'react-icons/fi';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { GiBoxCutter } from 'react-icons/gi';

function Upload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileDisplay(URL.createObjectURL(e.target.files[0]));
      setFileData(e.target.files[0]);
    }
  };

  const [show, setShow] = useState(false);
  const [fileData, setFileData] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  // const [createPost, { loading }] = useMutation();

  const handleCreatePost = async () => {
    try {
      setIsUploading(true);
      // await createPost()
      setIsUploading(false);
      setShow(true);
      clearVideo();
    } catch (error) {}
  };

  const [errorType, setErrorType] = useState<string | null>(null);
  const [fileDisplay, setFileDisplay] = useState<string | undefined>(undefined);

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    setErrorType(null);
    setFile(e.dataTransfer.files[0]);

    const extension = e.dataTransfer.files[0].name.split('.').pop();
    if (extension !== 'mp4') {
      setErrorType('file');
      return;
    }

    setFileDisplay(URL.createObjectURL(e.dataTransfer.files[0]));
  };

  const clearVideo = () => {
    setFile(null);
    setFileDisplay(undefined);
  };

  const discard = () => {
    setFile(null);
    setFileDisplay(undefined);
    setCaption('');
  };

  useEffect(() => {
    if (caption.length >= 150) {
      setErrorType('Caption');
      return;
    }

    setErrorType(null);
  }, [errorType, caption]);

  return (
    <>
      <UploadError errorType={errorType} />
      <UploadLayout>
        <div
          className="w-full mt-[80px] mb-[40px] bg-white shadow-lg 
      rounded-md py-6 md:px-10 px-4"
        >
          <div>
            <div className="text-[23px] font-semibold">Upload video</div>
            <div className="text-gray-400 mt-1">
              Post a video to your account
            </div>
          </div>
          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onDrop(e);
                }}
                htmlFor="fileInput"
                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center
              justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2
              border-dashed border-gray-300 rounded-lg
              hover:bg-gray-100 cursor-pointer 
              "
              >
                <FiUploadCloud size="50" color="#b3b3b1" />
                <div className="mt-4 text-[17px]">Select a video to upload</div>
                <div className="mt-1.5 text-gray-500 text-[13px]">
                  Or drag and drop file
                </div>
                <div className="mt-12 text-gray-400 text-sm">MP4</div>
                <div className="mt-2 text-gray-400 text-[13px]">
                  Up to 30 minutes
                </div>
                <div className="mt-2 text-gray-400 text-[13px]">
                  Less than 2GB
                </div>
                <div className="px-2 py-1.5 mt-8 text-white text-[15px] w-80% bg-[#F02C56] rounded-sm">
                  Select file
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".mp4"
                  onChange={(e) => handleFileChange(e)}
                />
              </label>
            ) : (
              <>
                <div
                  className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex
            items-center justify-center w-full max-w-[260px]
            h-[540px] p-3 rounded-2xl cursor-pointer relative 
            "
                >
                  <div className="bg-black h-full w-full" />
                  <img
                    className="absolute z-20 pointer-events-none"
                    src="src/assets/images/mobile-case.png"
                  />
                  <img
                    className="absolute right-4 bottom-6 z-20"
                    width="90"
                    src="src/assets/images/tiktok-logo-white.png"
                  />
                  <video
                    autoPlay
                    loop
                    muted
                    className="absolute rounded-xl object-cover z-10 
                  p-[13px] w-full h-full"
                    src={fileDisplay}
                  />
                  <div
                    className="absolute -bottom-12 flex items-center justify-between border-gray-300
                 w-full p-2 border rounded-xl z-50"
                  >
                    <div className="flex items-baseline truncate">
                      <IoCheckmarkDoneCircleOutline
                        size="16"
                        className="min-w-[16px]"
                      />
                      <div className="text-[11px] pl-1 truncate text-ellipsis">
                        {fileData?.name}
                      </div>
                    </div>
                    <button
                      onClick={clearVideo}
                      className="text-[11px] ml-4 font-semibold"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="mt-4 mb-6">
                  <div className="flex bg-[#F8F8F8] py-4 px-6">
                    <GiBoxCutter className="mr-4" size="20" />
                    <div>
                      <div className="font-semibold text-[15px] mb-1.5">
                        Devide videos and edit
                      </div>
                      <div className="font-semibold text-[13px] text-gray-400">
                        You can quickly divide videos into multiple clips and
                        edit them
                      </div>
                    </div>
                    <div
                      className="flex justify-end max-w-[130px]
                   w-full h-full text-center my-auto"
                    >
                      <button
                        className="px-8 py-1.5 text-white 
                    text-[15px] bg-[#F02C56] rounded-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="mb-1 text-[15px]">Caption</div>
                    <div className="text-gray-400 text-[12px]">
                      {caption.length}
                    </div>
                  </div>
                  <input
                    onChange={(e) => setCaption(e.target.value)}
                    maxLength={150}
                    className="w-full border p-2.5 rounded-md 
                  focus: outline-none"
                  />

                  <div className="flex gap-3">
                    <button
                      className="px-10 py-2.5 mt-8 border text-[16px]
                   hover:bg-gray-100 rounded-sm"
                      onClick={discard}
                    >
                      Discard
                    </button>
                    <button
                      className="px-10 py-2.5 mt-8 border text-[16px]
                   text-white bg-[#F02C56] rounded-sm"
                      onClick={discard}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </UploadLayout>
      ;
    </>
  );
}

export default Upload;
