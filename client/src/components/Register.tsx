import { useMutation } from '@apollo/client';
import { RegisterDocument, RegisterMutation } from '../gql/generated';
import { useUserStore } from '../store/userStore';
import { useGeneralStore } from '../store/generalStore';
import { useState } from 'react';
import { GraphQLErrorExtensions } from 'graphql';
import Input from './Input';

const Register = () => {
  const [registerUser, { loading, eror, data }] =
    useMutation<RegisterMutation>(RegisterDocument);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const [errors, setErrors] = useState<GraphQLErrorExtensions>();

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    setErrors({});

    await registerUser({
      variables: {
        registerInput: registerData,
      },
    }).catch((err) => {
      setErrors(err.graphQLErrors[0].extensions);
    });

    if (data?.register.user) {
      setUser({
        id: data?.register.user.id,
        email: data?.register.user.email,
        name: data?.register.user.name,
      });
      setIsLoginOpen(false);
    }
  };
  return (
    <>
      <div className="text-center text-[20px] mb-4 font-bold">Sign up</div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Name"
          inputType="text"
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
          autoFocus={true}
          error={errors?.name as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Email"
          inputType="text"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          autoFocus={false}
          error={errors?.email as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Password"
          inputType="password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          autoFocus={false}
          error={errors?.password as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Confirm Password"
          inputType="password"
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
          autoFocus={false}
          error={errors?.confirmPassword as string}
        />
      </div>
      <div className="px-6 mt-6">
        <button
          onClick={handleRegister}
          disabled={
            !registerData.email ||
            !registerData.password ||
            !registerData.name ||
            !registerData.confirmPassword
          }
          className={[
            'w-full text-[17px] font-semibold text-white py-3 rounded-sm',
            !registerData.email ||
            !registerData.password ||
            !registerData.name ||
            !registerData.confirmPassword
              ? 'bg-gray-200'
              : 'bg-[#F02C56]',
          ].join(' ')}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Register;
