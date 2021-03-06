import { gql, useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled'
import { Modal } from 'antd';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { FETCH_LOGIN_USER } from '../../src/components/units/Mypage/MypageQueries';

const Magazine = styled.img`
    width: 100%;
    height: 100%;

`
const ManagerBox = styled.div`
  width: fit-content;
  border: 1px solid lightgray;
  padding: 3%;
`
const InputImage = styled.input`
border: 1px solid red;
`
const Arrow = styled.img`
  width: 30px;
  height: 30px;

`
const Img = styled.img`
  width: 100%;
  height: 100%;

`
const UpdateButton = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  font-size: 15px;
  font-family: GmarketSans;
  background-color: gold;
  margin: 10px;
  cursor: pointer;

`

const Warning = styled.span`
  
  font-size: 15px;
  font-family: "GmarketSans";
`

const FETCH_LAST_WALLPAPER = gql`
  query fetchLastWallpaper{
    fetchLastWallpaper{
    imageUrl
    }
  }
`


const UPLOAD_IMAGE = gql`
mutation uploadImage($file: Upload!) {
  uploadImage(file:$file)
}
`


const UPLOAD_MAGAZINE = gql`
  mutation createWallpaper($title: String!,$imageUrl: String!){
    createWallpaper(title:$title, imageUrl:$imageUrl){
      id
      imageUrl
    }
  }

`

export default function JellyPaperPage(){
    const fileRef = useRef<HTMLInputElement>(null);
    const [windowSize, setWindowSize] = useState(false);
    const [myfile,setFile] = useState([])
    const { data } = useQuery(FETCH_LOGIN_USER);
    const {data : urlData} = useQuery(FETCH_LAST_WALLPAPER)
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const [uploadMagazine] = useMutation(UPLOAD_MAGAZINE)
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setWindowSize(true);
      } else {
        setWindowSize(false);
      }
    };

    const onClickImg = () =>{
      fileRef.current?.click()
  
    }
    const addImage = async(event:ChangeEvent<HTMLInputElement>) =>{
      const file = event.target.files?.[0]
      try{
          const result = await uploadImage({
            variables: {file}
          })
          setFile(result.data.uploadImage)
          Modal.success({content:"?????????????????????! ????????????????????? ??????????????? ????????????!"})
        }catch(error){
          if(error instanceof Error) Modal.error({content:error.message})
        }
     
    }
  
  
    useEffect(() => {
      if (window.innerWidth <= 767) {
        setWindowSize(true);
      }
      window.addEventListener("resize", handleResize);
      return () => {
      window.removeEventListener("resize", handleResize);
      };
    }, [windowSize]);

    const onClickUpload = async()=>{

      try{
        await uploadMagazine({
          variables:{
            title : "??????5??????",
            imageUrl: myfile
          }
        })
        Modal.success({content:"??????????????? ????????? ????????????????????????!"})
      } catch(error){
        Modal.error({content:"???????????? ????????? ?????????????????? ?????????????????????????????? ???????????????"})
      }

    }
return (
    
    <div style={{ padding : "5%"}}>
{/* ???????????? ????????????  */}
        {!windowSize && (
        <Img src={`https://storage.googleapis.com/${urlData?.fetchLastWallpaper?.imageUrl}`}/>
        )}
          {windowSize && (
        <Magazine src='/images/jellypaper/mobile_????????????5??????.png'/>
          )}

{/* backend?????? fetch??? ???????????? ?????? ???????????? */}
          {/* <Img src={`https://storage.googleapis.com/${urlData?.fetchLastWallpapers[0]?.imageUrl}`}/> */}
        {data?.fetchLoginUser.isAdmin ? (
        <>
        <br/>
        <Warning> - ???????????? ?????? ????????? - </Warning>
        <ManagerBox>

          <UpdateButton onClick={onClickImg} >????????? ?????? ????????????</UpdateButton>
          <Arrow src='/images/jellypaper/right-arrow.png'/>
          <UpdateButton onClick={onClickUpload} >????????? <br/>????????? ??????</UpdateButton>
          <InputImage ref={fileRef} style={{display:"none"}} type="file" multiple onChange={addImage} accept=".jpg,.jpeg,.png"/><br/>
        <br/>
        <span style={{fontSize:"16px", color: "red" }}>????????? ?????? ???????????? (??????????????? ?????? ??????) -&gt; ????????? ????????? ?????? ?????? <br/></span>
        </ManagerBox>
        </>
        ) : (
          <></>
        )}
    </div>
)


}