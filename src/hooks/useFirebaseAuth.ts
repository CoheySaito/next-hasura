import firebase from '../../firebaseConfig';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  //カスタムフック内の関数はuseCallbackでメモ化
  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const pwChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const resetInput = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  //stateを参照している場合は、第2引数に指定
  const toggleMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLogin) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
          alert(error.message);
        }
        resetInput();
      } else {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
          alert(error.message);
        }
        resetInput();
      }
    },
    [email, password, isLogin],
  );

  return {
    email,
    password,
    isLogin,
    emailChange,
    pwChange,
    resetInput,
    toggleMode,
    authUser,
  };
};
