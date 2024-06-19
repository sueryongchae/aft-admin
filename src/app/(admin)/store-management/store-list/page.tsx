'use client';
import TabBox from '@/components/TabBox';
import { useState } from 'react';
import StoreList from './store-list';
import StoreAnalytics from './store-analytics';

const App = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="pl-32 pt-32 pb-16 text-24 font-500">스토어 목록</div>
      <div className="border-b border-Gray1">
        <TabBox
          _tabList={['스토어 목록', '스토어 분석']}
          _selectedTab={tab}
          _handleClick={(index) => setTab(index)}
          _colorType={1}
        />
      </div>
      <div>
        {tab === 0 && <StoreList />}
        {tab === 1 && <StoreAnalytics />}
      </div>
    </div>
  );
};

export default App;
