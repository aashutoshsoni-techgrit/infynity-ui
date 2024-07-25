import React, { ChangeEvent, DragEvent, useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex } from '@mantine/core';
import { MdOutlineFileUpload } from 'react-icons/md';
import colours from '@/src/constants/palette';
import { CircularProgress } from '@/src/components';
import {
   bulkEmployeeData,
   BulkEmployeeUploadForms,
   getColumnsInCsvAndXlsxFile
} from '@/src/utils/bulk-employee-upload';
import { BulkEmployeeUploadContext } from '@/src/context/bulk-employee-upload.context';
import { downloadIcon } from '@/src/constants/icons';

const UploadCsv = () => {
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const [file, setFile] = useState<File | null>(bulkEmployeeData.uploadFormData.file);
   const [uploadProgress, setUploadProgress] = useState<number>(
      bulkEmployeeData.uploadFormData.uploadProgress
   );
   const [error, setError] = useState<string | null>();
   const { setUploadCSVFormProgress, setMapFieldsFormProgress, handleFormClose, setCurrentForm } =
      useContext(BulkEmployeeUploadContext);

   useEffect(() => {
      bulkEmployeeData.uploadFormData = {
         file,
         uploadProgress
      };
   }, [file, uploadProgress]);

   const handleNextClick = () => {
      if (!file) {
         setError('File is not selected');
         return;
      }

      setCurrentForm?.(BulkEmployeeUploadForms.MAPPING_FORM);
   };

   const handleFileDragOver = (event: DragEvent<HTMLFormElement>) => event.preventDefault();

   const handleFileDrop = (event: DragEvent<HTMLFormElement>) => {
      event.preventDefault();

      const files = event.dataTransfer.files;

      if (files.length > 0) {
         setFile(files[0]);
      }
   };

   const handleUploadClick = () => {
      if (fileInputRef?.current) {
         fileInputRef.current?.click();
      }
   };

   const handleUploadCancel = () => {
      setFile(null);
      setUploadProgress(0);
      setUploadCSVFormProgress?.(0);
      setMapFieldsFormProgress?.(0);
   };

   const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
      const files: FileList | null = event.target.files;

      if (files && files.length > 0) {
         if (file && uploadProgress === 100) {
            setUploadProgress(0);
            setUploadCSVFormProgress?.(0);
            setMapFieldsFormProgress?.(0);
            setFile(null);
            setUploadProgress(0);
            setError(null);
         }

         const selectedFile: File = files[0];

         if (selectedFile) {
            const fileType = selectedFile.name.split('.').pop()?.toLowerCase();

            if (fileType === 'csv' || fileType === 'xlsx') {
               bulkEmployeeData.fileColumns = await getColumnsInCsvAndXlsxFile(selectedFile);
               bulkEmployeeData.mappingFormData = { data: {}, mappingProgress: 0 };

               setFile(selectedFile);
               setUploadProgress(100);
               setUploadCSVFormProgress?.(100);
            } else {
               setError(`Unsupported file type: ${selectedFile.name}`);
            }
         }
      }

      event.target && (event.target.value = '');
   };

   return (
      <Flex direction={'column'} rowGap={8}>
         <h5 className={'text-h5 text-midnight-blue font-bold'}>Upload CSV/XLSX</h5>
         <p>
            For a smooth data import and easy mapping, please ensure your CSV/XLSX file has the
            correct headings.
         </p>
         <form onDragOver={handleFileDragOver} onDrop={handleFileDrop}>
            <Box
               className={`w-full border border-dashed ${uploadProgress === 100 ? 'border-success' : error ? 'border-error' : 'border-grey-x-light'} flex flex-col justify-center items-center gap-y-4 py-10 rounded mt-3 bg-grey-6x-light`}
            >
               {!file ? <> {downloadIcon}</> : <CircularProgress progress={uploadProgress} />}
               {!file ? (
                  <p className={'font-semibold'}>Drag and drop CSV/XLSX file</p>
               ) : (
                  <>
                     <p className={'text-sm font-normal text-center'}>
                        {file.name}
                        {uploadProgress === 100 ? (
                           <p className='text-black-x-light font-semibold text-base'>
                              File uploaded successfully
                           </p>
                        ) : (
                           <p className='text-black-x-light font-semibold text-base'>
                              Uploading file...
                           </p>
                        )}
                     </p>
                  </>
               )}
               {file ? (
                  <>
                     {file ? (
                        <Flex columnGap={8}>
                           <Button
                              variant={'outline'}
                              size={'compact-sm'}
                              onClick={handleUploadClick}
                           >
                              Replace
                           </Button>
                           <Button
                              variant={'outline'}
                              color={colours.error}
                              size={'compact-sm'}
                              onClick={handleUploadCancel}
                           >
                              Delete
                           </Button>
                        </Flex>
                     ) : (
                        <Button
                           variant={'outline'}
                           color={colours.shadeBlue}
                           bg={colours.white}
                           size={'compact-sm'}
                           onClick={handleUploadCancel}
                        >
                           Cancel
                        </Button>
                     )}
                  </>
               ) : (
                  <Button
                     leftSection={<MdOutlineFileUpload size={22} />}
                     size={'md'}
                     color={colours.shadeBlue}
                     className={'font-normal'}
                     onClick={handleUploadClick}
                  >
                     Upload CSV/XLSX
                  </Button>
               )}
               <input
                  type={'file'}
                  accept={'.xlsx,.csv'}
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  hidden
               />
            </Box>
            {error && <p className={'mt-3 text-error'}>{error}</p>}
            <Flex justify={'space-between'} mt={32} className={'w-full'}>
               <Button
                  variant={'light'}
                  bg={colours.grey4XLight}
                  color={colours.grey}
                  size={'md'}
                  onClick={() => handleFormClose?.()}
               >
                  Cancel
               </Button>
               <Button color={colours.shadeBlue} size={'md'} onClick={handleNextClick}>
                  Next
               </Button>
            </Flex>
         </form>
      </Flex>
   );
};

export default UploadCsv;
