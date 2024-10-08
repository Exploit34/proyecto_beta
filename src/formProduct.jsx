import React from 'react'
import { useForm } from "react-hook-form";
import { addProduct } from '../server/src/controllers/products.auth.controller';

export const formProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = handleSubmit(data => {
        console.log(data);

    })

    async function product(data) {
        const res = await addProduct();
        console.log(res);
    }

    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChangeAndPreview = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };




    return (
        <>
            <form className="form-signin" onSubmit={onSubmit} >
                <label htmlFor="email">Nombre producto</label>
                <input className="form-styling" type="email"
                    {...register('productName', { required: true })} />


                <label htmlFor="password">Descripcion</label>
                <input
                    className="form-styling"
                    type="password"
                    {...register('description', { required: true })}
                />


                <label htmlFor="email">price</label>
                <input className="form-styling" type="email"
                    {...register('price', { required: true })} />

                <input type="file" onChange={handleFileChangeAndPreview}
                    name='product'
                />

                <div className="btn-animate">
                    <button type="submit" >
                        <a className="btn-signin">Sign in</a>
                    </button>
                </div>

            </form>
        </>
    )
}
