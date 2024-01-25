import React from 'react';

interface IButton {
  btnType?: 'button' | 'submit' | 'reset';
  title: string;
  handleClick: () => void | Promise<void>;
  styles?: string;
}

const Button = ({ btnType, title, handleClick, styles }: IButton) => {
  return (
    <button
      type={btnType ?? 'button'}
      onClick={handleClick}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
    >
      {title}
    </button>
  );
};

export default Button;
