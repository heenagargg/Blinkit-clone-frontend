export const successToast=(message,toast)=>{
    return toast({
      variant: "success",
      title: message,
    });

}

export const errorToast=(message,toast)=>{
    return toast({
      variant: "error",
      title: message,
    });
}

export const infoToast=(message,toast)=>{
    return toast({
      variant: "info",
      title: message,
    });
}

export const warningToast=(message,toast)=>{
    return toast({
      variant: "warning",
      title: message,
    });
}
