'use client';
import LogoText from '@/components/Admin-components/LogoText';
import { toast } from '@/components/ToastContainer';
import MainButton from '@/components/button/MainButton';
import StandardButton from '@/components/button/StandardButton';
import InputBox from '@/components/input/InputBox';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [loginText, setLoginText] = useState('로그인');

  const [id, setId] = useState('');
  const [idError, setIdError] = useState('형식에 맞게 이메일을 작성해주세요.');
  const [password, setPassWord] = useState('');
  const [passwordError, setPasswordError] = useState('형식에 맞게 이메일을 작성해주세요.');

  const [disableLogin, setDisableLogin] = useState(true);

  const onChangeId = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setId(value);
  };

  const onChangePassWord = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setPassWord(value);
  };

  const login = () => {
    toast({
      _type: 'error',
      _title: '계정 정보가 일치하지 않습니다. 다시 확인하고 입력해주세요.',
      _isCancel: false,
    });
  };

  useEffect(() => {
    if (id === '') {
      setLoginText('로그인');
      setDisableLogin(true);
      return;
    }
    if (password === '') {
      setLoginText('로그인');
      setDisableLogin(true);
      return;
    }

    setLoginText('로그인 하기');
    setDisableLogin(false);
  }, [id, password]);

  return (
    <LogoText>
      <div className="h-full flex flex-col justify-around">
        <div>
          <div className="mb-24">
            <InputBox
              _value={id}
              _error={idError}
              _handleChange={onChangeId}
              _title="ID (ID 혹은 Email)"
              _placeholder="ID 혹은 이메일을 입력해주세요"
            />
          </div>
          <div>
            <InputBox
              _value={password}
              _error={passwordError}
              _handleChange={onChangePassWord}
              _title="비밀번호"
              _placeholder="비밀번호를 입력해주세요"
              _type="password"
            />
          </div>
        </div>

        <div>
          <MainButton _title={loginText} _disabled={disableLogin} _handleClick={login} />
          <StandardButton
            _buttonType="Subtle"
            _title="혹시 회원이 아니신가요?"
            _handleClick={() => router.push('/signup')}
          />
          <StandardButton _buttonType="Subtle" _title="비밀번호를 잊어버리셨나요?" />
        </div>
      </div>
    </LogoText>
  );
};
export default Page;
