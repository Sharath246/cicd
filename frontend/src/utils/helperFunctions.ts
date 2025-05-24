import { useDispatch } from "react-redux";
import { setPeopleResults } from "../redux/searchResults.redux";

const dispatch = useDispatch();

export function handleAutoComplete(
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
//   setOptions: React.Dispatch<React.SetStateAction<never[]>>
) {
    // dispatch(setPeopleResults())
}
