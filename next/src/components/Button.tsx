import React from 'react';

interface IButton {
  btnType?: 'button' | 'submit' | 'reset';
  title: string;
  onClick: () => void;
  styles?: string;
}

const Button = ({ btnType, title, onClick, styles }: IButton) => {
  return (
    <button
      type={btnType ?? 'button'}
      onClick={onClick}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
    >
      {title}
    </button>
  );
};

export default Button;
