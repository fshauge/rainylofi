import React, { ChangeEvent, DetailedHTMLProps } from "react";

type RangeProps = Omit<
  DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "onChange"
> & {
  onChange: (value: number) => void;
};

export const Range = ({ onChange, ...props }: RangeProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.currentTarget.value, 10));
  };

  return <input type="range" onChange={handleChange} {...props} />;
};
