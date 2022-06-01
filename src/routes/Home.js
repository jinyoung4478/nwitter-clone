import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { ref, uploadString, getDownloadURL  } from "firebase/storage";
import React, { useEffect, useState, useRef } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        const q = query(collection(dbService, "nweets"),
        orderBy("createdAt")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        try{
            await addDoc(collection(dbService, "nweets"), nweetObj)
        } catch (error) {
            console.log("Error adding document: ", error);
        }
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const { target:{value}} = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {target:{files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        const {
            currentTarget: {result},
        } = finishedEvent;
        setAttachment(result);
    }
    reader.readAsDataURL(theFile);
    }
    const fileInput = useRef();
    const onClearAttachmentClick = () => {
        setAttachment(null);
        fileInput.current.value = "";
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="img" />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;