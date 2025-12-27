"use client";
import { FormTypes, InputTypes } from "@/app/types/enums";
import FormFields from "@/components/formFields/formFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import useFormFields from "@/hooks/useFormFields";
import { ValidationErrors } from "@/validations/auth";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  updateQuestion } from "../../_actions/actions";
import { Faq } from "@/lib/generated/prisma/client";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};
const Form = ({ question }: { question: Faq | any }) => {
  const [state, action, pending] = useActionState(
    updateQuestion.bind(null, question.id),
    initialState
  );
  const { getFormFields } = useFormFields({ slug: FormTypes.FAQ });

  useEffect(() => {
    if (state.status === 200) {
      toast.success(state?.message);
    } else if (state.status && state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.status, state]);
  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        {getFormFields().map((field) => {
          const fieldValue =
            state?.formData?.get(field.name)?.toString() ||
            question[field.name];

          return (
            <FormFields
              key={field.name}
              {...field}
              error={state?.error}
              defaultValue={fieldValue}
            />
          );
        })}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer mt-4"
      >
        {pending ? <Loader /> : "تحديث السؤال"}
      </Button>
    </form>
  );
};

export default Form;
