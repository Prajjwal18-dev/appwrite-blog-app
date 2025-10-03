import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-2 text-sm font-medium text-black/80'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey='dn14tajbeg7iwwz41g24bm4g64v46iaxd5go35wnbbdb3vwm'
        initialValue={defaultValue}
        init={{
            height: 500,
            menubar: true,
            plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            ],
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            content_style: "body { font-family:Inter,sans-serif; font-size:16px; color: #E5E7EB; }",
            skin: 'oxide-dark', // Use the dark theme for the editor UI
            content_css: 'dark' // Use the dark theme for the content
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}
