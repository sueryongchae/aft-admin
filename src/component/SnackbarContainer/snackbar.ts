import { store } from './useStore';

const snackbar = ({
  _text = '',
  _subText = '',
  _confirmText,
  _reFuseText,
  _handleClickConfirm = () => {},
  _handleClickReFuse = () => {},
}: {
  _text: string;
  _subText?: string;
  _confirmText?: string;
  _reFuseText?: string;
  _handleClickConfirm?(): void;
  _handleClickReFuse?(): void;
}) => {
  const rand = new Uint32Array(1);
  window.crypto.getRandomValues(rand);

  store.setState([
    ...store.state,
    {
      _rand: rand[0],
      _text: _text,
      _subText: _subText,
      _confirmText: _confirmText,
      _reFuseText: _reFuseText,
      _handleClickConfirm: _handleClickConfirm,
      _handleClickReFuse: _handleClickReFuse,
    },
  ]);
};

export { snackbar };
