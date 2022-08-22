import type { CreateContactUsInput } from '@/types';
import Button from '@/components/ui/button';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import TextArea from '@/components/ui/forms/text-area';
import * as yup from 'yup';
import { useContact } from '@/framework/rest/user'

const contactFormSchema = yup.object().shape({
  name: yup.string().required('Name required!'),
  email: yup
    .string()
    .email('Check Your Email Format.')
    .required('Email required!'),
  subject: yup.string().required('subject required!'),
  description: yup.string().required('Message required!'),
});
export const ContactForm = () => {
  const { mutate, isLoading } = useContact();

  function onSubmit(values: CreateContactUsInput) {
    // mutate(values);
  }

  return (
    <Form<CreateContactUsInput>
      onSubmit={onSubmit}
      className="z-1"
      validationSchema={contactFormSchema}
    >
      {({ register, formState: { errors } }) => (
        <>
            <Input
              {...register('name')}
              variant="line"
              placeholder="Full Name"
              inputClassName="border-secondary/5 "

              error={(errors.name?.message!)}
            />

          <Input
            {...register('email')}
            type="email"
            variant="line"
            placeholder="E-mail"
            inputClassName="border-secondary/5 h-8"

            error={(errors.email?.message!)}
          />
          <Input
            {...register('subject')}
            variant="line"
            className="my-6"
            placeholder="Subject"
            inputClassName="border-secondary/5 h-8"

            error={(errors.subject?.message!)}
          />
          <Input
            {...register('description')}
            variant="line"
            className="my-6"
            placeholder="Message"
            inputClassName="border-secondary/5 h-8"

            error={(errors.description?.message!)}
          />

          <Button variant="backShinyDark" loading={isLoading} disabled={isLoading}>
            {('Contact Us')}
          </Button>
        </>
      )}
    </Form>
  );
};

