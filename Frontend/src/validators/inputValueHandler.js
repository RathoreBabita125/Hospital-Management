export const inputValueHandler=(event, user, setUser, error, setError, validateFields)=>{
    const name=event.target.name;
    const value=event.target.value;
    setUser({...user, [name]:value});

    if(error[name]!==''){
        const newError=validateFields(name, value, user);
        setError((pre)=>({...pre, [name]:newError}));
    }
}