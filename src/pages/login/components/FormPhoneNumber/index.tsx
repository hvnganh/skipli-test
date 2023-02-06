import React, { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { generateAccessCode } from "../../../../services/mutation";

type FormPhoneNumberProps = {
  setPhoneNumber: Dispatch<SetStateAction<number>>;
};

const FormPhoneNumber = ({setPhoneNumber}: FormPhoneNumberProps) => {
  const methods = useForm();
  const mutation = useMutation((phoneNumber: number) => generateAccessCode(phoneNumber))

  const onSubmit = async (data: any) => {
    try {
      setPhoneNumber(data.phoneNumber)
      mutation.mutate(data.phoneNumber, {
        onSuccess: (data) => {
        }, onError: (data) => {
      }
      })
    } catch (error) {
      window.alert(error);
    }
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))} className="phone-number__wrapper">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input className="input-field" type="text" {...methods.register("phoneNumber")}/>
        <button type="submit">
            Submit for access code
        </button>
      </form>
    </FormProvider>
  );
};

export default FormPhoneNumber;
