import styled from '@emotion/styled';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as OurEditor } from '@toast-ui/react-editor';
import {gql, useMutation} from '@apollo/client'
import { Modal } from 'antd';





const Editor = styled(OurEditor)``

export const Wrapper =styled.div`
    width: 100%;
    height: 100%;

`

const UPLOAD_IMAGE = gql`
    mutation uploadImage($file: Upload!){
        uploadImage(file:$file)
    }
`


export default function ProductEditorUI(props:any){
    

    const [uploadImage] = useMutation(UPLOAD_IMAGE)
 return (
     <Wrapper>
         {props.data?
        <Editor 
        previewStyle='vertical'
        placeholder='봉사 센터의 특이사항등을 상세히 설명해주시고, 센터 사진을 끌어다 놓아보세요!'
        ref={props.editorRef}
        initialValue={props.data?.fetchProduct.details || ""}
        hooks={{addImageBlobHook: async(file : Blob | File, callback)=>{
            try{
                const result = await uploadImage({
                    variables: {file}
                })
                const result1 = result?.data.uploadImage.replaceAll(' ','%20')
                const url = `https://storage.googleapis.com/${String(result1)}`
                callback(url)
            }catch(error){
                if(error instanceof Error) Modal.error({content:error.message})
            }
        }}}
        
        />
    :<Editor 
    previewStyle='vertical'
    placeholder='봉사 센터의 특이사항등을 상세히 설명해주시고, 센터 사진을 끌어다 놓아보세요!'
    ref={props.editorRef}
    hooks={{addImageBlobHook: async(file : Blob | File, callback)=>{
        try{
            const result = await uploadImage({
                variables: {file}
            })
            const result1 = result?.data.uploadImage.replaceAll(' ','%20')
            const url = `https://storage.googleapis.com/${String(result1)}`
            callback(url)
        }catch(error){
            if(error instanceof Error) Modal.error({content:error.message})
        }
    }}}
    
    />}
     </Wrapper>
 )   
}