export const validateAvailabilty=(inputFields, form)=>{

    if(inputFields.includes('availableDate')){
        if(!form.availableDate){
            throw new Error("Available date is required.")
        }
    }

    if(inputFields.includes('fromTime')){
        if(!form.fromTime){
            throw new Error("From time is required.")
        }
    }

    if(inputFields.includes('toTime')){
        if(!form.toTime){
            throw new Error("To time is required.")
        }
    }

    if(inputFields.includes('slotDuration')){
        if(!form.slotDuration){
            throw new Error("Slot Duration is required.")
        }
    }
}