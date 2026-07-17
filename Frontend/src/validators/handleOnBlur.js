export const handleOnBlurInput=(event, setError, user, validateFields)=>{
    const name=event.target.name;
    const value=event.target.value;
    const newUser = { ...user, [name]: value };
    const newError=validateFields(name, value, newUser);
    setError((pre)=>({...pre, [name]:newError}))
}