'use client';
import Navigation from '@/components/Admin-components/Navigation';
import StepBox from '@/components/StepBox';
import { useState } from 'react';

const App = () => {
  const [step, setStep] = useState(0);

  return (
    <Navigation>
      <div className="p-32">
        <div className="text-24 font-500 mb-32">안녕하세요, OOO 님. 오늘도 좋은 하루 되세요!</div>
        <div className="border border-Gray2 py-12 px-16 bg-Gray0 rounded-8">
          <div className="text-14 font-700 mb-16">(브랜드명)의 세팅 현황</div>
          <div className="flex justify-center items-center h-[56px] rounded-8 bg-White">
            <StepBox
              _stepList={['회사 기본 정보 등록', '상품 등록', '스토어 개설', '온라인 쇼핑몰 연결']}
              _currentStep={step}
            />
          </div>
        </div>

        <div className="py-12 px-16 border border-Gray2 rounded-8 text-14 font-700 my-16">오늘 할 일</div>

        <div className="border border-Gray2 py-12 px-16 rounded-8">
          <div className="text-14 font-700 mb-16">최근 방문한 탭</div>
          <div className="w-full flex flex-nowrap gap-16 overflow-x-auto">
            <RecentTab />
            <RecentTab />
            <RecentTab />
            <RecentTab />
            {/* <RecentTab />
            <RecentTab />
            <RecentTab />
            <RecentTab /> */}
          </div>
        </div>

        <div className="flex gap-16 mt-16">
          <div className="flex-1 py-12 px-16 border border-Gray2 rounded-8 text-14 font-700 my-16">안읽은 알림</div>
          <div className="flex-1 py-12 px-16 border border-Gray2 rounded-8 text-14 font-700 my-16">새로운 소식</div>
        </div>
      </div>
    </Navigation>
  );
};

const RecentTab = () => {
  return (
    <div className="flex-[0_0_auto] rounded-8 border border-Gray1 size-160">
      <div className="py-12 text-12 font-400 text-Gray7 text-center border-b border-Gray1">인사이트 대시보드</div>
    </div>
  );
};

export default App;
