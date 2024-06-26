'use client';

import AgGrid from '@/components/AdminAgGrid/AgGrid';
import TabBox from '@/components/TabBox';
import { useState } from 'react';

const App = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="pl-32 pt-32 pb-16 text-24 font-500">인사이트 대시보드</div>
      <div className="border-b border-Gray1">
        <TabBox
          _tabList={['기본 정보', '기본 정보']}
          _selectedTab={tab}
          _handleClick={(index) => setTab(index)}
          _colorType={1}
        />
      </div>
      <div>
        <AgGrid />
      </div>
    </div>
  );
};

export default App;
