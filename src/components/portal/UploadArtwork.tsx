import React, { useEffect, useRef, useState } from "react";
import DynamicGrid from "./DynamicGrid";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import html2pdf from 'html2pdf.js';

import "../../styles/mainPortal.css";

const UploadArtwork = ({artist}) => {
  console.log("UploadArtwork page--");
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const uploadStatusDivRef = useRef<HTMLDivElement>(null);
  const server_url = window.location.hostname === 'localhost' || window.location.hostname == '127.0.0.1' ? 'http://localhost:8000/' : 'https://telephonegame.art/';
  const [submissions, setSubmissions] = useState(null);
  const [editorData, setEditorData] = useState<string>('');
  const [useEditor, setUseEditor] = useState<boolean>(false);


  const handleUploadMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseEditor(event.target.id === 'useEditor');
  };

  const uploadFromPdf = async () => {
    const pdfBlob = await generatePdfBlob(contentRef);

    if (pdfBlob) {
      // Replace with the desired filename
      const now = Date.now();
      const fileName = `generated_document_${now}.pdf`;
      
      // Pass the generated PDF blob to the uploadFile method
      await uploadFile(pdfBlob, fileName, 'application/pdf');
    } else {
      alert("Failed to generate PDF");
    }
  };

  const uploadFromHtml = async () => {
    const pdfBlob = await generateHtmlBlob(contentRef);

    if (pdfBlob) {
      // Replace with the desired filename
      const now = Date.now();
      const fileName = `generated_document_${now}.html`;
      
      // Pass the generated PDF blob to the uploadFile method
      await uploadFile(pdfBlob, fileName, 'text/html');
    } else {
      alert("Failed to generate HTML");
    }
  };

  const generateHtmlBlob = async (contentRef: React.RefObject<HTMLDivElement>): Promise<Blob | null> => {
    const element = contentRef.current;
    if (!element) return null;

    // Get the HTML content of the referenced element
    const htmlContent = element.outerHTML;

    // Create a new Blob with the HTML content
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });

    return htmlBlob;
  };


  const generatePdfBlob = async (contentRef: React.RefObject<HTMLDivElement>): Promise<Blob | null> => {
    const element = contentRef.current;
    if (!element) return null;

    // Create a new Promise to get the PDF as a blob
    return new Promise((resolve, reject) => {
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: 'document.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .outputPdf('blob')
        .then((blob: Blob) => {
          resolve(blob); // Pass the blob to the resolve function
        })
        .catch((error: any) => {
          console.error('PDF generation failed:', error);
          reject(null); // Reject in case of an error
        });
    });
  };

  const uploadFromFile = async () => {
      //event.preventDefault();
      const fileInput = fileInputRef.current;
      const file = fileInput!.files![0];
      if (!file) {
          alert('Please select a file to upload');
          return;
      }

      const fileName = file.name;

      uploadFile(file, fileName, file.type);
  }

  /*
      try {
          //uploadButtonRef.current!.disabled = true;
          fileInputRef.current!.disabled = true;
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

          uploadStatusDivRef.current!.innerHTML = "UPLOAD IN PROGRESS, please wait ...";

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

          const newSubmissions: any | null = [...(artist.submissions || []), saveData.submission];
          artist.submissions = newSubmissions; // Update artist.submissions (if needed elsewhere)
          setSubmissions(newSubmissions); // Update state to trigger re-render

          uploadStatusDivRef.current!.innerHTML = "Upload complete!";
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred: ' + error.message);
      }
      //uploadButtonRef.current!.disabled = false;
      fileInputRef.current!.value = "";
      fileInputRef.current!.disabled = false;
      return false;
  };
  */

  const uploadFile = async (file: Blob, fileName: string, fileType: string) => {
    if (!file) {
      alert('No file to upload');
      return;
    }

    try {
      // Disable inputs during the upload process
      // uploadButtonRef.current!.disabled = true;
      if (fileInputRef.current) fileInputRef.current!.disabled = true;
      if (uploadButtonRef.current) uploadButtonRef.current!.disabled = false;

      // Step 1: Get the signed URL for the file upload
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }

      const signedUrlResponse = await fetch(
        `${server_url}/api/generate-signed-url/?file_name=${fileName}&content_type=${fileType}`,
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

      if (uploadStatusDivRef.current) uploadStatusDivRef.current!.innerHTML = "UPLOAD IN PROGRESS, please wait...";

      // Step 2: Upload the PDF to Google Cloud Storage using the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to Google Cloud Storage');
      }

      // Step 3: Save the file reference in the Django model
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
      const newSubmissions: any | null = [...(artist.submissions || []), saveData.submission];
      artist.submissions = newSubmissions;
      setSubmissions(newSubmissions);

      if (uploadStatusDivRef.current) uploadStatusDivRef.current!.innerHTML = "Upload complete!";
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    }

    // Reset the input and button states
    if (fileInputRef.current) fileInputRef.current!.value = "";
    if (fileInputRef.current) fileInputRef.current!.disabled = false;
    setEditorData('');
    if (uploadButtonRef.current) uploadButtonRef.current!.disabled = false;
  };

  useEffect(() => {
    setSubmissions(artist.submissions);
  }, [artist]);

  return (
    <>
      <div style={{ fontSize: "32px" }}>Upload your artwork</div>
      <div className="inner_box">
        <p style={{ fontSize: "14px" }}>
          Upload your artwork in 1-4 files. Feel free to include detail
          shots when uploading photographs.
        </p>
        <div ref={uploadStatusDivRef}></div>
        <div>
          <input type="radio" id="useUploader" name="uploadMethod" checked={!useEditor} onChange={handleUploadMethodChange} />&nbsp;<label htmlFor="useUploader">Upload Files</label><br/>
          <input type="radio" id="useEditor" name="uploadMethod" checked={useEditor} onChange={handleUploadMethodChange} />&nbsp;<label htmlFor="useEditor">Edit Text In-Browser</label>
        </div>
        {useEditor ? (
          <div>
            <p style={{ fontSize: "14px" }}>
              Alternatively, you can create your content here and upload it. <i><b>Warning:</b> this does not auto-save and may lose your work. It is recommended that you edit your work somewhere else and then paste it here to upload.</i>
            </p>
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
            />
            <div>
              <h2>Preview</h2>
              <div dangerouslySetInnerHTML={{ __html: editorData }} ref={contentRef} />
            </div>
            {/*<button onClick={uploadFromPdf} disabled={!editorData} ref={uploadButtonRef}>Upload as PDF</button>*/}
            <button onClick={uploadFromHtml} disabled={!editorData} ref={uploadButtonRef}>Upload as HTML</button>
          </div>
        ) : (
          <form>
            <input
              type="file"
              placeholder="Share a link or upload a file"
              ref={fileInputRef}
              onChange={uploadFromFile}
            />
            {/*<button onClick={(event) => uploadFile(event)} ref={uploadButtonRef}>Upload</button>*/}
          </form>
        )}
        <DynamicGrid gridElements={submissions} />
      </div>
    </>
  );
};

export default UploadArtwork;
