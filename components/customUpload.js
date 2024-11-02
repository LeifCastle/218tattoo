import React, { useState } from 'react';
import Image from 'next/image';

const CustomUpload = ({ setReferencePhotos, referencePhotos }) => {
  const [file, setFile] = useState(null);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let name = file.name;
    event.target.value = '';
    if (file && previews.length < 3) { //Prevent dupliate photos?  error messaging when too many photos?
      setFile(file);
      // Read the file as a data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // Set up a callback function when file reading is complete
      reader.onload = function (event) {
        setPreviews((prevPreviews) => [...prevPreviews, { file: file, url: event.target.result, id: name }]);
      };
    }
    console.log('uploading to Cloudinary...')
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    try {
      //Request signature and timestamp from backend server
      const signResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}book/signImage`, {
        method: 'POST',
      });
      const signData = await signResponse.json();

      //Prepare FormData with file and Cloudinary parameters
      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', signData.timestamp);
      formData.append('signature', signData.signature);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      //Upload file to Cloudinary 
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();
      console.log('cloudinaryData:', cloudinaryData);

      // Update booking with the image url
      setReferencePhotos([...referencePhotos, cloudinaryData.url]);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className="max-w-[250px] Mobile-M:max-w-[300px] Mobile-L:max-w-[350px] w-full flex-1">
      <div className="flex flex-col gap-2 w-full h-full py-6">
        <p className="inputName text-black">Upload reference photo</p>
        <div className="relative w-full h-[100px]">
          <div className={'rounded-md absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white text-black text-4xl hover:cursor-pointer border-dashed border-[2px] border-gray-300'}>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-input" />
            <label htmlFor="file-input" className="w-full h-full hover:cursor-pointer flex justify-center items-center"><span>Choose Photo</span></label>
          </div>
        </div>
        {previews.length > 0 ? previews.map(preview => (
          <div key={preview.id} className={`w-full flex justify-left bg-white rounded-md`}>
            <div className={`bg-cover rounded-bl-md rounded-tl-md h-[100px] w-[100px]`} style={{ backgroundImage: `url(${preview.url})` }}></div>
            <div className='flex justify-between items-center text-black text-center p-4 flex-1'>
              <div className='flex flex-col'>
                <p>{preview.file.name}</p>
                <p>
                  {preview.file.size > 1024
                    ? preview.file.size > 1048576
                      ? Math.round(preview.file.size / 1048576) + " mb"
                      : Math.round(preview.file.size / 1024) + " kb"
                    : preview.file.size + " b"}
                </p>
              </div>
              <Image
                src="/blackTrashcan.png"
                alt="Trash"
                width={30}
                height={30}
                className='hover:scale-[1.5] duration-500 cursor-pointer self-center'
                onClick={() => {
                  setPreviews((prevPreviews) => prevPreviews.filter(p => p.id !== preview.id));
                }}
              />
            </div>
          </div>
        )) : ''}
      </div>
    </div>
  );
};

export default CustomUpload;
