'use client';
import AgGrid from '@/components/AdminAgGrid/AgGrid';
import StandardButton from '@/components/button/StandardButton';
import useTabListStore from '@/store/tabListStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StoreList = () => {
  const router = useRouter();
  const [list, setList] = useState([1]);
  const { addTab } = useTabListStore();
  const registerStore = () => {
    addTab('/store-management/store-register');
    router.push('/store-management/store-register');
  };
  return (
    <div className="p-32">
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-around h-[368px] bg-Gray0 rounded-10 border border-Gray4 border-dashed">
          <div className="p-16 rounded-full bg-Gray1">
            <Warning />
          </div>
          <div className="text-center">
            <div className="font-700 mb-12">등록된 스토어가 없습니다</div>
            <div className="font-400">온오프라인 스토어를 등록하고, 스토어 관리를 시작해보세요</div>
          </div>
          <div>
            <StandardButton _buttonType="Secondary" _title="스토어 등록하기" _handleClick={registerStore} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="self-start mb-16">
            <StandardButton
              _buttonType="TagPrimary"
              _title="새로운 스토어 등록"
              _image={
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.6 3.92667L12.9 1.01333C12.7533 0.413333 12.2333 0 11.6267 0H10.1533H8.81334H7.66667H6.33334H5.18667H3.84H2.36667C1.76667 0 1.24 0.42 1.1 1.01333L0.400004 3.92667C0.240004 4.60667 0.386671 5.3 0.813338 5.84667C0.866671 5.92 0.940004 5.97333 1 6.04V10.6667C1 11.4 1.6 12 2.33334 12H11.6667C12.4 12 13 11.4 13 10.6667V6.04C13.06 5.98 13.1333 5.92 13.1867 5.85333C13.6133 5.30667 13.7667 4.60667 13.6 3.92667ZM3.68 1.33333L3.29334 4.57333C3.24 5.00667 2.89334 5.33333 2.48667 5.33333C2.16 5.33333 1.95334 5.14 1.86667 5.02C1.69334 4.8 1.63334 4.51333 1.7 4.24L2.36667 1.33333H3.68ZM11.6067 1.32667L12.3067 4.24C12.3733 4.52 12.3133 4.8 12.14 5.02C12.0467 5.14 11.8467 5.33333 11.5133 5.33333C11.1067 5.33333 10.7533 5.00667 10.7067 4.57333L10.32 1.33333L11.6067 1.32667ZM9.34 4.34667C9.37334 4.60667 9.29334 4.86667 9.12 5.06C8.96667 5.23333 8.75334 5.33333 8.48 5.33333C8.03334 5.33333 7.66667 4.94 7.66667 4.46V1.33333H8.97334L9.34 4.34667ZM6.33334 4.46C6.33334 4.94 5.96667 5.33333 5.47334 5.33333C5.24667 5.33333 5.04 5.23333 4.88 5.06C4.71334 4.86667 4.63334 4.60667 4.66 4.34667L5.02667 1.33333H6.33334V4.46ZM11 10.6667H3C2.63334 10.6667 2.33334 10.3667 2.33334 10V6.64667C2.38667 6.65333 2.43334 6.66667 2.48667 6.66667C3.06667 6.66667 3.59334 6.42667 3.98 6.03333C4.38 6.43333 4.91334 6.66667 5.52 6.66667C6.1 6.66667 6.62 6.42667 7.00667 6.04667C7.4 6.42667 7.93334 6.66667 8.53334 6.66667C9.09334 6.66667 9.62667 6.43333 10.0267 6.03333C10.4133 6.42667 10.94 6.66667 11.52 6.66667C11.5733 6.66667 11.62 6.65333 11.6733 6.64667V10C11.6667 10.3667 11.3667 10.6667 11 10.6667Z"
                    fill="#228BE6"
                  />
                </svg>
              }
              _handleClick={registerStore}
            />
          </div>
          <div>
            <AgGrid />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreList;

const Warning = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.1753 52.5H48.8253C52.6753 52.5 55.0753 48.325 53.1503 45L34.3253 12.475C32.4003 9.14995 27.6003 9.14995 25.6753 12.475L6.8503 45C4.9253 48.325 7.3253 52.5 11.1753 52.5ZM30.0003 35C28.6253 35 27.5003 33.875 27.5003 32.5V27.5C27.5003 26.125 28.6253 25 30.0003 25C31.3753 25 32.5003 26.125 32.5003 27.5V32.5C32.5003 33.875 31.3753 35 30.0003 35ZM32.5003 45H27.5003V40H32.5003V45Z"
      fill="#FAB005"
    />
  </svg>
);
