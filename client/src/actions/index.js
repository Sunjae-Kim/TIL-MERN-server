import axios from "axios";
import { FETCH_USER } from "./types";

// User 를 호출하고 action을 발행해야 하기 때문에
export const fetchUser = () => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: await axios.get("/api/users/current")
  });
};