import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    
    const onDeleteClick = async () => {
        const desertRef = ref(storageService, nweetObj.attachmentUrl);
        const ok = window.confirm("Are you sure you wnat to delete this nweet?");
        try {
            if (ok) {
                await deleteDoc(NweetTextRef)
                if (nweetObj.attachmentUrl !=="") {
                    await deleteObject(desertRef);
                }
            }
        } catch (error) {
            window.alert("Fail");
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
        <div className="nweet">
            {
                editing ? (
                    <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                        type="text"
                        placeholder="Edit your nweet"
                        value={newNweet}
                        onChange={onChange}
                        required
                        autoFocus
                        className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                    </>
                ) :
                <> 
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt="nweet" />}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            }
        </div>
    )
}


export default Nweet;