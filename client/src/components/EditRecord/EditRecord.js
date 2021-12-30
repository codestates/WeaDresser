import { useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import close from '../../images/close_ic.png';
import check from '../../images/check_ic_sel.svg';
import axios from 'axios';

function EditRecord({ curSlide, setCurSlide, setIsEdit, fetchedDiary, }) {

    const { handleSubmit } = useForm();
    // const selectedRecord = useSelector(state => state.getRecordDataReducer);
    const [editImage, setEditImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [initImage, setInitImage] = useState(fetchedDiary[curSlide].image); // 초기 이미지 값
    const [editContent, setEditContent] = useState(fetchedDiary[curSlide].content);
    const [editHashtag, setEditHashtag] = useState(fetchedDiary[curSlide].hashtag);
    const [sharePost, setSharePost] = useState(true);
    const inputValue = useRef(null);
    // console.log(editHashtag, 'hahahaha')
    // console.log(fetchedDiary[curSlide].hashtag.length, 'popopopopo')

    function inputFileHandler (inputValue) {
        const image = inputValue.current.files;
        setEditImage(image[0]);
        if (image[0]) {
            setPreviewImage(window.URL.createObjectURL(image[0]));
        }
    }

    function inputImageFn (e, inputValue) {
        inputValue.current.click();
    }

    function inputContentFn (e) {
        setEditContent(e.target.value);
    }

    function removeHashtagFn (removeTag) {
        if (editHashtag.length === 0) return;
        let filtered = editHashtag.slice().filter(el => el !== removeTag)
        setEditHashtag([...filtered]);
    }
    
    function inputHashtagFn (e) {
        e.preventDefault(); ////////////// !!!!!!!
        if (e.target.value === '') return;
        else if (editHashtag.includes(e.target.value)) return;
        else {
            const trimmedHashtag = e.target.value.split('').filter(el => el !== '#').filter(el2 => el2 !== ' ').join('');
            if (editHashtag.length > 0) {
                setEditHashtag([...editHashtag, trimmedHashtag]);
            } else {
                setEditHashtag([trimmedHashtag]);
            }
        }
        e.target.value = '';
    }

    function isShareCheck (e) {
        setSharePost(!sharePost)
    }

    const formData = new FormData();
    function editComplete (e) {
        // e.preventDefault();
        let diaryId = fetchedDiary[curSlide].id
        if (editImage !== null) {
            formData.append('image', editImage);
        } else {
            formData.append('image', fetchedDiary[curSlide].image);
        }
        formData.append('content', editContent);
        formData.append('hashtag', editHashtag);
        formData.append('share', sharePost); 
        formData.append('diaryId', diaryId);
        // const url = process.env.REACT_APP_SERVER_URL || 
        const url = `${process.env.REACT_APP_SERVER_URL}/mypage/diary` // server랑 확인할때 환경변수 x
        axios.patch(url, formData, { withCredentials: true})
            .then(res => console.log('edit successfully'))
            .then(() =>{
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    function cancelEdit (e) {
        setIsEdit(false);
        console.log(curSlide)
        setCurSlide(curSlide);
    }

    return (
        <EditForm onSubmit={handleSubmit(editComplete)}>
            <EditContainer>
                <EditImageBox>
                    <InputImage ref={inputValue} onChange={(e) => inputFileHandler(inputValue)}></InputImage>
                    {
                        editImage ? 
                        <PreviewImage previewImage={previewImage} onClick={(e) => inputImageFn(e, inputValue)}></PreviewImage>
                        :
                        <PreviewImage previewImage={initImage} onClick={(e) => inputImageFn(e, inputValue)}>
                            {/* <PhotoLogo></PhotoLogo>
                            <UploadDesc>클릭하여 이미지를 추가하세요.</UploadDesc> */}
                        </PreviewImage>
                    }
                </EditImageBox>
                <EidtContentBox defaultValue={editContent} onChange={(e) => inputContentFn(e)}></EidtContentBox>
                <EditHashtagBox>
                    { editHashtag && editHashtag.length > 0 ? 
                        editHashtag.map((tag) =>
                        <SingleHashtag key={tag}>
                            <span>{`#${tag}`}</span>
                            <span className="close-button" onClick={() => removeHashtagFn(tag)}></span>
                        </SingleHashtag>)
                    : null}
                    <InputHashtag type="text" onKeyPress={(e) => e.key === 'Enter' ? inputHashtagFn(e) : null} placeholder="여기에 해시태그를 입력해 주세요." ></InputHashtag>
                </EditHashtagBox>
                <ShareBox>
                    {
                        sharePost ? 
                        <div className="share-check-true" onClick={(e) => isShareCheck(e)}></div>
                        :
                        <div className="share-check-false" onClick={(e) => isShareCheck(e)}></div>
                    }
                    <div className="share-desc">공유하기</div>
                </ShareBox>
            </EditContainer>
            <DotMenu>
                <DotMenuButton2>완료</DotMenuButton2>
                <DotMenuButton1 type="button" onClick={(e) => cancelEdit(e)}>취소</DotMenuButton1>
            </DotMenu>
        </EditForm>
    )
}

export default EditRecord

const EditForm = styled.form.attrs(props => ({
    id: "record"
}))`
    width: 100%;
`

const EditContainer = styled.div`
    width: 47.8em;
    height: 46em;
    /* position: relative; */
`
const EditImageBox = styled.div`
    width: 100%;
    height: 70%;
`
const InputImage = styled.input.attrs(props => ({
    name: "image",
    type: "file",
    id : "image"
}))`
    display: none;
    
`
const PreviewImage = styled.div.attrs(props => ({
    name: "image",

}))`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    cursor: pointer;
    background-image: url(${props => props.previewImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #dfdfe0;
`
const EidtContentBox = styled.textarea`
    width: 47.1rem;
    height: 15%;
    font-family: NotoSansKR;
    font-size: 1.4em;
    line-height: 2.5;
    letter-spacing: normal;
    padding-left: 0.5em;
    color: #3b3c3c;
    border: none;
    resize: none;
    border-top: solid 1px #d3d3d3;
    border-bottom: solid 1px #d3d3d3;
    background-color: #fdfdfd;
`
const EditHashtagBox = styled.ul`
    width: 47.8rem;
    /* height: 7.5rem; */
    padding-top: 0.5em;
    position: relative;
    background-color: #fdfdfd;
    display: flex;
    flex-wrap: wrap;
`
const SingleHashtag = styled.li`
    width: auto;
    align-items: center;
    justify-content: center;
    line-height: 2.3;
    color: #fff;
    padding: 0 8px;
    font-size: 1.4rem;
    border-radius: 4px;
    margin: 0 4px 4px 0.5em;
    background-color: #5694F8;
    letter-spacing: 1px;
    display: flex;
    :hover {
        background-color: #3471d5;
    }
    .close-button {
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 5px;
        margin-bottom: 0px;
        background-image: url(${close});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        cursor: pointer;
    }
`
const InputHashtag = styled.input`
    width: 47.8rem;
    height: 1.9em;
    border: none;
    resize: none;
    padding: 0em 0.2em 0em 0.5em;
    align-items: center;
    font-size: 1.2rem;
    letter-spacing: 2px;
    background: #fdfdfd;
`
export const ShareBox = styled.div`
    width: 20rem;
    height: 3rem;
    margin: 0 auto;
    position: relative;
    left: 35em;
    bottom: 3em;
    /* top: 68%; */
    display: flex;
    z-index: 10;
    .share-check-true {
        width: 2.7rem;
        height: 2.7rem;
        background-color: #4970ed;
        background-image: url(${check});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border: solid 1px #4970ed;
    }
    .share-check-false {
        width: 2.7rem;
        height: 2.7rem;
        background-color: #d0d0d0;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border: solid 1px #f9f9fb;
        /* border-color: #4970ed; */
    }
    .share-desc {
        width: auto;
        margin: 0.3rem 0 0 1.5rem;
        height: 2.3rem;
        font-family: NotoSansKR;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #000;
    }
`
const DotMenu = styled.div`
    /* display: ${props => props.isDotMenu ? 'block' : 'none'}; */
    width: 9.4em;
    height: 10em;
    position: absolute;
    left: 50.3em;
    border-radius: 8px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border: solid 1px #d9d9d9;
    top: -0.1em;
    right: 10.5em;
`
const DotMenuButton1 = styled.button`
    width: 100%;
    height: 5rem;
    position: relative;
    font-family: NanumBarunGothicOTF;
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    line-height: 2.8;
    letter-spacing: normal;
    color: #ed3829;
    /* border-bottom: solid 1px #d9d9d9; */
    cursor: pointer;
    :hover {
        background-color: #f2f2f4;
    }
`
const DotMenuButton2 = styled.button.attrs(props => ({
    type: "submit",
    form: "record",
}))`
    width: 100%;
    height: 5rem;
    position: relative;
    font-family: NanumBarunGothicOTF;
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    line-height: 3;
    letter-spacing: normal;
    color: #2862e5;
    border-bottom: solid 1px #d9d9d9;
    cursor: pointer;
    :hover {
        background-color: #f2f2f4;
    }
`