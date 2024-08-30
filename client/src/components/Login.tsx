import { useMutation } from '@apollo/client';
import { GraphQLErrorExtensions } from 'graphql';
import { useState } from 'react';
import { LoginDocument, LoginMutation } from '../gql/generated';
import { useGeneralStore } from '../store/generalStore';
import { useUserStore } from '../store/userStore';
import Input from './Input';

const Login = () => {
  const [loginUser, { loading, eror, data }] =
    useMutation<LoginMutation>(LoginDocument);

  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const [errors, setErrors] = useState<GraphQLErrorExtensions>();
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setErrors({});

    await loginUser({
      variables: {
        loginInput: loginData,
      },
    }).catch((err) => {
      if (err.graphQLErrors[0].extensions?.invalidCredentials) {
        setInvalidCredentials(
          err.graphQLErrors[0].extensions?.invalidCredentials,
        );
      }
      setErrors(err.graphQLErrors[0].extensions);
    });

    if (data?.login.user) {
      setUser({
        id: data?.login.user.id,
        email: data?.login.user.email,
      });
      setIsLoginOpen(false);
    }
  };
  return (
    <>
      <div className="text-center text-[20px] mb-4 font-bold">Sign In</div>
      <div className="px-6 pb-2">
        <Input
          max={64}
          placeHolder="Email"
          inputType="text"
          onChange={(e) =>
            setloginData({ ...loginData, email: e.target.value })
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
            setloginData({ ...loginData, password: e.target.value })
          }
          autoFocus={false}
          error={errors?.password as string}
        />
      </div>
      <div className="px-6">
        <span
          className="text-red-500 text-[14px]
         font-semibold"
        >
          {invalidCredentials}
        </span>
        <button
          onClick={handleLogin}
          disabled={!loginData.email || !loginData.password}
          className={[
            'mt-6 w-full text-[17px] font-semibold text-white py-3 rounded-sm',
            !loginData.email || !loginData.password
              ? 'bg-gray-200'
              : 'bg-[#F02C56]',
          ].join(' ')}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
