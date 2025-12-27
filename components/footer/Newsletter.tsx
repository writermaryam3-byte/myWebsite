"use client"
import { Button } from "../ui/button";
import useFormFields from "@/hooks/useFormFields";
import { FormTypes } from "@/app/types/enums";
import FormFields from "../formFields/formFields";
import { useActionState, useEffect } from "react";
import { ValidationErrors } from "@/validations/auth";
import { addToNewsletter } from "./_actions/actions";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";
export type ActionState = {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
};
const initialState: ActionState = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

const Newsletter = () => {
  const { getFormFields } = useFormFields({ slug: FormTypes.NEWSLETTER });
  const [state, action, pending] = useActionState(
    addToNewsletter,
    initialState
  );
  useEffect(() => {
    if (state.status === 201) {
      toast.success(state?.message);
    } else if (state.status && state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.status, state]);

  return (
    <form action={action} className="flex flex-col gap-4">
      {getFormFields().map((field) => {
        const fieldValue = state.formData?.get(field.name)?.toString()
        return (
          <div key={field.name}>
            <FormFields {...field} defaultValue={fieldValue} error={state?.error} />
          </div>
        );
      })}

      <Button className="bg-bottom px-4 py-2 rounded-md w-full!">
        {pending ? <Loader /> : "اشتراك"}
      </Button>
    </form>
  );
};

export default Newsletter;
