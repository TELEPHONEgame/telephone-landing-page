import React, { useEffect, useRef, useState } from "react";

import "../../styles/mainPortal.css";

const UploadArtwork = ({artist}) => {
  console.log("UploadArtwork page--");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const server_url = window.location.hostname === 'localhost' || window.location.hostname == '127.0.0.1' ? 'http://localhost:8000/' : 'https://telephonegame.art/';

  const uploadFile = async (event) => {
      event.preventDefault();
      const fileInput = fileInputRef.current;
      const file = fileInput!.files![0];
      if (!file) {
          alert('Please select a file to upload');
          return;
      }

      // Get the artist_id dynamically or statically as needed
      const fileName = file.name;

      try {
          // Step 1: Get the signed URL for the file upload
          const queryParams = new URLSearchParams(window.location.search);
          const token = queryParams.get("token");
          const headers = {
              'Content-Type': 'application/json',
          };
          if (token) {
              headers['Authorization'] = `Token ${token}`;
          }
          const signedUrlResponse = await fetch(`${server_url}/api/generate-signed-url/?file_name=${fileName}&content_type=${file.type}`,
            {
              method: 'GET',
              headers: headers,
              credentials: 'include', // This sends cookies with the request
            }
          );
          if (!signedUrlResponse.ok) {
              throw new Error('Failed to get signed URL');
          }

          const signedUrlData = await signedUrlResponse.json();
          const signedUrl = signedUrlData.signed_url;

          //button.disabled = true;
          //document.getElementById('upload-status').innerHTML = "UPLOAD IN PROGRESS, please wait ...";

          // Step 2: Upload the file to Google Cloud Storage using the signed URL
          const uploadResponse = await fetch(signedUrl, {
              method: 'PUT',
              headers: {
                  'Content-Type': file.type,
                  //'x-goog-acl': 'public-read',
              },
              body: file,
          });

          if (!uploadResponse.ok) {
              throw new Error('Failed to upload file to Google Cloud Storage');
          }

          // Step 3: Save the file reference in the Django model using save_file_reference endpoint
          const saveResponse = await fetch(`${server_url}/api/save-file-reference/`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                  file_name: `${fileName}`,
                  artist_id: artist.id,
              }),
          });

          if (!saveResponse.ok) {
              throw new Error('Failed to save file reference in Django model');
          }

          const saveData = await saveResponse.json();
          //document.getElementById('upload-status').innerHTML = "Upload complete! Refreshing page ...";
          document.location = document.location;
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred: ' + error.message);
      }
      return false;
  };

  return (
    <>
      <div style={{ fontSize: "32px" }}>Upload your artwork</div>
      <div className="inner_box">
        <p style={{ fontSize: "14px" }}>
          Upload your artwork in 1-5 files or links. Feel free to include detail
          shots when uploading photographs.
        </p>
        <form>
          <input
            type="file"
            placeholder="Share a link or upload a file"
            ref={fileInputRef}
          />
          <button onClick={(event) => uploadFile(event)}>Upload</button>
        </form>
      </div>
    </>
  );
};

export default UploadArtwork;
