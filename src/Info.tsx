import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useAtomValue } from "jotai";
import { useZustand } from "./store/zustand";
import { dataJotai } from "./store/jotai";
import type { RootState } from "./store/store";
import type { CombinedUser } from "./store/types";

export default function Info() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dataZ } = useZustand();
  const dataRedux = useSelector((state: RootState) => state.dataSlice.dataRedux);
  const dataJ = useAtomValue(dataJotai);

  const user: CombinedUser | undefined = dataZ
    .map((item) => ({
      ...item,
      ...dataRedux.find((reduxItem) => reduxItem.id === item.id),
      ...dataJ.find((jotaiItem) => jotaiItem.id === item.id),
    }))
    .find((item) => item.id === Number(id));

  if (!user) {
    return (
      <main className="infoPage">
        <p>User not found.</p>
        <button onClick={() => navigate("/")}>Back</button>
      </main>
    );
  }

  return (
    <main className="infoPage">
      <button onClick={() => navigate("/")}>Back</button>
      <section className="infoCard">
        <img src={user.image} alt={user.name} />
        <div>
          <h1>{user.name}</h1>
          <p>Job: {user.job}</p>
          <p>Status: {user.status ? "Active" : "Inactive"}</p>
          <p>Phone: {user.phone ?? "No phone"}</p>
          <p>City: {user.city ?? "No city"}</p>
        </div>
      </section>
    </main>
  );
}
