import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

// tinymce editor


export default (function Editar  ({setStateData, stateData, clear }) {
    const editorRef=useRef(null)

//     const getText = (e) => {
//         const content = editorRef.current.getContent()
//         console.log(content)
// }

    return (
        <>   
            <Editor
                onEditorChange={()=>setStateData(prev=>({...prev, body:editorRef.current.getContent() }))}
                ref={editorRef}
                apiKey='wzpcm7w1m3us9871knoia446nb6gh9v2zw6a3tdolsxriafw'
                onInit={(evt, editor) => editorRef.current = editor}
                value={clear?"":stateData.body}
                // value={stateData.body == undefined ? stateData.body:""}
                init={{
                    height: 500,
                    width:"80%",
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
           />

        </>
    )
})