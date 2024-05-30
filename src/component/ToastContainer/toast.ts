import { store } from './useStore';

const toast = ({
  _type = 'info',
  _text = '',
  _subText = '',
  _isCancel = true,
}: {
  _type: 'error' | 'info' | 'complete' | 'warning';
  _text: string;
  _subText?: string;
  _isCancel?: boolean;
}) => {
  const rand = new Uint32Array(1);
  window.crypto.getRandomValues(rand);

  store.setState([
    ...store.state,
    {
      _rand: rand[0],
      _type: _type,
      _text: _text,
      _subText: _subText,
      _isCancel: _isCancel,
    },
  ]);
};

export { toast };
