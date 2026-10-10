import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useAtomValue, useSetAtom } from "jotai";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";
import { deleteUserR } from "./store/dataSlice";
import { useZustand } from "./store/zustand";
import { dataJotai, deleteUserJ } from "./store/jotai";

const App = () => {
  const { dataZ, deleteUserZ } = useZustand();
  const dataRedux = useSelector((state: RootState) => state.dataSlice.dataRedux);
  const dataJ = useAtomValue(dataJotai);
  const deleteJ = useSetAtom(deleteUserJ);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const alldata: CombinedUser[] = dataZ.map((el) => {
    const elR = dataRedux.find((e) => e.id === el.id) ?? {};
    const elJ = dataJ.find((e) => e.id === el.id) ?? {};
    return { ...el, ...elR, ...elJ };
  });

  return (
    <>
      <button
        style={{ marginBottom: "20px", marginLeft: "2.6%", backgroundColor: "lightblue", color: "black", borderRadius: "10px", padding: "5px 20px" }}
        onClick={() => setOpen(true)}
      >
        Add User
      </button>
      <div className="allCard">
        {alldata.map((el) => (
          <div className="card" key={el.id}>
            <img src={el.image} alt={el.name} />
            <div className="p">
              <h2>name: {el.name}</h2>
              <p>job: {el.job}</p>
              <p>status: {el.status ? "Active" : "Inactive"}</p>
              <p>phone: {el.phone ?? "No phone"}</p>
              <p>city: {el.city ?? "No city"}</p>

              <div className="flex">
                <button
                  onClick={() => {
                    dispatch(deleteUserR(el.id));
                    deleteUserZ(el.id);
                    deleteJ(el.id);
                  }}
                >
                  Delete
                </button>

                <button onClick={() => navigate(`/info/${el.id}`)}>info</button>
                <button
                  onClick={() => {
                    setSelectedUser(el);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {selectedUser ? (
          <EditDialog selectedUser={selectedUser} setOpen={setOpen} setSelectedUser={setSelectedUser} />
        ) : (
          <AddDialog open={open} setOpen={setOpen} />
        )}
      </div>
    </>
  );
};

export default App;
