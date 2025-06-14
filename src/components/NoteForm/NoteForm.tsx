import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "../NoteForm/NoteForm.module.css";
import { createNote } from "../../services/noteService";


interface NoteFormProps {
  onClose: () => void;      
}

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("Title is required"),
  content: Yup.string().max(500, 'Maximum length is 500'),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Invalid tag")
    .required("Tag is required"),
});

export const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose(); 
    },
    onError: (error) => {
      console.error("Note creation failed:", error);
    },
  });

  interface FieldsValues {
    title: string,
    content: string,
    tag: string,
  }

  const InitialValues: FieldsValues = {
    title: "",
    content: "",
    tag: ""
  }

  return (
    <Formik
      initialValues={ InitialValues }
      validationSchema={validationSchema}
      onSubmit={(values: FieldsValues) => {
        mutate(values);
      }}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="">Select a tag</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
              <option value="Todo">Todo</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isPending}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};