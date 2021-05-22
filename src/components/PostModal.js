import styled from 'styled-components';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { postArticleAPI } from '../actions/index'

const PostModal = (props) => {
    const [editorText, setEditorText] = useState("");
    const [sharedImage, setSharedImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image, the file is a ${typeof image}`)
            return;
        }

        setSharedImage(image);
    };

    const switchAssetArea = (area) => {
        setSharedImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticle = (e) => {
        console.log('Post Malone')
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            console.log('hello')
            return;
        }


        const payload = {
            image: sharedImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        props.postArticle(payload);
        reset(e)
    }

    const reset = (e) => {
        setEditorText("")
        setSharedImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    return (
        <>
            { props.showModal === 'open' &&
                <Container>
                    <Content>
                        <Header>
                            <h2>
                                Create a post
                            </h2>
                            <button onClick={(event) => reset(event)}>
                                <img src='https://www.materialui.co/materialIcons/navigation/close_black_1024x1024.png' style={{ width: '1em' }} />
                            </button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                {props.user ? (
                                    <img src={props.user.photoURL} />
                                ) : (
                                    <img src="/images/user.svg" alt="" />
                                )}
                                <span>{props.user.displayName}</span>
                            </UserInfo>
                            <Editor>
                                <textarea
                                    value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    placeholder="What do you want to talk about?"
                                    autoFocus={true}
                                />
                                {assetArea === 'image' ?
                                    <UploadImage>

                                        <input type='file' accept='image/gif, image/jpeg, image/png'
                                            name='image'
                                            id='file'
                                            style={{ display: "none" }}
                                            onChange={handleChange}
                                        />
                                        <p>
                                            <label htmlFor="file">
                                                Select a image to share
                                        </label>
                                        </p>
                                        {sharedImage && <img src={URL.createObjectURL(sharedImage)} />}
                                    </UploadImage>
                                    :
                                    assetArea === 'media' &&
                                    <>
                                        <input
                                            type='text'
                                            placeholder='Please input a video link'
                                            value={videoLink}
                                            onChange={(e) => setVideoLink(e.target.value)}
                                        />
                                        {videoLink && <ReactPlayer width={'100%'} url={videoLink} />}
                                    </>

                                }
                            </Editor>
                        </SharedContent>
                        <ShareCreation>
                            <AttachAssets>
                                <AssetButton onClick={() => switchAssetArea('image')}>

                                    <img src="/images/paper-plane.png" style={{ width: "1.2em" }} />

                                </AssetButton>
                                <AssetButton onClick={() => switchAssetArea('media')}>

                                    <img src='https://www.iconpacks.net/icons/1/free-video-icon-818-thumb.png' style={{ width: '1.2em' }} />

                                </AssetButton>
                            </AttachAssets>
                            <ShareComments>
                                <AssetButton>
                                    <img src="/images/chat-comment-oval-speech-bubble-with-text-lines.png" style={{ width: "1.2em" }} />
                            Anyone
                        </AssetButton>
                            </ShareComments>
                            <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
                                Post
                    </PostButton>
                        </ShareCreation>
                    </Content>
                </Container>
            }
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 9999;
    color: black;
    background-color: rgba(0,0,0,0.7);
    animation:fadeIn 0.3;
`;

const Content = styled.div`
    width:100%;
    max-width:552px;
    background-color: white;
    max-height: 90%;
    overflow:initial;
    border-radius: 5px;
    position: relative;
    display:flex;
    flex-direction: column;
    top:32px;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        height:40px;
        width:40px;
        min-width:auto;
        color: rgba(0,0,0,0.15);
        svg,
        img{
            pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display:flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 14px;
    svg,
    img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
    display:flex;
    align-items: center;
    height:40px;
    min-width:auto;
    color: rgba(0,0,0,0.5);
`;

const AttachAssets = styled.div`
    display:flex;
    align-items:center;
    padding-right: 8px;
    ${AssetButton} {
        width:40px;

    }
`;

const ShareComments = styled.div`
    padding-left:8px;
    margin-right:auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton} {
        svg {
            margin-right:5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius:20px;
    padding-left:16px;
    padding-right:16px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
    &:hover {
        background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
`;

const Editor = styled.div`
    padding:12px 24px;
    textarea {
        width: 100%;
        min-height:100px;
        resize:none;
    }
    input {
        width:100%;
        height:25px;
        font-size:16px;
        margin-bottom:20px
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img {
        width:100%;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PostModal);