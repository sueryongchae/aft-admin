import { store } from './useStore';

const toast = ({
  _type = 'info',
  _title = '',
  _subTitle = '',
  _isCancel = true,
}: {
  _type: 'error' | 'info' | 'complete' | 'warning';
  _title: string;
  _subTitle?: string;
  _isCancel?: boolean;
}) => {
  const rand = new Uint32Array(1);
  window.crypto.getRandomValues(rand);

  store.setState([
    ...store.state,
    {
      _rand: rand[0],
      _type: _type,
      _title: _title,
      _subTitle: _subTitle,
      _isCancel: _isCancel,
    },
  ]);
};

export { toast };
