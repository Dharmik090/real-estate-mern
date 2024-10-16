import React, { useState } from 'react';
import axios from 'axios';


const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const pid = "670eb456e402521ec5e52e34";
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Get the uploaded file
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     const formData = new FormData();
    //     formData.append('image', file);  // 'image' is the field name

    //     try {
    //         // const response = axios.post('http://localhost:5000/imageupload/670eb456e402521ec5e52e34', formData
    //             // const response = axios.post('http://localhost:5000/image', formData, {
    
    //             // headers: {
    //             //     'Content-Type': 'multipart/form-data',
    //             // },
    //         // );
    //         // const response = axios.post('http://localhost:5000/user', formData);
    //         // response.then((r) => {
    //         //     // navigator("/addimages");
    //         //     console.log(-2,r.data.message);
    //         //   }).catch((err)=>{
    //         //     console.log(err);
    //         //   })

    //         const response =  axios.post('http://localhost:5000/images/670e6a4cccd6c48edcad3462', formData);
    //         response.then((r) => {
    //           navigator("/Login");
    //           console.log(-2,r.data.message);
    //         }).catch((err)=>{
    //           console.log(-1,err.response.data.message);
    //         })
    //         console.log('Image uploaded:', response.data);
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
     
        // const formData = new FormData();
        // formData.append('image', file);  // Attach the image
     
        try {
        //    const response = axios.post(`http://localhost:5000/images/${pid}`, formData, {
        //       headers: {
        //          'Content-Type': 'multipart/form-data',  // Set the right content type
        //       },
        //    });
        //    response.then((r) => {
        //     navigator("/Login");
        //     console.log(-2,r.data.message);
        //   }).catch((err)=>{
        //     console.log(-1,err.response.data.message);
        //   })
        //    console.log('Image uploaded:', response.data);
        //    navigator("/Login");  // Redirect after successful upload
        // } catch (error) {
        //    console.error('Error uploading image:', error.response?.data?.message || error.message);
        // }


        //    const response = axios.post(`http://localhost:5000/images/${pid}`);
           
        const response = axios.post(`http://localhost:5000/images`);
        response.then((r) => {
            // navigator("/Login");
            console.log(-2,r.data.message);
          }).catch((err)=>{
            console.log(-1,err.response.data.message);
          })
           console.log('Image uploaded:', response.data);
        //    navigator("/Login");  // Redirect after successful upload
        } catch (error) {
           console.error('Error uploading image:', error.response?.data?.message || error.message);
        }

    };
     
    return (
        <div>
            <h1>Upload image</h1>
            <form onSubmit={handleSubmit}>
               <input type="file" onChange={handleFileChange} />
               <button type="submit">Upload Image</button>
            </form>
        </div>
    );
};

export default ImageUpload;
