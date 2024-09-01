import { useMutation } from '@apollo/client';
import 'cropperjs/dist/cropper.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { UpdatedUserProfileDocument } from '../gql/generated';
import { useGeneralStore } from '../store/generalStore';
import { useUserStore } from '../store/userStore';
import Input from './Input';

const EditProfileModal = () => {
  const [updateUserProfile, { data, loading, error }] = useMutation(
    UpdatedUserProfileDocument,
  );

  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);

  const isEditProfileModalOpen = useGeneralStore(
    (state) => state.isEditProfileModalOpen,
  );
  const user = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);
  const setEditProfileModalOpen = useGeneralStore(
    (state) => state.setIsEditProfileOpen,
  );

  const [username, setUsername] = useState<string>(user.name ?? '');
  const [bio, setBio] = useState<string>(user.bio ?? '');
  const [croppingDone, setCroppingDone] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (username.length > 0 || bio.length > 0) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [username, bio]);

  const saveCroppedImage = () => {
    const cropper = cropperRef?.current?.cropper;
    setCroppingDone(true);
    if (cropper) {
      const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
      setUploadedImage(croppedImageUrl);
      setCroppedImage(croppedImageUrl);
    }
  };

  const getUploadedImage = (e: ChangeEvent<HTMLInputElement>) => {
    setCroppedImage(undefined);
    if (e.target.files) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const updateProfile = async () => {
    const croppedInstance = cropperRef?.current?.cropper;
    const input: { name: string; bio: string; image: File | null } = {
      name: username,
      bio,
      image: null,
    };

    if (croppedInstance) {
      croppedInstance.getCroppedCanvas().toBlob(async (blob) => {
        if (blob) {
          input.image = new File([blob], 'profile.jpg', { type: 'image/jpg' });
        }

        return await updateUserProfile({
          variables: {
            ...input,
          },
        })
          .then((res) => {
            setUser({
              id: Number(res.data?.updatedUserProfile.id),
              name: username,
              bio,
              image: res.data?.updatedUserProfile.image
                ? res.data?.updatedUserProfile.image
                : 'https://picsum.photos/id/83/300/320',
            });
            setEditProfileModalOpen();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  const cropAndUpdateImage = async () => {
    setCroppingDone(false);
    await updateProfile();
  };

  return (
    <div
      id="EditProfileModal"
      className="fixed flex justify-center pt-14 md:pt-[105px] 
    z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
    >
      <div
        className={[
          'max-w-[700px] sm:h-[580px] h-[655px] mx-3 p-4 rounded-lg mb-10 relative bg-white w-full',
          !uploadedImage ? 'h-[655px]' : 'h-[580px]',
        ].join(' ')}
      >
        <div
          className="justify-between w-full p-5 left-0 border-b
       border-b-gray-300 absolute flex items-center"
        >
          <div className="text-[22px] font-medium">Edit Profile</div>
          <button onClick={() => setEditProfileModalOpen()}>
            <AiOutlineClose size="25" />
          </button>
        </div>
        <div
          className={['h-[300px]', !uploadedImage ? 'mt-16' : 'mt-[58px]'].join(
            ' ',
          )}
        >
          <div
            id="ProfilePhotoSection"
            className="flex flex-col border-b sm:h-[145px] 
          h-[160px] px-1.5 sm:py-7 py-4 w-full"
          >
            <div
              className="font-semibold text-[15px] sm:mb-0 mb-1
           text-gray-700 sm:w-[160px] sm:text-left text-center"
            >
              Profile Photo
            </div>
            <div className="flex items-center justify-center sm:-mt-6">
              <label htmlFor="image" className="relative cursor-pointer">
                <img
                  className="rounded-full img-preview object-cover w-20 "
                  src={
                    croppedImage
                      ? croppedImage
                      : user.image || 'https://picsum.photos/id/83/300/320'
                  }
                />
                <div
                  className="absolute bottom-0 right-0 rounded-full 
                 bg-white shadow-xl border border-gray-300 p-1
                  inline-block w-[32px] h-[32px]
                "
                >
                  <BsFillPencilFill size="16" className="m-auto" />
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                id="image"
                onChange={getUploadedImage}
                accept="image/*"
              />
            </div>
          </div>
          <div
            className="flex flex-col border-b sm:h-[118px]
           px-1.5 py-2 mt-1.5 w-full"
          >
            <div
              className="font-semibold text-[15px] sm:mb-0 mb-1
             text-gray-700 sm:w-[160px] sm:text-left text-center"
            >
              Username
            </div>
            <div className="flex items-center justify-center sm:-mt-6">
              <div className="sm:w-[60%] w-full max-w-md">
                <Input
                  value={username}
                  autoFocus
                  placeHolder="Username"
                  inputType="text"
                  max={30}
                  onChange={(e) => setUsername(e.target.value)}
                  error=""
                />
                <div className="text-[11px] text-gray-500 mt-4">
                  Username can only contain letters, numbers, underscores.
                  Changing your username will also change your profile link
                </div>
              </div>
            </div>
          </div>
          <div
            id="BioSection"
            className="flex flex-col sm:h-[120px] px-1.5 py-2 mt-2 w-full"
          >
            <div
              className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700
             sm:w-[100px] sm:text-left text-center
            "
            >
              Bio
            </div>
            <div className="flex items-center justify-center sm:-mt-6">
              <div className="sm:w-[60%] w-full max-w-md">
                <textarea
                  className="resize-none w-full bg-[#F1F1F2] text-gray-800 border
                   border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                  cols={30}
                  rows={4}
                  maxLength={80}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                {bio && (
                  <div className="text-[11px] text-gray-500">
                    {bio.length}/80
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {uploadedImage && !croppedImage && (
          <div className="w-full h-[430px] absolute top-20 left-0">
            <Cropper
              style={{ height: '100%', width: '100%' }}
              src={uploadedImage}
              guides={false}
              initialAspectRatio={1}
              aspectRatio={1}
              viewMode={1}
              ref={cropperRef}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={true}
              responsive={true}
              preview=".img-preview"
            />
          </div>
        )}
        <div
          id="ButtonSection"
          className="absolute p-5 left-0 bottom-0 border-t
           border-t-gray-300 w-full"
        >
          <div id="UpdateInfoButtons" className="flex items-center justify-end">
            <button
              onClick={setEditProfileModalOpen}
              className="flex items-center border rounded-sm px-2 py-[6px]"
            >
              <span className="px-2 font-medium text-[15px]">Cancel</span>
            </button>
            {!uploadedImage || croppingDone ? (
              <button
                onClick={cropAndUpdateImage}
                className="flex items-center bg-[#F02C50] text-white 
                border rounded-md ml-3 px-3 py-[6px]"
              >
                <span className="mx-4 font-medium text-[15px]">Apply</span>
              </button>
            ) : (
              <button
                onClick={saveCroppedImage}
                className="flex items-center bg-[#F02C56] text-white
               border rounded-md ml-3 px-3 py-[6px]"
              >
                <span className="mx-4 font-medium text-[15px]">Save crop</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
