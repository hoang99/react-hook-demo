import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";



function Test() {
    const { register, errors, handleSubmit } = useForm()

    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2
    } = useForm();

    const onSubmit = data => {
        alert(JSON.stringify(data));
    };

    const onSubmitEmail = data => {
        alert(JSON.stringify(data));
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label >First Name</label>
                    <input type="text" className="form-control"  {...register("tenbaibao")} required />


                </div>

                <div>
                    <label >Last Name</label>
                    <input type="text" className="form-control"  {...register("noidung")} required />


                </div>
                <input type="submit" />
            </form>

            <form onSubmit={handleSubmit2(onSubmitEmail)}>
                <div>
                    <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
                        Email
          </label>
                    <input name="email" {...register2("example3")} />

                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export default Test;