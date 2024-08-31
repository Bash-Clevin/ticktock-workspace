import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GetUsersDocument, UserResponseStrict } from '../gql/generated';
import MenuItem from './MenuItem';
import MenuItemSuggested from './MenuItemSuggested';

const SideNav = () => {
  const {
    data: getUsersData,
    loading,
    fetchMore,
  } = useQuery(GetUsersDocument, {});
  const [showAllusers, setShowAllusers] = useState(false);

  const displayedUsers: UserResponseStrict[] = showAllusers
    ? getUsersData?.getUsers
    : getUsersData?.getUsers.slice(0, 3);

  return (
    <div
      id="SideNav"
      className={[
        useLocation().pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]',
        'fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r overflow-auto',
      ].join(' ')}
    >
      <div className="lg:w-full w-[55px] mx-auto">
        <Link to="/">
          <MenuItem
            iconString="For You"
            colorString="#F02C56"
            sizeString="30"
          />
        </Link>
        <MenuItem
          iconString="Following"
          colorString="#000000"
          sizeString="27"
        />
        <MenuItem iconString="LIVE" colorString="#000000" sizeString="27" />
        <div className="border-b lg:ml-2 mt-2" />
        <div
          className="lg:block hidden text-xs text-gray-600 
        font-semibold pt-4 pb-2 px-2"
        >
          Suggested accounts
        </div>
        <div className="lg:hidden block pt-3" />
        <ul>
          {displayedUsers?.map((user) => (
            <li className="cursor-pointer" key={user.id}>
              <MenuItemSuggested user={user} />
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllusers(!showAllusers)}
          className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default SideNav;
