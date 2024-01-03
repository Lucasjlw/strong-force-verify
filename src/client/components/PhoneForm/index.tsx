/*
MIT License

Copyright (c) 2024 Strong Force Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { PropsWithChildren } from "react";
import {
  FieldError,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";

interface Inputs {
  phoneNumber: string;
  countryCode: string;
}

export function PhoneForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onBlur",
    defaultValues: {
      countryCode: "+1",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PhoneInput register={register} errors={errors} />

      <button type="submit">Submit</button>
    </form>
  );
}

function HintMessage({
  error,
  children,
}: PropsWithChildren<{ error: FieldError | undefined }>) {
  return (
    <span
      style={{
        fontSize: "12px",
        textAlign: "left",
        color: error && "red",
      }}
    >
      {error ? error.message : children}
    </span>
  );
}

interface PhoneInputProps {
  register: UseFormReturn<Inputs>["register"];
  errors: UseFormReturn<Inputs>["formState"]["errors"];
}

function PhoneInput({ register, errors }: PhoneInputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <select {...register("countryCode", { required: true })}>
          <option value="+1">US</option>
        </select>

        <input
          placeholder="0123456789"
          {...register("phoneNumber", {
            minLength: {
              value: 10,
              message: "Your phone number is too short.",
            },
            maxLength: {
              value: 10,
              message: "Your phone number is too long.",
            },
            pattern: {
              value: /[0-9]{10}/,
              message: "Your phone number must be digits only.",
            },
            required: "You must enter a phone number",
          })}
          aria-invalid={errors.phoneNumber ? "true" : "false"}
        />
      </div>

      <HintMessage error={errors.phoneNumber} />
    </div>
  );
}
