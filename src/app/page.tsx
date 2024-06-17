'use client';

import StandardButton from '@/components/button/StandardButton';
import { useRouter } from 'next/navigation';

const App = () => {
  const router = useRouter();

  return (
    <div className="flex gap-10 p-30">
      <StandardButton _title="어드민" _buttonType={'Primary'} _handleClick={() => router.push('/home')} />
      <StandardButton _title="로그인" _buttonType={'Primary'} _handleClick={() => router.push('/signin')} />
      <StandardButton _title="회원가입" _buttonType={'Primary'} _handleClick={() => router.push('/signup')} />
    </div>
  );
};

export default App;
