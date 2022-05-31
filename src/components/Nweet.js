import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import React, {useState} from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you wnat to delete this nweet?");
        if (ok) {
            await deleteDoc(NweetTextRef)
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    }
    return (
        <div>
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your nweet" value={newNweet} onChange={onChange} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) :
                <> 
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            }
        </div>
    )
}


export default Nweet;