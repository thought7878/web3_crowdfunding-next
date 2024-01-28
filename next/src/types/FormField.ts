import { FormEvent } from 'react';

export default interface IFormField {
  labelName?: string;
  placeholder?: string;
  inputType?: string;
  value?: string;
  handleChange: (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
}
