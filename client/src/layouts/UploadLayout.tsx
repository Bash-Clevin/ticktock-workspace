import { ReactNode } from 'react';
import TopNav from '../components/TopNav';

const UploadLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#F8f8f8] h-[100vh]">
      <TopNav />
      <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
        {children}
      </div>
    </div>
  );
};

export default UploadLayout;
