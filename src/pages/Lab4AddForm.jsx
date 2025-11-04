import { Button, Form, FormControl } from "react-bootstrap";
import { useContext, useState } from "react";
import AppContext from "../data/AppContext";

const nameField = "name";
const emailField = "email";
const phoneField = "phone";
const birthField = "birthDate";
const urlField = "url";
const photoField = "photo";
const birthPlaceField = "birthPlace";
const eyeColorField = "eyeColor";

function Lab4AddForm(){
  const { dispatch } = useContext(AppContext);
  const [errors, setErrors] = useState([]);
  const [isSending, setSending] = useState(false);

  const validate = (data) => {
    const e = [];
    const getStr = (k) => (data.get(k) || "").toString().trim();
    const name = getStr(nameField);
    const email = getStr(emailField);
    const phone = getStr(phoneField);
    const birth = getStr(birthField);
    const url = getStr(urlField);
    const photo = getStr(photoField);
    const birthPlace = getStr(birthPlaceField);
    const eyeColor = getStr(eyeColorField);
    if (!name) e.push("Name is required");
    if (name.length > 40) e.push("Name too long (max 40)");
    if (!email) e.push("Email is required");
    if (email.length > 60) e.push("Email too long (max 60)");
    if (!phone) e.push("Phone is required");
    if (phone.length > 20) e.push("Phone too long (max 20)");
    if (!birth) e.push("Birth date is required");
    if (!birthPlace) e.push("Birth place is required");
    if (birthPlace.length > 60) e.push("Birth place too long (max 60)");
    if (!eyeColor) e.push("Eye color is required");
    if (eyeColor.length > 20) e.push("Eye color too long (max 20)");
    if (url.length > 200) e.push("URL too long (max 200)");
    if (photo.length > 200) e.push("Photo too long (max 200)");
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const eList = validate(data);
    if (eList.length){ setErrors(eList); return; }
    setErrors([]);
    setSending(true);
    await new Promise((r) => setTimeout(r, 300));
    const payload = Object.fromEntries(data.entries());
    dispatch({ type: "add", item: payload });
    setSending(false);
    e.target.reset();
  };

  return (
    <>
      <h2>Add person</h2>
      <div className="text-danger">
        {errors.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={nameField}>Name</Form.Label>
          <FormControl required maxLength={40} id={nameField} name={nameField} placeholder="Name"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={emailField}>Email</Form.Label>
          <FormControl required type="email" maxLength={60} id={emailField} name={emailField} placeholder="Email"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={phoneField}>Phone</Form.Label>
          <FormControl required maxLength={20} id={phoneField} name={phoneField} placeholder="Phone"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={birthField}>Birth date</Form.Label>
          <FormControl required type="date" id={birthField} name={birthField} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={birthPlaceField}>Birth place</Form.Label>
          <FormControl required maxLength={60} id={birthPlaceField} name={birthPlaceField} placeholder="City of birth"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={eyeColorField}>Eye color</Form.Label>
          <FormControl required maxLength={20} id={eyeColorField} name={eyeColorField} placeholder="Eye color"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={urlField}>URL</Form.Label>
          <FormControl maxLength={200} id={urlField} name={urlField} placeholder="Website URL"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor={photoField}>Photo</Form.Label>
          <FormControl maxLength={200} id={photoField} name={photoField} placeholder="Photo URL"/>
        </Form.Group>
        <div className="d-grid">
          <Button disabled={isSending} type="submit" variant="outline-primary">Add</Button>
        </div>
      </Form>
    </>
  );
}

export default Lab4AddForm;


