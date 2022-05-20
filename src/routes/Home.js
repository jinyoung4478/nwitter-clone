import { dbService } from "fbase";
import { addDoc, collection, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    /* const getNweets = async() => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets(prev => [nweetObject, ...prev]);
        });
    }; */
    useEffect(() => {
        /* getNweets(); */
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
        try{
            await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: serverTimestamp(),
                creatorId: userObj.uid,
            })
        } catch (error) {
            console.log("Error adding document: ", error);
        }
        setNweet("");
    };
    const onChange = (event) => {
        const { target:{value}} = event;
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;