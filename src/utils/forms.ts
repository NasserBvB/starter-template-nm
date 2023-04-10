
const parseForm = (form: any) => {
  const formData = new FormData(form);
  const payload: Record<string, any> = {};
  for (const value of formData.entries()) {
    payload[value[0]] = value[1];
  }
  return payload;
}

export default parseForm;