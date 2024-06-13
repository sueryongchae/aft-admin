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
      <div>
        <InputBox
          _value={password}
          _error={passwordError}
          _handleChange={onChangePassWord}
          _title="비밀번호"
          _placeholder="비밀번호를 입력해주세요"
          _type="password"
        />
        <div>
          <MainButton _title={loginText} _disabled={disableLogin} _handleClick={login} />
        </div>
        <StandardButton
          _buttonType="Subtle"
          _title="이미 가입하신 회원이신가요?"
          _handleClick={() => router.push('/signin')}
        />
      </div>
    </LogoText>
  );
};
export default Page;

const Logo = () => (
  <svg
    width="98"
    height="56"
    viewBox="0 0 98 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="98" height="56" fill="url(#pattern0_142_3646)" />
    <defs>
      <pattern id="pattern0_142_3646" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_142_3646" transform="matrix(0.00340136 0 0 0.00595238 -0.00340136 0)" />
      </pattern>
      <image
        id="image0_142_3646"
        width="296"
        height="168"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
