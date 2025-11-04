import { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import AppContext from '../data/AppContext';

function Lab4EditForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, dispatch } = useContext(AppContext);
  const numericId = Number(id);
  const current = useMemo(() => items.find(p => p.id === numericId), [items, numericId]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: current || {}
  });

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 200));
    dispatch({ type: 'edit', item: { ...data, id: current.id } });
    navigate('/lab4');
  };

  if (!current){
    return <p>Brak obiektu do edycji.</p>;
  }

  return (
    <>
      <h2>Edit person</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={current.id} {...register('id')} />

        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control id="name" placeholder="Name"
            {...register('name', { required: 'Name is required', maxLength: { value: 40, message: 'Max 40 chars' } })} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control id="email" type="email" placeholder="Email"
            {...register('email', { required: 'Email is required', maxLength: { value: 60, message: 'Max 60 chars' } })} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Phone</Form.Label>
          <Form.Control id="phone" placeholder="Phone"
            {...register('phone', { required: 'Phone is required', maxLength: { value: 20, message: 'Max 20 chars' } })} />
          {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthDate">Birth date</Form.Label>
          <Form.Control id="birthDate" type="date"
            {...register('birthDate', { required: 'Birth date is required' })} />
          {errors.birthDate && <div className="text-danger">{errors.birthDate.message}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthPlace">Birth place</Form.Label>
          <Form.Control id="birthPlace" placeholder="City of birth"
            {...register('birthPlace', { required: 'Birth place is required', maxLength: { value: 60, message: 'Max 60 chars' } })} />
          {errors.birthPlace && <div className="text-danger">{errors.birthPlace.message}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="eyeColor">Eye color</Form.Label>
          <Form.Control id="eyeColor" placeholder="Eye color"
            {...register('eyeColor', { required: 'Eye color is required', maxLength: { value: 20, message: 'Max 20 chars' } })} />
          {errors.eyeColor && <div className="text-danger">{errors.eyeColor.message}</div>}
        </Form.Group>

        <div className="d-grid">
          <Button disabled={isSubmitting} type="submit" variant="outline-primary">Save</Button>
        </div>
      </Form>
    </>
  );
}

export default Lab4EditForm;


