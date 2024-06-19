'use client';
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
  const [idError, setIdError] = useState('');
  const [password, setPassWord] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [disableLogin, setDisableLogin] = useState(true);

  const onChangeId = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setId(value.replace(/\s/g, ''));
  };

  const onChangePassWord = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setPassWord(value.replace(/\s/g, ''));
  };

  const login = () => {
    if (password.length < 8) {
      setPasswordError('8자 이상 작성해주세요');
      return;
    }

    if (/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/.test(password)) {
      setPasswordError('영대소문자, 숫자, 특수기호 중 2개 이상 포함되어야 합니다');
      return;
    }

    if (password.length > 50) {
      setPasswordError('50자 내로 입력해주세요');
      return;
    }

    setIdError('');
    setPasswordError('');

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
            _isEye={true}
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
  );
};
export default Page;
