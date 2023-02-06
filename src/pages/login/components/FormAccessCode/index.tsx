import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { validateAccessCode } from "../../../../services/mutation";

type FormAccessCodeProps = {
  phoneNumber: number
};

const FormAccessCode = ({ phoneNumber }: FormAccessCodeProps) => {
  const methods = useForm();

  const mutation = useMutation((accessNumber: number) => validateAccessCode(accessNumber, phoneNumber))

  const onSubmit = async (data: any) => {
    try {
        mutation.mutate(data.accessCode, {
            onSuccess: (data) => {
            if (data) {
                window.alert('Verify successfully')
            }
        }, onError: (data) => {
        }}
        )
    } catch (error) {
        window.alert(error)
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))} className="access-code__wrapper">
        <label htmlFor="accessCode">Access Code</label>
        <input className="input-field" type="text" {...methods.register("accessCode")} />
        <button type="submit">
            Submit to login
        </button>
      </form>
    </FormProvider>
  );
};

export default FormAccessCode;
