import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { createEvent, updateEvent } from '../../eventSlice';
import { createId } from '@paralleldrive/cuid2';
import { Controller, useForm } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function EventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onSubmit(data: FieldValues) {
    console.log(data);
    id = id ?? createId();
    event
      ? dispatch(updateEvent({ ...event, ...data, date: data.date.toString() }))
      : dispatch(
          createEvent({
            ...data,
            id,
            hostedBy: 'Gerry',
            attendees: [],
            hostPhotoURL: '',
            date: data.date.toString(),
          })
        );
    navigate(`/events/${id}`);
  }

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Event Title"
          defaultValue={event?.title || ''}
          {...register('title', { required: true })}
          error={errors.title && 'Title is required'}
        />
        {/* Use a category select and create an object that holds all the categories and mport 
t andused a Controller from react hook from react dependencies
*/}
        <Controller
          name="category"
          control={control}
          rules={{ required: 'Category is required' }}
          defaultValue={event?.category}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) =>
                setValue('category', d.value, { shouldValidate: true })
              }
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ''}
          {...register('description', { required: 'Description is required' })}
          error={errors.description && errors.description.message}
        />
        <Header sub content="Location details" color="teal" />
        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ''}
          {...register('city', { required: 'City is required' })}
          error={errors.city && errors.city.message}
        />

        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ''}
          {...register('venue', { required: 'Venue is required' })}
          error={errors.venue && errors.venue.message}
        />

        {/* Creating a date form used again the Controler from react hook form*/}
        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Date is required' }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue('date', value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          disabled={isSubmitting}
          as={Link}
          to="/events"
          type="button"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
// function addEvent(
//   arg0:
//     | {
//         id: any;
//         hostedBy: string;
//         attendees: never[];
//         hostPhotoURL: string;
//         title: string;
//         date: string;
//         category: string;
//         description: string;
//         city: string;
//         venue: string;
//       }
//     | {
//         id: any;
//         hostedBy: string;
//         attendees: never[];
//         hostPhotoURL: string;
//         title: string;
//         category: string;
//         description: string;
//         city: string;
//         venue: string;
//         date: string;
//       }
// ): any {
//   throw new Error('Function not implemented.');
// }
