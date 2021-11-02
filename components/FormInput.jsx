import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Container = styled.div`
  width: 60%;
  margin: auto;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
const Input = styled.input`
  padding: 0.625rem;
  outline: none;
`;

const FormInput = () => {
  const initialFieldValues = {
    fullName: "",
    email: "",
    mobileNumber: "",
  };
  var [values, setValues] = useState(initialFieldValues);
  const usersCollectionRef = collection(db, "users");
  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const pushDb = async () => {
    await addDoc(usersCollectionRef, values);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    pushDb(values);
  };

  return (
    <Container>
      <Form autoComplete={0} onSubmit={handleFormSubmit}>
        <Input
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
          autoComplete={0}
        />
        <Input
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          autoComplete={0}
        />
        <Input
          placeholder="Mobile Number"
          name="mobileNumber"
          value={values.mobileNumber}
          onChange={handleInputChange}
          autoComplete={0}
        />
        <Input type="submit" value="Save" />
      </Form>
    </Container>
  );
};

export default FormInput;